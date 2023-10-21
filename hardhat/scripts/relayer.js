
const hre = require('hardhat');
require("dotenv").config();
const relayerConfig = require('../artifacts/contracts/Relayer.sol/Relayer.json')
const { ethers } = require('ethers');

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL_SCROLL_SEPOLIA)
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY_RELAYER_ADDRESS, provider);
    const relayerContract = new ethers.Contract("0x019918BA53F8A36f4fFFC6aeB4482dA81338b265", relayerConfig.abi, signer);
    const transactionResponse = await relayerContract.addRoot("0x4fdf3a644a4e1412749cbb4fd07ee4299b87ad1c20acee249be5ae140efca44d");
    const receipt = await transactionResponse.wait();
    console.log(receipt);
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })