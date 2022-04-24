// import Web3 from 'web3';
import { ethers } from 'ethers';

let provider: any = null;
let signer: any = null;
let accounts: any = null;

export function Eth({ seed, move }: { seed: number, move: number[] }) {
  async function connect() {
    if (!provider) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      signer = provider.getSigner();
    }

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

    if (!accounts) {
      accounts = await signer.getAddress();
      console.log(`Wallet address: ${accounts}`);
      console.log(`Wallet address: ${accounts[0].toLowerCase()}`);
    }
  }

  function hoge() {
    console.log(seed, move);
  }

  return (
    <div>
      {/* <button onClick={() => connect()}>Mint Loot</button> */}
      <button
        className="text-l font-bold text-white font-sans text-center align-middle"
        onClick={() => hoge()}
      >
        Mint Loot
      </button>
    </div>
  );
}
