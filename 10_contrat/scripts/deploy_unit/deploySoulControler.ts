import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import { SAMPLE_LOOT, SOUL_CONTROLER, SOUL_MINTER, COIN_FT, ARTIFACT_NFT, EQUIPMENT_NFT, TREASURY } from '../config';
import { soulMinterAbi } from '../abi/soul-minter-abi';
import { soulControlerAbi } from '../abi/soul-controler-abi';
import { erc1155Artifact } from '../abi/erc1155-artifact-abi';

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log('Deployer is ... ', deployer.address);
    const f1 = await ethers.getContractFactory('SoulControler', deployer);
    const soulControler = await f1.deploy();
    await soulControler.deployed();
    console.log('Deply SoulControler: ', soulControler.address);

    const f11 = await ethers.getContractFactory('EquipmentNft', deployer);
    const equipmentNft = await f11.deploy(
    'https://sample-image-la.s3.ap-northeast-1.amazonaws.com/',
    '.png'
    );
    console.log('Deply EquipmentNFT: ', equipmentNft.address);

    const tx01 = await equipmentNft.setSoulMinter(SOUL_MINTER);
    const tx02 = await equipmentNft.setSoulControler(SOUL_CONTROLER);
    const tx03 = await equipmentNft.setControlerRole(SOUL_CONTROLER);
    const tx04 = await equipmentNft.setNftId(SAMPLE_LOOT);
    const tx05 = await equipmentNft.setCoin(COIN_FT);
    tx01.wait();
    tx02.wait();
    tx03.wait();
    tx04.wait();
    tx05.wait();
    console.log('Complete setting params => EquipmnetNft.sol');

    const soulMinter = new ethers.Contract(SOUL_MINTER, soulMinterAbi, deployer);
    // const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, deployer);
    const tx11 = await soulMinter.setEquipmentNft(equipmentNft.address);
    const tx12 = await soulControler.setEquipmentNft(equipmentNft.address);
    tx11.wait();
    tx12.wait();
    console.log('Complete setting address of EquipmentNft => SoulControler&SoulMinter');

    const tx21 = await soulControler.setMinterRole(SOUL_MINTER);
    const tx22 = await soulControler.setEquipmentNft(EQUIPMENT_NFT);
    const tx23 = await soulControler.setArtifactNft(ARTIFACT_NFT);
    const tx24 = await soulControler.setTreasury(TREASURY);
    tx21.wait();
    tx22.wait();
    tx23.wait();
    tx24.wait();
    console.log('Complete setting params => SoulControler.sol');
    
    const artifactNft = new ethers.Contract(ARTIFACT_NFT, erc1155Artifact, deployer);
    await artifactNft.setControlerRole(soulControler.address);
    await soulMinter.setSoulControler(soulControler.address);
    console.log('Complete setting address of SoulControler => Artifact&SoulMintet *EquipmentNft is already set above');

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
