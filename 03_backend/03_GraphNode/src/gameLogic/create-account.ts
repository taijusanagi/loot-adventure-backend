import { erc6551RegistryAbi } from '../abi/erc6551-registry-abi';
import {
  ERC6551_ACCOUNT,
  ERC6551_REGISTRY,
  NFT_CONTRACT,
  PRIVATE_KEY,
} from '../config';
import { RPC_URL, ZERO_ADDRESS } from '../const';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { polygonMumbai } from 'viem/chains';

export const handler = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event: APIGatewayEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http(RPC_URL.POLYGON_MUMBAI),
  });

  const account = privateKeyToAccount(PRIVATE_KEY);
  const wallet = createWalletClient({
    account,
    chain: polygonMumbai,
    transport: http(RPC_URL.POLYGON_MUMBAI),
  });

  const chainId = polygonMumbai.id;
  const tokenId = event.queryStringParameters?.tokenId;
  const salt = 1;
  const initData = ZERO_ADDRESS;
  const { request } = await publicClient.simulateContract({
    address: ERC6551_REGISTRY,
    abi: erc6551RegistryAbi,
    functionName: 'createAccount',
    account,
    args: [ERC6551_ACCOUNT, chainId, NFT_CONTRACT, tokenId, salt, initData],
  });
  await wallet.writeContract(request);

  // const MCHC_CONTRACT_ADDRESS = '0x895f692AeE58befAC479Bcf4D3c29117d1F583b0';
  // const to = '0x7b718D4Ce6ca83536660a314639559F3d3f6e9e3';
  // const data = encodeFunctionData({
  //     abi: mchcAbi,
  //     functionName: 'transfer',
  //     args: [to, parseEther('0.000001')],
  //   })
  // const { request } = await publicClient.simulateContract({
  //     address: '0xE98C0269DE10A2Bc1f86523196ed18A3c969F74A',
  //     abi: erc6551AccountAbi,
  //     functionName: 'executeCall',
  //     account,
  //     args: [MCHC_CONTRACT_ADDRESS, 0 ,data],
  // })
  // //console.log(request);
  // await wallet.writeContract(request);

  // const tba = await publicClient.readContract({
  //     address: registry,
  //     abi: erc6551RegistryAbi,
  //     functionName: 'account',
  //     args: [
  //         implementation,
  //         chainId,
  //         tokenContract,
  //         tokenId,
  //         1,
  //         '0x0000000000000000000000000000000000000000'
  //     ],
  //   })
  // console.log(tba)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: request,
    }),
  };
};