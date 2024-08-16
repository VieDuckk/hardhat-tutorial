import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const endpointUrl = "ADD_YOUR_QUICKNODE_URL_HERE";
const privateKey = "0xA20E32569991fB5C70b8999D29fec5Da8AF6EC49";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  // networks: {
  //   sepolia: {
  //     url: endpointUrl,
  //     accounts: [privateKey],
  //   },
  // },
};

export default config;
