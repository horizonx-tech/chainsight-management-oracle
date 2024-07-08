const fs = require("fs");
const inquirer = require("inquirer");
const CONFIG_FOLDER = "./networks";

function loadConfig(networkName, defaultConfig, suffix = null) {
  if (networkName == "hardhat") {
    return defaultConfig;
  }

  let fileName = `${CONFIG_FOLDER}/${networkName}.json`;
  if (suffix != null) {
    fileName = `${CONFIG_FOLDER}/${networkName}-${suffix}.json`;
  }

  if (!fs.existsSync(fileName)) {
    return defaultConfig;
  }

  return JSON.parse(fs.readFileSync(fileName).toString());
}

async function writeConfig(networkName, configData, suffix = null) {
  let text = JSON.stringify(configData, null, 2);
  console.log("text :>> ", text);
  let fileName = `${CONFIG_FOLDER}/${networkName}.json`;
  if (suffix != null) {
    fileName = `${CONFIG_FOLDER}/${networkName}-${suffix}.json`;
  }

  fs.writeFileSync(fileName, text);
}

function isEmpty(text) {
  if (text == null || text === undefined || text.length == 0) return true;
  return false;
}

async function deployContractIfNotExist(contractName, contractAddress, args) {
  console.log("deployContractIfNotExist :>> ", contractName, contractAddress);
  let isNewDeployed = false;
  let contract = null;
  if (isEmpty(contractAddress)) {
    // We get the contract to deploy
    const contractFactory = await hre.ethers.getContractFactory(contractName);
    // console.log('contractFactory :>> ', contractFactory);
    if (args == null || args === undefined) {
      contract = await contractFactory.deploy();
    } else {
      contract = await contractFactory.deploy(...args);
    }

    await contract.deployed();

    console.log(`Deployed ${contractName}:`, contract.address);
    contractAddress = contract.address;
    isNewDeployed = true;
  } else {
    contract = await hre.ethers.getContractAt(contractName, contractAddress);
    console.log(`${contractName} is exists`, contract.address);
  }

  return {
    isNewDeployed,
    address: contractAddress,
    contract,
  };
}

async function deployContract(contractName, args) {
  console.log("deployContract :>> ", contractName);

  let isNewDeployed = false;
  let contract = null;

  // We get the contract to deploy
  const contractFactory = await hre.ethers.getContractFactory(contractName);
  // console.log('contractFactory :>> ', contractFactory);
  if (args == null || args === undefined) {
    contract = await contractFactory.deploy();
  } else {
    contract = await contractFactory.deploy(...args);
  }

  await contract.deployed();

  console.log(`Deployed ${contractName}:`, contract.address);
  let contractAddress = contract.address;
  isNewDeployed = true;

  return {
    isNewDeployed,
    address: contractAddress,
    contract,
  };
}

async function prompt(msg, defaultValue) {
  let questions = [
    {
      type: "input",
      name: "value",
      message: msg,
      defaultValue: defaultValue,
    },
  ];
  let answer = await inquirer.prompt(questions);
  return answer.value;
}

async function promptChoices(msg, choices) {
  let questions = [
    {
      type: "list",
      name: "value",
      message: msg,
      choices: choices,
    },
  ];
  let answer = await inquirer.prompt(questions);
  return answer.value;
}

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  loadConfig,
  writeConfig,
  isEmpty,
  deployContract,
  deployContractIfNotExist,
  prompt,
  prompt,
  promptChoices,
  wait,
};
