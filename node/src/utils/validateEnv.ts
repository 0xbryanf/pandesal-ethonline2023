import { cleanEnv, str } from 'envalid';

function configEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        PORT: str(),
        API_URL_GOERLI: str(),
        API_URL_SEPOLIA: str(),
        API_URL_MUMBAI: str(),
        API_URL_SCROLL_SEPOLIA: str(),
        INFURA_URL_GOERLI: str(),
        INFURA_URL_SEPOLIA: str(),
        INFURA_URL_MUMBAI: str(),
        API_MAINNET_ETHERSCAN_KEY: str(),
        API_MUMBAI_ETHERSCAN_KEY: str(),
        API_SCROLL_SEPOLIA_ETHERSCAN_KEY: str(),
        PRIVATE_KEY_FACTORY_ADDRESS: str(),
        PRIVATE_KEY_RELAYER_ADDRESS: str(),
    })
}

export default configEnv;
