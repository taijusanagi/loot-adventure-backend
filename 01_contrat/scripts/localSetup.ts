import { ethers } from 'hardhat';

async function main() {
  console.log('Deploy Start!!!!!!!!!');
  const [deployer] = await ethers.getSigners();
  const receipt = deployer.address;
  const toAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
  const cost = ethers.utils.parseEther('1');
  console.log('Signer is set!!!!!!!!!');

  const f1 = await ethers.getContractFactory('LootByRogue', deployer);
  const lootByRogue = await f1.deploy();
  await lootByRogue.deployed();
  console.log('deployed lootV1 to:', lootByRogue.address);

  const f2 = await ethers.getContractFactory('MockERC20', deployer);
  const erc20 = await f2.deploy();
  await erc20.deployed();
  console.log('deployed erc20 to:', erc20.address);

  const f3 = await ethers.getContractFactory('Rogue', deployer);
  const rogue = await f3.deploy(
    lootByRogue.address,
    erc20.address,
    cost,
    receipt
  );
  await rogue.deployed();
  console.log('deployed MinterV1 to:', rogue.address);

  const f4 = await ethers.getContractFactory('LootByRogueV2', deployer);
  const lootByRogueV2 = await f4.deploy(lootByRogue.address);
  await lootByRogueV2.deployed();
  console.log('deployed lootV2 to:', lootByRogueV2.address);

  const f5 = await ethers.getContractFactory(
    'LootByRogueV2Converter',
    deployer
  );
  const lootByRogueV2Converter = await f5.deploy(
    lootByRogueV2.address,
    lootByRogue.address
  );
  await lootByRogueV2Converter.deployed();
  console.log('deployed ConverterV2 to:', lootByRogueV2Converter.address);

  const f6 = await ethers.getContractFactory('LootByRogueV2Minter', deployer);
  const lootByRogueV2Minter = await f6.deploy(
    lootByRogueV2.address,
    erc20.address,
    cost,
    receipt
  );
  await lootByRogueV2Minter.deployed();
  console.log('deployed MinterV2 to:', lootByRogueV2Minter.address);

  const role = await lootByRogue.MINTER_ROLE();
  await lootByRogue.grantRole(role, rogue.address);
  await lootByRogueV2.grantRole(role, lootByRogueV2Minter.address);
  await lootByRogueV2.grantRole(role, lootByRogueV2Converter.address);

  // await erc20.transfer(toAddress, ethers.utils.parseEther('100'));
  const transactionOptions = {
    to: toAddress,
    value: ethers.utils.parseEther('100'),
  };
  await deployer.sendTransaction(transactionOptions);

  console.log('deployed erc20 to:', erc20.address);
  console.log('--');
  console.log('deployed lootV1 to:', lootByRogue.address);
  console.log('deployed MinterV1 to:', rogue.address);
  console.log('--');
  console.log('deployed lootV2 to:', lootByRogueV2.address);
  console.log('deployed MinterV2 to:', lootByRogueV2Minter.address);
  console.log('deployed ConverterV2 to:', lootByRogueV2Converter.address);

  // v1 loot mint
  await erc20.approve(rogue.address, cost);
  const seed =
    '0xb920657f2661afe64fea13eb4a1261cf23eac8b17a4bc01bd7ed9c49b00d480f';
  await rogue.mint(seed, [3, 1], [0, 0]);
  await lootByRogue.transferFrom(deployer.address, toAddress, 1);
  await lootByRogueV2.reserveV1MintdSeed([seed]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
