CONTRACT_NAME=ArtifactNft
CONTRACT_ADDRESS=0x95f30F7C1fdeedDb719b076E6a7F4D35796e203F
CONTRACT_ABI=../abi/ArtifactNft.json
SUBGRAPH_DIR=./subgraph.yaml

graph add $CONTRACT_ADDRESS\
    --abi $CONTRACT_ABI \
    --contract-name $CONTRACT_NAME

export GRAPH_IP=$(aws ec2 describe-instances --filters 'Name=tag:Name,Values=TheGraphServiceStack/GraphCluster/nodeClientLaunchTemplate' --query  'Reservations[0].Instances[0].PublicIpAddress' --output text)

graph deploy --node http://${GRAPH_IP}:8020/ --ipfs http://${GRAPH_IP}:5001 ${CONTRACT_NAME}