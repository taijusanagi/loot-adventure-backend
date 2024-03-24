import { ethers } from 'hardhat';

import { erc6551RegistryAbi } from './abi/erc6551-registry-abi';
import { erc1155Equipment } from './abi/erc1155-equipment-abi'; 
import { SOUL_LOOT, ERC6551_REGISTRY, ERC6551_ACCOUNT, EQUIPMENT_NFT, CHAIN_ID } from './config';

const TOKEN_ID = 20000000007; // TokenID of SoulLoot

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  
  const equipmentNft = new ethers.Contract(EQUIPMENT_NFT, erc1155Equipment, signer);
  equipmentNft.on('mintEquipment', (to, tokenId)=> {
    console.log('Mint to : ', to);
    console.log('Equipment Token ID is: ', tokenId.toString());
  })
  equipmentNft.once('updateEquipment', (tokenId, equipment)=> {
    console.log('Status Update tokenId => ', tokenId.toString());
    console.log('Equipment : ', equipment);
  })
  const erc6551Registry = new ethers.Contract(ERC6551_REGISTRY, erc6551RegistryAbi, signer);
  erc6551Registry.once("AccountCreated", (tba)=>{
    console.log('TBA is: ', tba);
  })
  
  const tx = await erc6551Registry.createSoul(
    CHAIN_ID,
    SOUL_LOOT,
    TOKEN_ID,
    1,
    '0x0000000000000000000000000000000000000000'
  );
//   const tx = await erc6551Registry.createAccount(
//     ERC6551_ACCOUNT,
//     CHAIN_ID,
//     SOUL_LOOT,
//     TOKEN_ID,
//     1,
//     '0x0000000000000000000000000000000000000000'
//   );
  tx.wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
