import ISignResult from "@/utils/interfaces/ISignresult.interface";
import { msg712Domain } from "@/utils/msg712Domain";
import { getPrivateKey } from '@/utils/credentials';
import { ethers } from 'ethers';
import Web3 from 'web3';

export async function signMessage(
    email: string,
    walletAddress: string,
    provider_url: string,
    verifyingContract: string,
    chainId: number,
    context: string
): Promise<ISignResult> {
    const expiration = getExpiration()
    const msg = msg712Domain(verifyingContract, walletAddress, chainId, context, expiration);
    const privateKey = await getPrivateKey(email);
    const web3 = new Web3(provider_url);
    const digest = web3.eth.accounts.hashMessage(msg);
    const signature = web3.eth.accounts.sign(digest, privateKey);
    console.log('Signature was created, ready for verification...')
    return signature;
}

export function getExpiration(): number {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTime = currentTimestamp + 300; // 300 seconds in 5 minutes
    return expirationTime;
}

export async function signTransaction(
    provider_url: string,
    walletAddress: string,
    verifyingContract: string,
    chainId: number,
    context: string,
    wallet: ethers.Wallet,
): Promise<ISignResult> {
    const expiration = getExpiration();
    const msg = msg712Domain(verifyingContract, walletAddress, chainId, context, expiration);
    const web3 = new Web3(provider_url);
    const digest = web3.eth.accounts.hashMessage(msg);
    const signature = web3.eth.accounts.sign(digest, wallet.privateKey);
    console.log('Signature was created, ready for verification...')
    return signature;
}

export default { signMessage, getExpiration, signTransaction };