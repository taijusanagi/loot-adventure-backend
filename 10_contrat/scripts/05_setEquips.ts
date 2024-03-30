import { ethers } from 'hardhat';
import { ContractInterface } from 'ethers';
import { parseEther } from 'ethers/lib/utils';

import { SOUL_CONTROLER, EQUIPMENT_NFT, ERC6551_REGISTRY, COIN_FT } from './config';
import { erc1155Equipment } from './abi/erc1155-equipment-abi';
import { soulControlerAbi } from './abi/soul-controler-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';
import { erc20lacoinAbi } from './abi/erc20-lacoin-abi';

const tba = "0xC53235E5646bC4fc6A8CE365934940dcb8c2c7FF";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  const equipmentNft = new ethers.Contract(EQUIPMENT_NFT, erc1155Equipment, signer);
  const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, signer);
  const tbaContract = new ethers.Contract(tba, erc6551AccountAbi, signer);
  
  soulControler.once('UpdateEquips', (owner, equip)=> {
    console.log('Owner is :', owner);
    console.log('Equips update=>', equip);
  })
  const coin = new ethers.Contract(COIN_FT, erc20lacoinAbi, signer);
  coin.once("Transfer", (from, to, value)=>{
    console.log('From: ', from);
    console.log('To: ', to);
    console.log('Amount: ', value.toString());
  })

  // create tx data
  // const txData00 = equipmentNft.interface.encodeFunctionData("setApprovalForAll", [
  //   SOUL_CONTROLER,
  //   true
  // ]);
  const txData = soulControler.interface.encodeFunctionData("attachWeapon", [
    20000000001,
    tba
  ]);
  // Set Contract
  // const tx00 = await tbaContract.executeCall(EQUIPMENT_NFT, 0, txData00);
  // tx00.wait();
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
