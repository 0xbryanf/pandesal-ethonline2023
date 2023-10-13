import { ethers } from 'ethers';
import { bytecode } from '@/utils/artifacts/contracts/Base.sol/Base.json';
import output from '@/utils/artifacts/contracts/ContractFactory.sol/ContractFactory.json';
import { encoder, create2Address } from '@/utils/create2';
import HttpException from '@/utils/exceptions/http.exception';
import "dotenv/config";

const ABI = output.abi;
const factoryBytecode = output.bytecode;

const { API_URL_GOERLI, API_URL_SEPOLIA, API_URL_MUMBAI, PRIVATE_KEY, FACTORY_ADDRESS } = process.env;
        
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

export const deployGoerliContract = async (ownerAddress: string, salt: string): Promise<string> => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(API_URL_GOERLI as string);
        const Wallet = new ethers.Wallet(PRIVATE_KEY as string, provider);
        const initCode = bytecode + await encoder(["address"], [ownerAddress]);
        const Factory = new ethers.ContractFactory(ABI, factoryBytecode, Wallet);
        const factory = Factory.attach(FACTORY_ADDRESS as string);
        const goerliDeploy = await factory.deploy(initCode, salt);
        console.log('Waiting for deployment to finalize...')

        const goerliTxReceipt = await goerliDeploy.wait();
        return `${goerliTxReceipt.events[0].args[0]}`;
    } catch (error: any) {
        console.error(error, 'Cannot deploy contract to goerli');
        throw new HttpException(400, error.message);
    }
}

export default { precomputedContract, deployGoerliContract };