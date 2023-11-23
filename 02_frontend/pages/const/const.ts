import { defineChain } from 'viem'

export const RPC_URL = {
  POLYGON_MUMBAI:
    'https://polygon-mumbai.g.alchemy.com/v2/Y4KiBGzasGxB9NIVjniYgU_O1zjmuNGH',
  MCH_TESTNET:
    'https://rpc.oasys.sand.mchdfgh.xyz/'
};
  
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const MCH_TESTNET = defineChain({
  id: 420,
  name: 'MCH Verse (Testnet)',
  network: 'mch-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Oasys',
    symbol: 'OAS',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.oasys.sand.mchdfgh.xyz/'],
    },
    public: {
      http: ['https://rpc.oasys.sand.mchdfgh.xyz/'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.oasys.sand.mchdfgh.xyz/' },
  },
})