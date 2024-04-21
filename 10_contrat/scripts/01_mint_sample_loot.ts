import { ethers } from 'hardhat';

import { sampleLootAbi } from './abi/erc721-sample-loot-abi';
import { SAMPLE_LOOT } from './config';

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  // const to = signer.address
  const to = '0x4C7B3407Ff32FadB69ADB21598300826aCFe4B98' // yammer

  // Set Contract
  const sampleLoot = new ethers.Contract(SAMPLE_LOOT, sampleLootAbi, signer);
  sampleLoot.on("Transfer", (from, to, tokenId)=>{
    console.log(from);
    console.log(to);
    console.log(tokenId.toString());
  })
  
  const tx = await sampleLoot.safeMintTemp(
    to,
    Math.floor(Math.random() * 99999999)*100, // seed
    10, // turn
    50, // maxHp
    50, // currentHp
    25, // attack 
    25, // defence
    15, // recovery
    [1,2,3,4,5,6], // stats
    [0,0,0,0], // unique(for Dragon Slyer)
    1, // weapon
    1, // chestArmor
    1, // headArmor
    1, // waistArmor
    1, // footArmor
    1, // handArmor
    1, // necklace
    1, // ring
    [1,1,1] // relics
  );
  tx.wait();

  const tx1 = await sampleLoot.safeMintTemp(
    to,
    Math.floor(Math.random() * 99999999)*100 + 1, // seed
    10, // turn
    100, // maxHp
    50, // currentHp
    50, // attack 
    50, // defence
    15, // recovery
    [1,2,3,4,5,6], // stats
    [1,0,0,0], // unique(for Dragon Slyer)
    2, // weapon
    2, // chestArmor
    2, // headArmor
    2, // waistArmor
    2, // footArmor
    2, // handArmor
    2, // necklace
    2, // ring
    [0] // relics
  );
  tx1.wait();

  const tx2 = await sampleLoot.safeMintTemp(
    to,
    Math.floor(Math.random() * 99999999)*100 + 2, // seed
    10, // turn
    200, // maxHp
    50, // currentHp
    100, // attack 
    100, // defence
    15, // recovery
    [1,2,3,4,5,6], // stats
    [1,1,0,0], // unique(for Dragon Slyer)
    2, // weapon
    19, // chestArmor
    20, // headArmor
    2, // waistArmor
    15, // footArmor
    15, // handArmor
    13, // necklace
    2, // ring
    [1,3] // relics
  );
  tx2.wait();

  const tx3 = await sampleLoot.safeMintTemp(
    to,
    Math.floor(Math.random() * 99999999)*100 + 3, // seed
    10, // turn
    600, // maxHp
    50, // currentHp
    200, // attack 
    200, // defence
    15, // recovery
    [1,2,3,4,5,6], // stats
    [1,1,2,0], // unique(for Dragon Slyer)
    Math.floor(Math.random() * 10), // weapon
    Math.floor(Math.random() * 10), // chestArmor
    Math.floor(Math.random() * 10), // headArmor
    Math.floor(Math.random() * 10), // waistArmor
    Math.floor(Math.random() * 10), // footArmor
    Math.floor(Math.random() * 10), // handArmor
    Math.floor(Math.random() * 10), // necklace
    Math.floor(Math.random() * 10), // ring
    [1,3,4] // relics
  );
  tx3.wait();
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
