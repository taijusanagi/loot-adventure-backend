import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { VerifyAuthChallengeResponseTriggerHandler } from 'aws-lambda';
//import { verify } from 'crypto';
import { verifyMessage } from 'viem';

const client = new CognitoIdentityProviderClient({ region: 'ap-northeast-1' });

//カスタムチャレンジの結果を検証する処理
export const handler: VerifyAuthChallengeResponseTriggerHandler = async (
  event,
) => {
  console.log(event);
  const token = event.request?.challengeAnswer; // ここに入力して貰った値が入る
  const address = event.request?.clientMetadata?.address as `0x${string}`;
  const signature = event.request?.clientMetadata?.signature as `0x${string}`;
  console.log(token);
  console.log(signature);

  // 具体的な認証処理はここに書く
  const confirmed: boolean = await verifyJwt(token, signature, address);

  //結果をセット
  event.response.answerCorrect = confirmed;

  return event;
};

// Verify Signature(JWT) signed by Wallet (ex. MetaMask)
const verifyJwt = async (
  token: string,
  signature: `0x${string}`,
  address: `0x${string}`,
): Promise<boolean> => {
  try {
    const decoded = await verifyMessage({
      address: address,
      message: token,
      signature: signature,
    });
    console.log('verifyJwt() was successful.');
    console.log(decoded);
  } catch {
    console.log('This JWT token was invalid.');
    return false;
  }
  return true;
};