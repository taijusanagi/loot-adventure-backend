import { ethers } from 'hardhat';
import { SAMPLE_LOOT, TREASURY } from './config'
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deployer is ... ', deployer.address);

  // Deploy Contract
  const f0 = await ethers.getContractFactory('SoulMinter', deployer);
  const soulMinter = await f0.deploy();
  await soulMinter.deployed();
  console.log('deployed SoulMinter to:', soulMinter.address);

  const f1 = await ethers.getContractFactory('SoulControler', deployer);
  const soulControler = await f1.deploy();
  await soulControler.deployed();
  console.log('deployed SoulControler to:', soulControler.address);

  const f90 = await ethers.getContractFactory('LootByRogueV2', deployer);
  const soulCalc0 = await f90.deploy();
  await soulCalc0.deployed();
  console.log('deployed SoulCalc-lootbyrogue to: ', soulCalc0.address);
  // const f91 = await ethers.getContractFactory('SoulLoot', deployer);
  // const soulCalc1 = await f91.deploy();
  // await soulCalc1.deployed();
  // console.log('deployed SoulCalc-SoulLoot to: ', soulCalc1.address);

  const f11 = await ethers.getContractFactory('EquipmentNft', deployer);
  const equipmentNft = await f11.deploy(
    'https://sample-image-la.s3.ap-northeast-1.amazonaws.com/',
    '.png'
  );
  await equipmentNft.deployed();
  console.log('deployed EquipmentNft to:', equipmentNft.address);

  const f12 = await ethers.getContractFactory('JobNft', deployer);
  const jobNft = await f12.deploy(
    'https://d1al00f365cuqf.cloudfront.net/equipments/',
    '.png'
  );
  await jobNft.deployed();
  console.log('deployed JobNft to:', jobNft.address);

  const f13 = await ethers.getContractFactory('ArtifactNft', deployer);
  const artifactNft = await f13.deploy(
    'https://d1al00f365cuqf.cloudfront.net/equipments/',
    '.png'
  );
  await artifactNft.deployed();
  console.log('deployed ArtifactNft to:', artifactNft.address);
  
  const f14 = await ethers.getContractFactory('LaCoin', deployer);
  const laCoin = await f14.deploy();
  await laCoin.deployed();
  console.log('deployed LA-COIN to:', laCoin.address);

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
    'https://d1al00f365cuqf.cloudfront.net/equipments/',
    '.png'
  );
  await soulLootNft.deployed();
  console.log('deployed SoulLoot to : ', soulLootNft.address);

  // Set Minter-Role on NFTs&SoulMinter
  await soulLootNft.setMinterRole(soulMinter.address);
  await equipmentNft.setSoulMinter(soulMinter.address);
  await equipmentNft.setSoulControler(soulControler.address);
  await jobNft.setMinterRole(soulMinter.address);
  await artifactNft.setMinterRole(soulMinter.address);
  await laCoin.setMinterRole(soulMinter.address);
  await laCoin.setEquipment(equipmentNft.address);
  await soulControler.setMinterRole(soulMinter.address);
  console.log('Minter is set on NFTs |', soulMinter.address);
  
  // Set ERC6551Registry on SoulLootNft
  await soulMinter.setErc6551Registry(erc6551Registry.address);

  // Set Controler-Role on Nfts
  await equipmentNft.setControlerRole(soulControler.address);
  await artifactNft.setControlerRole(soulControler.address);

  // Set NFT-ID on NFTs&COIN
  await soulLootNft.setNftId(SAMPLE_LOOT);

  await equipmentNft.setNftId(SAMPLE_LOOT);
  await equipmentNft.setCoin(laCoin.address);
  await jobNft.setNftId(SAMPLE_LOOT);
  await artifactNft.setNftId(SAMPLE_LOOT);
  console.log('NFT-ID is set on NFTs | ', SAMPLE_LOOT);

  // Set NFTs on Minter
  await soulMinter.setSoulLoot(soulLootNft.address);
  await soulMinter.setEquipmentNft(equipmentNft.address);
  await soulMinter.setJobNft(jobNft.address);
  await soulMinter.setArtifactNft(artifactNft.address);
  await soulMinter.setCoin(laCoin.address);
  await soulMinter.setSoulControler(soulControler.address);
  console.log('NFTs is set on Minter | ', soulMinter.address);
  
  // Set NFTs on Controler
  await soulControler.setEquipmentNft(equipmentNft.address);
  await soulControler.setArtifactNft(artifactNft.address);
  await soulControler.setTreasury(TREASURY);

  // Set Calc-Contracts on Minter
  await soulMinter.setCalcContract(SAMPLE_LOOT, soulCalc0.address);
  console.log('Calc-Contract is set | ', soulCalc0.address);
  // await soulMinter.setCalcContract(soulLootNft.address, soulCalc1.address);
  // console.log('Calc-Contract is set | ', soulCalc1.address);

  // Set on Imple&minter Contracts on ERC6551Registry
  await soulMinter.setImplementation(erc6551Account.address);
  await soulLootNft.setMinterRole(soulMinter.address);
  console.log('Imple&SoulMinter Contracts is set on ERC6551Registry');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
