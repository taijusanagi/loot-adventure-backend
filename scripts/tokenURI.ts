import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer: ${deployer.address}`);

  const contract = await ethers.getContractAt(
    'LootByRogue',
    '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    deployer
  );
  console.log(await contract.connect(deployer).tokenURI(1));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
