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

## Setup | 02_SubGraph

## Setup | 03_GraphNode
* Install npm libraries
  * In [03_GraphNode](./03_GraphNode) directory, execute this command
    ```bash
    npm install
    ```
* set .env
  * Edit environment variables
    ``` .env
    CLIENT_URL=http://localhost:8545
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
* edit chainId setting
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
* X

## Reference
* [DynamoDBのCRUDコマンドについて](https://qiita.com/takech111/items/ae61aaf28139defe6f9e)
* [【AWS】CDKv2で環境構築　Lambda編](https://qiita.com/yamato1491038/items/6a3eb65688389a5d6e31)
* [Gain insights from Web3 data with The Graph and Amazon Managed Blockchain](https://aws.amazon.com/jp/blogs/database/gain-insights-from-web3-data-with-the-graph-and-amazon-managed-blockchain/)