import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  const receipt = deployer.address;
  const toAddress = '';
  const cost = ethers.utils.parseEther('10');

  const f1 = await ethers.getContractFactory('LootByRogue', deployer);
  const lootByRogue = await f1.deploy();
  await lootByRogue.deployed();

  const f2 = await ethers.getContractFactory('MockERC20', deployer);
  const erc20 = await f2.deploy();
  await erc20.deployed();

  const f3 = await ethers.getContractFactory('Rogue', deployer);
  const rogue = await f3.deploy(
    lootByRogue.address,
    erc20.address,
    cost,
    receipt
  );
  await rogue.deployed();

  const role = await lootByRogue.MINTER_ROLE();
  await lootByRogue.grantRole(role, rogue.address);

  await erc20.transfer(toAddress, ethers.utils.parseEther('100'));
  const transactionOptions = {
    to: toAddress,
    value: ethers.utils.parseEther('100'),
  };
  await deployer.sendTransaction(transactionOptions);
  console.log('deployed rogue to:', rogue.address);
  console.log('deployed loot to:', lootByRogue.address);
  console.log('deployed erc20 to:', erc20.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
