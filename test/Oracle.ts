import hre from "hardhat";
import { Oracle } from "../typechain";
import { expect } from "chai";

describe("Oracle", () => {
  it("deploy", async () => {
    const oracle: Oracle = await hre.run("deploy");
    expect(await oracle.version()).to.eq(1);
  })
})
