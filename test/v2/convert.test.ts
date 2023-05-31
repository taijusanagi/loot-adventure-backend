import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ERC20,
  LootByRogue,
  LootByRogueV2,
  LootByRogueV2Converter,
  Rogue,
} from '../../typechain';

describe('LootByRogueV2Converter', async () => {
  let owner: SignerWithAddress;
  let tester: SignerWithAddress;
  let tokenReceipt: SignerWithAddress;
  let rogue: Rogue;
  let lootByRogue: LootByRogue;
  let lootByRogueV2: LootByRogueV2;
  let lootByRogueV2Converter: LootByRogueV2Converter;
  let erc20: ERC20;

  const seed =
    '0x231ca888d47177f9c68d54613eadb499d4e793f1d7100776531dc70a67790e98';
  const directions = [
    0, 2, 0, 0, 2, 1, 1, 1, 1, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 1, 1, 1, 1, 3, 1,
    1,
  ];
  const useItems = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    0,
  ];

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

    const f5 = await ethers.getContractFactory('LootByRogueV2Converter', owner);
    lootByRogueV2Converter = await f5.deploy(
      lootByRogueV2.address,
      lootByRogue.address
    );
    await lootByRogueV2Converter.deployed();

    const role = await lootByRogue.MINTER_ROLE();
    await lootByRogue.grantRole(role, rogue.address);
    await lootByRogueV2.grantRole(role, lootByRogueV2Converter.address);

    await erc20.transfer(tester.address, ethers.utils.parseEther('1'));
    await erc20
      .connect(tester)
      .approve(rogue.address, ethers.utils.parseEther('1'));
  });

  it('Success', async () => {
    await rogue.connect(tester).mint(seed, directions, useItems);
    await lootByRogue
      .connect(tester)
      .setApprovalForAll(lootByRogueV2Converter.address, true);
    await lootByRogueV2.reserveV1MintdSeed([seed]);
    await lootByRogueV2Converter.connect(tester).convert(
      {
        seed,
        directions,
        useItems,
      },
      1
    );
    expect(tester.address).equal(await lootByRogueV2.ownerOf(1));
    const tokenV1 = await lootByRogue.tokens(1);
    const tokenV2 = await lootByRogueV2.tokens(1);
    expect(tokenV2[0][0].eq(tokenV1[0])).to.be.equal(true); // seed
    expect(tokenV2[1]).equal(tokenV1[1]);
    expect(tokenV2[2]).equal(tokenV1[2]);
    expect(tokenV2[3]).equal(tokenV1[3]);
    expect(tokenV2[4]).equal(tokenV1[4]);
    expect(tokenV2[5]).equal(tokenV1[5]);
    expect(tokenV2[6]).equal(tokenV1[6]);
    expect(tokenV2[7].eq(tokenV1[7])).to.be.equal(true);
    expect(tokenV2[8].eq(tokenV1[8])).to.be.equal(true);
    expect(tokenV2[9].eq(tokenV1[9])).to.be.equal(true);
    expect(tokenV2[10].eq(tokenV1[10])).to.be.equal(true);
    expect(tokenV2[11].eq(tokenV1[11])).to.be.equal(true);
    expect(tokenV2[12].eq(tokenV1[12])).to.be.equal(true);
    expect(tokenV2[13].eq(tokenV1[13])).to.be.equal(true);
    expect(tokenV2[14].eq(tokenV1[14])).to.be.equal(true);
  });
});
