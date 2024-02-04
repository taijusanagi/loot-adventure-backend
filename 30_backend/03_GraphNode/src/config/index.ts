import { Address } from 'viem';

export const PRIVATE_KEY = process.env.PRIVATE_KEY as Address;
export const ERC6551_REGISTRY = process.env.ERC6551_REGISTRY as Address;
export const ERC6551_ACCOUNT = process.env.ERC6551_ACCOUNT as Address;
export const NFT_CONTRACT = process.env.NFT_CONTRACT as Address;

export const COGNITO_USERPOOL_ID = process.env.COGNITO_USERPOOL_ID as string;
export const COGNITO_TOKEN_USE = process.env.COGNITO_USERPOOL_ID as string;
export const COGNITO_CLIENT_ID = process.env.COGNITO_USERPOOL_ID as string;