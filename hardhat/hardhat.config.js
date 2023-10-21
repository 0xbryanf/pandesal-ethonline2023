require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-verify");
require("dotenv/config");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { task } = require("hardhat/config")

const {
  API_URL_GOERLI,
  API_URL_SEPOLIA,
  API_URL_MUMBAI,
  API_URL_SCROLL_SEPOLIA,
  API_MAINNET_ETHERSCAN_KEY,
  API_MUMBAI_ETHERSCAN_KEY,
  API_SCROLL_SEPOLIA_ETHERSCAN_KEY,
  PRIVATE_KEY_FACTORY_ADDRESS,
  PRIVATE_KEY_RELAYER_ADDRESS
  } = process.env;

task("account", "returns nonce and balance for specified address on multiple networks")
  .addParam("address")
  .setAction(async address => {
    const web3Goerli = createAlchemyWeb3(API_URL_GOERLI);
    const web3Sepolia = createAlchemyWeb3(API_URL_SEPOLIA);
    const web3Mumbai = createAlchemyWeb3(API_URL_MUMBAI);
    const web3Scroll = createAlchemyWeb3(API_URL_SCROLL_SEPOLIA);

    const networkIDArr = ["Ethereum Goerli:", "Ethereum Sepolia:", "Polygon Mumbai:", "Scroll Sepolia:"];
    const providerArr = [web3Goerli, web3Sepolia, web3Mumbai, web3Scroll];
    const resultArr = [];

    for (let i = 0; i < providerArr.length; i++) {
      const nonce = await providerArr[i].eth.getTransactionCount(address.address, "latest");
      const balance = await providerArr[i].eth.getBalance(address.address);
      resultArr.push([networkIDArr[i], nonce, parseFloat(providerArr[i].utils.fromWei(balance, "ether")).toFixed(2) + "ETH"]);
    }
    resultArr.unshift(["  |NETWORK|   |NONCE|   |BALANCE|  "]);
    console.log(resultArr);
  })

  //command: npx hardhat account --address 0x8f24b48a4570D8ad54CA693bde6A915B00101162

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL_GOERLI,
      accounts: [`0x${PRIVATE_KEY_RELAYER_ADDRESS}`],
    },
    sepolia: {
      url: API_URL_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY_RELAYER_ADDRESS}`],
    },
    maticmum: {
      url: API_URL_MUMBAI,
      accounts: [`0x${PRIVATE_KEY_RELAYER_ADDRESS}`]
    },
    scrollSepolia: {
      url: API_URL_SCROLL_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY_RELAYER_ADDRESS}`]
    }
  },
  etherscan: {
    apiKey: {
      goerli: API_MAINNET_ETHERSCAN_KEY,
      sepolia: API_MAINNET_ETHERSCAN_KEY,
      polygonMumbai: API_MUMBAI_ETHERSCAN_KEY,
      scrollSepolia: API_SCROLL_SEPOLIA_ETHERSCAN_KEY,
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia-blockscout.scroll.io/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/'
        }
      }
    ]
  }
};
