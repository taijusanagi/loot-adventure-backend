import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deployer is ... ', deployer.address);
  const f14 = await ethers.getContractFactory('LaCoin', deployer);
  const laCoin = await f14.deploy();
  await laCoin.deployed();
  console.log('deployed LA-COIN to:', laCoin.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
