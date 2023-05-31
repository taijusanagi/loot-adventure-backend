import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ERC20,
  LootByRogue,
  LootByRogueV2,
  LootByRogueV2Minter,
  Rogue,
} from '../../typechain';

describe('RawData', async () => {
  let owner: SignerWithAddress;
  let tester: SignerWithAddress;
  let tokenReceipt: SignerWithAddress;
  let rogue: Rogue;
  let lootByRogue: LootByRogue;
  let lootByRogueV2: LootByRogueV2;
  let lootByRogueV2Minter: LootByRogueV2Minter;
  let erc20: ERC20;

  beforeEach(async () => {
    [owner, tester, tokenReceipt] = await ethers.getSigners();

    const f1 = await ethers.getContractFactory('LootByRogue', owner);
    lootByRogue = await f1.deploy();
    await lootByRogue.deployed();

    const f2 = await ethers.getContractFactory('MockERC20', owner);
    erc20 = await f2.deploy();
    await erc20.deployed();

    const f3 = await ethers.getContractFactory('Rogue', owner);
    rogue = await f3.deploy(
      lootByRogue.address,
      erc20.address,
      ethers.utils.parseEther('1'),
      tokenReceipt.address
    );
    await rogue.deployed();

    const f4 = await ethers.getContractFactory('LootByRogueV2', owner);
    lootByRogueV2 = await f4.deploy(lootByRogue.address);
    await lootByRogueV2.deployed();

    const f5 = await ethers.getContractFactory('LootByRogueV2Minter', owner);
    lootByRogueV2Minter = await f5.deploy(
      lootByRogueV2.address,
      erc20.address,
      ethers.utils.parseEther('1'),
      tokenReceipt.address
    );
    await lootByRogueV2Minter.deployed();

    const role = await lootByRogue.MINTER_ROLE();
    await lootByRogue.grantRole(role, rogue.address);
    await lootByRogueV2.grantRole(role, lootByRogueV2Minter.address);

    await erc20.transfer(tester.address, ethers.utils.parseEther('1'));
    await erc20
      .connect(tester)
      .approve(rogue.address, ethers.utils.parseEther('1'));
    await erc20
      .connect(tester)
      .approve(lootByRogueV2Minter.address, ethers.utils.parseEther('1'));
  });

  it('Success', async () => {
    await lootByRogueV2Minter.connect(tester).mint({
      seed: '0x231ca888d47177f9c68d54613eadb499d4e793f1d7100776531dc70a67790e98',
      directions: [
        0, 2, 0, 0, 2, 1, 1, 1, 1, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 1, 1, 1, 1, 3,
        1, 1,
      ],
      useItems: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0,
      ],
    });
    // console.log(await lootByRogueV2.tokenURI(1));
    expect(tester.address).equal(await lootByRogueV2.ownerOf(1));
  });
});
