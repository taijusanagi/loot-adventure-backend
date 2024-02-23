import { ethers } from 'hardhat';

import { erc1155Equipment } from './abi/erc1155-equipment-abi';
import { soulControlerAbi } from './abi/soul-controler-abi';
import { SOUL_CONTROLER, EQUIPMENT_NFT } from './config';

const TOKEN_ID = 20000000001;

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  const equipmentNft = new ethers.Contract(EQUIPMENT_NFT, erc1155Equipment, signer);
  equipmentNft.once("TransferSingle", (operator, from, to, tokenId)=>{
    console.log(operator);
    console.log(from);
    console.log(to);
    console.log(tokenId);
  })
  // Set Contract
  const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, signer);
  const tx = await soulControler.transferEquipmentNft(
    '0x71bE63f3384f5fb98995898A86B02Fb2426c5788',
    20000010001
  );
  tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
