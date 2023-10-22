import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SendService from '@/resources/send/send.service';
import "dotenv/config";

class SendController implements Controller {
    public path = "/send";
    public router = Router();
    private SendService = new SendService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/eth-via-emailaddress`,
            this.ethViaEmailAddress,   
        )
    }

    private ethViaEmailAddress = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const { emailAddress, network } = req.body;
        const response = await this.SendService.sendEthViaEmailAddress(emailAddress, network);
    }
    
}

export default SendController;