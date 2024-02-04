import { PreSignUpTriggerHandler } from 'aws-lambda';

export const handler: PreSignUpTriggerHandler = async (event) => {
  if (event.triggerSource == 'PreSignUp_SignUp') {
    /*
    ここで初回のウォレット署名を検証する処理を加える
    (ウォレットでの署名からユーザーのアドレスを確認する)
    */
    //ユーザーを認証済にする（DBへの追加は、CognitoのアクションでLambdaで実行）
    event.response.autoConfirmUser = true;
  }
  return event;
};