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
### MCH Verce Testnet (Chain ID: 420)
Contract | Address | Abstarct 
----|-----|-----
SoulMinter.sol|0x259bBa2B6bFeD9eB5B0c710955B64BaF03fa462C|sLoot, Coin(ERC20), 各NFTのmintを行う
SoulControler.sol|0x016b3B7bbf3607E98CB6e65a43E275F152A5E900|Equipmentの着脱を行う
ERC6551Registry.sol|0xd83755AA61EFbe4EAE57058F73e2e7b6FB5a434a|XXX
ERC6551Account.sol |0xa53b8fC57bbD7D03f551d8C0EECCE3B927482804|XXX
SoulLootNft.sol    |0xeE0eD5775f25FbD5342C585125491a75d4FA98c4|XXX
SampleLoot.sol     |0xD3483ff3c36b410b55E2Ecdeb59bF37505f995E1|XXX
EquipmentNft.sol   |0x2e5a2bf9be55f00AE9c429fAd0D14afd509889Cf|ERC1155
JobNft.sol         |0x498a2845D3b3294e72cdD6174BD1F6Cca84FCD40|xx
ArtifactNft.sol    |0xF899795EcFE75e45064F8699F4207F5cE6bAAC7F|xx
LaCoin.sol         |0x9E90ea59b8b010c87cF86d579728E6D0A514A0Ab|XP Token used for level up(ERC20)

