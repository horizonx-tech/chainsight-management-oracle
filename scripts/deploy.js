const hre = require("hardhat");
const deployUtils = require("./deploy.utils");

const DEFAULT_CONFIG = {
  ProxyAdmin: "",
  OracleLogic: "",
  OracleProxy: "",
};

async function main() {
  let envName = await deployUtils.promptChoices("Choose environment", [
    "local",
    "dev",
    "prod",
  ]);
  let networkName = hre.network.name;
  let suffixConfig = `${envName}`;
  let deployConfig = deployUtils.loadConfig(
    networkName,
    DEFAULT_CONFIG,
    suffixConfig
  );

  console.log("deployConfig :>> ", deployConfig);
  console.log("Press Ctrl+C to cancel. Waiting for 10 seconds...");
  await deployUtils.wait(10000);

  // Deploy proxy admin
  const proxyAdmin = await deployUtils.deployContractIfNotExist(
    "DFProxyAdmin",
    deployConfig.ProxyAdmin
  );
  deployConfig.ProxyAdmin = proxyAdmin.address;

  // Deploy oracle logic
  const oracleLogic = await deployUtils.deployContractIfNotExist(
    "Oracle",
    deployConfig.OracleLogic,
    []
  );
  deployConfig.OracleLogic = oracleLogic.address;

  // Deploy oracle proxy
  const oracleProxy = await deployUtils.deployContractIfNotExist(
    "DFProxy",
    deployConfig.OracleProxy,
    [deployConfig.OracleLogic, deployConfig.ProxyAdmin, []]
  );
  deployConfig.OracleProxy = oracleProxy.address;

  if (oracleProxy.isNewDeployed) {
    // Initialize
    let oracleContract = await hre.ethers.getContractAt(
      "Oracle",
      oracleProxy.address
    );

    let tx = await oracleContract.initialize();
    await tx.wait();
    console.log("Oracle :> initialize tx:", tx.hash);
  } else if (oracleLogic.isNewDeployed) {
    // Upgrade logic if re-deploy
    let proxyAdminContract = await hre.ethers.getContractAt(
      "DFProxyAdmin",
      deployConfig.ProxyAdmin
    );
    let tx = await proxyAdminContract.upgrade(
      deployConfig.OracleProxy,
      deployConfig.OracleLogic
    );
    await tx.wait();
    console.log("Upgrade oracle logic tx:", tx.hash);
  }

  console.log("Done!");
  console.log("");

  // Write config
  deployUtils.writeConfig(networkName, deployConfig, suffixConfig);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
