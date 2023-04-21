// import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('Rogue', async () => {
  let owner: SignerWithAddress;
  let tester: SignerWithAddress;
  let rogue: Contract;

  beforeEach(async () => {
    [owner, tester] = await ethers.getSigners();
    console.log(owner.address);
    console.log(tester.address);
    const Factory = await ethers.getContractFactory('Rogue', owner);
    const contract = await Factory.deploy();
    await contract.deployed();
    rogue = contract;
  });

  it('mint', async () => {
    const f = (_x: number, _y: number) => {
      const move = [];
      const item = [];
      for (let y = 0; y < _y; y++) {
        for (let x = 0; x < _x; x++) {
          if (x === 0 && y === 0) continue;
          item.push(0);

          if (x === 0 || x === 64) {
            if (move[-1] === 0 || move[-1] === 0) {
              continue;
            } else {
              move.push(0);
              continue;
            }
          }
          if (y % 2 === 0) {
            move.push(3);
            continue;
          } else {
            move.push(2);
            continue;
          }
        }
      }
      console.log(move.length);
      return [move, item];
    };

    const [move, item] = f(64, 2);
    await rogue.connect(tester).mint(0, move, item);
    const [move2, item2] = f(64, 32);
    await rogue.connect(tester).mint(0, move2, item2);

    const Factory = await ethers.getContractFactory('RogueLoot', tester);
    const contract = Factory.attach(await rogue.loot());
    const hoge = await contract.tokenURI(1);
    console.log(hoge);
  });
});
