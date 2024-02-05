import { defineChain } from 'viem'

export const mchverce_testnet = defineChain({
  id: 420,
  name: 'MCHVerce-Testnet',
  network: 'MCHVerce-Testnet',
  nativeCurrency: { name: 'Oasys', symbol: 'OAS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.oasys.sand.mchdfgh.xyz/'] },
    public: { http: ['https://rpc.oasys.sand.mchdfgh.xyz/'] }
  },
  blockExplorers: {
    default: { name: 'MCHVerce Testnet', url: 'https://explorer.oasys.sand.mchdfgh.xyz/' },
  },
})

export const localHost = defineChain({
  id: 31337,
  name: 'Local-Host',
  network: 'Local-Host',
  nativeCurrency: { name: 'Ethreum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545/'] },
    public: { http: ['http://127.0.0.1:8545/'] }
  },
})