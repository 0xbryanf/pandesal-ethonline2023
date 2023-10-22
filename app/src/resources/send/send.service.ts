import HttpException from "@/utils/exceptions/http.exception";
import GoogleAuthController from '@/resources/googleOauth/googleOauth.controller';
import baseArtifacts from '@/utils/artifacts/contracts/Base.sol/Base.json';
import { ethers } from 'ethers';
import { precomputedContract } from '@/middleware/deployContract.middleware';
import { getWalletAddress, getPrivateKey } from "@/utils/credentials";
import "dotenv/config";

const { API_URL_GOERLI, API_URL_SEPOLIA, API_URL_MUMBAI, API_URL_SCROLL_SEPOLIA, EXECUTOR, RELAYER_ADDRESS, FACTORY_ADDRESS } = process.env;

class SendService {
    public async sendEthViaEmailAddress(network: string, fromId: string, fromEmail: string, toEmail: string, amount: string): Promise<void> {
        const walletAddress = await getWalletAddress(fromEmail);
        const toWalletAddress = await getWalletAddress(toEmail);
        console.log(toWalletAddress);
        const privateKey = await getPrivateKey(fromEmail);
        const salt = ethers.utils.id(fromId).toString();
        const contractAddress = await precomputedContract(walletAddress, salt);
        console.log(contractAddress);
        const amountInWei = ethers.utils.parseUnits(amount, "ether");
        let provider: ethers.providers.JsonRpcProvider; 
        switch (network) {
            case '5':
                provider = new ethers.providers.JsonRpcProvider(API_URL_GOERLI as string);
                break;
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

        const signer = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(contractAddress, baseArtifacts.abi, signer);
        try {
            const response = await contract.transfer(toWalletAddress, amountInWei);
            const receipt = await response.wait();
            console.log(receipt);
        } catch (error: any) {
            console.log(error)
        }
    }
}

export default SendService;