import { GoerliApiParams, TxList } from '@/resources/transactions/transactions.interface';
import HttpException from '@/utils/exceptions/http.exception';
import axios, { AxiosResponse } from 'axios';

class TransactionService {
    public async getGoerliTransactions(address: string): Promise<string[] | Error> {
        try {
            const params: GoerliApiParams = {
                module: 'account',
                action: 'txlistinternal',
                address,
                startblock: 0,
                endblock: 99999999,
                page: 1,
                offset: 10,
                sort: 'asc',
                apiKey: process.env.API_KEY as string,
            }

            const response: AxiosResponse = await axios.get('https://api-goerli.etherscan.io/api', { params });
            if (response.data.status === '1') {
                const transactions: TxList[] = response.data.result;
                const formatedTransactions: string[] = transactions.map((transaction: TxList) => {
                    return transaction.hash
                })
                return formatedTransactions;
            } else {
                throw new Error(`Error: ${response.data.message}`);
            }
        } catch (error: any) {
            console.error(error, 'Failed to fetch goerli transactions');
            throw new HttpException(400, error.message);
        }
    }
}

export default TransactionService;