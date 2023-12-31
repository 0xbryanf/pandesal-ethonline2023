import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import GoogleAuthController from '@/resources/googleOauth/googleOauth.controller';
import APIController from '@/resources/api/api.controller';
import SendController from '@/resources/send/send.controller';

validateEnv();
const app = new App([
    new GoogleAuthController(),
    new APIController(),
    new SendController(),
], Number(process.env.PORT))
app.listen();