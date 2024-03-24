import { ethers } from 'hardhat';
import { soulMinterAbi } from '../abi/soul-minter-abi';
import { soulControlerAbi } from '../abi/soul-controler-abi';
import { SOUL_MINTER, SOUL_CONTROLER } from '../config';

async function main() {
  const [signer] = await ethers.getSigners();
  const wallet = new ethers.Wallet('0x47f14a2abdd4c9b09539d07abd17bbdecc2bac969cad70a7af55cabcc92a4caf', signer.provider);
  console.log('Signer is ... ', wallet.address);
  console.log(signer.provider)

  // Set Contract
  const soulMinter = new ethers.Contract(SOUL_MINTER, soulMinterAbi, wallet);

  let tx;
  tx = await soulMinter.mintXp(wallet.address, 10000, 'TEXT');
  tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
