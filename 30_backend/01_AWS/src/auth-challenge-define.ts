import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { DefineAuthChallengeTriggerHandler } from 'aws-lambda';

const client = new CognitoIdentityProviderClient({ region: 'ap-northeast-1' });

// 最初に呼ばれる関数
export const handler: DefineAuthChallengeTriggerHandler = async (event) => {
  console.log(event);

  if (event.request.session.length > 0) {
    //session.length > 0 ということは、呼ばれたのが2度目以降。つまり、認証情報処理後のはず。
    if (
      event.request.session[event.request.session.length - 1].challengeResult
    ) {
      // 認証成功
      event.response.issueTokens = true;
      event.response.failAuthentication = false;
    } else {
      // 認証失敗
      event.response.issueTokens = false;
      event.response.failAuthentication = true;
    }
  } else {
    // 初回呼び出し時は、カスタムチャレンジを実施
    event.response.issueTokens = false;
    event.response.failAuthentication = false;
    event.response.challengeName = 'CUSTOM_CHALLENGE';
  }

  console.log(event.response);
  return event;
};