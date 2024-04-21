import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import { 
    ERC6551_ACCOUNT,
    ERC6551_REGISTRY,
    SAMPLE_LOOT, 
    SOUL_CONTROLER, 
    SOUL_MINTER, 
    COIN_FT, 
    SOUL_LOOT,
    ARTIFACT_NFT, 
    EQUIPMENT_NFT, 
    TREASURY,
    JOB_NFT,
    CALC_LOOTBYROGUE
} from '../config';
import { soulMinterAbi } from '../abi/soul-minter-abi';
import { soulControlerAbi } from '../abi/soul-controler-abi';
import { soulLootAbi } from '../abi/erc721-soul-loot-abi';
import { erc20lacoinAbi } from '../abi/erc20-lacoin-abi'
import { erc1155Equipment } from '../abi/erc1155-equipment-abi';
import { erc1155Artifact } from '../abi/erc1155-artifact-abi';
import { erc1155Job } from '../abi/erc1155-job-abi';

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log('signer is ... ', deployer.address);
    const soulMinter = new ethers.Contract(SOUL_MINTER, soulMinterAbi, deployer);
    const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, deployer);
    const soulLootNft = new ethers.Contract(SOUL_LOOT, soulLootAbi, deployer);
    const laCoin = new ethers.Contract(COIN_FT, erc20lacoinAbi, deployer);
    const equipmentNft = new ethers.Contract(EQUIPMENT_NFT, erc1155Equipment, deployer);
    const artifactNft = new ethers.Contract(ARTIFACT_NFT, erc1155Artifact, deployer);
    const jobNft = new ethers.Contract(JOB_NFT, erc1155Job, deployer);

    // Set ERC6551Account
    console.log('erc6551Account is... ', ERC6551_ACCOUNT);
    await soulMinter.setImplementation(ERC6551_ACCOUNT);

    // Set ERC6551Registry
    console.log('erc6551Registry is... ', ERC6551_REGISTRY);
    await soulMinter.setErc6551Registry(ERC6551_REGISTRY);

    // Set SoulMinter
    console.log('SoulMinter is ... ', soulMinter.address);
    await soulLootNft.setMinterRole(soulMinter.address);
    await equipmentNft.setSoulMinter(soulMinter.address);
    await jobNft.setMinterRole(soulMinter.address);
    await artifactNft.setMinterRole(soulMinter.address);
    await laCoin.setMinterRole(soulMinter.address);
    await soulControler.setMinterRole(soulMinter.address);
    await equipmentNft.setSoulMinter(soulMinter.address);

    // Set SoulControler
    console.log('SoulControler is ... ', soulControler.address);
    await equipmentNft.setControlerRole(soulControler.address);
    await equipmentNft.setSoulControler(soulControler.address);
    await artifactNft.setControlerRole(soulControler.address);
    await soulMinter.setSoulControler(soulControler.address);

     // Set SoulLootNft
     console.log('SoulLootNft is... ', soulLootNft.address);
     await soulMinter.setSoulLoot(soulLootNft.address);

    // Set rLootNft
    console.log('rLoot Nft(LootByRogue) is... ', SAMPLE_LOOT);
    await soulLootNft.setNftId(SAMPLE_LOOT);
    await equipmentNft.setNftId(SAMPLE_LOOT);
    await artifactNft.setNftId(SAMPLE_LOOT);
    await jobNft.setNftId(SAMPLE_LOOT);

    // Set LaCoin
    console.log('LaCoin is... ', laCoin.address);
    await equipmentNft.setCoin(laCoin.address);
    await soulMinter.setCoin(laCoin.address);
    
    // Set EquipmentNft
    console.log('EquipmentNft is... ', equipmentNft.address);
    await soulMinter.setEquipmentNft(equipmentNft.address);
    await soulControler.setEquipmentNft(equipmentNft.address);
    await laCoin.setEquipment(equipmentNft.address);
    
    // Set ArtifactNft
    console.log('ArtifactNft is... ', artifactNft.address);
    await soulMinter.setArtifactNft(artifactNft.address);
    await soulControler.setArtifactNft(artifactNft.address);

    // Set JobNft
    console.log('JobNft is... ', jobNft.address);
    await soulMinter.setJobNft(jobNft.address);
    
    // Set Treasury
    console.log('Tresury Address is... ', jobNft.address);
    await soulControler.setTreasury(TREASURY);
    await equipmentNft.setTreasury(TREASURY);

    // Set Calc-Contracts
    console.log('Calculator LootByRogueV2 is... ', CALC_LOOTBYROGUE);
    await soulMinter.setCalcContract(SAMPLE_LOOT, CALC_LOOTBYROGUE);

    // Set AWS-PrivateKey-to-SoulControler&Minter
    let tx;
  tx = await soulMinter.setDeveloperRole(process.env.dev00);
  await tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev01);
  await tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev02);
  await tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev03);
  await tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev04);
  await tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev05);
  await tx.wait();
  tx = await soulMinter.setDeveloperRole(process.env.dev06);
  await tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev07);
  await tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev08);
  await tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev09);
  await tx.wait();
  console.log('set:', tx);

  tx = await soulControler.setDeveloperRole(process.env.dev00);
  await tx.wait();
  console.log('set:', tx);
  tx = await soulControler.setDeveloperRole(process.env.dev01);
  await tx.wait();
  tx = await soulControler.setDeveloperRole(process.env.dev02);
  await tx.wait();
  tx = await soulControler.setDeveloperRole(process.env.dev03);
  await tx.wait();
  tx = await soulControler.setDeveloperRole(process.env.dev04);
  await tx.wait();
  tx = await soulControler.setDeveloperRole(process.env.dev05);
  await tx.wait();
  tx = await soulControler.setDeveloperRole(process.env.dev06);
  await tx.wait();
  tx = await soulControler.setDeveloperRole(process.env.dev07);
  await tx.wait();
  tx = await soulControler.setDeveloperRole(process.env.dev08);
  await tx.wait();
  tx = await soulControler.setDeveloperRole(process.env.dev09);
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
