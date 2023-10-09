import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import GoogleAuthController from '@/resources/googleOauth/googleOauth.controller';

validateEnv();
const app = new App([new GoogleAuthController()],Number(process.env.PORT))
app.listen();