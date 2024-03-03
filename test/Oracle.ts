import hre from "hardhat";
import { Oracle } from "../typechain";
import { expect } from "chai";
import { AbiCoder, MaxUint256, keccak256, toUtf8Bytes } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Oracle", () => {
  it("deploy", async () => {
    const oracle: Oracle = await hre.run("deploy");
    expect(await oracle.version()).to.eq(1);
  });
  describe("write with key", () => {
    const abiCode = new AbiCoder();

    let signer: HardhatEthersSigner;
    let oracle: Oracle;
    before(async () => {
      signer = await hre.ethers.provider.getSigner();
      oracle = await hre.run("deploy");
    });
    it("string", async () => {
      const key = keccak256(toUtf8Bytes("string"));
      const value = abiCode.encode(["string"], ["value"]);
      await oracle["updateState(bytes,bytes32)"](value, key);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(
        await oracle["readAsString(address,bytes32)"](signer.address, key)
      ).to.eq(abiCode.decode(["string"], value)[0]);
    });
    it("uint256", async () => {
      const key = keccak256(toUtf8Bytes("string"));
      const value = abiCode.encode(["uint256"], [2n ** 256n - 1n]);
      await oracle["updateState(bytes,bytes32)"](value, key);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(
        await oracle["readAsUint256(address,bytes32)"](signer.address, key)
      ).to.eq(abiCode.decode(["uint256"], value)[0]);
    });
    it("uint128", async () => {
      const key = keccak256(toUtf8Bytes("string"));
      const value = abiCode.encode(["uint128"], [2n ** 128n - 1n]);
      await oracle["updateState(bytes,bytes32)"](value, key);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(
        await oracle["readAsUint128(address,bytes32)"](signer.address, key)
      ).to.eq(abiCode.decode(["uint128"], value)[0]);
    });
    it("uint64", async () => {
      const key = keccak256(toUtf8Bytes("string"));
      const value = abiCode.encode(["uint64"], [2n ** 64n - 1n]);
      await oracle["updateState(bytes,bytes32)"](value, key);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(
        await oracle["readAsUint64(address,bytes32)"](signer.address, key)
      ).to.eq(abiCode.decode(["uint64"], value)[0]);
    });
    it("int256", async () => {
      const key = keccak256(toUtf8Bytes("string"));
      const value = abiCode.encode(["int256"], [2n ** 128n - 1n]);
      await oracle["updateState(bytes,bytes32)"](value, key);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(
        await oracle["readAsInt256(address,bytes32)"](signer.address, key)
      ).to.eq(abiCode.decode(["int256"], value)[0]);
    });
    it("int128", async () => {
      const key = keccak256(toUtf8Bytes("string"));
      const value = abiCode.encode(["int128"], [2n ** 64n - 1n]);
      await oracle["updateState(bytes,bytes32)"](value, key);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(
        await oracle["readAsInt128(address,bytes32)"](signer.address, key)
      ).to.eq(abiCode.decode(["int128"], value)[0]);
    });
    it("int64", async () => {
      const key = keccak256(toUtf8Bytes("string"));
      const value = abiCode.encode(["int64"], [2n ** 32n - 1n]);
      await oracle["updateState(bytes,bytes32)"](value, key);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(
        await oracle["readAsInt64(address,bytes32)"](signer.address, key)
      ).to.eq(abiCode.decode(["int64"], value)[0]);
    });
  });
  describe("write without key", () => {
    const abiCode = new AbiCoder();
    const key = Uint8Array.from(Array.from({ length: 32 }, () => 0));

    let signer: HardhatEthersSigner;
    let oracle: Oracle;
    before(async () => {
      signer = await hre.ethers.provider.getSigner();
      oracle = await hre.run("deploy");
    });
    it("string", async () => {
      const value = abiCode.encode(["string"], ["value"]);
      await oracle["updateState(bytes)"](value);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(await oracle["readAsString(address)"](signer.address)).to.eq(
        abiCode.decode(["string"], value)[0]
      );
    });
    it("uint256", async () => {
      const value = abiCode.encode(["uint256"], [2n ** 256n - 1n]);
      await oracle["updateState(bytes)"](value);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(await oracle["readAsUint256(address)"](signer.address)).to.eq(
        abiCode.decode(["uint256"], value)[0]
      );
    });
    it("uint128", async () => {
      const value = abiCode.encode(["uint128"], [2n ** 128n - 1n]);
      await oracle["updateState(bytes)"](value);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(await oracle["readAsUint128(address)"](signer.address)).to.eq(
        abiCode.decode(["uint128"], value)[0]
      );
    });
    it("uint64", async () => {
      const value = abiCode.encode(["uint64"], [2n ** 64n - 1n]);
      await oracle["updateState(bytes)"](value);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(await oracle["readAsUint64(address)"](signer.address)).to.eq(
        abiCode.decode(["uint64"], value)[0]
      );
    });
    it("int256", async () => {
      const value = abiCode.encode(["int256"], [2n ** 128n - 1n]);
      await oracle["updateState(bytes)"](value);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(await oracle["readAsInt256(address)"](signer.address)).to.eq(
        abiCode.decode(["int256"], value)[0]
      );
    });
    it("int128", async () => {
      const value = abiCode.encode(["int128"], [2n ** 64n - 1n]);
      await oracle["updateState(bytes)"](value);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(await oracle["readAsInt128(address)"](signer.address)).to.eq(
        abiCode.decode(["int128"], value)[0]
      );
    });
    it("int64", async () => {
      const value = abiCode.encode(["int64"], [2n ** 32n - 1n]);
      await oracle["updateState(bytes)"](value);

      expect((await oracle.data(signer.address, key)).data).to.eq(value);
      expect(await oracle["readAsInt64(address)"](signer.address)).to.eq(
        abiCode.decode(["int64"], value)[0]
      );
    });
  });
  describe("write bulk", () => {
    const abiCode = new AbiCoder();

    let signer: HardhatEthersSigner;
    let oracle: Oracle;
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

      await oracle["updateState(bytes[],bytes32[])"](values, keys);

      expect(
        await oracle["readAsString(address,bytes32)"](signer.address, keys[0])
      ).to.eq(abiCode.decode(["string"], values[0])[0]);
      expect(
        await oracle["readAsUint256(address,bytes32)"](signer.address, keys[1])
      ).to.eq(abiCode.decode(["uint256"], values[1])[0]);
      expect(
        await oracle["readAsUint128(address,bytes32)"](signer.address, keys[2])
      ).to.eq(abiCode.decode(["uint128"], values[2])[0]);
      expect(
        await oracle["readAsUint64(address,bytes32)"](signer.address, keys[3])
      ).to.eq(abiCode.decode(["uint64"], values[3])[0]);
      expect(
        await oracle["readAsInt256(address,bytes32)"](signer.address, keys[4])
      ).to.eq(abiCode.decode(["int256"], values[4])[0]);
      expect(
        await oracle["readAsInt128(address,bytes32)"](signer.address, keys[5])
      ).to.eq(abiCode.decode(["int128"], values[5])[0]);
      expect(
        await oracle["readAsInt64(address,bytes32)"](signer.address, keys[6])
      ).to.eq(abiCode.decode(["int64"], values[6])[0]);
    });
    it("should revert if length does not match", async () => {
      const values = [
        abiCode.encode(["string"], ["value"]),
        abiCode.encode(["uint256"], [2n ** 256n - 1n]),
      ];
      const keys = Array.from({ length: values.length - 1 }, (_, i) =>
        keccak256(toUtf8Bytes(`key_${i}`))
      );

      await expect(
        oracle["updateState(bytes[],bytes32[])"](values, keys)
      ).to.be.revertedWith(await oracle.E_LENGTH_MISMATCH());
    });
  });
  describe("read timestamp", () => {
    const abiCode = new AbiCoder();

    let signer: HardhatEthersSigner;
    let oracle: Oracle;
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

      await oracle["updateState(bytes[],bytes32[])"](values, keys);
      const timestamp = BigInt(
        (await hre.ethers.provider.getBlock("latest"))!.timestamp
      );

      expect((await oracle.data(signer.address, keys[0])).timestamp).to.eq(
        timestamp
      );

      expect(
        await oracle["readAsStringWithTimestamp(address,bytes32)"](
          signer.address,
          keys[0]
        )
      ).to.deep.eq([abiCode.decode(["string"], values[0])[0], timestamp]);
      expect(
        await oracle["readAsUint256WithTimestamp(address,bytes32)"](
          signer.address,
          keys[1]
        )
      ).to.deep.eq([abiCode.decode(["uint256"], values[1])[0], timestamp]);
      expect(
        await oracle["readAsUint128WithTimestamp(address,bytes32)"](
          signer.address,
          keys[2]
        )
      ).to.deep.eq([abiCode.decode(["uint128"], values[2])[0], timestamp]);
      expect(
        await oracle["readAsUint64WithTimestamp(address,bytes32)"](
          signer.address,
          keys[3]
        )
      ).to.deep.eq([abiCode.decode(["uint64"], values[3])[0], timestamp]);
      expect(
        await oracle["readAsInt256WithTimestamp(address,bytes32)"](
          signer.address,
          keys[4]
        )
      ).to.deep.eq([abiCode.decode(["int256"], values[4])[0], timestamp]);
      expect(
        await oracle["readAsInt128WithTimestamp(address,bytes32)"](
          signer.address,
          keys[5]
        )
      ).to.deep.eq([abiCode.decode(["int128"], values[5])[0], timestamp]);
      expect(
        await oracle["readAsInt64WithTimestamp(address,bytes32)"](
          signer.address,
          keys[6]
        )
      ).to.deep.eq([abiCode.decode(["int64"], values[6])[0], timestamp]);
    });
  });
});
