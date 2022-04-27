import { useState } from 'react';
import { ethers } from 'ethers';
import ABI from './abi.json';

let provider: any = null;
let signer: any = null;

export function Eth({ seed, move }: { seed: number, move: number[] }) {
  const [message, setMessage] = useState<string>('Connect');

  async function connectAndMint() {
    console.log(seed, move);

    if (!signer) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      signer = provider.getSigner();

      const accounts = await signer.getAddress();
      setMessage(`Mint Loot (${accounts.slice(0, 6)}...)`);
    } else {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x4ee5',
            rpcUrls: ['https://rpc.sandverse.oasys.games/'],
            chainName: 'Oasys SandVerse',
            nativeCurrency: {
              name: 'OAS',
              symbol: 'OAS',
              decimals: 18,
            },
            blockExplorerUrls: ['https://explorer.sandverse.oasys.games/'],
          },
        ],
      });
      const { chainId } = await provider.getNetwork();
      if (chainId === 20197) {
        const abi = ABI.abi;
        const contract = new ethers.Contract(
          '0x412c28BC8B414be12bE5F1Dcc7403ed31aCB77be',
          abi,
          signer
        );
        await contract.mint(seed, move);
      }
    }
  }

  return (
    <div>
      <button
        className="text-l font-bold text-white font-sans text-center align-middle"
        onClick={() => connectAndMint()}
      >
        {message}
      </button>
    </div>
  );
}
