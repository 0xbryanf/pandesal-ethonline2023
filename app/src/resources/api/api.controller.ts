import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import APIService from '@/resources/api/api.service';

class APIController implements Controller {
    public path = '/etherscan'
    public router = Router();
    private APIService = new APIService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/goerli-contract-exec.status`,
            this.getContractExecStatus,
        )
    }

    // Goerli - Transactions: Check Contract Execution Status
    private getContractExecStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { contractAddress, network } = req.body;
            const data = await this.APIService.getContractExecutionStatus(contractAddress, network);
            res.status(200).json({ data });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default APIController;