import { ethers } from 'hardhat';

const tba = "0x1f03aE8DCC76d2E5dD4bf4Bcef872f9cDF017626";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log('Signer is ... ', signer.address);

  const abi = [
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "nft_",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId_",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data_",
            "type": "bytes"
          }
        ],
        "name": "calcArtifact",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "_seed",
            "type": "uint256"
          },
          {
            "internalType": "uint256[]",
            "name": "_artifactType",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
  ]
  // Set Contract
  const calc = new ethers.Contract("0x1f911f5c5198D5e497417d1A0c3B2B65850b641B", abi, signer);

  const tx = await calc.calcArtifact("0x1020B0e03C054900Ed0A6db7b0AFa82a38934E19", 50, "0x0000000000000000000000000000000000000000");
  console.log(tx);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
