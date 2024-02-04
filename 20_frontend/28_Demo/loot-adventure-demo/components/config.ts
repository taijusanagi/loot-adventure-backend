import { Address } from 'viem';

export const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY as String;
export const ERC6551_REGISTRY = process.env.NEXT_PUBLIC_ERC6551_REGISTRY as Address;
export const ERC6551_ACCOUNT = process.env.NEXT_PUBLIC_ERC6551_ACCOUNT as Address;
export const NFT_CONTRACT = process.env.NEXT_PUBLIC_NFT_CONTRACT as Address;
export const SOULLOOT_NFT = process.env.NEXT_PUBLIC_SOULLOOT_NFT as Address;

export const COGNITO_USERPOOL_ID = process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID as string;
export const COGNITO_TOKEN_USE = process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID as string;
export const COGNITO_CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID as string;