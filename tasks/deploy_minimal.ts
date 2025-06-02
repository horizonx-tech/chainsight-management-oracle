import { task } from "hardhat/config";
import { OracleMinimal, OracleMinimal__factory } from "../typechain";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

task("deploy_min", "Deploy the min contracts")
  .addOptionalParam("wait")
  .setAction(
    async (
      { wait }: { wait: number | undefined },
      hre: HardhatRuntimeEnvironment
    ) => {
      const { ethers, network, upgrades } = hre;
      const deployer: HardhatEthersSigner = (await ethers.getSigners())[0];
      console.log(`deployer: ${deployer.address}`);
      console.log(
        `balance: ${ethers.formatEther(
          await deployer.provider.getBalance(deployer.address)
        )}`
      );
      console.log(`network: ${network.name}`);

      const oracle = (await upgrades.deployProxy(
        new OracleMinimal__factory(deployer),
        { initializer: "initialize" }
      )) as unknown as OracleMinimal;
      console.log(
        `Oracle deployed tx: ${oracle.deploymentTransaction()?.hash}`
      );
      await oracle.deploymentTransaction()?.wait(wait);
      const deployedAddress = await oracle.getAddress();
      console.log(`Oracle deployed to: ${deployedAddress}`);

      if (network.name !== "hardhat") {
        await hre.run("verify:verify", {
          address: deployedAddress,
          constructorArguments: [],
        });
      }

      return oracle;
    }
  );
