import { ethers } from 'hardhat';

import { erc1155Equipment } from './abi/erc1155-equipment-abi';
import { erc1155Item } from './abi/erc1155-item-abi';
import { soulControlerAbi } from './abi/soul-controler-abi';
import { SOUL_CONTROLER, EQUIPMENT_NFT, ARTIFACT_NFT } from './config';

const TOKEN_ID = 20000000001;

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  const equipmentNft = new ethers.Contract(EQUIPMENT_NFT, erc1155Equipment, signer);
  equipmentNft.once("TransferSingle", (operator, from, to, tokenId)=>{
    console.log(operator);
    console.log(from);
    console.log(to);
    console.log(tokenId.toString());
  })

  const itemNft = new ethers.Contract(ARTIFACT_NFT, erc1155Item, signer);
  itemNft.once("TransferSingle", (operator, from, to, tokenId)=>{
    console.log(operator);
    console.log(from);
    console.log(to);
    console.log(tokenId.toString());
  })

  // Set Contract
  const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, signer);
  const tx0 = await soulControler.transferEquipment(
    '0x4303831d70BEf1E2ba7d6b802bf90990124F3C36',
    20000010001
  );
  tx0.wait();
  const tx1 = await soulControler.transferItem(
    '0x4303831d70BEf1E2ba7d6b802bf90990124F3C36',
    20000010000
  );
  tx1.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
