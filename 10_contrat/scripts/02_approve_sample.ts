import { ethers } from 'hardhat';
import { sampleLootAbi } from './abi/erc721-sample-loot-abi';
// import { soulLootAbi } from './abi/erc721-soul-loot-abi'
import { SAMPLE_LOOT, COIN_FT, SOUL_MINTER } from './config';
import { erc20lacoinAbi } from './abi/erc20-lacoin-abi';
import { parseEther } from 'ethers/lib/utils';

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Test Prameter
  const TOKEN_ID = 197;

  // Set Contract
  const sampleLoot = new ethers.Contract(SAMPLE_LOOT, sampleLootAbi, signer);
  sampleLoot.once('Approval', (owner, to, tokenId) => {
    console.log('Approve from ', owner);
    console.log('To: ', to);
    console.log('Tokenid: ', tokenId.toString());
  })
  const tx = await sampleLoot.approve(SOUL_MINTER, TOKEN_ID);

  const coin = new ethers.Contract(COIN_FT, erc20lacoinAbi, signer);
  coin.once("Transfer", (from, to, value)=>{
    console.log('From: ', from);
    console.log('To: ', to);
    console.log('Amount: ', value.toString());
  })
  const tx2 = await coin.mint(signer.address, parseEther('100000'), 'FirstMint');
  tx2.wait();
  

  tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
