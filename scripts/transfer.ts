import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  const transactionOptions = {
    to: '',
    value: ethers.utils.parseEther('1'),
  };

  await deployer.sendTransaction(transactionOptions);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
