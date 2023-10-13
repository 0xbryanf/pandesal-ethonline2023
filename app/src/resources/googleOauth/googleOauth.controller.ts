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
import { precomputedContract, deployGoerliContract } from '@/utils/deployContract';
import axios from 'axios';

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
            `${this.path}/oauth/get-account`,
            this.getAccount
        )

        this.router.get(
            `${this.path}/oauth/deploy-goerli-contract`,
            this.goerliContract
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

    private getAccount = async (req: Request, res: Response, next: NextFunction): Promise<InitConfig | void> => {
        try {
            if (!this.user.verified_email) {
                next(new HttpException(403, 'Google account is not verified'));
                return;
            }

            const salt = ethers.utils.id(this.user.id).toString();
            const ownerAddress = new ethers.Wallet(sha256(utf8ToBytes(this.user.email))).address.toString()
            const contractAddress = await precomputedContract(ownerAddress, salt);

            const initConfig = {
                email: this.user.email,
                wallet: ownerAddress,
                contract: contractAddress
            }
            
            res.status(200).send(initConfig);
        } catch (error: any) {
            console.error(error, 'Cannot get account');
            next(new HttpException(400, error.message))
        }
    }

    private goerliContract = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            if (!this.user.verified_email) {
                next(new HttpException(403, 'Google account is not verified'));
                return;
            }

            console.log('Initiating deployment to goerli network...')
            const salt = ethers.utils.id(this.user.id).toString();
            const ownerAddress = new ethers.Wallet(sha256(utf8ToBytes(this.user.email))).address.toString()
            const goerliContractAddress = await deployGoerliContract(ownerAddress, salt)
            console.log(`Contract succeffuly deployed to goerli network.`);
            console.log(`Contract deployed to address: ${goerliContractAddress}`)
            res.status(200).send(goerliContractAddress);
            
            console.log(`Contract verification initiated..`)
            const data = {
                contractAddress: goerliContractAddress.toString(),
                args: [ownerAddress.toString()],
                network: 'goerli'
            }

            setTimeout(async () => {
                await axios.post('http://localhost:2019/api/verification/goerli-contract', data)
                    .catch((error) => {
                        console.error('Error:', error)
                    })
            }, 60000)
            
        } catch (error: any) {
            console.error(error, 'Cannot get account');
            next(new HttpException(400, error.message))
        }
    }
}

export default GoogleAuthController;