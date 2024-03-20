import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import fs from "fs";
import path from "path";
import { HttpNetworkAccountsUserConfig } from "hardhat/types";

require("dotenv").config();

const MNEMONIC = process.env.MNEMONIC || "";
const PRIVATE_KEY = `0x${process.env.PRIVATE_KEY}`
const SKIP_LOAD = process.env.SKIP_LOAD === "true";
const tasksPath = path.join(__dirname, "tasks");
if (!SKIP_LOAD) {
  fs.readdirSync(tasksPath)
    .filter((pth) => pth.endsWith(".ts"))
    .forEach((task) => {
      require(`${tasksPath}/${task}`);
    });
}

const ACCOUNTS: HttpNetworkAccountsUserConfig = {
  mnemonic: MNEMONIC,
  path: "m/44'/60'/0'/0",
  initialIndex: 0,
  count: 20,
};

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
  },

  typechain: {
    outDir: "typechain",
    target: "ethers-v6",
    alwaysGenerateOverloads: true,
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      holesky: process.env.ETHERSCAN_API_KEY || "",
      scrollSepolia: process.env.SCROLLSCAN_API_KEY || "",
      // https://explorer.devnet.m1.movementlabs.xyz/ doesn't have API
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.dev/",
        },
      },
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io/",
        },
      },
      {
        network: "holesky",
        chainId: 17000,
        urls: {
          apiURL: "https://api-holesky.etherscan.io/api",
          browserURL: "https://holesky.etherscan.io/",
        },
      },
      {
        network: "mainnet",
        chainId: 1,
        urls: {
          apiURL: "https://api.etherscan.io/api",
          browserURL: "https://etherscan.io/",
        },
      },
    ],
  },

  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        ...ACCOUNTS,
        mnemonic: "test test test test test test test test test test test junk",
      }
    },
    sepolia: {
      chainId: 11155111,
      url: "https://endpoints.omniatech.io/v1/eth/sepolia/public",
      accounts: ACCOUNTS,
    },
    holesky: {
      chainId: 17000,
      url: "https://ethereum-holesky.blockpi.network/v1/rpc/public",
      accounts: ACCOUNTS,
    },
    scrollSepolia: {
      chainId: 534351,
      url: "https://rpc.ankr.com/scroll_sepolia_testnet",
      accounts: ACCOUNTS,
    },
    mainnet: {
      chainId: 1,
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_MAINNET_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    // Movement M1 Devnet
    memvdevnetm1: {
      chainId: 336,
      url: "https://mevm.devnet.m1.movementlabs.xyz",
      accounts: [PRIVATE_KEY],
    }
  },
};

export default config;
