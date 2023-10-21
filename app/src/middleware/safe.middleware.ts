import { ethers } from 'ethers'; 
import SafeApiKit from '@safe-global/api-kit';
import Safe, { EthersAdapter, SafeAccountConfig, SafeFactory, getSafeContract } from '@safe-global/protocol-kit';
import { GelatoRelayPack } from '@safe-global/relay-kit';
import { MetaTransactionData, MetaTransactionOptions, OperationType, SafeMultisigTransactionResponse, TransactionOptions } from '@safe-global/safe-core-sdk-types'
import axios from 'axios';
import 'dotenv/config';

export const mutliSigTransaction = async (network: string, amount: string, destinationAddress: string, digest: string ): Promise<Boolean> => {
    try {

        console.log('Request for multisignature transaction received.')
        let provider;
        let txServiceUrl: string = "";

        switch (network) {
            case '5':
                console.log('Initiated safe transaction at Goerli network.')
                provider = new ethers.providers.JsonRpcProvider(process.env.API_URL_GOERLI as string);
                txServiceUrl = 'https://safe-transaction-goerli.safe.global';
                break;
            default:
                throw new Error('Unsupported network');
        }

        const providerNetwork = await provider.getNetwork();
        if (network != providerNetwork.chainId.toString()) {
            throw new Error('Error getting network name');
        }
        

        console.log('Initiated signers...')
        const signer1 = new ethers.Wallet(process.env.SAFE_1 as string, provider);
        const signer2 = new ethers.Wallet(process.env.SAFE_2 as string, provider);
        const signer3 = new ethers.Wallet(process.env.SAFE_3 as string, provider);
        const withdrawAmount = ethers.utils.parseUnits(amount, 'ether').toString();

        console.log('safeTransaction data initiated.')
        const safeTransactionData: MetaTransactionData = {
            to: destinationAddress,
            data: digest,
            value: withdrawAmount,
            operation: OperationType.Call
        }

        console.log('options for metatransaction initiated.')
        const options: MetaTransactionOptions = {
            gasLimit: "200000",
            isSponsored: true
        }

        console.log('ethAdapterSigner1 created.')
        const ethAdapterSigner1 = new EthersAdapter({
            ethers,
            signerOrProvider: signer1
        })

        console.log('safeSdkSigner1 created.')
        const safeSdkSigner1 = await Safe.create({
            ethAdapter: ethAdapterSigner1,
            safeAddress: process.env.SAFE_ADDRESS as string,
        })

        console.log('safeService available.')
        const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterSigner1 });

        console.log('Create safe transaction started.')
        const transactionHash = await createTransaction(safeSdkSigner1, safeTransactionData, safeService, signer1);
        console.log('Creation of safe transaction done, ready for first confirmation.')
        const safeTransaction2 = await firstConfirmation(transactionHash, signer2, safeService);
        console.log('First confirmation done, ready for second confirmation.')
        const encodedTx = await secondConfirmation(signer2, safeTransaction2)
        console.log('Second confirmation done, ready for execution.')
        const isSuccess = await execTransaction(encodedTx, parseInt(network), options);
        console.log('Execution success')
        return isSuccess;
    } catch (error: any) {
        console.log("Failed to initialize safe transaction");
        throw new Error(error)
    }
}

export const createTransaction = async (safeSdkSigner1: Safe, safeTransactionData: MetaTransactionData, safeService: SafeApiKit, signer1: ethers.Wallet): Promise<string> => {
    try {
        console.log('Transaction creation started...')
        const safeTransaction = await safeSdkSigner1.createTransaction({ safeTransactionData });
        const safeTxHash = await safeSdkSigner1.getTransactionHash(safeTransaction);
        const signer1Signature = await safeSdkSigner1.signTransactionHash(safeTxHash);
        await safeService.proposeTransaction({
            safeAddress: process.env.SAFE_ADDRESS as string,
            safeTransactionData: safeTransaction.data,
            safeTxHash,
            senderAddress: await signer1.getAddress(),
            senderSignature: signer1Signature.data
        })

        const pendingTransactions = (await safeService.getPendingTransactions(process.env.SAFE_ADDRESS as string)).results;

        const transaction = pendingTransactions[0];
        const transactionHash = transaction.safeTxHash;

        console.log('Transaction creation successful.')
        return transactionHash
    } catch (error: any) {
        console.log("Failed to create safe transaction.")
        throw new Error(error)
    }
}

export const firstConfirmation = async (transactionHash: string, signer2: ethers.Wallet, safeService: SafeApiKit): Promise<SafeMultisigTransactionResponse> => {
    try {
        console.log('First confirmation of transaction started...')
        const ethAdapterSigner2 = new EthersAdapter({
            ethers,
            signerOrProvider: signer2
        })

        const safeSdkSigner2 = await Safe.create({
            ethAdapter: ethAdapterSigner2,
            safeAddress: process.env.SAFE_ADDRESS as string
        })
        const safeTransaction2 = await safeService.getTransaction(transactionHash);
        await safeSdkSigner2.signTransactionHash(transactionHash);
        console.log('First confirmation done.')
        return safeTransaction2;
    } catch (error: any) {
        console.log("Failed first safe confirmation.")
        throw new Error(error)
    }
    
}

export const secondConfirmation = async (signer2: ethers.Wallet, safeTransaction2: SafeMultisigTransactionResponse): Promise<string> => {
    try {
        console.log('Second confirmation of transaction started...')
        const ethAdapterOwner3 = new EthersAdapter({
            ethers,
            signerOrProvider: signer2
        })

        const safeSdkSigner3 = await Safe.create({
            ethAdapter: ethAdapterOwner3,
            safeAddress: process.env.SAFE_ADDRESS as string,
        })

        const signedSafeTx = await safeSdkSigner3.signTransaction(safeTransaction2);

        const safeSingletonContract = await getSafeContract({
            ethAdapter: ethAdapterOwner3,
            safeVersion: await safeSdkSigner3.getContractVersion()
        })

        const encodedTx = safeSingletonContract.encode('execTransaction', [
            signedSafeTx.data.to,
            signedSafeTx.data.value,
            signedSafeTx.data.data,
            signedSafeTx.data.operation,
            signedSafeTx.data.safeTxGas,
            signedSafeTx.data.baseGas,
            signedSafeTx.data.gasPrice,
            signedSafeTx.data.gasToken,
            signedSafeTx.data.refundReceiver,
            signedSafeTx.encodedSignatures()
        ])

        console.log('Second confirmation done, transaction ready for execution.')
        return encodedTx;
       
    } catch (error: any) {
        console.log("Failed second safe confirmation.")
        throw new Error(error)
    }

}

export const execTransaction = async (encodedTx: string, chainId: number, options: MetaTransactionOptions): Promise<boolean> => {
    try {
        console.log('Execution of safe transaction started...')
        const relayTransaction = {
            target: process.env.SAFE_ADDRESS as string,
            encodedTransaction: encodedTx,
            chainId,
            options
        }

        console.log('Relay kit initiated, sponsoring transactions...')
        const relayKit = new GelatoRelayPack(process.env.GELATO_RELAY_API_KEY as string)
        const response = await relayKit.relayTransaction(relayTransaction)
        console.log(`Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`)

        while (true) {
            const result = await axios.get(`https://relay.gelato.digital/tasks/status/${response.taskId}`);
            const taskState = result.data.task.taskState;

            if (taskState === 'ExecSuccess') {
                console.log('Relay transaction is success.')
                return true
            } else if (taskState === 'CheckPending') {
                console.log('Checking for pending transaction.');
                await new Promise((resolve) => setTimeout(resolve, 10000))
            } else if (taskState === 'ExecPending') {
                console.log('Executing pending transaction.');
                await new Promise((resolve) => setTimeout(resolve, 10000))
            } else if (taskState === 'WaitingForConfirmation') {
                console.log('Waiting for confirmation.');
                await new Promise((resolve) => setTimeout(resolve, 10000))
            } else if (taskState === 'Cancelled') {
                console.log('Relay transaction was cancelled.');
                return false;
            } else {
                console.log('Unexpected task state:', taskState);
            }
        }
    } catch (error: any) {
        console.log("Failed to execute safe transaction.")
        throw new Error(error)
    }
}

export const createSafe = async (): Promise<void> => {
    try {
        console.log("Initializing provider...")
        const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL_GOERLI as string);
        const gasData = await provider.getFeeData();

        let gasDetails = {
            gasPrice: ethers.BigNumber.from(gasData.gasPrice),
            maxFeePerGas: ethers.BigNumber.from(gasData.maxFeePerGas),
            maxPriorityFeePerGas: ethers.BigNumber.from(gasData.maxPriorityFeePerGas)
        }

        const signer1 = new ethers.Wallet(process.env.SAFE_1 as string, provider);
        const signer2 = new ethers.Wallet(process.env.SAFE_2 as string, provider);
        const signer3 = new ethers.Wallet(process.env.SAFE_3 as string, provider);
        
        console.log("ethAdapterSigner1 created.")
        const ethAdapterSigner1 = new EthersAdapter({
            ethers,
            signerOrProvider: signer1
        })

        const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
        const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterSigner1 })

        console.log("safeFactory created.")
        const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterSigner1 });
        const safeAccountConfig: SafeAccountConfig = {
            owners: [
                await signer1.getAddress(),
                await signer2.getAddress(),
                await signer3.getAddress()
            ],
            threshold: 2,
        }
     

        const options: TransactionOptions = {
            gasPrice: gasDetails.gasPrice._hex,
            gasLimit: 200000,
        }

        const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, options: options })
        const safeAddress = await safeSdkOwner1.getAddress();

        console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
        console.log(`https://app.safe.global/gor:${safeAddress}`)

       
    } catch (error: any) {
        throw new Error(error)
    }
}

export const fundSafe = async (safeAddress: string, signer1: ethers.Wallet): Promise<void> => {
    const safeAmount = ethers.utils.parseUnits('0.01', 'ether').toHexString()
    
    const transactionParameters = {
        to: safeAddress,
        value: safeAmount,
    }

    const tx = await signer1.sendTransaction(transactionParameters)
    console.log('Fundraising.')
    console.log(`Deposit Transaction: https://goerli.etherscan.io/tx/${tx.hash}`)
}


export default {createSafe, fundSafe, mutliSigTransaction, createTransaction, firstConfirmation, secondConfirmation }

