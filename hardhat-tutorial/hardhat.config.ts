import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

console.log("url", process.env.BSCTEST_URL)
console.log("accounts", [`0x${process.env.PRIVATE_KEY}`])
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    bsctestnet: {
      url: process.env.BSCTEST_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};

export default config;
