# Subgraph(the graph)のデプロイ

## Step
1. AWS CDKのセットアップ
   ```bash
   npm install -g aws-cdk && cdk --version
   ```

   ```bash
   cdk bootstrap aws://<YOUR-AWS-ACCOUNT-NUMBER>/<REGION>
   ```
2. Graph Nodeのデプロイ
   1. ライブラリのインストール
        ```bash
        npm install
        ```

   2. cdk.jsonを編集して開発用の端末からのアクセスを設定する
        * [whatsmyip.org](https://www.whatsmyip.org/)で自身の外部IPを検索する
        * X
        ```
        {
            "app": "node bin/the_graph-service.js",
            "watch": { 
                # ...
                # lots of stuff omitted 
            },
            "context": {
                # ...
                # more stuff omitted 
                "clientUrl": "<BLOCKCHAIN NODE URL>",
                "chainId": 1,
                "allowedIP": "<DEV MACHINE EXTERNAL IP>",
                "allowedSG": "<SECURITY GROUP ID>"
                "apiKey": "secretToken"
            }
        }
        ```
   3. スタックの作成｜graph node
       ```bash
       cdk list
       cdk deploy TheGraphServiceStack
       ``` 

3. Subgraphのデプロイ
   1. graph-cliのインストール
        ```bash
        npm install -g @graphprotocol/graph-cli
        npm install -g --dev @graphprotocol/graph-ts
        ```
   2. サンプル Subgraphのディレクトリへ移動＆ライブラリインストール
      ```bash
      cd subgraph/boredApes
      npm install
      ```
    3. Subgraphをデプロイ
        ```bash
        # Subgraphのビルド
        graph codegen

        # Subgraphをgraphノード上で作成
        graph create --node http://<IP OF GRAPH NODE EC2>:8020/BoredApeYachtClub

        # graphノード上でSubgraphをデプロイ
        graph deploy --node http://<IP OF GRAPH NODE EC2>:8020/ --ipfs http://<IP OF GRAPH NODE EC2>:5001/ BoredApeYachtClub
        ```
 4.  Subgraphによるクエリの実行
        ```bash
        curl --location '<API Gateway Invoke URL>subgraphs/name/BoredApeYachtClub' \
        --header 'Content-Type: application/json' \
        --header 'authorization: secretToken' \
        --data '{"query":"query getHolders { accounts(first: 100) { id tokens } }","variables":{}}'
        ```

5. Cleaup
   ```bash
   cdk destroy
   ```        

## Reference
* [aws-graph-blockchain-indexer](https://github.com/aws-samples/aws-graph-blockchain-indexer/tree/main)
* [Gain insights from Web3 data with The Graph and Amazon Managed Blockchain](https://aws.amazon.com/jp/blogs/database/gain-insights-from-web3-data-with-the-graph-and-amazon-managed-blockchain/)
