import { defineChain } from 'viem'
 
export const mchVerceTestnet = defineChain({
  id: 420,
  name: 'MCH-Verce Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Oasys',
    symbol: 'OAS',
  },
  network: 'MCH-Verce Testnet',
  rpcUrls: {
    default: {
        http: ['https://rpc.oasys.sand.mchdfgh.xyz/']
    },
    public:{
        http: ['https://rpc.oasys.sand.mchdfgh.xyz/']
    }
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.oasys.sand.mchdfgh.xyz/' },
  },
})