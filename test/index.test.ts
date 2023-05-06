// import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('Rogue', async () => {
  let owner: SignerWithAddress;
  let tester: SignerWithAddress;
  let rogue: Contract;
  let lootByRogue: Contract;

  beforeEach(async () => {
    [owner, tester] = await ethers.getSigners();
    console.log(owner.address);
    console.log(tester.address);
    const f1 = await ethers.getContractFactory('LootByRogue', owner);
    lootByRogue = await f1.deploy();
    await lootByRogue.deployed();

    const f2 = await ethers.getContractFactory('Rogue', owner);
    rogue = await f2.deploy(lootByRogue.address);
    await rogue.deployed();

    const role = await lootByRogue.MINTER_ROLE();
    await lootByRogue.grantRole(role, rogue.address);
  });

  it('mint', async () => {
    await rogue
      .connect(tester)
      .mint(
        '0x5eb06d0e0c69c0f14f4937057e1b648a96c6f29cf23ad46d53c43cb03ae0b004',
        [3, 3, 3, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      );

    console.log(await lootByRogue.tokenURI(1));
  });

  // it('mint2', async () => {
  //   const f = (_x: number, _y: number) => {
  //     const move = [];
  //     const item = [];
  //     for (let y = 0; y < _y; y++) {
  //       for (let x = 0; x < _x; x++) {
  //         if (x === 0 && y === 0) continue;
  //         item.push(0);

  //         if (x === 0 || x === 64) {
  //           if (move[-1] === 0 || move[-1] === 0) {
  //             continue;
  //           } else {
  //             move.push(0);
  //             continue;
  //           }
  //         }
  //         if (y % 2 === 0) {
  //           move.push(3);
  //           continue;
  //         } else {
  //           move.push(2);
  //           continue;
  //         }
  //       }
  //     }
  //     return [move, item];
  //   };
  //   const [move, item] = f(64, 32);
  //   await rogue.connect(tester).mint(0, move, item);
  // });
});
