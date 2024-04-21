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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
