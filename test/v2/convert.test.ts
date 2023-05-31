import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BigNumber, Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('LootByRogueV2Converter', async () => {
  let owner: SignerWithAddress;
  let tester1: SignerWithAddress;
  let tester2: SignerWithAddress;
  let tokenReceipt: SignerWithAddress;
  let rogue: Contract;
  let lootByRogue: Contract;
  let erc20: Contract;

  beforeEach(async () => {
    [owner, tester1, tester2, tokenReceipt] = await ethers.getSigners();

    const f1 = await ethers.getContractFactory('LootByRogue', owner);
    lootByRogue = await f1.deploy();
    await lootByRogue.deployed();

    const f2 = await ethers.getContractFactory('MockERC20', owner);
    erc20 = await f2.deploy();
    await erc20.deployed();

    const f3 = await ethers.getContractFactory('TestRogue', owner);
    rogue = await f3.deploy(
      lootByRogue.address,
      erc20.address,
      ethers.utils.parseEther('1'),
      tokenReceipt.address
    );
    await rogue.deployed();

    const role = await lootByRogue.MINTER_ROLE();
    await lootByRogue.grantRole(role, rogue.address);

    await erc20.transfer(tester1.address, ethers.utils.parseEther('100'));
    await erc20
      .connect(tester1)
      .approve(rogue.address, ethers.utils.parseEther('100'));

    await erc20.transfer(tester2.address, ethers.utils.parseEther('1'));
    await erc20
      .connect(tester2)
      .approve(rogue.address, ethers.utils.parseEther('1'));
  });

  // convert
});
