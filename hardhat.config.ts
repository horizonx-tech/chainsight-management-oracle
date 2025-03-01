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
      optimism: process.env.OPTIMISM_API_KEY || "",
      polygonZkevm: process.env.POLYGON_ZKEVM_API_KEY || "",
      bnb: process.env.BSC_SCAN_API_KEY || "",
      opbnb: process.env.OPBNB_SCAN_API_KEY || "",
      soneiumMinato: "",
      soneium: process.env.SONEIUM_API_KEY || "",
      bevmTestnet: process.env.BLOCKSCOUT_API_KEY || "",
      mantleSepolia: process.env.MANTLE_BLOCKSCOUT_API_KEY || "",
      mantle: process.env.MANTLE_BLOCKSCOUT_API_KEY || "",
      berachainBartio: "",
      berachain: process.env.BERASCAN_API_KEY || "",
      monadTestnet: "",
      bitlayerTestnet: "",
      lineaSepolia: process.env.LINEASCAN_API_KEY || "",
      plumeTestnet: "",
      movementTestnet: "",
      mode: "",
      zircuitTestnet: "",
      lumiaTestnet: "",
      lumia: "",
      neroTestnet: process.env.NERO_TESTNET_API_KEY || "",
      nero: "",
      defiverseTestnet: "",
      defiverse: ""
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
        network: "optimism",
        chainId: 10,
        urls: {
          apiURL: "https://api-optimistic.etherscan.io/api",
          browserURL: "https://optimistic.etherscan.io/",
        },
      },
      {
        network: "bnb",
        chainId: 56,
        urls: {
          apiURL: "https://api.bscscan.com/api",
          browserURL: "https://bscscan.com/",
        },
      },
      {
        network: "opbnb",
        chainId: 204,
        urls: {
          apiURL: "https://api-opbnb.bscscan.com/api",
          browserURL: "https://opbnb.bscscan.com/",
        },
      },
      {
        network: "soneiumMinato",
        chainId: 1946,
        urls: {
          apiURL: "https://explorer-testnet.soneium.org/api",
          browserURL: "https://explorer-testnet.soneium.org/",
        },
      },
      {
        network: "soneium",
        chainId: 1868,
        urls: {
          apiURL: "https://soneium.blockscout.com/api",
          browserURL: "https://soneium.blockscout.com/",
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
        network: "berachain",
        chainId: 80094,
        urls: {
          apiURL: "https://api.berascan.com/api",
          browserURL: "https://berascan.com",
        },
      },
      {
        network: "monadTestnet",
        chainId: 10143,
        urls: {
          apiURL: "https://testnet.monadexplorer.com/api",
          browserURL: "https://testnet.monadexplorer.com",
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
        network: "plumeTestnet",
        chainId: 161221135,
        urls: {
          apiURL: "https://testnet-explorer.plumenetwork.xyz",
          browserURL: "https://testnet-explorer.plumenetwork.xyz",
        },
      },
      {
        network: "movementTestnet",
        chainId: 30732,
        urls: {
          apiURL: "https://explorer.devnet.imola.movementlabs.xyz",
          browserURL: "https://explorer.devnet.imola.movementlabs.xyz",
        },
      },
      {
        network: "mode",
        chainId: 34443,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/mainnet/evm/34443/api",
          browserURL: "https://modescan.io/",
        },
      },
      {
        network: "lumiaTestnet",
        chainId: 1952959480,
        urls: {
          apiURL: "https://testnet-explorer.lumia.org/api",
          browserURL: "https://testnet-explorer.lumia.org/",
        }
      },
      {
        network: "lumia",
        chainId: 994873017,
        urls: {
          apiURL: "https://explorer.lumia.org/api",
          browserURL: "https://explorer.lumia.org/",
        }
      },
      {
        network: "zircuitTestnet",
        chainId: 48899,
        urls: {
          apiURL: "https://explorer.testnet.zircuit.com/api",
          browserURL: "https://explorer.testnet.zircuit.com/",
        },
      },
      {
        network: "neroTestnet",
        chainId: 6660001,
        urls: {
          apiURL: "https://testnetscan.nerochain.io/api",
          browserURL: "https://testnetscan.nerochain.io/",
        },
      },
      {
        network: "nero",
        chainId: 1689,
        urls: {
          apiURL: "https://testnetscan.nerochain.io/api",
          browserURL: "https://testnetscan.nerochain.io/",
        },
      },
      {
        network: "defiverseTestnet",
        chainId: 17117,
        urls: {
          apiURL: "https://rpc-testnet.defi-verse.org",
          browserURL: "https://scan-testnet.defi-verse.org",
        }
      },
      {
        network: "defiverse",
        chainId: 16116,
        urls: {
          apiURL: "https://scan.defi-verse.org/api/",
          browserURL: "https://scan.defi-verse.org/",
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
    optimism: {
      chainId: 10,
      url: "https://mainnet.optimism.io",
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
    bnb: {
      chainId: 56,
      url: "https://binance.llamarpc.com",
      accounts: [PRIVATE_KEY],
    },
    opbnb: {
      chainId: 204,
      url: "https://opbnb.drpc.org",
      accounts: [PRIVATE_KEY],
    },
    soneiumMinato: {
      chainId: 1946,
      url: "https://rpc.minato.soneium.org",
      accounts: [PRIVATE_KEY],
    },
    soneium: {
      chainId: 1868,
      gasPrice: 10_000_000_000,
      url: "https://rpc.soneium.org",
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
    berachain: {
      chainId: 80094,
      url: "https://rpc.berachain.com",
      accounts: [PRIVATE_KEY],
    },
    monadTestnet: {
      chainId: 10143,
      url: "",// TODO:need to setup a public endpoint
      accounts: [PRIVATE_KEY],
    },
    plumeTestnet: {
      chainId: 161221135,
      url: "https://testnet-rpc.plumenetwork.xyz/http",
      accounts: [PRIVATE_KEY],
    },
    movementTestnet: {
      chainId: 30732,
      url: "https://mevm.devnet.imola.movementlabs.xyz",
      accounts: [PRIVATE_KEY],
    },
    defiverseTestnet: {
      chainId: 17117,
      url: "https://rpc-testnet.defi-verse.org",
      accounts: ACCOUNTS,
    },
    defiverse: {
      chainId: 16116,
      url: "https://rpc.defi-verse.org/",
      accounts: [PRIVATE_KEY],
    },
    lumiaTestnet: {
      chainId: 1952959480,
      url: "https://testnet-rpc.lumia.org/",
      accounts: [PRIVATE_KEY],
    },
    lumia: {
      chainId: 994873017,
      url: "https://mainnet-rpc.lumia.org/",
      accounts: [PRIVATE_KEY],
    },
    mode: {
      chainId: 34443,
      url: "https://mainnet.mode.network",
      accounts: [PRIVATE_KEY],
    },
    zircuitTestnet: {
      chainId: 48899,
      url: "https://zircuit1-testnet.p2pify.com",
      accounts: [PRIVATE_KEY],
    },
    neroTestnet: {
      chainId: 6660001,
      url: "https://testnet.nerochain.io",
      accounts: [PRIVATE_KEY],
    },
    nero: {
      chainId: 1689,
      gasPrice: 1_000_000_000,
      url: "https://rpc.nerochain.io",
      accounts: [PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1,
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_MAINNET_KEY}`,
      accounts: [PRIVATE_KEY],
    }
  },
};

export default config;
