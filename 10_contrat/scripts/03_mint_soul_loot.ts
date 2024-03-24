import { ethers } from 'hardhat';

import { soulLootAbi } from './abi/erc721-soul-loot-abi';
import { soulMinterAbi } from './abi/soul-minter-abi';
import { SAMPLE_LOOT, SOUL_LOOT, SOUL_MINTER, ERC6551_REGISTRY, EQUIPMENT_NFT, CHAIN_ID } from './config';
import { erc6551RegistryAbi } from './abi/erc6551-registry-abi';
import { erc1155Equipment } from './abi/erc1155-equipment-abi'; 

const TOKEN_ID = 9;

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Set Contract
  const soulMinter = new ethers.Contract(SOUL_MINTER, soulMinterAbi, signer);

  const soulLoot = new ethers.Contract(SOUL_LOOT, soulLootAbi, signer);
  soulLoot.once("mintSoulLoot", (from, to, tokenId, rChainId, rAddress, rTokenId)=>{
    console.log('From: ', from);
    console.log('To: ', to);
    console.log('TokenID(Minted): ', tokenId.toString());
    console.log('root NFT chainId: ', rChainId.toString());
    console.log('root NFT Address: ', rAddress);
    console.log('root NFT TokenId: ', rTokenId.toString());
  })
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

  const tx = await soulMinter.mintSoul(
    420,
    SAMPLE_LOOT,
    TOKEN_ID,
    '0x0000000000000000000000000000000000000000'
  );
  tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
