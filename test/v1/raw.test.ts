import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('Rogue', async () => {
  let owner: SignerWithAddress;
  let tester: SignerWithAddress;
  let tokenReceipt: SignerWithAddress;
  let rogue: Contract;
  let lootByRogue: Contract;
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

    const role = await lootByRogue.MINTER_ROLE();
    await lootByRogue.grantRole(role, rogue.address);

    await erc20.transfer(tester.address, ethers.utils.parseEther('1'));
    await erc20
      .connect(tester)
      .approve(rogue.address, ethers.utils.parseEther('1'));
  });

  it('Endpoint error', async () => {
    const seed =
      '0xc9b967fb62e24a03d9d54384a8d977349508bd0d41abe70b229122774de6ccfe';
    const directions = [
      3, 3, 3, 1, 1, 1, 3, 3, 3, 3, 1, 3, 1, 3, 3, 3, 1, 1, 2, 0, 2, 1, 1, 3, 3,
      3, 3, 3, 3, 1, 3, 3, 1, 1, 1, 1, 1, 2, 2, 1, 3, 3, 3, 3,
    ];
    const item = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    const msg = 'The end point is not the exit';
    await expect(
      rogue.connect(tester).mint(seed, directions, item)
    ).to.be.revertedWith(msg);
  });

  it('data1', async () => {
    await rogue
      .connect(tester)
      .mint(
        '0x231ca888d47177f9c68d54613eadb499d4e793f1d7100776531dc70a67790e98',
        [
          0, 2, 0, 0, 2, 1, 1, 1, 1, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 1, 1, 1, 1,
          3, 1, 1,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
          0, 0, 0,
        ]
      );
    // console.log(await lootByRogue.tokenURI(1));
    expect(tester.address).equal(await lootByRogue.ownerOf(1));
  });

  it('data2', async () => {
    await rogue
      .connect(tester)
      .mint(
        '0x0ad62e264272f6df3cd0b50e401cc436fdd0dbf579d13a31d0d9a1972dc5d335',
        [
          0, 2, 2, 1, 1, 1, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 1, 1, 1, 2,
          2, 2, 0, 3, 0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 3, 0, 3, 1, 3,
          3, 1, 1, 2, 0, 2, 1, 1, 1, 3, 0, 3, 3, 3, 0, 3, 3, 1, 2, 1, 2, 2, 2,
          1, 3, 3, 1, 1, 3, 3, 1, 3, 1, 1, 2, 2, 0, 0, 2, 2, 0, 2, 2, 0, 0, 2,
          1, 2, 2, 1, 1, 1, 1, 3, 1, 3, 3, 0, 0, 3, 1, 3, 1, 3, 3, 1, 1, 1, 2,
          2, 2, 1, 1, 2, 2, 2, 2, 2, 0, 0, 2, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1,
          2, 2, 2, 1, 2, 1, 2, 2, 0, 0, 2, 2, 2, 2, 1, 3, 3, 1, 2, 1, 3, 3, 3,
          3, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0,
          3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1,
        ]
      );
    // console.log(await lootByRogue.tokenURI(1));
    expect(tester.address).equal(await lootByRogue.ownerOf(1));
  });

  it('data3', async () => {
    await rogue
      .connect(tester)
      .mint(
        '0x3a37b82a3f6db5863bc5fb6e6ef88c342aabb03eb45f08ae61fbe65f0ab59674',
        [
          2, 2, 1, 2, 1, 1, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 1, 3, 1, 1, 1, 1, 1,
          1, 1, 1, 3, 1, 3, 0, 0, 3, 3, 0, 2, 0, 2, 0, 0, 3, 3, 1, 1, 3, 3, 3,
          1, 3, 1, 1, 2, 2, 2, 2, 1, 3, 3, 3, 3, 3, 3, 3, 0, 3, 1, 1, 1, 1, 1,
          3, 1, 2, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0,
          2, 2, 2, 2, 2, 1, 3, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 3,
          1, 3,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 2, 0,
          0, 0,
        ]
      );
    // console.log(await lootByRogue.tokenURI(1));
    expect(tester.address).equal(await lootByRogue.ownerOf(1));
  });

  it('data4: kill boss4', async () => {
    await rogue
      .connect(tester)
      .mint(
        '0x1404d2f311cfad4c5f305c7d28fe059638633b789049e3d04d9acc1e232eda00',
        [
          2, 2, 1, 3, 3, 1, 3, 0, 3, 1, 3, 1, 2, 2, 1, 2, 1, 1, 1, 1, 2, 0, 0,
          0, 2, 2, 0, 2, 0, 3, 0, 2, 0, 2, 1, 1, 2, 2, 1, 2, 2, 0, 2, 2, 1, 1,
          2, 2, 2, 2, 0, 0, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2,
          2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 3, 3, 1, 1, 3,
          0, 0, 3, 0, 0, 3, 3, 0, 0, 0, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]
      );
    // console.log(await lootByRogue.tokenURI(1));
    expect(tester.address).equal(await lootByRogue.ownerOf(1));
  });
});
