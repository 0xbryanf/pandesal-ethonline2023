import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import TransactionService from '@/resources/transactions/transactions.service';

class TransactionController implements Controller {
    public path = '/transactions';
    public router = Router();
    private TransactionsService = new TransactionService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/goerli-transactions`,
            this.getGoerliTransactions
        )
    }

    private getGoerliTransactions = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { address } = req.body;
            const data = await this.TransactionsService.getGoerliTransactions(address);
            res.status(200).json( data );
        } catch (error: any) {
            console.error(error, 'Failed to get goerli transactions');
            throw new HttpException(400, error.message);
        }
    }
}

export default TransactionController;