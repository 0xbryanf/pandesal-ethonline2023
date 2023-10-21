import { GoerliContractExecStatus } from '@/resources/api/api.interface';
import HttpException from "@/utils/exceptions/http.exception";
import axios, { AxiosResponse } from 'axios';
import { ethers } from 'ethers';
import "dotenv/config";

const { API_MAINNET_ETHERSCAN_KEY } = process.env;

class APIService {
    public async getContractExecutionStatus(contractAddress: string): Promise<string> {
        try {
            const params: GoerliContractExecStatus = {
                module: 'contract',
                action: 'getabi',
                address: contractAddress,
                apiKey: API_MAINNET_ETHERSCAN_KEY as string,
            }
            const response: AxiosResponse = await axios.get('https://api-goerli.etherscan.io/api', { params })
            return response.data.message;
        } catch (error: any) {
            console.log(error.message)
            throw new HttpException(500, 'Unable to get transactions.')
        }
    }
}

export default APIService;