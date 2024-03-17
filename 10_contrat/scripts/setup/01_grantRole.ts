import { ethers } from 'hardhat';
import { soulMinterAbi } from '../abi/soul-minter-abi';
import { soulControlerAbi } from '../abi/soul-controler-abi';
import { SOUL_MINETR, SOUL_CONTROLER } from '../config';

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Test Prameter
  const TOKEN_ID = 3;

  // Set Contract
  const soulMinter = new ethers.Contract(SOUL_MINETR, soulMinterAbi, signer);
  const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, signer);

  const tx = await soulMinter.setDeveloperRole("");
  // sampleLoot.once('Approval', (owner, to, tokenId) => {
  //   console.log('Approve from ', owner);
  //   console.log('To: ', to);
  //   console.log('Tokenid: ', tokenId.toString());
  // })

  tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
