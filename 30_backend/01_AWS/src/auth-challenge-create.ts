import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { CreateAuthChallengeTriggerHandler } from 'aws-lambda';

const client = new CognitoIdentityProviderClient({ region: 'ap-northeast-1' });

//カスタムチャレンジを生成する処理
//今回は、実質何もしてない。
export const handler: CreateAuthChallengeTriggerHandler = async (event) => {
  console.log(event);

  event.response.publicChallengeParameters = {};
  event.response.publicChallengeParameters.NEXT_ACTION =
    'respond-to-auth-challenge';

  return event;
};