import { ethers } from 'ethers';
import { sha256 } from 'ethers/lib/utils';
import { hexlify, toUtf8Bytes } from 'ethers/lib/utils'
import { numericString, salt } from '@/utils/nonce';

export const getPrivateKey = async (email: string): Promise<string> => {
    const hash = sha256(toUtf8Bytes(salt(numericString(email)).toString()));
    const privateKey = hexlify(hash);
    return privateKey;
}

export const getWalletAddress = async (email: string): Promise<string> => {
    const privateKey = await getPrivateKey(email);
    const wallet = new ethers.Wallet(privateKey);
    return wallet.address
}

export const getPublicKey = async (email: string): Promise<string> => {
    const privateKey = await getPrivateKey(email);
    const wallet = new ethers.Wallet(privateKey);
    return wallet.publicKey;
}


export default {getPrivateKey, getWalletAddress, getPublicKey};