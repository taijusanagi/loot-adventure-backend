import { ethers } from 'hardhat';
import { erc20laxpAbi } from './abi/erc20-laxp-abi';
import { erc1155Equipment } from './abi/erc1155-equipment-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';
import { EQUIPMENT_NFT, XP_FT } from './config';

const tba = "0xc3F17f4eDe40b31cA43E7DF7a05C311CC48AaB09";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Set Contract
  const laXp = new ethers.Contract(XP_FT, erc20laxpAbi, signer);
  const tbaContract = new ethers.Contract(tba, erc6551AccountAbi, signer);
  const equipment = new ethers.Contract(EQUIPMENT_NFT, erc1155Equipment, signer);

  equipment.once('updateEquipment', (tokenId, seed, name, type, rAddress, rTokenId, rarity, level) => {
    console.log('Equipment NFT');
    console.log('tokenId: ', tokenId.toString());
    console.log('name:' ,name);
    console.log('type:', type.toString());
    console.log('rarity: ', rarity.toString());
    console.log('level: ', level.toString());
  })

  const txData = equipment.interface.encodeFunctionData('levelUp', [
    20000000001
  ]);
  const tx = await tbaContract.executeCall(EQUIPMENT_NFT, 0, txData);
  tx.wait();

  const tx02 = await laXp.balanceOf(tba);
  console.log('Balance is :', tx02.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
