import ISignResult from "./ISignresult.interface";

export interface IProposal {
    to: string;
    data: string;
    value: string;
    message: ISignResult;
    nonce: number;
}