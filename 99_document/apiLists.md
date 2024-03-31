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
SoulMinter.sol|0x21143568951d825b08ba0e9E588d2acB4a93676c|XX
SoulControler.sol|0x282db3f8215ce69B40d85ab8DD46377BdDE4F5DE|XX
ERC6551Registry.sol|0x80fcdEe6183C3AF147FD759157FE833E5C340FC1|XXX
ERC6551Account.sol |0xe2458C23f34bAA1BED75dEF3F831cb4bD74EFf95|XXX
SoulLootNft.sol    |0x7303A4E3EFAf514aD5E7BBc660E1a32136866971|XXX
SampleLoot.sol     |0x1020B0e03C054900Ed0A6db7b0AFa82a38934E19|XXX
EquipmentNft.sol   |0xe7d2D62DB874aD315d3f2398b881476e2a26Ed4D|xxx
JobNft.sol         |0xeC24aDbB6c1B1767C83194D2a5fCa46797C18CA1|xx
ArtifactNft.sol    |0x639F7235Bde2Be0B297a080fD5dA135a5aD98b4F|xx
LaCoin.sol         |0xb4D210C2d9C9a4dCD587D82c0C1E8e0D592627d1|XP Token used for level up(ERC20)

