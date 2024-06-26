import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deployer is ... ', deployer.address);
  const f1 = await ethers.getContractFactory('SoulControler', deployer);
  const soulControler = await f1.deploy();
  await soulControler.deployed();
  console.log('Deply SoulControler: ', soulControler.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
