import { ethers } from 'ethers';
import "dotenv/config";
import Safe, { EthersAdapter, getSafeContract } from '@safe-global/protocol-kit';
import { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit';
import { GelatoRelayPack } from '@safe-global/relay-kit';
import { MetaTransactionData, MetaTransactionOptions, OperationType } from '@safe-global/safe-core-sdk-types'

const main = async (): Promise<void> => {
    const RPC_URL = process.env.ALCHEMY_GOERLI_API;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

    const signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY!, provider);
    const safeAddress = '0xe4b945B5215bCFEee7b994C160eeA6b2f89824Ca';
    const chainId = 5
    const gasLimit = '3000000'

    const destinationAddress = "0x12EB073720a0Eb3720DA89481fa5d2C084aC9d86";
    const withdrawAmount = ethers.utils.parseUnits('0.001', 'ether').toString();

    const safeTransactionData: MetaTransactionData = {
        to: destinationAddress,
        data: '0x',
        value: withdrawAmount,
        operation: OperationType.Call
    }

    console.log("safeTransactionData", safeTransactionData);

    const options: MetaTransactionOptions = {
        gasLimit,
        isSponsored: true
    }

    console.log("MetaTransactionOptions", options)


    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer
    })

    const safeSDK = await Safe.create({
        ethAdapter,
        safeAddress
    })

    const relayKit = new GelatoRelayPack(process.env.GELATO_RELAY_API_KEY)
    console.log('relayKit', relayKit)

    const safeTransaction = await safeSDK.createTransaction({ safeTransactionData })
    console.log('safeTransaction', safeTransaction);
    
    const signedSafeTx = await safeSDK.signTransaction(safeTransaction)
    console.log('signedSafeTx', signedSafeTx)

    const safeSingletonContract = await getSafeContract({
        ethAdapter,
        safeVersion: await safeSDK.getContractVersion()
    })

    console.log('safeSingletonContract', safeSingletonContract);

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

    console.log('encodedTx', encodedTx);

    const relayTransaction = {
        target: safeAddress,
        encodedTransaction: encodedTx,
        chainId,
        options
    }

    console.log('relayTransaction', relayTransaction)

    const response = await relayKit.relayTransaction(relayTransaction)
    console.log('response', response)

    console.log(`Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
})