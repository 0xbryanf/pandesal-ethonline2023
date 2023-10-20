import { ethers } from 'ethers';
import { bytecode } from '@/utils/artifacts/contracts/Base.sol/Base.json';
import artifacts from '@/utils/artifacts/contracts/ContractFactory.sol/ContractFactory.json';
import { encoder, create2Address } from '@/utils/create2';
import HttpException from '@/utils/exceptions/http.exception';
import "dotenv/config";

const { API_URL_GOERLI, API_URL_SEPOLIA, API_URL_MUMBAI, API_URL_SCROLL_SEPOLIA, PRIVATE_KEY, FACTORY_ADDRESS } = process.env;
        
export const precomputedContract = async (ownerAddress: string, salt: string): Promise<string> => {
    try {
        const initCode = bytecode + await encoder(["address"], [ownerAddress]);
        const create2Addr = await create2Address(FACTORY_ADDRESS as string, salt, initCode);
        return create2Addr;
    } catch (error: any) {
        console.error(error, 'Cannot create precomputed address');
        throw new HttpException(400, error.message);
    }
}

export const deployContract = async (ownerAddress: string, salt: string, network: string): Promise<string> => {
    try {
        let provider;
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

        const providerNetwork = await provider.getNetwork();
        if (network != providerNetwork.chainId.toString()) {
            throw new Error('Error getting network name');
        }

        const Wallet = new ethers.Wallet(PRIVATE_KEY as string, provider);
        const initCode = bytecode + await encoder(["address"], [ownerAddress]);
        const Factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, Wallet);
        const factory = Factory.attach(FACTORY_ADDRESS as string);
        const deploy = await factory.deploy(initCode, salt);
        const txReceipt = await deploy.wait();
        console.log(txReceipt);
        const txReceiptData = txReceipt.events[0].data;
        const contractAddress = txReceiptData.replace(/^0x0*/, '0x');
        console.log(contractAddress)
        // return `${txReceipt.events[0].args[0]}`;
        return contractAddress;
    } catch (error: any) {
        console.error(error.message)
        throw new HttpException(400, error.message);
    }
}

export default { precomputedContract, deployContract };