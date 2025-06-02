import hre from "hardhat";
import { OracleMinimal } from "../typechain";
import { expect } from "chai";
import { AbiCoder, keccak256, toUtf8Bytes } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("OracleMinimal", () => {
  it("deploy", async () => {
    const oracle: OracleMinimal = await hre.run("deploy_min");
    expect(await oracle.version()).to.eq(1);
  });
  describe("write bulk", () => {
    const abiCode = new AbiCoder();

    let signer: HardhatEthersSigner;
    let oracle: OracleMinimal;
    before(async () => {
      signer = await hre.ethers.provider.getSigner();
      oracle = await hre.run("deploy");
    });

    it("bulk", async () => {
      const values = [
        abiCode.encode(["string"], ["value"]),
        abiCode.encode(["uint256"], [2n ** 256n - 1n]),
        abiCode.encode(["uint128"], [2n ** 128n - 1n]),
        abiCode.encode(["uint64"], [2n ** 64n - 1n]),
        abiCode.encode(["int256"], [2n ** 128n - 1n]),
        abiCode.encode(["int128"], [2n ** 64n - 1n]),
        abiCode.encode(["int64"], [2n ** 32n - 1n]),
      ];
      const keys = Array.from({ length: values.length }, (_, i) =>
        keccak256(toUtf8Bytes(`key_${i}`))
      );

      const tx = oracle.updateStateBulk(values, keys);
      await Promise.all(
        values.map((value, i) =>
          expect(tx)
            .to.emit(oracle, "StateUpdated")
            .withArgs(signer.address, value, keys[i])
        )
      );
      expect(
        (await oracle.readAsUint256WithTimestamp(signer.address, keys[1]))[0]
      ).to.eq(abiCode.decode(["uint256"], values[1])[0]);
    });
    it("should revert if length does not match", async () => {
      const values = [
        abiCode.encode(["string"], ["value"]),
        abiCode.encode(["uint256"], [2n ** 256n - 1n]),
      ];
      const keys = Array.from({ length: values.length - 1 }, (_, i) =>
        keccak256(toUtf8Bytes(`key_${i}`))
      );

      await expect(oracle.updateStateBulk(values, keys)).to.be.revertedWith(
        await oracle.E_LENGTH_MISMATCH()
      );
    });
  });
  describe("read timestamp", () => {
    const abiCode = new AbiCoder();

    let signer: HardhatEthersSigner;
    let oracle: OracleMinimal;
    before(async () => {
      signer = await hre.ethers.provider.getSigner();
      oracle = await hre.run("deploy");
    });

    it("bulk", async () => {
      const values = [
        abiCode.encode(["string"], ["value"]),
        abiCode.encode(["uint256"], [2n ** 256n - 1n]),
        abiCode.encode(["uint128"], [2n ** 128n - 1n]),
        abiCode.encode(["uint64"], [2n ** 64n - 1n]),
        abiCode.encode(["int256"], [2n ** 128n - 1n]),
        abiCode.encode(["int128"], [2n ** 64n - 1n]),
        abiCode.encode(["int64"], [2n ** 32n - 1n]),
      ];
      const keys = Array.from({ length: values.length }, (_, i) =>
        keccak256(toUtf8Bytes(`key_${i}`))
      );

      await oracle.updateStateBulk(values, keys);
      const timestamp = BigInt(
        (await hre.ethers.provider.getBlock("latest"))!.timestamp
      );

      expect((await oracle.data(signer.address, keys[0])).timestamp).to.eq(
        timestamp
      );
      expect(
        await oracle.readAsUint256WithTimestamp(signer.address, keys[1])
      ).to.deep.eq([abiCode.decode(["uint256"], values[1])[0], timestamp]);
    });
  });
});
