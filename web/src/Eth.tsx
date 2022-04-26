import { useState } from 'react';
import { ethers } from 'ethers';

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
      console.log(accounts);
      setMessage(`Mint Loot (${accounts.slice(0, 6)}...)`);
    } else {
      // await window.ethereum.request({
      //   method: 'wallet_addEthereumChain',
      //   params: [
      //     {
      //       chainId: '0x4ee5',
      //       rpcUrls: ['https://rpc.sandverse.oasys.games/'],
      //       chainName: 'Oasys SandVerse',
      //       nativeCurrency: {
      //         name: 'OAS',
      //         symbol: 'OAS',
      //         decimals: 18,
      //       },
      //       blockExplorerUrls: ['https://explorer.sandverse.oasys.games/'],
      //     },
      //   ],
      // });
      const { chainId } = await provider.getNetwork();
      // if (chainId === 20197) {
      //   console.log('ok');
      // }
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
