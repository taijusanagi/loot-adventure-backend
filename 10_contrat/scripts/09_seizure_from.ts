import { ethers } from 'hardhat';

import { erc1155Equipment } from './abi/erc1155-equipment-abi';
import { soulControlerAbi } from './abi/soul-controler-abi';
import { SOUL_CONTROLER, EQUIPMENT_NFT, ARTIFACT_NFT } from './config';

const tba = "0x21A383B2a1ca590256e362Ade586b6c4cE8F2e7F";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  const equipmentNft = new ethers.Contract(EQUIPMENT_NFT, erc1155Equipment, signer);
  equipmentNft.on("TransferSingle", (operator, from, to, tokenId)=>{
    console.log('Operator: ', operator);
    console.log('From: ', from);
    console.log('To: ', to);
    console.log('TokenId: ', tokenId.toString());
  })

  // Set Contract
  const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, signer);
  soulControler.on("SeizureEquipment", (tba, tokenId, equip)=>{
    console.log('From TBA ', tba);
    console.log('Token ID ', tokenId.toString());
    console.log(equip);
  })

  const tx0 = await soulControler.seizureEquipment(tba);
  await tx0.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
