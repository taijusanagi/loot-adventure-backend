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

describe('LootByRogueV2Minter', async () => {
  let owner: SignerWithAddress;
  let tester: SignerWithAddress;
  let tokenReceipt: SignerWithAddress;
  let rogue: Rogue;
  let lootByRogue: LootByRogue;
  let lootByRogueV2: LootByRogueV2;
  let lootByRogueV2Minter: LootByRogueV2Minter;
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
    await lootByRogueV2Minter
      .connect(tester)
      .mint({ seed, directions, useItems });
    expect(await lootByRogueV2.ownerOf(1)).equal(tester.address);

    const d = await lootByRogueV2.getDirections(1);
    d.forEach((v, i) => expect(v).equal(directions[i]));
    const items = await lootByRogueV2.getUseItems(1);
    items.forEach((v, i) => expect(v).equal(items[i]));
  });

  it('Should be an error if insufficient token', async () => {
    await erc20
      .connect(tester)
      .transfer(owner.address, ethers.utils.parseEther('1'));

    await expect(
      lootByRogueV2Minter.connect(tester).mint({ seed, directions, useItems })
    ).to.be.revertedWith('ERC20: transfer amount exceeds balanc');
  });

  it('Should be an error if the lengths of directions and useItems do not match', async () => {
    await expect(
      lootByRogueV2Minter
        .connect(tester)
        .mint({ seed, directions, useItems: [...useItems, 0] })
    ).to.be.revertedWith('Lengths do not match');
  });

  it('Should be an error if minted seed', async () => {
    await erc20.transfer(tester.address, ethers.utils.parseEther('10'));
    await erc20
      .connect(tester)
      .approve(lootByRogueV2Minter.address, ethers.utils.parseEther('10'));

    await lootByRogueV2Minter
      .connect(tester)
      .mint({ seed, directions, useItems });

    await expect(
      lootByRogueV2Minter.connect(tester).mint({ seed, directions, useItems })
    ).to.be.revertedWith('Already minted seed');
  });

  it('Should be an error if reserved seed', async () => {
    await lootByRogueV2.reserveV1MintdSeed([seed]);
    await expect(
      lootByRogueV2Minter.connect(tester).mint({ seed, directions, useItems })
    ).to.be.revertedWith('Already minted seed');
  });

  it('Should be an error if not an exit', async () => {
    const seed =
      '0xc9b967fb62e24a03d9d54384a8d977349508bd0d41abe70b229122774de6ccfe';
    const directions = [
      3, 3, 3, 1, 1, 1, 3, 3, 3, 3, 1, 3, 1, 3, 3, 3, 1, 1, 2, 0, 2, 1, 1, 3, 3,
      3, 3, 3, 3, 1, 3, 3, 1, 1, 1, 1, 1, 2, 2, 1, 3, 3, 3, 3,
    ];
    const useItems = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    const msg = 'The end point is not the exit';
    await expect(
      lootByRogueV2Minter.connect(tester).mint({ seed, directions, useItems })
    ).to.be.revertedWith(msg);
  });

  it('Success: data2', async () => {
    await lootByRogueV2Minter.connect(tester).mint({
      seed: '0x0ad62e264272f6df3cd0b50e401cc436fdd0dbf579d13a31d0d9a1972dc5d335',
      directions: [
        0, 2, 2, 1, 1, 1, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 1, 1, 1, 2, 2,
        2, 0, 3, 0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 3, 0, 3, 1, 3, 3, 1,
        1, 2, 0, 2, 1, 1, 1, 3, 0, 3, 3, 3, 0, 3, 3, 1, 2, 1, 2, 2, 2, 1, 3, 3,
        1, 1, 3, 3, 1, 3, 1, 1, 2, 2, 0, 0, 2, 2, 0, 2, 2, 0, 0, 2, 1, 2, 2, 1,
        1, 1, 1, 3, 1, 3, 3, 0, 0, 3, 1, 3, 1, 3, 3, 1, 1, 1, 2, 2, 2, 1, 1, 2,
        2, 2, 2, 2, 0, 0, 2, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 2, 1, 2, 1,
        2, 2, 0, 0, 2, 2, 2, 2, 1, 3, 3, 1, 2, 1, 3, 3, 3, 3, 1, 1, 1, 2, 1, 2,
        2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0,
        0, 2, 2, 2,
      ],
      useItems: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 2, 1,
      ],
    });
    // console.log(await lootByRogueV2.tokenURI(1));
    expect(await lootByRogueV2.ownerOf(1)).equal(tester.address);
  });

  it('Success: data3', async () => {
    await lootByRogueV2Minter.connect(tester).mint({
      seed: '0x3a37b82a3f6db5863bc5fb6e6ef88c342aabb03eb45f08ae61fbe65f0ab59674',
      directions: [
        2, 2, 1, 2, 1, 1, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3, 1, 1, 1, 1, 1, 1,
        1, 1, 3, 1, 3, 0, 0, 3, 3, 0, 2, 0, 2, 0, 0, 3, 3, 1, 1, 3, 3, 3, 1, 3,
        1, 1, 2, 2, 2, 2, 1, 3, 3, 3, 3, 3, 3, 3, 0, 3, 1, 1, 1, 1, 1, 3, 1, 2,
        2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2,
        2, 1, 3, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3,
      ],
      useItems: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 2, 0, 0, 0,
      ],
    });
    // console.log(await lootByRogueV2.tokenURI(1));
    expect(await lootByRogueV2.ownerOf(1)).equal(tester.address);
  });

  it('Success: data4(kill boss4)', async () => {
    await lootByRogueV2Minter.connect(tester).mint({
      seed: '0x1404d2f311cfad4c5f305c7d28fe059638633b789049e3d04d9acc1e232eda00',
      directions: [
        2, 2, 1, 3, 3, 1, 3, 0, 3, 1, 3, 1, 2, 2, 1, 2, 1, 1, 1, 1, 2, 0, 0, 0,
        2, 2, 0, 2, 0, 3, 0, 2, 0, 2, 1, 1, 2, 2, 1, 2, 2, 0, 2, 2, 1, 1, 2, 2,
        2, 2, 0, 0, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2, 2, 2, 2,
        2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 3, 1, 1, 3, 0, 0, 3, 0,
        0, 3, 3, 0, 0, 0, 0,
      ],
      useItems: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
    });
    // console.log(await lootByRogueV2.tokenURI(1));
    expect(await lootByRogueV2.ownerOf(1)).equal(tester.address);
  });
});
