import { precomputedContract, deployContract } from '@/middleware/deployContract.middleware';
import { accessTokenCookieOptions, refreshTokenCookieOptions } from '@/utils/cookieOptions';
import { IGoogleUser, InitConfig } from '@/resources/googleOauth/googleOauth.interface';
import GoogleOAuthService from '@/resources/googleOauth/googleOauth.service';
import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import { verifyMessage } from '@/middleware/verify.middleware';
import HttpException from '@/utils/exceptions/http.exception';
import { signMessage } from '@/middleware/sign.middleware';
import { getPrivateKey, getWalletAddress } from '@/utils/credentials';
import { signJwt } from '@/utils/token';
import { ethers } from 'ethers';
import axios from 'axios';
import { contract } from 'web3/lib/commonjs/eth.exports';

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

        this.router.post(
            `${this.path}/oauth/deploy-contract`,
            this.confirmDeployment,
            this.deployContract
        )

        this.router.post(
            `${this.path}/get-wallet-recovery-key`,
            this.getWalletRecoveryKey,
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
            const ownerAddress = await getWalletAddress(this.user.email);
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

    private confirmDeployment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log('Request for smart account creation accepted.')
            console.log('Starting signing the message...');
            const walletAddress = await getWalletAddress(this.user.email.toString());
            const signature = await signMessage(this.user.email, walletAddress, process.env.API_URL_GOERLI as string, process.env.FACTORY_ADDRESS as string, 5, "deploy account");
            console.log('Starting to verify the signature...')
            const result = await verifyMessage(process.env.API_URL_GOERLI as string, walletAddress, signature.message as string, signature.v, signature.r, signature.s);
            if (result) {
                next()
            } else {
                res.status(401).json({ message: "Message verification failed" });
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    private deployContract = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            console.log('Starting to deploy the contract...')
            const { network } = req.body;

            if (!this.user.verified_email) {
                next(new HttpException(403, 'Google account is not verified'));
            }
            
            console.log('Initialization of config for the wallet address...');
            const salt = ethers.utils.id(this.user.id).toString();
            const ownerAddress = await getWalletAddress(this.user.email);
            const ownerKey = await getPrivateKey(this.user.email);
            const contractAddress = await deployContract(ownerAddress, ownerKey.substring(2), salt, network)
            console.log(`Contract succeffuly deployed to ${network} network.`);
            console.log(`Contract address: ${contractAddress}`)
              
            const data = {
                contractAddress: contractAddress.toString(),
                args: [ownerAddress.toString()],
                network: network.toString()
            }

            console.log(`Contract verification started...`)
            setTimeout(async () => {
                await axios.post('http://localhost:2019/api/verification/verify-contract', data)
                    .catch((error) => {
                        console.error('Error:', error)
                    })
            }, 60000)

            res.status(200).send(contractAddress);
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }

    private getWalletRecoveryKey = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const recoveryKey = await getPrivateKey(this.user.email);
            res.status(200).send(recoveryKey);
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }
}

export default GoogleAuthController;