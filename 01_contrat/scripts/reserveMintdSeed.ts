import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`deployer: ${deployer.address}`);

  const contract = await ethers.getContractAt(
    'LootByRogueV2',
    '0x923c69439423eC3d02693f792285e98B26EA126e',
    deployer
  );
  const seeds = [
    '84054192288976377040358785258483499681251286543540812536269700059881645144647',
    '84289654771220314805559329890671032773166627606855932102688522502095880533535',
    '32876910080986647030855407361833684621840132311120637866624328750638244269097',
    '3816704622620121301797969132160539241793954615833161296679934555765055071664',
    '46795793197248584966740490139956725404881371641094192820754531849452145730963',
  ];
  await contract.connect(deployer).reserveV1MintdSeed(seeds);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
