* スマートコントラクトと直接連携 -> eventのJSONが見える状況にする
  * スマートコントラクトを整える
    * SoulMinterでの生成処理でエラーが発生（ローカルで要検証）
  * デモ用のフロントエンドのソースコードに反映する
    * ABIの反映 -> 20_frontend/29_Demo/loot-adventure-demo/components/abi 
    * コントラクトアドレスの反映 -> 20_frontend/29_Demo/loot-adventure-demo/config.ts
    * コントラクト実行＆出力の処理反映 -> 20_frontend/29_Demo/loot-adventure-demo/pages/index.tsx

* theGraphの用意
  * AWSのサンプルからのブロックチェーンノードを外す
  * AWSのサンプルをデプロイする
  * SubGraphを作る
  * SubGraphを叩くAPIを作る

* APIで取得・実行するもの
  * 空のLamgdaを作る
    *  30_backenc/01_AWS/src/ にサンプルデータのJSONだけ返すソースコードを作る
    *  30_backenc/01_AWS/lib/ loot-adventure-stack.ts でLambdaと、API Gatewayの設定を行う
  * API GatewayからSwagger作る
  * 空のLambdaにおいてロジックを書き込む
  
* 連携部分
  * バックエンド部分に変更点はあまりない
    * 全体のフローは変わらない。但し一部、Webに置き換えるかもしれない
    * 例えば、SoulLootの変換ページ 等（アセット管理はWebで作るイメージ）
    * よって、ゲームの中で確実に
  * Unity空の連携パターン
    * Rest API ※なるべくこちら
    * GraphQL ※次にこちら
    * TxのEvent検知
      * UnityでTxを起こせる想定
  