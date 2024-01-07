import { ethers } from 'hardhat';
import { erc6551RegistryAbi } from './abi/erc6551-registry-abi';
import { erc6551AccountAbi } from './abi/erc6551-account-abi';
import { erc20laxpAbi } from './abi/erc20-laxp-abi';

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  // Test Prameter
  const TOKEN_ID = 1;

  // Local
  const CHAIN_ID = 31337;
  const LOOT_NFT = '0x162700d1613DfEC978032A909DE02643bC55df1A'; 

  // MCH-Verce Testnet
  // const LOOT_NFT = '0xFBaD63bAbe3C6324e6B49e15C6e87D58A0282295';
  // const CHAIN_ID = 420;
  // Astar zKatana
//   const LOOT_NFT = '0x3a0Dc7cF61F71344348713a76C23DbEE5d6AA8b5';
//   const CHAIN_ID = 1261120;
  // Polygon Mumbai
  // const LOOT_NFT = '0x76381e79B2b00B898979CD74aCE8E1def8cba005';
  // const CHAIN_ID = 80001;

  // Set Contract
  const erc6551Registry = new ethers.Contract('0xC11E32173729c5AbF46D6AdC0acb5b66174ea379', erc6551RegistryAbi, signer);
  const erc6551Account = new ethers.Contract('0xEccbcC570d29BE87e6badcabAea07C9fB6204E75', erc6551AccountAbi, signer);
  const laXp = new ethers.Contract('0x3A81ced09917adE002F269bD96014716bACC1BE2', erc20laxpAbi , signer);
  const soulLootNft = '0x47Ec97bFC4E57937087cA8B44B60DeEC860d31a4';

//   await erc6551Registry.createSoul(
//     CHAIN_ID,
//     soulLootNft,
//     20000000000,
//     4,
//     '0x0000000000000000000000000000000000000000'
//   );
//   console.log('TBA is created');

//   // (Test) executeCall TBA (transfer burn LaXp)
//   const tba = await erc6551Registry.account(
//     erc6551Account.address,
//     CHAIN_ID,
//     soulLootNft,
//     20000000000,
//     4
//   )
//   await laXp.setMinterRole(tba);
//   console.log('tba is...', tba);
//   console.log('& set Minter')
  
  // (Test) executeCall TBA (transfer burn LaXp)
  const tba = await erc6551Registry.account(
    erc6551Account.address,
    CHAIN_ID,
    soulLootNft,
    20000000000,
    4
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
  // const result = await contract.executeCall.staticCall(laXp.address, 0, funcData);
  console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
