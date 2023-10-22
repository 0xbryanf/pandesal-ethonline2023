export interface ContractExecStatus {
    module: string;
    action: string;
    address: string;
    apiKey: string;
}

export interface EthBalanceSingleAddress {
    module: string;
    action: string;
    address: string;
    tag: string;
    apiKey: string;
}

export interface EthLastPrice {
    module: string;
    action: string;
    apiKey: string;
}