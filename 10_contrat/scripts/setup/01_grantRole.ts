import { ethers } from 'hardhat';
import { soulMinterAbi } from '../abi/soul-minter-abi';
import { soulControlerAbi } from '../abi/soul-controler-abi';
import { SOUL_MINTER, SOUL_CONTROLER } from '../config';

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);
  console.log(SOUL_MINTER)

  // Set Contract
  const soulMinter = new ethers.Contract(SOUL_MINTER, soulMinterAbi, signer);
  const soulControler = new ethers.Contract(SOUL_CONTROLER, soulControlerAbi, signer);

  let tx;
  tx = await soulMinter.setDeveloperRole(process.env.dev00);
  tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev01);
  tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev02);
  tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev03);
  tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev04);
  tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev05);
  tx.wait();
  tx = await soulMinter.setDeveloperRole(process.env.dev06);
  tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev07);
  tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev08);
  tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev09);
  tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev01);
  tx.wait();
  console.log('set:', tx);
  tx = await soulMinter.setDeveloperRole(process.env.dev01);
  tx.wait();
  console.log('set:', tx);

  tx = await soulControler.setDeveloperRole(process.env.dev00);
  tx.wait();
  console.log('set:', tx);
  tx = await soulControler.setDeveloperRole(process.env.dev01);
  tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
