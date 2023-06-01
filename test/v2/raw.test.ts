import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

// ```hardhat.config.ts
// networks: {
//   hardhat: {
//     chainId: 29548,
//   },
// ```
describe('RawData', async () => {
  let owner: SignerWithAddress;
  let tester: SignerWithAddress;
  let tokenReceipt: SignerWithAddress;
  let rogue: Contract;
  let lootByRogue: Contract;
  let lootByRogueV2: Contract;
  let lootByRogueV2Converter: Contract;
  let lootByRogueV2Minter: Contract;
  let erc20: Contract;

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

    const f6 = await ethers.getContractFactory('LootByRogueV2Minter', owner);
    lootByRogueV2Minter = await f6.deploy(
      lootByRogueV2.address,
      erc20.address,
      ethers.utils.parseEther('1'),
      tokenReceipt.address
    );
    await lootByRogueV2Minter.deployed();

    const role = await lootByRogue.MINTER_ROLE();
    await lootByRogue.grantRole(role, rogue.address);
    await lootByRogueV2.grantRole(role, lootByRogueV2Converter.address);
    await lootByRogueV2.grantRole(role, lootByRogueV2Minter.address);

    await erc20.transfer(tester.address, ethers.utils.parseEther('1'));
    await erc20
      .connect(tester)
      .approve(rogue.address, ethers.utils.parseEther('1'));
    await erc20
      .connect(tester)
      .approve(lootByRogueV2Minter.address, ethers.utils.parseEther('1'));
  });

  it('minter: 421turn', async () => {
    await lootByRogueV2Minter.connect(tester).mint({
      seed: '0x86db0417ed33e437a6671acde459330f59c472e25cce5fb0f98ec202f6fa54f2',
      directions: [
        1, 1, 1, 2, 2, 2, 1, 3, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2,
        0, 2, 0, 3, 0, 0, 3, 3, 0, 2, 2, 2, 1, 2, 2, 1, 1, 2, 2, 0, 2, 0, 2, 0,
        2, 2, 0, 3, 0, 2, 2, 0, 2, 2, 0, 0, 3, 3, 1, 3, 3, 3, 3, 3, 0, 3, 1, 1,
        1, 2, 1, 1, 3, 3, 3, 0, 0, 0, 2, 0, 0, 0, 0, 3, 3, 3, 1, 1, 1, 3, 0, 0,
        0, 0, 0, 0, 0, 2, 2, 1, 2, 1, 2, 2, 2, 2, 0, 3, 0, 0, 2, 2, 2, 0, 0, 0,
        0, 2, 0, 3, 0, 0, 3, 0, 3, 3, 3, 1, 1, 1, 1, 1, 3, 1, 3, 3, 1, 3, 3, 3,
        3, 3, 3, 3, 1, 1, 1, 3, 0, 3, 3, 1, 3, 3, 3, 0, 3, 3, 3, 3, 1, 3, 0, 0,
        2, 0, 0, 3, 0, 0, 3, 3, 3, 0, 2, 2, 2, 2, 2, 0, 0, 3, 3, 3, 1, 3, 0, 0,
        0, 3, 3, 1, 1, 3, 0, 0, 0, 2, 0, 3, 3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3, 3,
        1, 1, 1, 3, 0, 3, 3, 0, 2, 0, 0, 3, 3, 3, 0, 2, 0, 2, 2, 0, 0, 2, 0, 0,
        2, 0, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 3, 0, 0, 2, 0, 2, 2, 0, 0, 0, 3, 1,
        3, 0, 3, 0, 3, 0, 0, 2, 2, 0, 3, 3, 0, 3, 3, 3, 3, 1, 1, 1, 3, 1, 1, 2,
        1, 2, 2, 1, 3, 1, 1, 3, 3, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2,
        1, 2, 2, 2, 0, 2, 1, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 1, 1,
        2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 1, 2, 2, 1, 2, 1, 1, 1, 1, 3, 3, 3, 1, 3,
        3, 3, 3, 1, 3, 3, 3, 3, 1, 1, 1, 3, 0, 3, 3, 3, 0, 3, 3, 1, 3, 3, 0, 3,
        3, 1, 1, 3, 1, 2, 2, 1, 2, 2, 2, 2, 1, 1, 3, 3, 3, 1, 3, 1, 1, 1, 2, 2,
        2, 2, 1, 1, 2, 2, 0, 3, 0, 0, 3, 3, 0,
      ],

      useItems: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
        1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
      ],
    });
    expect(await lootByRogueV2.ownerOf(1)).equal(tester.address);
  });

  it('converter: 421turn', async () => {
    const seed =
      '0x86db0417ed33e437a6671acde459330f59c472e25cce5fb0f98ec202f6fa54f2';
    const directions = [
      1, 1, 1, 2, 2, 2, 1, 3, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0,
      2, 0, 3, 0, 0, 3, 3, 0, 2, 2, 2, 1, 2, 2, 1, 1, 2, 2, 0, 2, 0, 2, 0, 2, 2,
      0, 3, 0, 2, 2, 0, 2, 2, 0, 0, 3, 3, 1, 3, 3, 3, 3, 3, 0, 3, 1, 1, 1, 2, 1,
      1, 3, 3, 3, 0, 0, 0, 2, 0, 0, 0, 0, 3, 3, 3, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0,
      0, 2, 2, 1, 2, 1, 2, 2, 2, 2, 0, 3, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0, 3, 0,
      0, 3, 0, 3, 3, 3, 1, 1, 1, 1, 1, 3, 1, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1,
      1, 3, 0, 3, 3, 1, 3, 3, 3, 0, 3, 3, 3, 3, 1, 3, 0, 0, 2, 0, 0, 3, 0, 0, 3,
      3, 3, 0, 2, 2, 2, 2, 2, 0, 0, 3, 3, 3, 1, 3, 0, 0, 0, 3, 3, 1, 1, 3, 0, 0,
      0, 2, 0, 3, 3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3, 3, 1, 1, 1, 3, 0, 3, 3, 0, 2,
      0, 0, 3, 3, 3, 0, 2, 0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 3, 3, 3, 3, 1, 1, 1, 3,
      3, 3, 3, 0, 0, 2, 0, 2, 2, 0, 0, 0, 3, 1, 3, 0, 3, 0, 3, 0, 0, 2, 2, 0, 3,
      3, 0, 3, 3, 3, 3, 1, 1, 1, 3, 1, 1, 2, 1, 2, 2, 1, 3, 1, 1, 3, 3, 1, 1, 2,
      2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 0, 2, 1, 2, 1, 2, 1, 1, 2,
      2, 2, 2, 2, 1, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 1, 2, 2, 1,
      2, 1, 1, 1, 1, 3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1, 1, 1, 3, 0, 3, 3,
      3, 0, 3, 3, 1, 3, 3, 0, 3, 3, 1, 1, 3, 1, 2, 2, 1, 2, 2, 2, 2, 1, 1, 3, 3,
      3, 1, 3, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 0, 3, 0, 0, 3, 3, 0,
    ];
    const useItems = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
      0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
    ];

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

    expect(await lootByRogueV2.ownerOf(1)).equal(tester.address);
    expect(await lootByRogue.ownerOf(1)).equal(lootByRogueV2Converter.address);
    const tokenV1 = await lootByRogue.tokens(1);
    const tokenV2 = await lootByRogueV2.tokens(1);
    expect(tokenV2[0][0].eq(tokenV1[0])).to.be.equal(true); // seed
    expect(tokenV2[1]).equal(tokenV1[1]); // turn
    expect(tokenV2[1]).equal(421); // turn
  });
});
