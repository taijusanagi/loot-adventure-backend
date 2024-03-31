import { ethers } from 'hardhat';
import { ContractInterface } from 'ethers';
import { parseEther } from 'ethers/lib/utils';

import { SOUL_CONTROLER, EQUIPMENT_NFT, ERC6551_REGISTRY, COIN_FT } from './config';
import { erc1155Equipment } from './abi/erc1155-equipment-abi';
import { soulControlerAbi } from './abi/soul-controler-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';
import { erc20lacoinAbi } from './abi/erc20-lacoin-abi';

const tba = "0x855B633Be96fAc79A6F06aD7D6D609331771519E";

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

  // Set Contract
  const tx = await soulControler.attachEquip(
    signer.address,
    20000000001,
    tba
  );
  tx.wait();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
