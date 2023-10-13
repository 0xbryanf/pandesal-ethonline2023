const { Router } = require('express');
const VerifyContractService = require('./verifyContract.service');

class VerifyContractController {
    constructor() {
        this.path = '/verification';
        this.router = Router();
        this.VerifyContractService = new VerifyContractService();
        this.initialiseRoutes();
    }

    initialiseRoutes() {
        this.router.post(
            `${this.path}/verify-contract`,
            this.goerliContract
        )
    }

    goerliContract = async (req, res, next) => {
        try {
            const { contractAddress, args, network } = req.body;
            const response = await this.VerifyContractService.verifyContract(contractAddress, args, network);
            res.status(200).send(response);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = VerifyContractController;