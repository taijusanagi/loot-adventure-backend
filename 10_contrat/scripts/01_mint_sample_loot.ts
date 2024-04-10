import { ethers } from 'hardhat';

import { sampleLootAbi } from './abi/erc721-sample-loot-abi';
import { SAMPLE_LOOT } from './config';

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Set Contract
  const sampleLoot = new ethers.Contract(SAMPLE_LOOT, sampleLootAbi, signer);
  sampleLoot.once("Transfer", (from, to, tokenId)=>{
    console.log(from);
    console.log(to);
    console.log(tokenId.toString());
  })
  
  const tx = await sampleLoot.safeMintTemp(
    signer.address,
    10001,
    10,11,12,13,14,15,
    [1,2,3,4,5,6],[0,0,0,0],
    1,1,1,1,1,1,1,1,
    [1,1,1]
  );
  tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
