export const msg712Domain = (verifyingContract: string, from: string, chainId: number, context: string, expiration: number): string => {
    return JSON.stringify({
        types: {
            Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
            ],
            Message: [
                { name: 'from', type: 'string' },
                { name: 'context', type: 'string' },
                { name: 'deadline', type: 'uint' },
            ],
        },
        primaryType: 'Message',
        domain: {
            name: 'EIP712 Domain',
            version: '1',
            chainId,
            verifyingContract,
        },
        message: {
            from,
            context,
            expiration,
        }
    });
}