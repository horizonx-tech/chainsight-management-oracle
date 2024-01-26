import { task } from "hardhat/config";
import { Signer } from "ethers";
import { Oracle__factory } from "../typechain-types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("deploy", "Deploy the contracts", async (_, hre: HardhatRuntimeEnvironment) => {
  const { ethers } = hre;
  const deployer: Signer = (await ethers.getSigners())[0];
  const oracle = await new Oracle__factory().connect(deployer).deploy();
  console.log("Oracle deployed to:", await oracle.getAddress());
  await oracle.deploymentTransaction()?.wait(3);

  await hre.run("verify:verify", {
    address: await oracle.getAddress(),
    constructorArguments: [],
  });
});
