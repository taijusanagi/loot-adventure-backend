import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  // Test Prameter
  const LOOT_NFT = '0xDC11f7E700A4c898AE5CAddB1082cFfa76512aDD';
  const TOKEN_ID = 1;

  // Deploy Contract
  const f0 = await ethers.getContractFactory('SoulMinter', deployer);
  const soulMinter = await f0.deploy();
  await soulMinter.deployed();
  console.log('deployed SoulNft to:', soulMinter.address);

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

  // (Test) Mint Soul NFTs
  const result = soulMinter.mintSoul(LOOT_NFT, TOKEN_ID, '0x00');
  const uri01 = await soulNft.tokenURI('20000000008');
  const uri02 = await armourNft.uri('20000000008');
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
