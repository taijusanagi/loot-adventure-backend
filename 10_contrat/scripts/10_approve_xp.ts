import { ethers } from 'hardhat';
import { erc20lacoinAbi } from './abi/erc20-lacoin-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';
import { erc1155Job } from './abi/erc1155-job-abi';
import { COIN_FT, EQUIPMENT_NFT, JOB_NFT } from './config';
import { parseEther } from 'ethers/lib/utils';

const tba = "0x144f1af22202Fd8901ca50Bd05e27F85867a5D87";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Set Contract
  const laXp = new ethers.Contract(COIN_FT, erc20lacoinAbi, signer);
  const tbaContract = new ethers.Contract(tba, erc6551AccountAbi, signer);
  const job = new ethers.Contract(JOB_NFT, erc1155Job, signer)

  // laXp.once('Approval', (owner, to, amount) => {
  //   console.log('Approve from ', owner);
  //   console.log('To: ', to);
  //   console.log('Token amount: ', amount.toString());
  // })

  // const txData = laXp.interface.encodeFunctionData('approve', [
  //   EQUIPMENT_NFT, 
  //   parseEther("1000")
  // ]);
  // const tx = await tbaContract.executeCall(COIN_FT, 0, txData);
  // tx.wait();

  // const tx02 = await laXp.balanceOf(tba);
  // console.log(tx02);

  const tx03 = await job.getJobType(20000001);
  console.log(tx03);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
