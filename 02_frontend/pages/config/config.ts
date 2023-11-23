import { Address } from 'viem';

export const NEXT_PUBLIC_PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
export const NEXT_PUBLIC_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;

export const NEXT_ERC6551_REGISTRY = process.env.NEXT_PUBLIC_ERC6551_REGISTRY as Address;
export const NEXT_ERC6551_ACCOUNT = process.env.NEXT_PUBLIC_ERC6551_ACCOUNT as Address;
export const NEXT_NFT_CONTRACT = process.env.NEXT_PUBLIC_NFT_CONTRACT as Address;
export const NEXT_PUBLIC_LAUNCHPAD_CONTRACT = process.env.NEXT_PUBLIC_LAUNCHPAD_CONTRACT as Address;