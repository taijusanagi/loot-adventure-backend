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
SoulMinter.sol|0x2C1299267a27777b83dFb8B078aC8db809C45691|sLoot, Coin(ERC20), 各NFTのmintを行う
SoulControler.sol|0x000025F50509C89D239ED5C5dc46b134E21Fec2f|Equipmentの着脱を行う
ERC6551Registry.sol|0xC572C4Ba0430B5ffa19905595729d57367C2ADB0|XXX
ERC6551Account.sol |0x532cbC6F366CFf4Fb56EBe5506222e4F1dAFeD7e|XXX
SoulLootNft.sol    |0x6442efeFD21e4882c89b39584E699966eC2B2FeE|XXX
SampleLoot.sol     |0xD3483ff3c36b410b55E2Ecdeb59bF37505f995E1|XXX
EquipmentNft.sol   |0xaF20afeeDB84feC3D574baE73Ed0eC2DF13576B0|ERC1155
JobNft.sol         |0x24110550258DEE8E3352BC3D21FC00e3f1d02F05|xx
ArtifactNft.sol    |0x1677e0EAD67175a21bB3ECBeAf833DE77F8c0693|xx
LaCoin.sol         |0x6F3DfBeCf1769E3003D62A189Ce32A9A70160baB|XP Token used for level up(ERC20)

