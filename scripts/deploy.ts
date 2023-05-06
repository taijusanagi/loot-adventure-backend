import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer: ${deployer.address}`);

  const f1 = await ethers.getContractFactory('LootByRogue', deployer);
  const lootByRogue = await f1.deploy();
  await lootByRogue.deployed();

  const f2 = await ethers.getContractFactory('Rogue', deployer);
  const rogue = await f2.deploy(lootByRogue.address);
  await rogue.deployed();

  const role = await lootByRogue.MINTER_ROLE();
  await lootByRogue.grantRole(role, rogue.address);

  console.log('deployed rogue to:', rogue.address);
  console.log('deployed loot to:', lootByRogue.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
