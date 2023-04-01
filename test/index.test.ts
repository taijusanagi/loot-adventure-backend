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
    await rogue
      .connect(tester)
      .mint(
        8588169115804922,
        [
          0, 2, 1, 2, 2, 1, 1, 2, 1, 3, 1, 1, 3, 3, 3, 1, 1, 2, 2, 1, 3, 3, 3,
          3, 0,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0,
          0, 0,
        ]
      );

    const Factory = await ethers.getContractFactory('RogueLoot', tester);
    const contract = Factory.attach(await rogue.loot());
    const hoge = await contract.tokenURI(1);
    console.log(hoge);
    await contract.transferFrom(tester.address, owner.address, 1);
  });
});
