import { ethers } from 'hardhat';
import { erc721LootByRogueV2Abi } from './abi/erc721-lootbyrogue-v2-abi';
import { erc6551RegistryAbi } from './abi/erc6551-registry-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';
import { erc20laxpAbi } from './abi/erc20-laxp-abi';

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Test Prameter
  const TOKEN_ID = 8;

  // MCH-Verce Testnet
  const LOOT_NFT = '0x923c69439423eC3d02693f792285e98B26EA126e';
  const CHAIN_ID = 420;

  // Set Contract
  const lootByRogue = new ethers.Contract(LOOT_NFT, erc721LootByRogueV2Abi, signer);
  const erc6551Registry = new ethers.Contract('0x10D81406c7cEF3D1ea7c145c973F2EbBeB4F9Fa7', erc6551RegistryAbi, signer);
  const erc6551Account = new ethers.Contract('0x77168500cc113C866FFaEf32AD2AA00ec1A299ed', erc6551AccountAbi, signer);
  const laXp = new ethers.Contract('0x4157043EDB1d2257D246ce186E8564dC5548BF82', erc20laxpAbi , signer);

  const owner = await lootByRogue.ownerOf(TOKEN_ID);
  console.log('owner is...', owner);
  
  console.log(erc6551Account.address);
  await erc6551Registry.createSoul(
    CHAIN_ID,
    lootByRogue.address,
    TOKEN_ID,
    10,
    '0x0000000000000000000000000000000000000000'
  );
  console.log('TBA is created');

//   await erc6551Registry.createAccount(
//     erc6551Account.address,
//     CHAIN_ID,
//     lootByRogue.address,
//     TOKEN_ID,
//     10,
//     '0x0000000000000000000000000000000000000000'
//   );

  const tba = await erc6551Registry.account(
    erc6551Account.address,
    CHAIN_ID,
    lootByRogue.address,
    TOKEN_ID,
    7
  );

  const tbaContract = new ethers.Contract(tba, erc6551AccountAbi,signer);
  await laXp.setMinterRole(tba);
  console.log('tba is...', tba);
  console.log('& set Minter')

  const iface = new ethers.utils.Interface(erc20laxpAbi)
  const funcData = iface.encodeFunctionData("burn", [
    tba,
    1000,
    'LA001|Use XpToken'
  ])

  const result = await tbaContract.executeCall(laXp.address, 0, funcData);
  console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
