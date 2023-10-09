import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import GoogleOAuthService from '@/resources/googleOauth/googleOauth.service';
import HttpException from '@/utils/exceptions/http.exception';
import { InitConfig } from '@/resources/googleOauth/googleOauth.interface';
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { sha256 } from 'ethereum-cryptography/sha256';
import { ethers } from 'ethers';
import fs from 'fs/promises';
import path from 'path';

class GoogleAuthController implements Controller {
    public path = '/oauth';
    public router = Router();
    private GoogleOauthService = new GoogleOAuthService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}/google/login`,
            this.googleOauthRequest,
        )
    }

    private googleOauthRequest = async (req: Request, res: Response, next: NextFunction): Promise<InitConfig | void> => {
        try {
            const code = req.query.code as string;
            const { id_token, access_token } = await this.GoogleOauthService.getGoogleOAuthTokens({ code });
            const googleUser = await this.GoogleOauthService.getGoogleUser({ id_token, access_token });

            if (!googleUser.verified_email) {
                next(new HttpException(403, 'Google account is not verified'));
                return;
            }

            const init_config = {
                salt: ethers.utils.id(googleUser.id).toString(),
                owner: new ethers.Wallet(sha256(utf8ToBytes(googleUser.toString()))).address.toString()
            }

            res.status(200).send(init_config).redirect(`${process.env.ORIGIN as string}/dashboard`);
            return init_config;
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }
}

export default GoogleAuthController;