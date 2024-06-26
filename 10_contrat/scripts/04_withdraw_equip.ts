import { ethers } from 'hardhat';
import { ContractInterface } from 'ethers';

import { SOUL_CONTROLER, EQUIPMENT_NFT } from './config';
import { erc1155Equipment } from './abi/erc1155-equipment-abi';
import { soulControlerAbi } from './abi/soul-controler-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';

const tba = "0x6c454D77F77B7e0735b3EE698E219c0C5778CE16";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  const equipmentNft = new ethers.Contract(EQUIPMENT_NFT, erc1155Equipment, signer);
  const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, signer);
  const tbaContract = new ethers.Contract(tba, erc6551AccountAbi, signer);
  
  soulControler.on('UpdateEquips', (owner, equip)=> {
    console.log('Owner is :', owner);
    console.log('Equips update=>', equip);
  })

  equipmentNft.on("TransferSingle", (operator, from, to, tokenId)=>{
    console.log("EquipmentNft is Transfered Id=>:", tokenId.toString());
    console.log("Operator", operator);
    console.log("From", from);
    console.log("To: ", to)
  })

  // create tx data
  const txData = soulControler.interface.encodeFunctionData("withdrawEquip", [
    signer.address,
    20000000008000
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
