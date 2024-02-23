# LootAdventure|Backend

## Path
```
30-backend
├── 01_AWS          # API、DB for Game Logic（AWS-CDK, Typescript）
├── 02_SubGraph     # Indexer for on-chain transaction (theG raph)
├── 03_GraphNode    # Instances for indexer (AWS-CDK, Typescript)
├── README.md
```
※ 03_GraphNode: Only use for Dev&QA environment 

## Setup | 01_AWS
* X

## Setup | 03_GraphNode
* Install npm libraries
  * In [03_GraphNode](./03_GraphNode) directory, execute this command
    ```bash
    npm install
    ```
* Eet .env file
  * Edit environment variables
    ``` .env
    # CLIENT_URL=http://localhost:8545
    # RPC_URL for blockchain(CHAIN_ID)
    CLIENT_URL= https://xxx.g.alchemy.com/v2/...
    ALLOWED_IP="XXX.XXX.XXX.XXX"
    ALLOWED_SG=""
    LOG_LEVEL=info
    CHAIN_ID=420
    API_KEY=secretToken
    # BLOCKCHAIN_INSTANCE_TYPE=bc.m5.xlarge
    GRAPH_INSTANCE_TYPE=t3a.xlarge
    AWS_ACCOUNT=581784737767
    AWS_REGION='ap-northeast-1'
     ```
  * Get IPv4 address set in 'ALLOWED_IP' from [whatsmyip.org](https://www.whatsmyip.org/) 
* Edit chainId setting
  * Edit chainId mapping in [theGraphCluster-construct.js](./03_GraphNode/lib/theGraphCluster-construct.js)
    ```Javascript
    ...
    // Map from chainId to networkName
    const networkNames = new Map([
      [1, 'mainnet'],
      [3, 'ropsten'],
      [4, 'rinkeby'],
      [5, 'goerli'],
      [137, 'matic'],
      [420, 'mchverce-testnet'],
      [80001, 'mumbai'],
      [11155111, 'sepolia'],
    ])
    ```

* Install CDK & Init account info
    ```bash
    npm install -g aws-cdk && cdk --version
    cdk bootstrap aws://<YOUR-AWS-ACCOUNT-NUMBER>/<REGION>
    ```
* Build & list-up cdk stacks
    ```bash
    cdk list
    # > TheGraphServiceStack
    ```
* Deploy stacks (Graph Node)
    ```
    cdk deploy TheGraphServiceStack
    ```
* X


## Setup | 02_SubGraph
* Build SubGraph
  * Install npm libraries
    ```bash
    npm install -g @graphprotocol/graph-cli
    ```

### Create SubGraph
 * Install graph-cli（Only initial）
        ```bash
        npm install -g @graphprotocol/graph-cli
        graph -v
        ```
  * Deploy Subgraph
    * Setup environment by execute this command
      ```bash
      CONTRACT_NAME=ERC6551Registry
      CONTRACT_ADDRESS=0x95438dE9fe674d3678f3890adf1AB09b8c21cC82
      CONTRACT_ABI=./data/subgraph/abi/ERC6551Registry.json
      SUBGRAPH_NAME=LootAdventureIndex
      SUBGRAPH_DIR=./data/subgraph/lootAdventure
      ```
    * Create Subgraph
      ```bash
      graph init $USER/$SUBGRAPH_NAME $SUBGRAPH_DIR \
      --node http://127.0.0.1:8020 \
      --protocol ethereum \
      --network mainnet \
      --contract-name $CONTRACT_NAME \
      --from-contract $CONTRACT_ADDRESS \
      --abi $CONTRACT_ABI \
      --index-events
      ```
    * Move to execute directory
      ```bash
      cd $SUBGRAPH_DIR
      ```

  * Config manifest file
     * Edit [subgraph.yaml](./02_SubGraph/data/subgraph/lootAdventure/subgraph.yaml)
        ```
        # before
        network: mainnet

        # after
        network: '<Set the $NETWORK value in the .env(ex. mchverce)>'
        ``` 
  * Build Subgraph (Execute under [a SubGraph directory](./02_SubGraph/data/subgraph/lootAdventure/))
    ```bash
    cd data/subgraph/lootAdventure/
    graph codegen
    ```
  * Create Subgraph（register Subgraph to node）
        ```bash
        # Create to host environment (on AWS ECS)
        export GRAPH_IP=$(aws ec2 describe-instances --filters 'Name=tag:Name,Values=TheGraphServiceStack/GraphCluster/nodeClientLaunchTemplate' --query  'Reservations[0].Instances[0].PublicIpAddress' --output text)
        export SUBGRAPH_NAME=$SUBGRAPH_NAME
        graph create --node http://${GRAPH_IP}:8020 ${SUBGRAPH_NAME}

        # Create to local
        npm run create-local
        ```
  * Deploy Subgraph to Node
        ```bash
        # Deploy to host environment (on AWS ECS)
        graph deploy --node http://${GRAPH_IP}:8020/ --ipfs http://${GRAPH_IP}:5001 ${SUBGRAPH_NAME}
        
        # Deploy to local
        npm run deploy-local
        ```
### Add Subgraph
* Build other Subgraph([subgraph/erc6551Registry](./02_SubGraph/data/subgraph/erc6551Registry/) directory)
    ```bash
    # example
    CONTRACT_NAME=SoulLootNft
    CONTRACT_ADDRESS=0x24eB555242b86A27876946032519C2d6fc729c43
    CONTRACT_ABI=../abi/SoulLootNft.json
    SUBGRAPH_DIR=./subgraph.yaml
    
    graph add $CONTRACT_ADDRESS\
    --abi $CONTRACT_ABI \
    --contract-name $CONTRACT_NAME
    --merge-entities true
    ```
    
 * Create Subgraph
    ```bash
    graph create --node http://${GRAPH_IP}:8020/ ${CONTRACT_NAME}
    ```
 * Subraphのデプロイ（SubgraphをIndexerに登録する）
      ```bash
      # Deploy to host environment (on AWS ECS)
      export GRAPH_IP=$(aws ec2 describe-instances --filters 'Name=tag:Name,Values=TheGraphServiceStack/GraphCluster/nodeClientLaunchTemplate' --query  'Reservations[0].Instances[0].PublicIpAddress' --output text)
      graph deploy --node http://${GRAPH_IP}:8020/ --ipfs http://${GRAPH_IP}:5001 ${CONTRACT_NAME}

      # Deploy to local
      npm run create-local
      npm run deploy-local
      ```

### クエリの実行
* 次に、開発用クエリエディタ（GraphiQL）を開き、クエリを実行します。
* エディターのURLはデプロイ時にQueries (HTTP)として表示されます。
* (例: http://localhost:8000/subgraphs/name/{username}/{subgraph_name})

## Reference
* [DynamoDBのCRUDコマンドについて](https://qiita.com/takech111/items/ae61aaf28139defe6f9e)
* [【AWS】CDKv2で環境構築　Lambda編](https://qiita.com/yamato1491038/items/6a3eb65688389a5d6e31)
* [Gain insights from Web3 data with The Graph and Amazon Managed Blockchain](https://aws.amazon.com/jp/blogs/database/gain-insights-from-web3-data-with-the-graph-and-amazon-managed-blockchain/)
* * [Gaiaxによる解説](https://gaiax-blockchain.com/how-to-create-subgraph)
* [OasysチェーンをThe Graphで取得するドキュメントの翻訳](https://qiita.com/MoriKeigoYUZU/items/a808ae807361e2327f58)