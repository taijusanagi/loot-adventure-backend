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
ERC6551Registry.sol|0x95438dE9fe674d3678f3890adf1AB09b8c21cC82|XXX
ERC6551Account.sol |0x2EBB65e232570B9703De896c231337D375af675c|XXX
SoulLootNft.sol    |0x24eB555242b86A27876946032519C2d6fc729c43|XXX
SampleLoot.sol     |0xb49830082AA2e8A798e82e60d45cB4EBDc708F77|XXX
ArtifactNft.sol    |0x95f30F7C1fdeedDb719b076E6a7F4D35796e203F|xx
EquipmentNft.sol   |0xB77F8ce10E77b887e46b1e76691114E7D95894E3|xxx
Item.sol           |0x5Be941BadAeb5F3d05967753Ff945f0a9E993602|xx
