import { erc6551RegistryAbi } from './abi/erc6551-registry-abi';
import {
  ERC6551_ACCOUNT,
  ERC6551_REGISTRY,
  NFT_CONTRACT,
} from './config/index';
import { RPC_URL } from './const/index';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createPublicClient, http } from 'viem';
import { oasys } from 'viem/chains';
import { mchVerce } from './config/custom_chains/mch-verce';
import { mchVerceTestnet } from './config/custom_chains/mch-verce-testnet';

export const handler = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event: APIGatewayEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: Context,
): Promise<APIGatewayProxyResult> => {
  console.log(event);
  console.log(ERC6551_REGISTRY);
  const publicClient = createPublicClient({
    chain: mchVerceTestnet,
    transport: http(RPC_URL.POLYGON_MUMBAI),
  });

  const chainId = mchVerceTestnet.id;
  // const tokenId = event.queryStringParameters?.tokenId;
  const tokenId = 1;
  const salt = 1;
  const tba = await publicClient.readContract({
    address: ERC6551_REGISTRY,
    abi: erc6551RegistryAbi,
    functionName: 'account',
    args: [ERC6551_ACCOUNT, chainId, NFT_CONTRACT, tokenId, salt],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ tba }),
  };
};