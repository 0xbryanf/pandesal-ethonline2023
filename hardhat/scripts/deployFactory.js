
const { ethers } = require('hardhat');
const { verifyContract } = require('./verifyContract');

const main = async () => {
    const args = [];
    console.log("Started deploying smart contract...")
    const factory = await ethers.deployContract("ContractFactory");
    console.log('Finalizing the deployment.')
    await factory.waitForDeployment();
    console.log("Factory deployed to:", factory.target);
    console.log(`Please wait while we verify contract adddress ${factory.target}`);
    setTimeout(async () => {
        await verifyContract(factory.target, args);
    }, 60000)
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })