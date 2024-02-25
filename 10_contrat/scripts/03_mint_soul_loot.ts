import { ethers } from 'hardhat';

import { soulLootAbi } from './abi/erc721-soul-loot-abi';
import { SAMPLE_LOOT, SOUL_LOOT } from './config';

const TOKEN_ID = 0;

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Set Contract
  const soulLoot = new ethers.Contract(SOUL_LOOT, soulLootAbi, signer);
  soulLoot.once("mintSoulLoot", (from, to, tokenId, rAddress, rTokenId)=>{
    console.log('From: ', from);
    console.log('To: ', to);
    console.log('TokenID(Minted): ', tokenId.toString());
    console.log('root NFT Address: ', rAddress);
    console.log('root NFT TokenId: ', rTokenId);
  })
  const tx = await soulLoot.safeMint(
    SAMPLE_LOOT,
    TOKEN_ID
  );
  tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
