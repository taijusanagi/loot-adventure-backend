import { ethers } from 'hardhat';
import { SAMPLE_LOOT, TREASURY } from './config'
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deployer is ... ', deployer.address);

  // Test Prameter
  const TOKEN_ID = 1;

  // Local
  const CHAIN_ID = 31337;

  // MCH-Verce Testnet
  // const SAMPLE_LOOT = '0xb49830082AA2e8A798e82e60d45cB4EBDc708F77';
  // const CHAIN_ID = 420;
  // const TOKEN_ID = 8;

  // Astar zKatana
  // const SAMPLE_LOOT = '0x3a0Dc7cF61F71344348713a76C23DbEE5d6AA8b5';
  // const CHAIN_ID = 1261120;
  // Polygon Mumbai
  // const SAMPLE_LOOT = '0xc88626Ec166160ea843d12FED77804e0B7DbB9DA';
  // const CHAIN_ID = 80001;

  // Deploy Contract
  const f0 = await ethers.getContractFactory('SoulMinter', deployer);
  const soulMinter = await f0.deploy();
  await soulMinter.deployed();
  console.log('deployed SoulMinter to:', soulMinter.address);

  const f1 = await ethers.getContractFactory('SoulControler', deployer);
  const soulControler = await f1.deploy();
  await soulControler.deployed();
  console.log('deployed SoulControler to:', soulControler.address);

  const f90 = await ethers.getContractFactory('SoulLootByRogue', deployer);
  const soulCalc0 = await f90.deploy();
  await soulCalc0.deployed();
  console.log('deployed SoulCalc-lootbyrogue to: ', soulCalc0.address);
  const f91 = await ethers.getContractFactory('SoulLoot', deployer);
  const soulCalc1 = await f91.deploy();
  await soulCalc1.deployed();
  console.log('deployed SoulCalc-SoulLoot to: ', soulCalc1.address);

  const f11 = await ethers.getContractFactory('EquipmentNft', deployer);
  const equipmentNft = await f11.deploy(
    'https://sample-image-la.s3.ap-northeast-1.amazonaws.com/',
    '.png'
  );
  await equipmentNft.deployed();
  console.log('deployed EquipmentNft to:', equipmentNft.address);

  const f12 = await ethers.getContractFactory('ArtifactNft', deployer);
  const artifactNft = await f12.deploy(
    'https://sample-image-la.s3.ap-northeast-1.amazonaws.com/',
    '.png'
  );
  await artifactNft.deployed();
  console.log('deployed ArtifactNft to:', artifactNft.address);

  const f13 = await ethers.getContractFactory('ItemNft', deployer);
  const itemNft = await f13.deploy(
    'https://sample-image-la.s3.ap-northeast-1.amazonaws.com/',
    '.png'
  );
  await itemNft.deployed();
  console.log('deployed ItemNft to:', itemNft.address);
  
  const f14 = await ethers.getContractFactory('LaXp', deployer);
  const laXp = await f14.deploy();
  await laXp.deployed();
  console.log('deployed LA-XP to:', laXp.address);

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
  await soulLootNft.setMinterRole(soulMinter.address);
  await equipmentNft.setMinterRole(soulMinter.address);
  await artifactNft.setMinterRole(soulMinter.address);
  await itemNft.setMinterRole(soulMinter.address);
  await laXp.setMinterRole(soulMinter.address);
  console.log('Minter is set on NFTs |', soulMinter.address);
  
  // Set Controler-Role on Nfts
  await equipmentNft.setControlerRole(soulControler.address);

  // Set NFT-ID on NFTs
  await soulLootNft.setNftId(SAMPLE_LOOT);

  await equipmentNft.setNftId(soulLootNft.address);
  await artifactNft.setNftId(soulLootNft.address);
  await itemNft.setNftId(soulLootNft.address);
  console.log('NFT-ID is set on NFTs | ', SAMPLE_LOOT);

  // Set NFTs on Minter
  await soulMinter.setSoulLoot(soulLootNft.address);
  await soulMinter.setEquipmentNft(equipmentNft.address);
  await soulMinter.setArtifactNft(artifactNft.address);
  await soulMinter.setItemNft(itemNft.address);
  await soulMinter.setXp(laXp.address);
  console.log('NFTs is set on Minter | ', soulMinter.address);
  
  // Set NFTs on Controler
  await soulControler.setEquipmentNft(equipmentNft.address);
  await soulControler.setTreasury(TREASURY);

  // Set Calc-Contracts on Minter
  await soulMinter.setCalcContract(SAMPLE_LOOT, soulCalc0.address);
  console.log('Calc-Contract is set | ', soulCalc0.address);
  await soulMinter.setCalcContract(soulLootNft.address, soulCalc1.address);
  console.log('Calc-Contract is set | ', soulCalc1.address);

  // Set on Imple&minter Contracts on ERC6551Registry
  await erc6551Registry.setImplementation(erc6551Account.address);
  await erc6551Registry.setSoulMinter(soulMinter.address);
  console.log('Imple&SoulMinter Contracts is set on ERC6551Registry');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
