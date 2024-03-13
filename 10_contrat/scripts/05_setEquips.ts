import { ethers } from 'hardhat';
import { ContractInterface } from 'ethers';
import { parseEther } from 'ethers/lib/utils';

import { SOUL_CONTROLER, EQUIPMENT_NFT, ERC6551_REGISTRY, XP_FT } from './config';
import { soulControlerAbi } from './abi/soul-controler-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';
import { erc20laxpAbi } from './abi/erc20-laxp-abi';
import { soulLootAbi } from './abi/erc721-soul-loot-abi';

const tba = "0xc3F17f4eDe40b31cA43E7DF7a05C311CC48AaB09";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, signer);
  const tbaContract = new ethers.Contract(tba, erc6551AccountAbi, signer);
  
  soulControler.once('UpdateEquips', (owner, weapon, chestArmor)=> {
    console.log('Owner is :', owner);
    console.log('Weapon is set:', weapon.toString());
  })
  const xp = new ethers.Contract(XP_FT, erc20laxpAbi, signer);
  xp.once("Transfer", (from, to, value)=>{
    console.log('From: ', from);
    console.log('To: ', to);
    console.log('Amount: ', value.toString());
  })

  // create tx data
  const txData = soulControler.interface.encodeFunctionData("setWeapon", [
    20000000001
  ]);
  // Set Contract
  const tx = await tbaContract.executeCall(SOUL_CONTROLER, 0, txData);
  tx.wait();

  const tx2 = await xp.mint(tba, parseEther('100'), 'FirstMint');
  tx2.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
