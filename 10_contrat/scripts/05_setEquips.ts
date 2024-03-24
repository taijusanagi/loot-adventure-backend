import { ethers } from 'hardhat';
import { ContractInterface } from 'ethers';
import { parseEther } from 'ethers/lib/utils';

import { SOUL_CONTROLER, EQUIPMENT_NFT, ERC6551_REGISTRY, COIN_FT } from './config';
import { soulControlerAbi } from './abi/soul-controler-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';
import { erc20lacoinAbi } from './abi/erc20-lacoin-abi';
import { soulLootAbi } from './abi/erc721-soul-loot-abi';

const tba = "0x91662e8DBc048333dAA3e2746518091011aD1c67";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, signer);
  const tbaContract = new ethers.Contract(tba, erc6551AccountAbi, signer);
  
  soulControler.once('UpdateEquips', (owner, weapon, chestArmor)=> {
    console.log('Owner is :', owner);
    console.log('Weapon is set:', weapon.toString());
  })
  const coin = new ethers.Contract(COIN_FT, erc20lacoinAbi, signer);
  coin.once("Transfer", (from, to, value)=>{
    console.log('From: ', from);
    console.log('To: ', to);
    console.log('Amount: ', value.toString());
  })

  // create tx data
  const txData = soulControler.interface.encodeFunctionData("setEquips", [
    20000000001,
    20000010001,
    20000020001,
    20000030001,
    20000040001,
    20000050001,
    20000060001,
    20000070001
  ]);
  // Set Contract
  const tx = await tbaContract.executeCall(SOUL_CONTROLER, 0, txData);
  tx.wait();

  const tx2 = await coin.mint(tba, parseEther('100'), 'FirstMint');
  tx2.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
