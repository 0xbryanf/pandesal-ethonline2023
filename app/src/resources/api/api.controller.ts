import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import APIService from '@/resources/api/api.service';
import "dotenv/config";

class APIController implements Controller {
    public path = '/etherscan'
    public router = Router();
    private APIService = new APIService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/get-contract-exec-status`,
            this.getContractExecStatus,
        )

        this.router.post(
            `${this.path}/get-ethbalance-single-address`,
            this.getEthBalanceSingleAddress,
        )

        this.router.post(
            `${this.path}/get-eth-last-price`,
            this.getEthLastPrice,
        )

        this.router.post(
            `${this.path}/get-eth-total-supply`,
            this.getEthTotalSupply,
        )

    }

    // Transactions: Check Contract Execution Status
    private getContractExecStatus = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { contractAddress, network } = req.body;
            const data = await this.APIService.getContractExecutionStatus(contractAddress, network);
            res.status(200).json({ data });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    // Account: Get Ether Balance for a Single Address
    private getEthBalanceSingleAddress = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { address, network } = req.body;
            const data = await this.APIService.getEthBalanceSingleAddress(address, network);
            res.status(200).json({ data });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private getEthLastPrice = async (req: Request, res: Response, next: NextFunction): Promise<Request | void> => {
        try {
            const { network } = req.body;
            const data = await this.APIService.getEthLastPrice(network);
            res.status(200).json({ data });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private getEthTotalSupply = async (req: Request, res: Response, next: NextFunction): Promise<Request | void> => {
        try {
            const { network } = req.body;
            const data = await this.APIService.getEthTotalSupply(network);
            res.status(200).json({ data });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

}

export default APIController;