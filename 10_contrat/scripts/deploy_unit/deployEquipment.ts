import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import { SAMPLE_LOOT, SOUL_CONTROLER, SOUL_MINTER, COIN_FT } from '../config';
import { soulMinterAbi } from '../abi/soul-minter-abi';
import { soulControlerAbi } from '../abi/soul-controler-abi';

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log('Deployer is ... ', deployer.address);
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
    console.log('Complete setting env-params on EquipmnetNft.sol');

    const soulMinter = new ethers.Contract(SOUL_MINTER, soulMinterAbi, deployer);
    const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, deployer);
    const tx11 = await soulMinter.setEquipmentNft(equipmentNft.address);
    const tx12 = await soulControler.setEquipmentNft(equipmentNft.address);
    tx11.wait();
    tx12.wait();
    console.log('Complete setting address of EquipmentNft on SoulControler&SoulMinter');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
