import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SendService from '@/resources/send/send.service';
import "dotenv/config";

class SendController implements Controller {
    public path = "/send";
    public router = Router();
    private SendService = new SendService();

    // constructor() {
    //     this.initialiseRoutes();
    // }

    // private initialiseRoutes(): void {
    //     this.router.post(
    //         `${this.path}/eth-via-emailaddress`,
    //         this.ethViaEmailAddress,   
    //     )
    // }

    // private ethViaEmailAddress = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    //     const { network, emailAddress, amount} = req.body;
    //     const data = await this.SendService.sendEthViaEmailAddress(network, emailAddress, amount);
    //     res.status(200).json({ data });
    // }
}

export default SendController;