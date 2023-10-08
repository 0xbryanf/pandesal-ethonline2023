import { ethers } from 'ethers'
import Safe, { EthersAdapter } from '@safe-global/protocol-kit'
import "dotenv/config";
import SafeApiKit from '@safe-global/api-kit'
import { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'

/**
 * @dev Initialization of Signers, Providers and EthAdapter.
 * We will be creating a Safe on the Goerli testnet.
 */

const main = async (): Promise<void> => {

    // Initialize Providers
    const RPC_URL = process.env.ALCHEMY_GOERLI_API;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    // Initialize Signers
    const owner1Signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY!, provider);
    const owner2Signer = new ethers.Wallet(process.env.OWNER_2_PRIVATE_KEY!, provider);
    const owner3Signer = new ethers.Wallet(process.env.OWNER_3_PRIVATE_KEY!, provider);

    // Initialize EthAdapter
    const ethAdapterOwner1 = new EthersAdapter({
        ethers,
        signerOrProvider: owner1Signer
    })

    // Initialize the API Kit
    // Safe Transaction Service - Keeps track of transactions sent via Safe contracts. It uses events and tracing to index the txs.
    const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
    const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 });

    // Initialize Protocol Kit - This will create a new address using SafeFactory
    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 });

    // Deploy Safe Address coming from SafeFactory
    const safeAccountConfig: SafeAccountConfig = {
        owners: [
            await owner1Signer.getAddress(),
            await owner2Signer.getAddress(),
            await owner3Signer.getAddress()
        ],
        threshold: 2,
    }

    // Predict the safe address to be deploy with nonce.
    const saltNonce = Date.now().toString();
    const safeSdk = await safeFactory.predictSafeAddress(safeAccountConfig, saltNonce);
    
    // This safe is tied to the owner 1 as the signer.
    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, saltNonce });
    const safeAddress = await safeSdkOwner1.getAddress();

    if (safeSdk === safeAddress) {
        console.log(true, `The deployed safe is similar to predicted safe`);
    } else {
        console.log(false, `The safe  that was deployed is different to the predicted safe.`);
    }
    
    console.log('Your Safe has been deployed:')
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
    console.log(`https://app.safe.global/gor:${safeAddress}`)

    // Your Safe has been deployed:
    // https://goerli.etherscan.io/address/0xBE19F2229862bb219D635F33130cC262BC4B4fd0
    // https://app.safe.global/gor:0xBE19F2229862bb219D635F33130cC262BC4B4fd0



    /**
     * Send ETH to the Safe
     */

    const safeAmount = ethers.utils.parseUnits('0.01', 'ether').toHexString();

    const transactionParameters = {
        to: safeAddress,
        value: safeAmount
    }

    const tx = await owner1Signer.sendTransaction(transactionParameters);

    console.log('Fundraising.');
    console.log(`Deposit transaction: https://goerli.etherscan.io/tx/${tx.hash}`);

    /**
     * After creating and deploying the Safe Address using the 3 owner addresses.
     * It is time to making transaction from a safe.
     * 
     */

    // Create a transaction
    const destination = "0x01195c0Ff074973773F3546a2f4b8E9C5B08Aad9"
    const amount = ethers.utils.parseUnits('0.005', 'ether').toString();

    const safeTransactionData: SafeTransactionDataPartial = {
        to: destination,
        data: '0x',
        value: amount
    }
    

    const safeTransaction = await safeSdkOwner1.createTransaction({ safeTransactionData });
    console.log('safeTransaction:', safeTransaction);

    /**
     * 1. Propose a transaction - To propose a transaction to the Safe Transaction Service we need to call the proposeTransaction method from the API Kit instance.
     * Once we have the Safe transaction object we can share it with the other owners of the Safe so they can sign it.
     */


    // Deterministic hash based on transaction parameters
    
    const safeTxHash = await safeSdkOwner1.getTransactionHash(safeTransaction);
    console.log('safeTxHash:', safeTxHash);

    // Sign transaction to verify that the transaction is coming from owner 1
    const senderSignature = await safeSdkOwner1.signTransactionHash(safeTxHash);
    console.log('senderSignature', senderSignature);

    await safeService.proposeTransaction({
        safeAddress,
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress: await owner1Signer.getAddress(),
        senderSignature: senderSignature.data
    })

    // Get Pending transactions
    const pendingTransactions = (await safeService.getPendingTransactions(safeAddress)).results
    console.log('pendingTransactions', pendingTransactions);

    /**
     * Confirm the Transaction: Second confirmation
     * When owner 2 is connected to the application, 
     * the Protocol Kit should be initialized again with the existing Safe address the address of the owner 2 instead of the owner 1.
     */

    const transaction = pendingTransactions[0];
    const transactionHash = transaction.safeTxHash
    console.log('transactionHash', transactionHash);

    const ethAdapterOwner2 = new EthersAdapter({
        ethers,
        signerOrProvider: owner2Signer
    })

    const safeSdkOwner2 = await Safe.create({
        ethAdapter: ethAdapterOwner2,
        safeAddress
    })

    const signature = await safeSdkOwner2.signTransactionHash(transactionHash);
    console.log('signature:', signature);

    const response = await safeService.confirmTransaction(transactionHash, signature.data);
    console.log('response', response);

    /**
     * Execute Transaction
     * Anyone can execute the Safe transaction once it has the required number of signatures.
     * 
     */

    const safeTransaction2 = await safeService.getTransaction(transactionHash);
    console.log('safeTransaction2', safeTransaction2);

    const ethAdapterOwner3 = new EthersAdapter({
        ethers,
        signerOrProvider: owner2Signer
    })

    const safeSdkOwner3 = await Safe.create({
        ethAdapter: ethAdapterOwner3,
        safeAddress
    })

    const executeTxResponse = await safeSdkOwner3.executeTransaction(safeTransaction2);
    console.log('executeTxResponse', executeTxResponse);

    const receipt = await executeTxResponse.transactionResponse?.wait();
    console.log('receipt', receipt);

    console.log('Transaction executed:')
    console.log(`https://goerli.etherscan.io/tx/${receipt?.transactionHash}`)

    // Confirm that the transaction was executed
    const afterBalance = await safeSdkOwner1.getBalance();
    console.log(`The final balance of the Safe: ${ethers.utils.formatUnits(afterBalance, 'ether')} ETH`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
})