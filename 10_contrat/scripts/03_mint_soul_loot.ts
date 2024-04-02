import { ethers } from 'hardhat';

import { soulLootAbi } from './abi/erc721-soul-loot-abi';
import { soulMinterAbi } from './abi/soul-minter-abi';
import { SAMPLE_LOOT, SOUL_LOOT, SOUL_MINTER, SOUL_CONTROLER, ERC6551_REGISTRY, EQUIPMENT_NFT, CHAIN_ID } from './config';
import { erc6551RegistryAbi } from './abi/erc6551-registry-abi';
import { erc1155Equipment } from './abi/erc1155-equipment-abi'; 
import { soulControlerAbi } from './abi/soul-controler-abi';

const TOKEN_ID = 46;

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Set Contract
  const soulMinter = new ethers.Contract(SOUL_MINTER, soulMinterAbi, signer);
  const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, signer);
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
  equipmentNft.on('updateEquipment', (tokenId, seed, name, type, rAddress, rTokenId, rarity, level)=> {
    console.log('Status Update tokenId => ', tokenId.toString());
    console.log('seed: ', seed);
    console.log('name: ', name);
    console.log('type: ', type);
    console.log('rarity: ', rarity);
  })

  soulControler.on("UpdateEquips",(tba, Equip)=>{
    console.log('Owner is: ', tba);
    console.log('Equip data=>:', Equip);
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

  // const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, signer);
  // const tx = await soulControler.getEquips(signer.address);
  // console.log(tx);
  // const tx02 = await soulLoot.getTokenId(TOKEN_ID, SAMPLE_LOOT);
  // console.log(tx02);
  // const tx03 = await soulMinter.getSoulControler();
  // console.log(tx03);

  // const equipmentNft = new ethers.Contract(EQUIPMENT_NFT, erc1155Equipment, signer);
  // const tx04 = await equipmentNft.setSoulControler(SOUL_CONTROLER);
  // tx04.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
