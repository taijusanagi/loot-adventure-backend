import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  //   const receipt = deployer.address;
  const receipt = '0x7b718D4Ce6ca83536660a314639559F3d3f6e9e3';
  const cost = ethers.utils.parseEther('0.001');
  console.log('Signer is set!!!!!!!!!');

  const f1 = await ethers.getContractFactory('TestNft', deployer);
  const lootByRogue = await f1.deploy();
  await lootByRogue.deployed();
  console.log('deployed LootByRogue to:', lootByRogue.address);

  const f2 = await ethers.getContractFactory('MockERC20', deployer);
  const erc20 = await f2.deploy();
  await erc20.deployed();
  console.log('deployed erc20 to:', erc20.address);

  const f3 = await ethers.getContractFactory('TestRogue', deployer);
  const rogue = await f3.deploy(
    lootByRogue.address,
    erc20.address,
    cost,
    receipt
  );
  await rogue.deployed();
  console.log('deployed Rogue to:', rogue.address);

  const f4 = await ethers.getContractFactory('ERC6551Account', deployer);
  const erc6551Account = await f4.deploy();
  await erc6551Account.deployed();
  console.log('deployed ERC6551Account to:', erc6551Account.address);

  const f5 = await ethers.getContractFactory('ERC6551Registry', deployer);
  const erc6551Registry = await f5.deploy();
  await erc6551Registry.deployed();
  console.log('deployed ERC6551Registry to:', erc6551Registry.address);

  const role = await lootByRogue.MINTER_ROLE();
  await lootByRogue.grantRole(role, rogue.address);

  console.log('deployed lootV1 to:', lootByRogue.address);
  console.log('deployed MinterV1 to:', rogue.address);

  // v1 loot mint
  //   await erc20.approve(rogue.address, cost);
  //   console.log('ERC20 Approve');
  const seed =
    '84054192288976377040358785258483499681251286543540812536269700059881645144647';
  await rogue.mint(seed, [3, 1], [1, 1]);
  await lootByRogue.transferFrom(deployer.address, deployer.address, 0);
  console.log('NFT is minted');

  // Token Bound Account Register
  await erc6551Registry.setLootNft(lootByRogue.address);
  console.log('LootNFT is set!!!', lootByRogue.address);
  await erc6551Registry.createAccount(
    erc6551Account.address,
    80001,
    lootByRogue.address,
    0,
    1,
    '0x0000000000000000000000000000000000000000'
  );
  //   console.log('1st TBA is registered:', _account);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
