import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer: ${deployer.address}`);
  const receipt = deployer.address;
  const costAmount = ethers.utils.parseEther('10');
  const erc20Address = '';
  const lootV1Address = '';

  const f1 = await ethers.getContractFactory('LootByRogueV2', deployer);
  const lootByRogueV2 = await f1.deploy(lootV1Address);
  await lootByRogueV2.deployed();

  const f2 = await ethers.getContractFactory(
    'LootByRogueV2Converter',
    deployer
  );
  const lootByRogueV2Converter = await f2.deploy(
    lootByRogueV2.address,
    lootV1Address
  );
  await lootByRogueV2Converter.deployed();

  const f3 = await ethers.getContractFactory('LootByRogueV2Minter', deployer);
  const lootByRogueV2Minter = await f3.deploy(
    lootByRogueV2.address,
    erc20Address,
    costAmount,
    receipt
  );
  await lootByRogueV2Minter.deployed();

  const role = await lootByRogueV2.MINTER_ROLE();
  await lootByRogueV2.grantRole(role, lootByRogueV2Minter.address);
  await lootByRogueV2.grantRole(role, lootByRogueV2Converter.address);

  console.log('deployed lootV2 to:', lootByRogueV2.address);
  console.log('deployed MinterV2 to:', lootByRogueV2Minter.address);
  console.log('deployed ConverterV2 to:', lootByRogueV2Converter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
