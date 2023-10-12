import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import GoogleOAuthService from '@/resources/googleOauth/googleOauth.service';
import HttpException from '@/utils/exceptions/http.exception';
import { IGoogleUser, InitConfig } from '@/resources/googleOauth/googleOauth.interface';
import { signJwt } from '@/utils/token';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from '@/utils/cookieOptions';
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { sha256 } from 'ethereum-cryptography/sha256';
import { ethers } from 'ethers';
import { deployGoerliContract } from '@/utils/deployContract';

class GoogleAuthController implements Controller {
    public path = '/services';
    public router = Router();
    private GoogleOauthService = new GoogleOAuthService();
    private user!: IGoogleUser;

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}/oauth/google`,
            this.googleOauthRequest,
        )

        this.router.get(
            `${this.path}/oauth/initConfig`,
            this.getInitConfig
        )
    }

    private googleOauthRequest = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const code = req.query.code as string;
            const { id_token, access_token } = await this.GoogleOauthService.getGoogleOAuthTokens({ code });
            const googleUser = await this.GoogleOauthService.getGoogleUser({ id_token, access_token });

            this.user = googleUser;

            if (!googleUser.verified_email) {
                next(new HttpException(403, 'Google account is not verified'));
                return;
            }

            const signedAccessToken = signJwt(
                { session: googleUser.id },
                {expiresIn: '1d'}
            )

            const signedRefreshToken = signJwt(
                { session: googleUser.id },
                { expiresIn: '1d' }
            )

            res.cookie("accessToken", signedAccessToken, accessTokenCookieOptions);
            res.cookie("refreshToken", signedRefreshToken, refreshTokenCookieOptions);
            res.status(200).redirect(`${process.env.ORIGIN as string}/dashboard`);
            
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }

    private getInitConfig = async (req: Request, res: Response, next: NextFunction): Promise<InitConfig | void> => {
        try {
            if (!this.user.verified_email) {
                next(new HttpException(403, 'Google account is not verified'));
                return;
            }

            const salt = ethers.utils.id(this.user.id).toString();
            const ownerAddress = new ethers.Wallet(sha256(utf8ToBytes(this.user.email))).address.toString()
            const contractAddress = await deployGoerliContract(ownerAddress, salt);

            const initConfig = {
                email: this.user.email,
                wallet: ownerAddress,
                contract: contractAddress
            }
            
            res.status(200).send(initConfig);
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }
}

export default GoogleAuthController;