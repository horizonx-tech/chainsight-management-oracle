import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-abi-exporter';

const config: HardhatUserConfig = {
  solidity: "0.8.21",  
  abiExporter: {
    path: './abi',
    format: 'json',
    runOnCompile: true,
    only: ['contracts/interfaces/*'],
    flat: true,
  },
};

export default config;
