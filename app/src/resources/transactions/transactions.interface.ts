export interface GoerliApiParams {
    module: string;
    action: string;
    address: string;
    startblock: number;
    endblock: number;
    page: number;
    offset: number;
    sort: string;
    apiKey: string;
}

export interface TxList {
    hash: string;
}