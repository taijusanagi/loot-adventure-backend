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
SoulMinter.sol|0x2d6C40A288cd636aD9761cCeb141cB69a0BB3bd2|sLoot, Coin(ERC20), 各NFTのmintを行う
SoulControler.sol|0x3DFdcAb471Eed8f2030Fd4C5C8065c35706480b3|Equipmentの着脱を行う
ERC6551Registry.sol|0x7c2F4D3366159d43f612D9E53De96Fe76Ed59D82|XXX
ERC6551Account.sol |0x48E9b099fFca6fa0e2c24a758f410A7622f3B60c|XXX
SoulLootNft.sol    |0x2b05221c21450390B57Fb5c878284c0460aB9588|XXX
SampleLoot.sol     |0xD3483ff3c36b410b55E2Ecdeb59bF37505f995E1|XXX
EquipmentNft.sol   |0x04BF886f41D43aA02A3c72342FE640175cBA5427|ERC1155
JobNft.sol         |0x7e369fe40ba720Ea86885C86769723Ae4151e354|xx
ArtifactNft.sol    |0x20CE936f89Cb17db0e7b72A73d7844a3F4803cba|xx
LaCoin.sol         |0xB5C94124826f3597322474caE27e775c20b70c3D|XP Token used for level up(ERC20)

