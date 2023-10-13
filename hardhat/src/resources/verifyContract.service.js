const { exec } = require('node:child_process');

class VerifyContractService {
    async verifyContract(contractAddress, args, network) {
        const command = `npx hardhat verify --network ${network} ${contractAddress} ${args}`;
        try {
            console.log(`Verifying contract on network: ${network}`);
            
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error}`);
                    return;
                }
                console.log(stdout);
                return stdout
            })
        } catch (error) {
            if (error.message.toLowerCase().includes("already verified")) {
                console.log("Already verified!");
            } else {
                console.error(error);
            }
        }
    }
}

module.exports = VerifyContractService;