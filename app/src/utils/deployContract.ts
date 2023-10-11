import { ethers } from 'ethers';
import { bytecode } from '@/utils/artifacts/Base.json';
import output from '@/utils/artifacts/ContractFactory.json';
import { encoder, create2Address } from '@/utils/create2';

const ABI = output.abi;
const factoryBytecode = output.bytecode;

const { API_URL_GOERLI, API_URL_SEPOLIA, API_URL_MUMBAI, PRIVATE_KEY } = process.env;

export const deployGoerliContract = async (ownerAddress: string, salt: string): Promise<string> => {
    const factoryAddress = "0xbbb4A6D7E5096554A8b91c414af2f483Cc1f0707";
    const initCode = bytecode + await encoder(["address"], [ownerAddress]);

    const create2Addr = await create2Address(factoryAddress, salt, initCode);
    return create2Addr;
}