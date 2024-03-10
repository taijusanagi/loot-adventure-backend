import { ethers } from 'hardhat';
import { ContractInterface } from 'ethers'; 

import { SOUL_CONTROLER, EQUIPMENT_NFT, ERC6551_REGISTRY } from './config';
import { soulControlerAbi } from './abi/soul-controler-abi';
import { erc1155Equipment } from './abi/erc1155-equipment-abi';
import { erc6551RegistryAbi } from './abi/erc6551-registry-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';

const tba = "0x85Afd297B9CE6ac546d06a4A1c112f1b432f2c13";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  const equipmentNft = new ethers.Contract(EQUIPMENT_NFT, erc1155Equipment, signer);
  const erc6551Registry = new ethers.Contract(ERC6551_REGISTRY, erc6551RegistryAbi, signer);
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
