import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mchVerceTestnet } from "./config/custom_chains/mch-verce-testnet";
import { RPC_URL, ZERO_ADDRESS } from './const/';
import { soulMinterAbi } from "./abi/soul-minter-abi";
  
const secret_name = process.env.SSM_NAME;
const ADDRESS_COIN_TOKEN = process.env.ADDRESS_COIN_TOKEN as `0x${string}`;
const ADDRESS_SOUL_MINTER = process.env.ADDRESS_SOUL_MINTER as `0x${string}`;

const client = new SecretsManagerClient({
    region: "ap-northeast-1",
});

interface EventParams {
    "userId": string,
    "amount": string,
    "detail": string
}

export const handler = async (event: EventParams) => {
    console.log(event);
    // Get SecretKey from Secret Maneger
    let response;
    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
    } catch (error) {
        throw error;
    }
    const secret = JSON.parse(response.SecretString as string);

    // Execute Tx(Mint COIN ERC20 Token)
    const publicClient = createPublicClient({
        chain: mchVerceTestnet,
        transport: http(RPC_URL.MCHVERCE_TESTNET),
    });

    const keyIndex = Math.floor(Math.random() * (11))
    const account = privateKeyToAccount(secret[keyIndex]);
    // const account = privateKeyToAccount(secret[0]);
    const wallet = createWalletClient({
        account,
        chain: mchVerceTestnet,
        transport: http(RPC_URL.MCHVERCE_TESTNET),
    });

    const { request } = await publicClient.simulateContract({
        address: ADDRESS_SOUL_MINTER,
        abi: soulMinterAbi,
        functionName: 'mintCoin',
        account,
        args: [event["userId"], parseEther(String(event["amount"])), event["detail"]],
    });
    await wallet.writeContract(request);
}