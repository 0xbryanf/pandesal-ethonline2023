interface ISignResult {
    message?: string | undefined;
    messageHash: string;
    v: string;
    r: string;
    s: string;
    signature: string;
}

export default ISignResult;