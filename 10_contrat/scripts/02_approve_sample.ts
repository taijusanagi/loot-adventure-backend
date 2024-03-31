import { ethers } from 'hardhat';
import { sampleLootAbi } from './abi/erc721-sample-loot-abi';
// import { soulLootAbi } from './abi/erc721-soul-loot-abi'
import { SAMPLE_LOOT, SOUL_LOOT, SOUL_MINTER } from './config';

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Test Prameter
  const TOKEN_ID = 29;

  // Set Contract
  const sampleLoot = new ethers.Contract(SAMPLE_LOOT, sampleLootAbi, signer);
  const tx = await sampleLoot.approve(SOUL_MINTER, TOKEN_ID);
  sampleLoot.once('Approval', (owner, to, tokenId) => {
    console.log('Approve from ', owner);
    console.log('To: ', to);
    console.log('Tokenid: ', tokenId.toString());
  })

  tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
