import { ethers } from "ethers";
import { keccak256, hexConcat } from 'ethers/lib/utils';

export const encoder = async (types: string[], values: string[]): Promise<string> => {
    const abiCoder = ethers.utils.defaultAbiCoder;
    const encodedParams = abiCoder.encode(types, values);
    return encodedParams.slice(2);
}

export const create2Address = async (factoryAddress: string, salt: string, initCode: string): Promise<string> => {
    return '0x' + keccak256(hexConcat([
        '0xff',
        factoryAddress,
        salt,
        ethers.utils.keccak256(initCode)
    ])).slice(-40)
}

export default { encoder, create2Address };
