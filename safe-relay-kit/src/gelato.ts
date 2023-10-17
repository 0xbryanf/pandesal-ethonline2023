import { ethers } from 'ethers';
import "dotenv/config";
import SafeApiKit, { ProposeTransactionProps } from '@safe-global/api-kit'
import Safe, { EthersAdapter, getSafeContract } from '@safe-global/protocol-kit';
import { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit';
import { GelatoRelayPack } from '@safe-global/relay-kit';
import { MetaTransactionData, MetaTransactionOptions, OperationType, TransactionOptions } from '@safe-global/safe-core-sdk-types'

const main = async (): Promise<void> => {

    console.log('Initializaiton of provider started.')
    const RPC_URL = process.env.ALCHEMY_GOERLI_API!;
    const provider = new ethers.providers.JsonRpcBatchProvider(RPC_URL as string);

    console.log('Initialization of signers.')
    const owner1Signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY!, provider);
    const owner2Signer = new ethers.Wallet(process.env.OWNER_2_PRIVATE_KEY!, provider);
    const owner3Signer = new ethers.Wallet(process.env.OWNER_3_PRIVATE_KEY!, provider);

    console.log('Initialization of safe address.')
    const safeAddress = '0xe4b945B5215bCFEee7b994C160eeA6b2f89824Ca';
    const chainId = 5
    const gasLimit = '3000000'

    const destinationAddress = '0x3E91bE3C8E9E4cEED8Ed1249F1537A402C8b1AF6' // 0.0178 Eth start
    const withdrawAmount = ethers.utils.parseUnits('0', 'ether').toString();

    console.log('Initialization of MetaTransactionData.')
    const safeTransactionData: MetaTransactionData = {
        to: destinationAddress,
        data: '0x',
        value: withdrawAmount,
        operation: OperationType.Call
    }
    console.log('safeTransactionData', safeTransactionData)

    console.log('Initialization of MetaTransactionOptions.')
    const options: MetaTransactionOptions = {
        gasLimit,
        isSponsored: true
    }
    console.log('MetaTransactionOptions/ Options:', options)

    console.log('EthersAdapterOwner1 created.')
    const ethAdapterOwner1 = new EthersAdapter({
        ethers,
        signerOrProvider: owner1Signer
    })
    console.log('ethAdapterOwner1:', ethAdapterOwner1)

    console.log('safeSDKOwner1 created.')
    const safeSDKOwner1 = await Safe.create({
        ethAdapter: ethAdapterOwner1,
        safeAddress
    })
    console.log('safeSDKOwner1:', safeSDKOwner1)

    const txServiceUrl = 'https://safe-transaction-goerli.safe.global' //safe service removed
    console.log(txServiceUrl)

    const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 });
    console.log(safeService);

    console.log('safeTransaction created')
    const safeTransaction = await safeSDKOwner1.createTransaction({ safeTransactionData })
    console.log('safeTransaction:', safeTransaction)

    console.log('safeTxHash created')
    const safeTxHash = await safeSDKOwner1.getTransactionHash(safeTransaction);
    console.log('safeTxHash', safeTxHash)
    

    console.log('safeSDKOwner1 signed the safeTxHash. 1/2')
    const senderSignature = await safeSDKOwner1.signTransactionHash(safeTxHash);
    console.log('senderSignature', senderSignature)

    console.log('Transaction proposal created.')
    await safeService.proposeTransaction({
        safeAddress,
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress: await owner1Signer.getAddress(),
        senderSignature: senderSignature.data,
    })

    // Get Pending transactions
    console.log('Pending transactions acquired.')
    const pendingTransactions = (await safeService.getPendingTransactions(safeAddress)).results
    console.log('pendingTransactions', pendingTransactions)

    console.log('created transaction from pendingTransaction')
    const transaction = pendingTransactions[0];
    console.log('transaction', pendingTransactions[0])

    console.log('acquired the transaction hash from pending transaction')
    const transactionHash = transaction.safeTxHash
    console.log('transactionHash', transactionHash)

    console.log('Created ethAdapterOwner2.')
    const ethAdapterOwner2 = new EthersAdapter({
        ethers,
        signerOrProvider: owner2Signer
    })
    console.log('ethAdapterOwner3', ethAdapterOwner2);

    console.log('safeSDKOwner2 Created')
    const safeSDKOwner2 = await Safe.create({
        ethAdapter: ethAdapterOwner2,
        safeAddress,
    })
    console.log('safeSDKOwner2', safeSDKOwner2);

    console.log('Generated safetransaction2 from transactionhash');
    const safeTransaction2 = await safeService.getTransaction(transactionHash);
    console.log('safeTransaction2', safeTransaction2)

    console.log('safeSDKOwner2 signed the transactionHash. 2/2')
    const senderSignature2 = await safeSDKOwner2.signTransactionHash(transactionHash);
    console.log('signature', senderSignature2)

    console.log('Created ethAdapterOwner3.')
    const ethAdapterOwner3 = new EthersAdapter({
        ethers,
        signerOrProvider: owner2Signer
    })

    console.log('safeSDKOwner3 Created')
    const safeSdkOwner3 = await Safe.create({
        ethAdapter: ethAdapterOwner3,
        safeAddress
    })

    console.log('Safe transaction2 signed by safeSdkOwner3')
    const signedSafeTx = await safeSdkOwner3.signTransaction(safeTransaction2)
    console.log('signedSafeTx', signedSafeTx)

    console.log('safeSingletonContract Created')
    const safeSingletonContract = await getSafeContract({
        ethAdapter: ethAdapterOwner3,
        safeVersion: await safeSdkOwner3.getContractVersion()
    })

    console.log('encodedTx created')
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

    console.log('relayTransaction created')
    const relayTransaction = {
        target: safeAddress,
        encodedTransaction: encodedTx,
        chainId,
        options
    }

    console.log('Relaykit initialized.')
    const relayKit = new GelatoRelayPack(process.env.GELATO_RELAY_API_KEY)

    console.log('relaykit.relayTransaction invoked.')
    const resp = await relayKit.relayTransaction(relayTransaction)

    console.log('Task ID provided.')
    console.log(`Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${resp.taskId}`)
}

const createSafe = async (): Promise<void> => {
    try {
        console.log("Initializing provider...")
        const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_GOERLI_API as string);
        const gasData = await provider.getFeeData();

        let gasDetails = {
            gasPrice: ethers.BigNumber.from(gasData.gasPrice),
            maxFeePerGas: ethers.BigNumber.from(gasData.maxFeePerGas),
            maxPriorityFeePerGas: ethers.BigNumber.from(gasData.maxPriorityFeePerGas)
        }

        const signer1 = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY as string, provider);
        const signer2 = new ethers.Wallet(process.env.OWNER_2_PRIVATE_KEY as string, provider);
        const signer3 = new ethers.Wallet(process.env.OWNER_3_PRIVATE_KEY as string, provider);
        
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
            nonce: Date.now(),
        }

        console.log("Deploying..")
        const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, options: options })
        const safeAddress = await safeSdkOwner1.getAddress();

        console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
        console.log(`https://app.safe.global/gor:${safeAddress}`)

       
    } catch (error: any) {
        throw new Error(error)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
})