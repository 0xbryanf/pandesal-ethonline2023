import Web3 from 'web3';

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
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default verifyMessage;