import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  const receipt = deployer.address;
  const gasToAddress = '';

  const f1 = await ethers.getContractFactory('LootByRogue', deployer);
  const lootByRogue = await f1.deploy();
  await lootByRogue.deployed();

  const f2 = await ethers.getContractFactory('MockERC20', deployer);
  const erc20 = await f2.deploy();
  await erc20.deployed();

  const f3 = await ethers.getContractFactory('Rogue', deployer);
  const rogue = await f3.deploy(lootByRogue.address, erc20.address, 0, receipt);
  await rogue.deployed();

  const role = await lootByRogue.MINTER_ROLE();
  await lootByRogue.grantRole(role, rogue.address);

  const transactionOptions = {
    to: gasToAddress,
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
