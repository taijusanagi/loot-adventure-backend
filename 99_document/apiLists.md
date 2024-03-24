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
ERC6551Registry.sol|0x4c8b014F50F2cB5844e7b7323d8704e7EC12235e|XXX
ERC6551Account.sol |0xA82e44000E33C8Fb31d9AE1957091339B8C6d62E|XXX
SoulLootNft.sol    |0x5652d3Aeb0Ca78726c2E20F3Bc1bB1508E0C1D4F|XXX
SampleLoot.sol     |0x1020B0e03C054900Ed0A6db7b0AFa82a38934E19|XXX
EquipmentNft.sol   |0x312367b6ED0c125fa75CC5EE9F53926F2F41B129|xxx
JobNft.sol         |0x81550F0b914FAb2439aEd2aB70e72a1D8eE6d91A|xx
ArtifactNft.sol    |0x32B682c119536D7Ac1df76A702727aD0CE4c150C|xx
LaCoin.sol         |0x469D64ABC14bdd832cbd239593c2291c0131a22F|XP Token used for level up(ERC20)

