import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mchVerceTestnet } from "./config/custom_chains/mch-verce-testnet";
import { RPC_URL, ZERO_ADDRESS } from './const/';
import { soulControlerAbi } from "./abi/soul-controler-abi";
  
const secret_name = process.env.SSM_NAME;
const ADDRESS_SOUL_CONTROLER = process.env.ADDRESS_SOUL_CONTROLER as `0x${string}`;

const client = new SecretsManagerClient({
    region: "ap-northeast-1",
});

interface EventParams {
    "userId": string
}

export const handler = async (event: EventParams) => {
    console.log('event is...', event);

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
    console.log(secret);

    // Execute Tx(TransferFrom EequipmentNFT from player)
    const publicClient = createPublicClient({
        chain: mchVerceTestnet,
        transport: http(RPC_URL.MCHVERCE_TESTNET),
    });
    const account = privateKeyToAccount(secret['0']);
    const wallet = createWalletClient({
        account,
        chain: mchVerceTestnet,
        transport: http(RPC_URL.MCHVERCE_TESTNET),
    });

    console.log('Soul Controler is: ', ADDRESS_SOUL_CONTROLER);
    console.log('TBA is : ', event.userId)
    const { request } = await publicClient.simulateContract({
        address: ADDRESS_SOUL_CONTROLER,
        abi: soulControlerAbi,
        functionName: 'seizureEquipment',
        account,
        args: [event.userId],
    });
    await wallet.writeContract(request);
}