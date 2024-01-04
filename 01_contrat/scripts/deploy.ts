import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deployer is ... ', deployer.address);

  // Test Prameter
  // MCH-Verce Testnet
  // const LOOT_NFT = '0xFBaD63bAbe3C6324e6B49e15C6e87D58A0282295';

  // Astar zKatana
  const LOOT_NFT = '0x3a0Dc7cF61F71344348713a76C23DbEE5d6AA8b5';
  const TOKEN_ID = 1;

  // Deploy Contract
  const f0 = await ethers.getContractFactory('SoulMinter', deployer);
  const soulMinter = await f0.deploy();
  await soulMinter.deployed();
  console.log('deployed SoulNft to:', soulMinter.address);

  const f90 = await ethers.getContractFactory('SoulLootByRogue', deployer);
  const soulCalc0 = await f90.deploy();
  await soulCalc0.deployed();
  console.log('deployed SoulCalc-lootbyrogue to: ', soulCalc0.address);

  const f1 = await ethers.getContractFactory('SoulNft', deployer);
  const soulNft = await f1.deploy(
    'https://sample-image-la.s3.ap-northeast-1.amazonaws.com/',
    '.png'
  );
  await soulNft.deployed();
  console.log('deployed SoulNft to:', soulNft.address);

  const f2 = await ethers.getContractFactory('ArmourNft', deployer);
  const armourNft = await f2.deploy(
    'https://sample-image-la.s3.ap-northeast-1.amazonaws.com/',
    '.png'
  );
  await armourNft.deployed();
  console.log('deployed ArmourNft to:', armourNft.address);

  // Set Minter-Role on NFTs
  await soulNft.setMinterRole(soulMinter.address);
  await armourNft.setMinterRole(soulMinter.address);
  console.log('Minter is set on NFTs |', soulMinter.address);

  // Set NFT-ID on NFTs
  await soulNft.setNftId(LOOT_NFT);
  await armourNft.setNftId(LOOT_NFT);
  console.log('NFT-ID is set on NFTs | ', LOOT_NFT);

  // Set NFTs on Minter
  await soulMinter.setSoulNftAddress(soulNft.address);
  await soulMinter.setArmourNftAddress(armourNft.address);
  console.log('NFTs is set on Minter | ', LOOT_NFT);

  // Set Calc-Contracts on Minter
  await soulMinter.setCalcContract(LOOT_NFT, soulCalc0.address);
  console.log('Calc-Contract is set | ', soulCalc0.address);
  
  // (Test) Get Params from Calc-Contracts
  // const result = await soulCalc0.calcSoul(LOOT_NFT, 1, '0x00');
  // console.log(result);
  // (Test) Mint Soul NFTs
  const result = await soulMinter.mintSoul(LOOT_NFT, TOKEN_ID, '0x00');
  const uri01 = await soulNft.tokenURI('20000000001');
  const uri02 = await armourNft.uri('20000000001');
  console.log('---------------SoulNFT---------------');
  console.log(uri01);
  console.log('---------------ArmourNFT---------------');
  console.log(uri02);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
