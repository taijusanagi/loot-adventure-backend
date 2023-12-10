import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  const receipt = deployer.address;
  const cost = ethers.utils.parseEther('1');
  console.log('Signer is set!!!!!!!!!');

  const f1 = await ethers.getContractFactory('LootNftV1', deployer);
  const lootByRogue = await f1.deploy();
  await lootByRogue.deployed();
  console.log('deployed LootV2 to:', lootByRogue.address);

  const f2 = await ethers.getContractFactory('MockERC20', deployer);
  const erc20 = await f2.deploy();
  await erc20.deployed();
  console.log('deployed erc20 to:', erc20.address);

  const f3 = await ethers.getContractFactory('RogueV3', deployer);
  const rogue = await f3.deploy(lootByRogue.address);
  await rogue.deployed();
  console.log('deployed RogueV3 to:', rogue.address);

  const f6 = await ethers.getContractFactory('Launchpad', deployer);
  const launchpad = await f6.deploy(
    lootByRogue.address,
    erc20.address,
    cost,
    receipt
  );
  await launchpad.deployed();
  console.log('deployed MinterV2 to:', launchpad.address);

  const role = await lootByRogue.MINTER_ROLE();
  await lootByRogue.grantRole(role, rogue.address);

  // await erc20.transfer(toAddress, ethers.utils.parseEther('100'));
  const transactionOptions = {
    to: deployer.address,
    value: ethers.utils.parseEther('100'),
  };
  await deployer.sendTransaction(transactionOptions);

  console.log('deployed erc20 to:', erc20.address);
  console.log('--');
  console.log('deployed lootV1 to:', lootByRogue.address);
  console.log('deployed MinterV1 to:', rogue.address);
  console.log('--');
  console.log('deployed Launchpad to:', launchpad.address);
  // v1 loot mint
  await erc20.approve(rogue.address, cost);
  // const seed =
  //   '0xb920657f2661afe64fea13eb4a1261cf23eac8b17a4bc01bd7ed9c49b00d480f';
  // await rogue.mint(seed, [3, 1], [0, 0]);
  // await lootByRogue.transferFrom(deployer.address, deployer.address, 1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
