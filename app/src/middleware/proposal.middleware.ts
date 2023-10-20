import { ethers } from 'ethers';
import { signTransaction } from '@/middleware/sign.middleware';
import { numericString, salt } from '@/utils/nonce';
import { IProposal } from '@/utils/interfaces/IProposal.interface';
import "dotenv/config";

const { API_URL_SEPOLIA, API_URL_MUMBAI, API_URL_SCROLL_SEPOLIA, FACTORY_ADDRESS } = process.env;

export const proposal = async (network: string, amount:string, destinationAddress: string, digest: string): Promise<IProposal[]> => {
    let provider: any;

    switch (network) {
        case '11155111':
            provider = new ethers.providers.JsonRpcProvider(API_URL_SEPOLIA as string);
            break;
        case '80001':
            provider = new ethers.providers.JsonRpcProvider(API_URL_MUMBAI as string);
            break;
        case '534351': 
            provider = new ethers.providers.JsonRpcProvider(API_URL_SCROLL_SEPOLIA as string);
            break;
        default: 
            throw new Error('Unsupported network');
    }

    const providerNetwork = await provider.getNetwork();
    if (network != providerNetwork.chainId.toString()) {
        throw new Error('Error getting network name');
    }

    const signerKeys = [
        process.env.OWNER_1_PRIVATE_KEY as string,
        process.env.OWNER_2_PRIVATE_KEY as string,
        process.env.OWNER_3_PRIVATE_KEY as string,
    ];

    const proposals = await Promise.all(
        signerKeys.map(async (signerKey) => {
            const provider_url = provider.connection.url;
            const wallet = new ethers.Wallet(signerKey);
            const proposal = {
                to: destinationAddress,
                data: digest,
                value: ethers.utils.parseUnits(amount, 'ether').toString(),
                message: await signTransaction(
                    provider_url,
                    wallet.address,
                    FACTORY_ADDRESS as string,
                    providerNetwork.chainId,
                    "send transaction",
                    wallet
                ),
                nonce: Date.now() + salt(numericString(destinationAddress)),
            }
            return proposal;
        })
    )

    return proposals;
    
}

export default { proposal }
