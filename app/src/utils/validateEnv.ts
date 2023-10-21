import { cleanEnv, str, num } from 'envalid';

function configEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        PORT: str(),
        ORIGIN: str(),
        SALTWORKFACTOR: num(),
        JWT_SECRET: str(),
        GOOGLE_CLIENT_SECRET: str(),
        GOOGLE_CLIENT_ID: str(),
        GOOGLE_REDIRECT_URL: str(),
        API_URL_GOERLI: str(),
        API_URL_SEPOLIA: str(),
        API_URL_MUMBAI: str(),
        SAFE_1: str(),
        SAFE_2: str(),
        SAFE_3: str(),
        SAFE_ADDRESS: str(),
        GELATO_RELAY_API_KEY: str(),
        FACTORY_ADDRESS: str(),
        RELAYER_ADDRESS: str(),
        EXECUTOR: str()
    })
}

export default configEnv;
