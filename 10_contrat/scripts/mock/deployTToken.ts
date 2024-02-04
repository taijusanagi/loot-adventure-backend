import { Contract } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deployer is ... ', deployer.address);

  // Deploy Contract
  const f0 = await ethers.getContractFactory('SampleLootV2', deployer);
  // const lootNft = await f0.deploy('0xDC11f7E700A4c898AE5CAddB1082cFfa76512aDD');
  const lootNft = await f0.deploy();
  await lootNft.deployed();
  console.log('deployed LootNft to:', lootNft.address);
  
  var tokenOwner;
  // await lootNft.safeMintTemp(
  //   deployer.address,
  //   10001,
  //   10,11,12,13,14,15,
  //   [1,2,3,4,5,6],[1,2,3,4],
  //   1,1,1,1,1,1,1,1,
  //   [1,1,1]
  // );
  // tokenOwner =  await lootNft.ownerOf(0);
  // console.log('TokenID', tokenOwner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
