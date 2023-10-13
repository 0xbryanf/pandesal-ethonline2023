import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import GoogleAuthController from '@/resources/googleOauth/googleOauth.controller';
import TransactionController from '@/resources/transactions/transactions.controller';

validateEnv();
const app = new App([new GoogleAuthController(), new TransactionController()],Number(process.env.PORT))
app.listen();