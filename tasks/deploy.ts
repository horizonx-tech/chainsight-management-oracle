import { task } from "hardhat/config";
import {} from "../typechain";
import { Provider, Signer } from "ethers";
import { Oracle__factory } from "../typechain-types";

task("deploy", "Deploy the contracts", async (_, { ethers }) => {
  const deployer: Signer = (await ethers.getSigners())[0];
  const oracle = await new Oracle__factory().connect(deployer).deploy();
  console.log("Oracle deployed to:", await oracle.getAddress());
  await oracle.deploymentTransaction()?.wait(3);

  const hre = require("hardhat");
  await hre.run("verify:verify", {
    address: await oracle.getAddress(),
    constructorArguments: [],
  });
});
