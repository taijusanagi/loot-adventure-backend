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
SoulMinter.sol|0x24F5C92d48309a591a87031f55F6802F53189cC3|XX
SoulControler.sol|0xF341667f7EcEE52B261A1dB70897F636aAb5A9cb|XX
ERC6551Registry.sol|0x96D93c1522FC8C7461B7b0a4E20D67FcD9b5f4Ce|XXX
ERC6551Account.sol |0xA9043Ed336130dE936eEa091c4d3b1bE8c418c13|XXX
SoulLootNft.sol    |0x9C63cCCF43eb5207564C7E2981AA4FD4F2cCD9D3|XXX
SampleLoot.sol     |0x1020B0e03C054900Ed0A6db7b0AFa82a38934E19|XXX
EquipmentNft.sol   |0x8207742A621b876C87B2836eBe14bDf11cC88Ef7|ERC1155
JobNft.sol         |0x1559a6F757e981d71A1104ED6Be6Bac970727D81|xx
ArtifactNft.sol    |0x0D43baab2EACfeD484b0070E571Faf886Fab5A45|xx
LaCoin.sol         |0x26b745A62675DfE4D7191c19E234cebDad40CcAB|XP Token used for level up(ERC20)

