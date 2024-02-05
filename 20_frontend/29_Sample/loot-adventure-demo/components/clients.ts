import { createPublicClient, http } from 'viem'
import {
    arbitrum,
    goerli,
    mainnet,
    optimism,
    polygon,
    base,
    polygonMumbai
} from 'wagmi/chains';
import {localHost, mchverce_testnet} from '../components/custome_chains';

export const watchClientLocal = createPublicClient({
    chain: localHost,
    transport: http()
})

export const watchClientMumbai = createPublicClient({
  chain: polygonMumbai,
  transport: http('https://polygon-mumbai.g.alchemy.com/v2/Y4KiBGzasGxB9NIVjniYgU_O1zjmuNGH')
})

export const watchClientMchTestnet = createPublicClient({
    chain: mchverce_testnet,
    transport: http('https://rpc.oasys.sand.mchdfgh.xyz/')
})