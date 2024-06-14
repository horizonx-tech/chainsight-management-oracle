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
      scroll: process.env.SCROLLSCAN_API_KEY || "",
      baseSepolia: process.env.BASESCAN_API_KEY || "",
      base: process.env.BASESCAN_API_KEY || "",
      arbitrumSepolia: process.env.ARBISCAN_API_KEY || "",
      arbitrum: process.env.ARBISCAN_API_KEY || "",
      polygonZkevm: process.env.POLYGON_ZKEVM_API_KEY || "",
      bevmTestnet: process.env.BLOCKSCOUT_API_KEY || "",
      mantleSepolia: process.env.MANTLE_BLOCKSCOUT_API_KEY || "",
      mantle: process.env.MANTLE_BLOCKSCOUT_API_KEY || "",
      berachainBartio: "",
      bitlayerTestnet: "",
      lineaSepolia: process.env.LINEASCAN_API_KEY || "",
      defiverseTestnet: ""
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
        network: "scroll",
        chainId: 534352,
        urls: {
          apiURL: "https://api.scrollscan.com/api",
          browserURL: "https://scrollscan.com/",
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
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org/",
        },
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org/",
        },
      },
      {
        network: "polygonZkevm",
        chainId: 1101,
        urls: {
          apiURL: "https://api-zkevm.polygonscan.com/api",
          browserURL: "https://zkevm.polygonscan.com/",
        },
      },
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io/",
        },
      },
      {
        network: "arbitrum",
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://arbiscan.io/",
        },
      },
      {
        network: "bevmTestnet",
        chainId: 11503,
        urls: {
          apiURL: "https://scan-testnet.bevm.io/api",
          browserURL: "https://scan-testnet.bevm.io",
        },
      },
      {
        network: "mantleSepolia",
        chainId: 5003,
        urls: {
          apiURL: "https://explorer.sepolia.mantle.xyz/api",
          browserURL: "https://explorer.sepolia.mantle.xyz",
        },
      },
      {
        network: "mantle",
        chainId: 5000,
        urls: {
          apiURL: "https://explorer.mantle.xyz/api",
          browserURL: "https://explorer.mantle.xyz",
        },
      },
      {
        network: "berachainBartio",
        chainId: 80084,
        urls: {
          apiURL: "https://api.bartio.beratrail.io/api",
          browserURL: "https://bartio.beratrail.io",
        },
      },
      {
        network: "bitlayerTestnet",
        chainId: 200810,
        urls: {
          apiURL: "https://api-testnet.btrscan.com/scan/api",
          browserURL: "https://testnet-scan.bitlayer.org",
        },
      },
      {
        network: "lineaSepolia",
        chainId: 59141,
        urls: {
          apiURL: "https://api-sepolia.lineascan.build/api",
          browserURL: "https://sepolia.lineascan.build/",
        },
      },
      {
        network: "defiverseTestnet",
        chainId: 17117,
        urls: {
          apiURL: "https://rpc-testnet.defi-verse.org",
          browserURL: "https://scan-testnet.defi-verse.org",
        }
      }
    ],
  },

  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        ...ACCOUNTS,
        mnemonic: "test test test test test test test test test test test junk",
      },
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
    arbitrumSepolia: {
      chainId: 421614,
      url: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
      accounts: [PRIVATE_KEY],
    },
    arbitrum: {
      chainId: 42161,
      url: "https://arbitrum.drpc.org",
      accounts: [PRIVATE_KEY],
    },
    scrollSepolia: {
      chainId: 534351,
      url: "https://rpc.ankr.com/scroll_sepolia_testnet",
      accounts: ACCOUNTS,
    },
    scroll: {
      chainId: 534352,
      url: "https://scroll.drpc.org	",
      accounts: [PRIVATE_KEY],
    },
    baseSepolia: {
      chainId: 84532,
      url: "https://sepolia.base.org",
      accounts: [PRIVATE_KEY],
    },
    base: {
      chainId: 8453,
      url: "https://base.drpc.org",
      accounts: [PRIVATE_KEY],
    },
    polygonZkevm: {
      chainId: 1101,
      url: "https://zkevm-rpc.com",
      accounts: [PRIVATE_KEY],
    },
    bevmTestnet: {
      chainId: 11503,
      url: "https://testnet.bevm.io",
      accounts: [PRIVATE_KEY],
    },
    lineaSepolia: {
      chainId: 59141,
      url: "https://rpc.sepolia.linea.build",
      accounts: [PRIVATE_KEY],
    },
    mantleSepolia: {
      chainId: 5003,
      url: "https://rpc.sepolia.mantle.xyz",
      accounts: [PRIVATE_KEY],
    },
    mantle: {
      chainId: 5000,
      url: "https://rpc.mantle.xyz",
      accounts: [PRIVATE_KEY],
    },
    bitlayerTestnet: {
      chainId: 200810,
      gasPrice: 150000000,
      url: "https://testnet-rpc.bitlayer.org",
      accounts: [PRIVATE_KEY],
    },
    berachainBartio: {
      chainId: 80084,
      url: "https://bartio.rpc.berachain.com",
      accounts: [PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1,
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_MAINNET_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    defiverseTestnet: {
      chainId: 17117,
      url: "https://rpc-testnet.defi-verse.org",
      accounts: ACCOUNTS,
    }
  },
};

export default config;
