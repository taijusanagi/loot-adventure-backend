import { ethers } from 'hardhat';
import { parseEther } from 'ethers/lib/utils';

async function main() {
  const message = "hello world";
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  
  const signature = await signer.signMessage(message);
  console.log("message: ", message);
  console.log("signature: ", signature);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
