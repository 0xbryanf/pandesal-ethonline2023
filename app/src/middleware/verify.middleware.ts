import Web3 from 'web3';
import { IProposal } from '@/utils/interfaces/IProposal.interface';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { hexToBytes, bytesToHex } from 'ethereum-cryptography/utils';

export async function verifyMessage(
    provider_url: string,
    owner: string,
    digest: string,
    v: string,
    r: string,
    s: string
): Promise<boolean> {
    try {
        const web3 = new Web3(provider_url);
        const signerAddress = web3.eth.accounts.recover(digest, v, r, s);
        if (signerAddress === owner) {
            console.log('Signature has been verified and is true.')
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function verifyProposal(proposals: IProposal[], provider_url: string ): Promise<string[]> {
    const web3 = new Web3(provider_url);
    const to = proposals[0].to;
    const data = proposals[0].data;
    const value = proposals[0].value;
    const nonce = proposals[0].nonce;
    
    if (proposals.length === 0) {
        throw Error("No proosals to compare.")
    }

    for (const proposal of proposals) {
        if (proposal.to !== to && proposal.data !== data && proposal.value !== value && proposal.nonce !== nonce) {
            throw Error('Error: Proposals are not the same.');
        }
    }

    const results = await Promise.all(
        proposals.map(async (proposal) => {
            const digest: string = proposal.message.message!;
            const v = proposal.message.v;
            const r = proposal.message.r;
            const s = proposal.message.s;
            const address = web3.eth.accounts.recover(digest, v, r, s);
            return address;
        })
    )

    return results;
    
}

export function verifyProof(proof: any[], leaf: string, root: string): boolean {
    const concat = (left: Buffer, right: Buffer): any => keccak256(Buffer.concat([left, right]));
    
    proof = proof.map(({ data, left }) => ({
        left,
        data: hexToBytes(data),
    }))
    let data: any = keccak256(Buffer.from(leaf));
    
    for (let i = 0; i < proof.length; i++) {
        if (proof[i].left) {
            data = concat(proof[i].data, data);
        } else {
            data = concat(data, proof[i].data);
        }
    }
    return bytesToHex(data) === root;
}

export default { verifyMessage, verifyProposal, verifyProof };
