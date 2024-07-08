const hre = require("hardhat");
const deployUtils = require("./deploy.utils");

const DEFAULT_CONFIG = {
  Oracle: "",
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

  const logicContract = await deployUtils.deployContractIfNotExist(
    "Oracle",
    deployConfig.Oracle,
    []
  );
  deployConfig.Oracle = logicContract.address;

  // Write config
  deployUtils.writeConfig(networkName, deployConfig, suffixConfig);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
