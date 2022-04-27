// import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('Rouge', async () => {
  let owner: SignerWithAddress;
  let tester: SignerWithAddress;
  let rouge: Contract;

  beforeEach(async () => {
    [owner, tester] = await ethers.getSigners();
    console.log(owner.address);
    console.log(tester.address);
    const Factory = await ethers.getContractFactory('SimpleRouge', owner);
    const contract = await Factory.deploy();
    await contract.deployed();
    rouge = contract;
  });

  it('mint', async () => {
    await rouge
      .connect(tester)
      .mint(
        7310187045699795,
        [
          5, 1, 5, 5, 1, 1, 1, 7, 7, 1, 1, 7, 7, 7, 7, 7, 1, 1, 7, 7, 1, 1, 7,
          7, 7, 7, 1, 1, 7, 7, 1, 1, 5, 5, 6, 5, 5, 3, 3, 5, 5, 5, 3, 5, 3, 5,
          5, 1, 5, 3, 3, 5, 5, 3, 3, 5, 5, 5, 1, 5, 3, 3, 7, 3, 7, 3, 5, 5, 3,
          5, 5, 3, 5, 5, 1, 5, 3, 3, 7, 3, 5, 5, 5, 3, 5, 3, 3, 5, 5, 3, 3, 3,
          3, 3, 3, 3, 5, 5, 3, 3, 5, 5, 1, 1, 5, 3, 3, 3, 3, 7, 7, 7, 3, 7, 7,
          3, 3, 7, 7, 7, 3, 5, 5, 5, 5, 3, 5, 3, 3, 3, 3, 7, 3, 5, 3, 5, 5, 1,
          1, 5, 3, 5, 3, 3, 5, 5, 5, 1, 1, 5, 5, 3, 3, 5, 3, 3, 3, 5, 3, 3, 3,
          3, 7, 3, 7, 3, 3, 3, 5, 3, 7, 3, 7, 1, 7, 7, 3, 5, 3, 7, 7, 7, 3, 5,
          5, 5, 5, 3, 3, 3, 3, 3, 5, 3, 5, 3, 3, 3, 7, 3, 7, 3, 5, 3, 3, 5, 5,
          5, 5, 1, 1, 7, 1, 1, 1, 5, 1, 5, 3, 3, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3,
          7, 3, 7, 7, 7, 3, 7, 3, 5, 3, 7, 7, 7, 7, 7, 1, 7, 7, 7, 3, 3, 3, 7,
          7, 7, 7, 1, 1, 7, 1, 1, 7, 7, 3, 7, 8, 1, 7, 7, 1, 1, 6, 5, 1, 5, 3,
          5, 1, 1, 7, 7, 7, 1, 7, 7, 1, 5, 5, 1, 2, 5, 1, 5, 5, 5, 5, 1, 5, 5,
          3, 5, 5, 1, 5, 1, 1, 1, 7, 1, 7, 1, 5, 5, 5, 5, 3, 5, 1, 1, 1, 7, 7,
          7, 7, 7, 3, 7, 1, 1, 1, 1, 5, 2, 1, 7, 1, 7, 1, 1, 7, 7, 1, 1, 7, 1,
          7, 3, 7, 7, 1, 7, 1, 1, 7, 1, 1, 5, 1, 1,
        ]
      );

    const Factory = await ethers.getContractFactory('SimpleRougeLoot', tester);
    const contract = Factory.attach(await rouge.loot());
    const hoge = await contract.tokenURI(1);
    console.log(hoge);
    await contract.transferFrom(tester.address, owner.address, 1);
  });
});
