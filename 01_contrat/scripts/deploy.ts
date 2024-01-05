import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deployer is ... ', deployer.address);

  // Test Prameter
  const TOKEN_ID = 1;

  // Local
  const CHAIN_ID = 31337;
  const LOOT_NFT = '0x162700d1613DfEC978032A909DE02643bC55df1A'; 

  // MCH-Verce Testnet
  // const LOOT_NFT = '0xFBaD63bAbe3C6324e6B49e15C6e87D58A0282295';
  // const CHAIN_ID = 420;
  // Astar zKatana
  // const LOOT_NFT = '0x3a0Dc7cF61F71344348713a76C23DbEE5d6AA8b5';
  // const CHAIN_ID = 1261120;
  // Polygon Mumbai
  // const LOOT_NFT = '0x76381e79B2b00B898979CD74aCE8E1def8cba005';
  // const CHAIN_ID = 80001;

  // Deploy Contract
  const f0 = await ethers.getContractFactory('SoulMinter', deployer);
  const soulMinter = await f0.deploy();
  await soulMinter.deployed();
  console.log('deployed SoulNft to:', soulMinter.address);

  const f90 = await ethers.getContractFactory('SoulLootByRogue', deployer);
  const soulCalc0 = await f90.deploy();
  await soulCalc0.deployed();
  console.log('deployed SoulCalc-lootbyrogue to: ', soulCalc0.address);

  const f91 = await ethers.getContractFactory('SoulLoot', deployer);
  const soulCalc1 = await f91.deploy();
  await soulCalc1.deployed();
  console.log('deployed SoulCalc-SoulLoot to: ', soulCalc1.address);


  const f1 = await ethers.getContractFactory('SoulNft', deployer);
  const soulNft = await f1.deploy(
    'https://sample-image-la.s3.ap-northeast-1.amazonaws.com/',
    '.png'
  );
  await soulNft.deployed();
  console.log('deployed SoulNft to:', soulNft.address);

  const f11 = await ethers.getContractFactory('ArmourNft', deployer);
  const armourNft = await f11.deploy(
    'https://sample-image-la.s3.ap-northeast-1.amazonaws.com/',
    '.png'
  );
  await armourNft.deployed();
  console.log('deployed ArmourNft to:', armourNft.address);

  const f12 = await ethers.getContractFactory('JobNft', deployer);
  const jobNft = await f12.deploy(
    'https://sample-image-la.s3.ap-northeast-1.amazonaws.com/',
    '.png'
  );
  await jobNft.deployed();
  console.log('deployed JobNft to:', jobNft.address);

  const f13 = await ethers.getContractFactory('ItemNft', deployer);
  const itemNft = await f13.deploy(
    'https://sample-image-la.s3.ap-northeast-1.amazonaws.com/',
    '.png'
  );
  await itemNft.deployed();
  console.log('deployed JobNft to:', itemNft.address);
  
  const f3 = await ethers.getContractFactory('ERC6551Account', deployer);
  const erc6551Account = await f3.deploy();
  await erc6551Account.deployed();
  console.log('deployed erc6551Account to: ', erc6551Account.address);

  const f4 = await ethers.getContractFactory('ERC6551Registry', deployer);
  const erc6551Registry = await f4.deploy();
  await erc6551Registry.deployed();
  console.log('deployed ERC6551Registry to : ', erc6551Registry.address)

  const f5 = await ethers.getContractFactory('SoulLootNft', deployer);
  const soulLootNft = await f5.deploy(
    'https://sample-image-la.s3.ap-northeast-1.amazonaws.com/',
    '.png'
  );
  await soulLootNft.deployed();
  console.log('deployed SoulLoot to : ', soulLootNft.address);

  // Set Minter-Role on NFTs&SoulMinter
  await soulNft.setMinterRole(soulMinter.address);
  await soulLootNft.setMinterRole(soulMinter.address);
  await armourNft.setMinterRole(soulMinter.address);
  await jobNft.setMinterRole(soulMinter.address);
  await itemNft.setMinterRole(soulMinter.address);
  console.log('Minter is set on NFTs |', soulMinter.address);

  // Set NFT-ID on NFTs
  await soulNft.setNftId(LOOT_NFT);
  await soulLootNft.setNftId(LOOT_NFT);
  await armourNft.setNftId(LOOT_NFT);
  await jobNft.setNftId(LOOT_NFT);
  await itemNft.setNftId(LOOT_NFT);

  await soulNft.setNftId(soulLootNft.address);
  await armourNft.setNftId(soulLootNft.address);
  await jobNft.setNftId(soulLootNft.address);
  await itemNft.setNftId(soulLootNft.address);
  console.log('NFT-ID is set on NFTs | ', LOOT_NFT);

  // Set NFTs on Minter
  await soulMinter.setSoulNftAddress(soulNft.address);
  await soulMinter.setSoulLootAddress(soulLootNft.address);
  await soulMinter.setArmourNftAddress(armourNft.address);
  await soulMinter.setJobNftAddress(jobNft.address);
  await soulMinter.setItemNftAddress(itemNft.address);
  console.log('NFTs is set on Minter | ', soulMinter.address);

  // Set Calc-Contracts on Minter
  await soulMinter.setCalcContract(LOOT_NFT, soulCalc0.address);
  console.log('Calc-Contract is set | ', soulCalc0.address);
  await soulMinter.setCalcContract(soulLootNft.address, soulCalc1.address);
  console.log('Calc-Contract is set | ', soulCalc1.address);

  // Mint SoulLoot
  await soulLootNft.safeMint(LOOT_NFT, TOKEN_ID);

  // Set on Imple&minter Contracts on ERC6551Registry
  await erc6551Registry.setImplementation(erc6551Account.address);
  await erc6551Registry.setSoulMinter(soulMinter.address);
  console.log('Imple&SoulMinter Contracts is set on ERC6551Registry');

  // (Test) Create TBA & Mint Soul NFTs
  const owner = await soulLootNft.ownerOf(20000000001);
  console.log('Owner is ...', owner);

  await erc6551Registry.createSoul(
    CHAIN_ID,
    soulLootNft.address,
    20000000001,
    1,
    '0x0000000000000000000000000000000000000000',
  );
  console.log('TBA is created');

  await erc6551Registry.executeMint(
    CHAIN_ID,
    soulLootNft.address,
    20000000001,
    1,
    '0x00'
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
