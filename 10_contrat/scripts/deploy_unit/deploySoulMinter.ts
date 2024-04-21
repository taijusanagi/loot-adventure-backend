import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deployer is ... ', deployer.address);
  const f1 = await ethers.getContractFactory('SoulMinter', deployer);
  const soulMinter = await f1.deploy();
  await soulMinter.deployed();
  console.log('Deply SoulMinter: ', soulMinter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
