import { ethers } from 'hardhat';
import { erc20laxpAbi } from './abi/erc20-laxp-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';
import { XP_FT, EQUIPMENT_NFT } from './config';
import { parseEther } from 'ethers/lib/utils';

const tba = "0xBA69869A0d134311C1dA25e812BDe3c452e87864";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Set Contract
  const laXp = new ethers.Contract(XP_FT, erc20laxpAbi, signer);
  const tbaContract = new ethers.Contract(tba, erc6551AccountAbi, signer);

  laXp.once('Approval', (owner, to, amount) => {
    console.log('Approve from ', owner);
    console.log('To: ', to);
    console.log('Token amount: ', amount.toString());
  })

  const txData = laXp.interface.encodeFunctionData('approve', [
    EQUIPMENT_NFT, 
    parseEther("100")
  ]);
  const tx = await tbaContract.executeCall(XP_FT, 0, txData);
  tx.wait();

  const tx02 = await laXp.balanceOf(tba);
  console.log(tx02);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
