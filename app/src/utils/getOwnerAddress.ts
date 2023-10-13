import { utf8ToBytes } from "ethereum-cryptography/utils";
import { sha256 } from 'ethereum-cryptography/sha256';
import { ethers } from 'ethers';

const getOwnerAddress = async (email: string): Promise<string> => {
    const bytes = utf8ToBytes(email);
    const hash = sha256(bytes);
    const address = new ethers.Wallet(hash);
    return `${address.address}`;
}

export default getOwnerAddress;