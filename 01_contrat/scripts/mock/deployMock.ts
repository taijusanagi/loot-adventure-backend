import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  //   const receipt = deployer.address;
  const receipt = '0x7b718D4Ce6ca83536660a314639559F3d3f6e9e3';
  console.log('Signer is set!!!!!!!!!');

  const f1 = await ethers.getContractFactory('TestNft', deployer);
  const testNft = await f1.deploy();
  await testNft.deployed();
  console.log('deployed TestNft to:', testNft.address);

  const f2 = await ethers.getContractFactory('MockERC20', deployer);
  const erc20 = await f2.deploy();
  await erc20.deployed();
  console.log('deployed erc20 to:', erc20.address);

  const f3 = await ethers.getContractFactory('ERC6551Account', deployer);
  const erc6551Account = await f3.deploy();
  await erc6551Account.deployed();
  console.log('deployed ERC6551Account to:', erc6551Account.address);

  const f4 = await ethers.getContractFactory('ERC6551Registry', deployer);
  const erc6551Registry = await f4.deploy();
  await erc6551Registry.deployed();
  console.log('deployed ERC6551Registry to:', erc6551Registry.address);
  await erc6551Registry.setLootNft(testNft.address);
  console.log('LootNFT is set!!!', testNft.address);
  // Token Bound Account Register
  for (let i = 1; i < 6; i++) {
    await testNft.safeMint(receipt, i);
    console.log('NFT is minted');
    await erc6551Registry.createAccount(
      erc6551Account.address,
      1261120,
      testNft.address,
      i,
      1,
      '0x0000000000000000000000000000000000000000'
    );
    console.log('TBA Created');
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
