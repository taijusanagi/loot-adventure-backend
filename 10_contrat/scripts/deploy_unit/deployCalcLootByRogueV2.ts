import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deployer is ... ', deployer.address);
  const f90 = await ethers.getContractFactory('LootByRogueV2', deployer);
  const soulCalc0 = await f90.deploy();
  await soulCalc0.deployed();
  console.log('deployed SoulCalc-lootbyrogue to: ', soulCalc0.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
