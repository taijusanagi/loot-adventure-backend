import { ethers } from 'hardhat';
import { erc20lacoinAbi } from './abi/erc20-lacoin-abi';
import { erc1155Equipment } from './abi/erc1155-equipment-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';
import { EQUIPMENT_NFT, COIN_FT } from './config';

const tba = "0x6F15161247859AA0bfCE7F0887ED09A2a71A6628";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Set Contract
  const laXp = new ethers.Contract(COIN_FT, erc20lacoinAbi, signer);
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

  const tx00 = await equipment.getAmountByToken(20000010001000);
  console.log(tx00.toString());

  const txData = equipment.interface.encodeFunctionData('levelUp', [
    20000010001000
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
