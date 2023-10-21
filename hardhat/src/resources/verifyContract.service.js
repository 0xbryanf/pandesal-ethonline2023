const { exec } = require('node:child_process');

class VerifyContractService {
    async verifyContract(contractAddress, args, network) {
        let networkName = "";
        switch (network) {
            case '5':
                console.log(network);
                networkName = "goerli";
                break;
            case '11155111':
                console.log(network);
                networkName = "sepolia";
                break;
            case '80001':
                console.log(network);
                networkName = "maticmum";
                break;
            case '534351':
                console.log(network);
                networkName = "scrollSepolia";
                break;
            default:
                throw new Error('Unsupported network');
        }

        const command = `npx hardhat verify --network ${networkName} ${contractAddress} ${args}`;
        try {
            console.log(`Verifying contract on network: ${networkName}`);
            
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