# Loot Adventure | API

## List
API|Read/Write|on/off-chain|path|Detail
----|-----|-----|-----|-----
RLoot=>SoulLoot変換|write|on-chain|XXXX|[XXX]()
保有SoulLootの取得|read|on-chain|XXXX|[XXX]()
保有SoulLootの装備アイテム情報取得|read|off-chain|XXXX|[XXX]()
装備アイテム強化|write|on-chain|XXXX|[XXX]()
ランキング取得|read|off-chain|GET ~/ranking/|[XXX]()
ランキング更新|write|off-chain|PUT ~/ranking/|[XXX]()
経験値のオンチェーン化|write|off-chain|PUT ~/xp/convert/|[XXX]()
装備アイテムロスト|write|on-chain|XXXX|[XXX]()
(InGame)ゲームの進捗更新|write|on-chain|XXXX|[XXX]()
装備品の付け替え|write|on-chain|xxxx|[XXXX]()

## On-Chain (Smart Contracts)
### MCH Verce Mainnet (Chain ID: 29548)
Contract | Address | Abstarct 
----|-----|-----
SoulMinter.sol     |0x7fA91196a558A49041d252e0ce1b5D9DBe18C87e|sLoot, Coin(ERC20), 各NFTのmintを行う
SoulControler.sol  |0xa449777bc26BBe6Ffa37Bd9b3aecB671215590D1|Equipmentの着脱を行う
ERC6551Registry.sol|0x4B486e325b6DB3a54315c2DBe95Ac712bAAc2188|XXX
ERC6551Account.sol |0x175886D7f6aCEEfEE52566445b0c4A8578D1DB80|XXX
SoulLootNft.sol    |0xcF2F12834E91a5d12900De32273d5efCcdDA5Dea|XXX
LootByRogueV2.sol  |0x50513af643C53f137ec29407Cc937fF38dd3765a|RLootとして用いる
EquipmentNft.sol   |0x84097FcCE494B64A4d1CaE24930b8f4864c941ed|装備NFT(ERC1155)
JobNft.sol         |0x4fe272Ca75af1E78CfDd132A661C063D765436b6|ジョブNFT(ERC1155)
ArtifactNft.sol    |0xc4bE90da12F35Fe705591500a6689f238cF03154|アーティファクトNFT(ERC1155)
LaCoin.sol         |0xC23d527D2d5Aa28b30C9dcce5e2b6F3626aBDa8c|XP Token used for level up(ERC20)

### MCH Verce Testnet (Chain ID: 420)
Contract | Address | Abstarct 
----|-----|-----
SoulMinter.sol     |0xB3EbDf1B82d108c363ceb8197275326c59509Ed1|sLoot, Coin(ERC20), 各NFTのmintを行う
SoulControler.sol  |0xc8889204D80493d9539381d64ad411DE0E10969f|Equipmentの着脱を行う
ERC6551Registry.sol|0x3F3783A6A53D36795204CdeEfD01268BFCD57265|XXX
ERC6551Account.sol |0x83eF226Ba2e3447eB6c217545d5DE2f178A0a6e6|XXX
SoulLootNft.sol    |0x913B4b565236D07C615C90d68a7E045628d55638|XXX
SampleLoot.sol     |0xD3483ff3c36b410b55E2Ecdeb59bF37505f995E1|XXX
EquipmentNft.sol   |0xCF9a7C68d0396562D7ADE7A4066E71EbD313b978|ERC1155
JobNft.sol         |0xc3fCd64C26222ca0B91ebbfC9050068f4cb97EEc|xx
ArtifactNft.sol    |0x886BD8a41b1e6d9F393E751108BEf0e87dfC4e79|xx
LaCoin.sol         |0x9c7eDc888D530e1396b2411Dd7095570B4595A70|XP Token used for level up(ERC20)

