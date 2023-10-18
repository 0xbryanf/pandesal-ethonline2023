import { ethers } from 'ethers';
import { bytecode } from '@/utils/artifacts/contracts/Base.sol/Base.json';
import artifacts from '@/utils/artifacts/contracts/ContractFactory.sol/ContractFactory.json';
import { encoder, create2Address } from '@/utils/create2';
import HttpException from '@/utils/exceptions/http.exception';
import { estimateGas } from '@/middleware/gas.middleware';
import { mutliSigTransaction } from '@/middleware/safe.middleware';
import { proposal } from '@/middleware/proposal.middleware';

import "dotenv/config";
import { IProposal } from '@/utils/interfaces/IProposal.interface';
import { verifyProposal } from './verify.middleware';

const { API_URL_GOERLI, API_URL_SEPOLIA, API_URL_MUMBAI, API_URL_SCROLL_SEPOLIA, PRIVATE_KEY, FACTORY_ADDRESS } = process.env;
        
export const precomputedContract = async (ownerAddress: string, salt: string): Promise<string> => {
    try {
        const initCode = bytecode + await encoder(["address"], [ownerAddress]);
        return await create2Address(FACTORY_ADDRESS as string, salt, initCode);
    } catch (error: any) {
        console.error(error, 'Cannot create precomputed address');
        throw new HttpException(400, error.message);
    }
}

export const deployContract = async (ownerAddress: string, salt: string, network: string): Promise<string> => {
    console.log(`Deployment of contract initiated to network ${network}`);
    try {
        let provider;
        let success;
        let contractAddress: string = "";
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
        
        //Estimate the gas price and gasLimit first
        console.log('Starting to estimate gas for transaction.');
        const gasLimit = await estimateGas(ownerAddress, FACTORY_ADDRESS as string, artifacts.abi, [initCode, salt]);

        console.log('Gas successfully estimated.')
        console.log('Starting to create safe multiSigTransaction...')

        if (network === '5') {
            success = await mutliSigTransaction(providerNetwork.chainId.toString(), ethers.utils.formatUnits(gasLimit.finalizedGasLimit.number, 'ether').toString(), ownerAddress, '0x');
        } else if (network === '11155111' || network === '534351' || network === '80001') {
            const proposals: IProposal[] = await proposal(providerNetwork.chainId.toString(), ethers.utils.formatUnits(gasLimit.finalizedGasLimit.number, 'ether').toString(), ownerAddress, "0x")
            const results = await verifyProposal(proposals, provider.connection.url);
            console.log(results);
            const leafHashes = results.map((result) => {
                return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(result));
            })
            console.log(leafHashes);
            
        }
        
        if (success) {
            const deploy = await factory.deploy(initCode, salt);
            const txReceipt = await deploy.wait();
            contractAddress = `${txReceipt.events[0].args[0]}`;
        }
        
        return contractAddress;
        
    } catch (error: any) {
        console.error(error.message)
        throw new HttpException(400, error.message);
    }
}

export default { precomputedContract, deployContract };