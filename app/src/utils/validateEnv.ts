import { cleanEnv, str, num } from 'envalid';

function configEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        PORT: str(),
    })
}

export default configEnv;
