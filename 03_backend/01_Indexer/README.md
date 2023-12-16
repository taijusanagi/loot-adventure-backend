# Indexerのセットアップ手順

## 環境セットアップ
1. Nodeを立ち上げる
   1. 環境変数を設定
    ```
    #.env
    NETWORK="oasys_mchverce_testnet"
    RPC_URL="https://rpc.oasys.sand.mchdfgh.xyz/"
    ```
   2. Postgreの立ち上げ
    ```bash
    docker-compose up postgres
    ```
   3. IPFSデータディレクトリを初期化する（初回のみ）
    ```bash
    docker-compose run --rm --entrypoint ipfs ipfs init
    ```
   4. IPFSの設定ファイルを修正する(./data/ipfs/configを修正する。)
    * 他のノードとの接続を防ぐ
        ```bash
        # before
        "Bootstrap": [
        // list of bootstrap nodes
        ]

        # after
        "Bootstrap": null
        ```
    * 外部からのAPIアクセスを許可する。
        ```bash
        # before
        "Addresses": {
            "API": "/ip4/127.0.0.1/tcp/5001"
        }

        # after
        "Addresses": {
            "API": "/ip4/0.0.0.0/tcp/5001"
        }
        ```
    * IPFSを実行する
        ```bash
        docker-compose up ipfs
        ```
   5. Graph Nodeの実行
    ```bash
    docker-compose up graph
    ```

2.  Subgraphを作成する
    * graph-cliのインストール（初回のみ）
        ```bash
        npm install -g @graphprotocol/graph-cli
        graph -v
        ```
    * Subgraphのデプロイ
        ```bash
        # 変数の設定
        CONTRACT_NAME=ERC6551Registry
        CONTRACT_ADDRESS=0xdE6A30B7763861E9460B3C4E19B757e65A7a0Ea7
        CONTRACT_ABI=./data/subgraph/abi/ERC6551Registry.json
        SUBGRAPH_NAME=Erc6551RegistryIndex
        SUBGRAPH_DIR=./data/subgraph/erc6551Registry
        ```

        ```bash
        # Subgraphの作成
        graph init $USER/$SUBGRAPH_NAME $SUBGRAPH_DIR \
        --node http://127.0.0.1:8020 \
        --protocol ethereum \
        --network mainnet \
        --contract-name $CONTRACT_NAME \
        --from-contract $CONTRACT_ADDRESS \
        --abi $CONTRACT_ABI \
        --index-events
        ```
    * 作業ディレクトリを変更
        ```bash
        cd $SUBGRAPH_DIR
        ```
 
3. マニュフェストファイルの修正
   * subgraph.yamlを修正
    ```
    # before
    network: mainnet

    # after
    network: '<Set the $NETWORK value in the .env>'
    ``` 
4. Subraphのデプロイ（SubgraphをIndexerに登録する）
    ```bash
    npm run create-local
    npm run deploy-local
    ```

## クエリの実行
* 次に、開発用クエリエディタ（GraphiQL）を開き、クエリを実行します。
* エディターのURLはデプロイ時にQueries (HTTP)として表示されます。
* (例: http://localhost:8000/subgraphs/name/{username}/{subgraph_name})

## フロントエンドからの実行

## 参考
* [X](https://zenn.dev/jy8752/articles/4801c60aab3d3e)
* [x](https://docs.astar.network/docs/build/integrations/indexers/thegraph)
* [X](https://github.com/atakedemo/thegragh-astar-and-oasys/blob/main/README.md)
* [Gaiaxによる解説](https://gaiax-blockchain.com/how-to-create-subgraph)
* [OasysチェーンをThe Graphで取得するドキュメントの翻訳](https://qiita.com/MoriKeigoYUZU/items/a808ae807361e2327f58)