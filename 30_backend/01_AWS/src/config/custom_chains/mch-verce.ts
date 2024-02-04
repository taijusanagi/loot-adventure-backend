import { defineChain } from 'viem'
 
export const mchVerce = defineChain({
  id: 29548,
  name: 'MCH-Verce',
  nativeCurrency: {
    decimals: 18,
    name: 'Oasys',
    symbol: 'OAS',
  },
  network: 'MCH-Verce',
  rpcUrls: {
    default: {
        http: ['https://explorer.oasys.mycryptoheroes.net/'],
        webSocket: ['wss://ws.oasys.mycryptoheroes.net/']
    },
    public:{
        http: ['https://explorer.oasys.mycryptoheroes.net/']
    }
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.oasys.mycryptoheroes.net/' },
  },
})