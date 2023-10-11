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
        GOOGLE_REDIRECT_URL: str()
    })
}

export default configEnv;
