import { GoerliContractExecStatus } from '@/resources/api/api.interface';
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
            
            const params: GoerliContractExecStatus = {
                module: 'contract',
                action: 'getabi',
                address: contractAddress,
                apiKey: API_Key,
            }
            const response: AxiosResponse = await axios.get(API_Url, { params })
            return response.status;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(500, 'Unable to get transactions.')
        }
    }
}

export default APIService;