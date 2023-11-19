# Loot Launcher
## Abstracrt
* 色々なNFTを用いてTBAを作る
* そして、TBAにはLaunchpadによって生成されたLoot (SBT)がぶら下がる
* また、Launchpadにて獲得した武器やアイテムはTBAにNFTとして付与される

## Material
### TBA
* ERC6551によって、各プロジェクトの既存NFTから生成する
  
### Loot SBT
* 素材となるNFT(以下、素体NFT)からなる基礎値とLauchpadでプレイした結果を持って能力値が定まる
* 前者は素体NFTの何らかの値によって生成されたハッシュ値などでTBA生成時に決まるものにする
* 後者の部分はリアル世界での行動とかでも合わせられるよう柔軟性が必要

### Item NFT
* RPG系のNFTプロジェクトなら装備や使い捨てのアイテム
* TBAが所有する形なので、TBAの素体NFTの所有者が回収できる


## Memo
* RogueV2はフルオンチェーンを想定？
  * これの内、装備の部分を別NFTに分離すれば良いのでは？
  * ↑ 一旦デプロイして試してみる
* あと、追加でここら辺も
  * 他NFTを使う際の能力値計算とかどうするかは要検討
  * TBA生成との処理の順番を考える（TBA生成→ゲームプレイ→Lootミント→LootをTBAに付与か）


# Backup

## Loot by Rogue
```shell
npx hardhat node
npx hardhat run --network local scripts/localSetup.ts
```
## [MCH Verse](https://explorer.oasys.mycryptoheroes.net/)
|contract|address|
|---|---|
|LootByRogue (ERC721)|[0xa6B1C8F146b7f996C63e1a12a228CdBeA9D81f34](https://explorer.oasys.mycryptoheroes.net/token/0xa6B1C8F146b7f996C63e1a12a228CdBeA9D81f34/token-transfers)|
|Rogue|[0x76f61c50D50C0642EE115b3bB9f38136303AdF1E](https://explorer.oasys.mycryptoheroes.net/address/0x76f61c50D50C0642EE115b3bB9f38136303AdF1E)|
|LootByRogueV2 (ERC721)|[0x50513af643C53f137ec29407Cc937fF38dd3765a](https://explorer.oasys.mycryptoheroes.net/address/0x50513af643C53f137ec29407Cc937fF38dd3765a)|
|LootByRogueV2Minter|[0xcca2A48Eca22F51a45dCE558D20bc61B35d8dB2a](https://explorer.oasys.mycryptoheroes.net/address/0xcca2A48Eca22F51a45dCE558D20bc61B35d8dB2a)|
|LootByRogueV2Converter|[0x1eb0e661fc3DED02227BC9f4A8f9D455AF2dafc4](https://explorer.oasys.mycryptoheroes.net/address/0x1eb0e661fc3DED02227BC9f4A8f9D455AF2dafc4)|


## MCH Verse Testnet
|contract|address|
|---|---|
|LootByRogue (ERC721)|0xDc047502ef3EFceC6A6A792Abf9F970D6D2a0DC4|
|Rogue|0x13a5396629E3Efdac17dC71aBF4725EA3Ea0CEA7|
|LootByRogueV2 (ERC721)|0x923c69439423eC3d02693f792285e98B26EA126e|
|LootByRogueV2Minter|0xd37Db4DA611dd7253e29Fd2778cA713DF523978D|
|LootByRogueV2Converter|0xa6a1C01dE2a01415187361d8B4Cb262642B2Fa25|


