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
ERC6551Registry.sol|0x5c286b558037905F8F79c3861c421840EE90b9aA|XXX
ERC6551Account.sol |0x7CEadC71CE0bD1FD92c72740A36280A615140d65|XXX
SoulLootNft.sol    |0x4d6eeA4c99aDB78F7cd18aCf2bF8474966E0E9EA|XXX
SampleLoot.sol     |0x1020B0e03C054900Ed0A6db7b0AFa82a38934E19|XXX
ArtifactNft.sol    |0x701f87df2026A6151574F3be261D025fd6F77764|xx
EquipmentNft.sol   |0x273Ac9BFbfCcC9c59acF2F34488Dd4e4b7b9e53F|xxx
Item.sol           |0xeD9DAe691EB1211334e1d6dac56Fc85f0D60aEf0|xx
XP.sol             |0x5D8EC5Ac744529f2E7861588cb81318a422004b8|XP Token used for level up(ERC20)
