export default function safeCreation() {
        // Initialize Adapter
    // const ethAdapterOwner1 = new EthersAdapter({
    //     ethers,
    //     signerOrProvider: owner1Signer
    // })

    // Initialize the API Kit
    // Safe Transaction Service - Keeps track of transactions sent via Safe contracts. It uses events and tracing to index the txs.
    // const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
    // const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 });

    // Initialize Protocol Kit - This will create a new address using SafeFactory
    // const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 });

    // Deploy Safe Address coming from SafeFactory
    // const safeAccountConfig: SafeAccountConfig = {
    //     owners: [
    //         await owner1Signer.getAddress(),
    //         await owner2Signer.getAddress(),
    //         await owner3Signer.getAddress()
    //     ],
    //     threshold: 2,
    // }

    // Predict the safe address to be deploy with nonce.
    // const saltNonce = Date.now().toString();
    
    // This safe is tied to the owner 1 as the signer.
    // const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, saltNonce });
    // const safeAddress = await safeSdkOwner1.getAddress();
    
    // console.log('Your Safe has been deployed:')
    // console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
    // console.log(`https://app.safe.global/gor:${safeAddress}`)


    /**
     * Relay kit from here
     */
}
