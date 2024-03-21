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
ERC6551Registry.sol|0xbF859d8685deb61bFBa684FDDdF5E5d68b97A4C8|XXX
ERC6551Account.sol |0x4fD0b7f11eC367607de79Ee1a25aa355234ED7A0|XXX
SoulLootNft.sol    |0xE34aCCef7c8A61fa2aa0daEC7a4237b6Ea3108F1|XXX
SampleLoot.sol     |0x1020B0e03C054900Ed0A6db7b0AFa82a38934E19|XXX
JobNft.sol         |0xbF8c29F504c65D3b6C4A62A92321836Ce16760A5|xx
EquipmentNft.sol   |0x131aB6Aba62ebA057Ea1A5e09a9d89dA1BB118Ca|xxx
ArtifactNft.sol    |0xeD9DAe691EB1211334e1d6dac56Fc85f0D60aEf0|xx
XP.sol             |0x9d4Ba698b62f19cDc3703f70447da28266ebD03a|XP Token used for level up(ERC20)
