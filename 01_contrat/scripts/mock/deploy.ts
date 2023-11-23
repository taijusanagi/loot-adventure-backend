import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer: ${deployer.address}`);

  const f1 = await ethers.getContractFactory('Launchpad', deployer);
  const launchpad = await f1.deploy();
  await launchpad.deployed();

  console.log('deployed rogue to:', launchpad.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
