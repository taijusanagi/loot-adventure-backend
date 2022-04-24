// import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('Rouge', async () => {
  let owner: SignerWithAddress;
  let rouge: Contract;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory('RougeLoot', owner);
    const contract = await Factory.deploy();
    await contract.deployed();
    rouge = contract;
  });

  // it('test', async () => {
  //   console.log('test: ', await rouge.test(123, 50, 50));
  //   console.log('test: ', await rouge.test(123, 49, 50));
  //   console.log('test: ', await rouge.test(123, 40, 50));
  // });

  it('mint', async () => {
    await rouge.mint(
      8272771130257696,
      [
        7, 3, 3, 3, 5, 3, 3, 7, 3, 5, 5, 5, 1, 7, 1, 5, 5, 3, 3, 5, 3, 5, 4, 3,
        7, 7, 3, 5, 3, 7, 7, 4, 3, 3, 3, 7, 7, 3, 3, 3, 4, 7, 7, 7, 3, 3, 3, 5,
        3, 3, 7, 7, 7, 3, 7, 3, 7, 3, 6, 3, 5, 5, 3, 5, 3, 3, 7, 8, 1, 1, 7, 7,
        2, 7, 7, 7, 7, 1, 7, 7, 7,
      ]
    );
    const hoge = await rouge.tokenURI(1);

    console.log(hoge);
  });
});
