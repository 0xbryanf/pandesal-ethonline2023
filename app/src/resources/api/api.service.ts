import { ContractExecStatus, EthBalanceSingleAddress, EthLastPrice } from '@/resources/api/api.interface';
import HttpException from "@/utils/exceptions/http.exception";
import axios, { AxiosResponse } from 'axios';
import { ethers } from 'ethers';
import "dotenv/config";

const { API_MAINNET_ETHERSCAN_KEY, API_MUMBAI_ETHERSCAN_KEY, API_SCROLL_SEPOLIA_ETHERSCAN_KEY} = process.env;

class APIService {
    public async getContractExecutionStatus(contractAddress: string, network: string): Promise<number> {
        try {
            let API_Url: string = "";
            let API_Key: string = "";
            switch (network) {
                case '5':
                    API_Key = API_MAINNET_ETHERSCAN_KEY as string;
                    API_Url = 'https://api-goerli.etherscan.io/api';
                    break;
                case '11155111':
                    API_Key = API_MAINNET_ETHERSCAN_KEY as string;
                    API_Url = 'https://api-sepolia.etherscan.io/api';
                    break;
                case '80001':
                    API_Key = API_MUMBAI_ETHERSCAN_KEY as string;
                    API_Url = 'https://api.polygonscan.com/api';
                    break;
                case '534351':
                    API_Key = API_SCROLL_SEPOLIA_ETHERSCAN_KEY as string;
                    API_Url = "https://sepolia-blockscout.scroll.io/api"
                    break;
                default:
                    throw new Error('Unsupported network');
            }
            
            const params: ContractExecStatus = {
                module: 'contract',
                action: 'getabi',
                address: contractAddress,
                apiKey: API_Key,
            }
            const response: AxiosResponse = await axios.get(API_Url, { params })
            return response.data.status.toString();
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(500, 'Unable to get transactions.')
        }
    }

    public async getEthBalanceSingleAddress(address: string, network: string): Promise<any> {
        try {
            let API_Url: string = "";
            let API_Key: string = "";
            switch (network) {
                case '5':
                    API_Key = API_MAINNET_ETHERSCAN_KEY as string;
                    API_Url = 'https://api-goerli.etherscan.io/api';
                    break;
                case '11155111':
                    API_Key = API_MAINNET_ETHERSCAN_KEY as string;
                    API_Url = 'https://api-sepolia.etherscan.io/api';
                    break;
                case '80001':
                    API_Key = API_MUMBAI_ETHERSCAN_KEY as string;
                    API_Url = 'https://api.polygonscan.com/api';
                    break;
                case '534351':
                    API_Key = API_SCROLL_SEPOLIA_ETHERSCAN_KEY as string;
                    API_Url = "https://sepolia-blockscout.scroll.io/api"
                    break;
                default:
                    throw new Error('Unsupported network');
            }
            const params: EthBalanceSingleAddress = {
                module: 'account',
                action: 'balance',
                address: address,
                tag: 'latest',
                apiKey: API_Key
            }

            const response: AxiosResponse = await axios.get(API_Url, { params });
            return response;
            // if (response.data.status === '1') {
            //     return `${ethers.utils.formatEther(response.data.result)}`
            // } else {
            //     throw new Error(`Error: ${response.data.message}`);
            // }
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(500, 'Unable to get balance.')
        }
    }

    public async getEthLastPrice(network: string): Promise<string> {
        try {
            let API_Url: string = "";
            let API_Key: string = "";
            switch (network) {
                case '5':
                    API_Key = API_MAINNET_ETHERSCAN_KEY as string;
                    API_Url = 'https://api-goerli.etherscan.io/api';
                    break;
                case '11155111':
                    API_Key = API_MAINNET_ETHERSCAN_KEY as string;
                    API_Url = 'https://api-sepolia.etherscan.io/api';
                    break;
                case '80001':
                    API_Key = API_MUMBAI_ETHERSCAN_KEY as string;
                    API_Url = 'https://api.polygonscan.com/api';
                    break;
                case '534351':
                    API_Key = API_SCROLL_SEPOLIA_ETHERSCAN_KEY as string;
                    API_Url = "https://sepolia-blockscout.scroll.io/api"
                    break;
                default:
                    throw new Error('Unsupported network');
            }
            const params: EthLastPrice = {
                module: 'stats',
                action: 'ethprice',
                apiKey: API_Key
            }
            const response: AxiosResponse = await axios.get(API_Url, { params });
            return `${response.data.result.ethusd}`
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(500, 'Unable to get balance.')
        }
    }

    public async getEthTotalSupply(network: string): Promise<string> {
        try {
            let API_Url: string = "";
            let API_Key: string = "";
            switch (network) {
                case '5':
                    API_Key = API_MAINNET_ETHERSCAN_KEY as string;
                    API_Url = 'https://api-goerli.etherscan.io/api';
                    break;
                case '11155111':
                    API_Key = API_MAINNET_ETHERSCAN_KEY as string;
                    API_Url = 'https://api-sepolia.etherscan.io/api';
                    break;
                case '80001':
                    API_Key = API_MUMBAI_ETHERSCAN_KEY as string;
                    API_Url = 'https://api.polygonscan.com/api';
                    break;
                case '534351':
                    API_Key = API_SCROLL_SEPOLIA_ETHERSCAN_KEY as string;
                    API_Url = "https://sepolia-blockscout.scroll.io/api"
                    break;
                default:
                    throw new Error('Unsupported network');
            }
            const params: EthLastPrice = {
                module: 'stats',
                action: 'ethsupply',
                apiKey: API_Key
            }
            const response: AxiosResponse = await axios.get(API_Url, { params });
            if (response.data.status === '1') {
                return `${ethers.utils.formatEther(response.data.result)}`
            } else {
                throw new Error(`Error: ${response.data.message}`);
            }
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(500, 'Unable to get balance.')
        }
    }
}

export default APIService;