import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer: ${deployer.address}`);

  const contract = await ethers.getContractFactory('SimpleRouge', deployer);
  const rouge = await contract.deploy();
  await rouge.deployed();

  console.log('deployed to:', rouge.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
