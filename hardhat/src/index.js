require('dotenv').config();
const App = require('./app');
const VerifyContractController = require('./resources/verifyContract.controller');

const app = new App([new VerifyContractController()], Number(process.env.PORT || 2023));
app.listen();
