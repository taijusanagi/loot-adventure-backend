import { ethers } from 'hardhat';
import { ContractInterface } from 'ethers'; 

import { SOUL_CONTROLER, EQUIPMENT_NFT, ERC6551_REGISTRY } from './config';
import { soulControlerAbi } from './abi/soul-controler-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';

const tba = "0xBA69869A0d134311C1dA25e812BDe3c452e87864";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, signer);
  const tbaContract = new ethers.Contract(tba, erc6551AccountAbi, signer);
  
  soulControler.once('UpdateEquips', (owner, weapon, chestArmor)=> {
    console.log('Owner is :', owner);
    console.log('Weapon is set:', weapon.toString());
  })

  // create tx data
  const txData = soulControler.interface.encodeFunctionData("setWeapon", [
    20000000001
  ]);
  // Set Contract
  const tx = await tbaContract.executeCall(SOUL_CONTROLER, 0, txData);
  tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
