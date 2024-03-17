import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mchVerce } from './config/custom_chains/mch-verce';
import { RPC_URL, ZERO_ADDRESS } from './const/';
  
const secret_name = process.env.SSM_NAME;

const client = new SecretsManagerClient({
    region: "ap-northeast-1",
});

export const handler = async (event: Event) => {
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

    // Execute Tx(Mint XP ERC20 Token)
    const publicClient = createPublicClient({
        chain: mchVerce,
        transport: http(RPC_URL.MCHVERCE_TESTNET),
    });
    const account = privateKeyToAccount(secret['0']);
    const wallet = createWalletClient({
        account,
        chain: mchVerce,
        transport: http(RPC_URL.MCHVERCE_TESTNET),
    });
    console.log(wallet.account);
    // const { request } = await publicClient.simulateContract({
    //     address: ERC6551_REGISTRY,
    //     abi: erc6551RegistryAbi,
    //     functionName: 'createAccount',
    //     account,
    //     args: [ERC6551_ACCOUNT, chainId, NFT_CONTRACT, tokenId, salt, initData],
    //   });
    //   await wallet.writeContract(request);
}
  

// export const handler = async (event: Event) => {
    // // Secrets Manager から値を取得
    // const responseSM = await axios.get(requestEndpoint, requestOptions);
    // console.log(responseSM);
    // // const jsonSecret = JSON.parse(responseSM.data["SecretString"]);
// }