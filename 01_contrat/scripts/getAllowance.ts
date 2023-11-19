import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  const rogueAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
  const address = '';

  const contract = await ethers.getContractAt(
    'MockERC20',
    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    deployer
  );
  console.log(
    await contract.connect(deployer).allowance(address, rogueAddress)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
