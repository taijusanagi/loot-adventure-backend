# 1. SampleLoot.sol
* テスト用のLootNFT
* LootByRogueと同じ形式のデータ、関数を持つ

## safeMintTemp(address, uint256, )
### 概要
* 任意の値、レアリティを持ったLootNFTを生成

### 引数
引数|型|概要
--|--|--|
to|address|権限委任先のアドレス

### 利用例
検証用のLootNFTをmint
```typescript
const tx = await sampleLoot.safeMintTemp(
    signer.address,
    10001,
    10,11,12,13,14,15,
    [1,2,3,4,5,6],[1,2,3,4],
    1,1,1,1,1,1,1,1,
    [1,1,1]
  );
```

## approve(address to, uint256 tokenId)
### 概要
* 特定のコントラクト又はEOAへ該当NFTのTransfer権限を委任する
### 引数
引数|型|概要
--|--|--|
to|address|権限委任先のアドレス
tokenId|uint256|権限委任を行うトークンのトークンID
### 利用例(開発環境)
  SoulLootのコントラクトへ委任（SoulLootのmintに向けて）
  ```typescript
  const sampleLoot = new ethers.Contract(SAMPLE_LOOT, sampleLootAbi, signer);
  //SOUL_LOOT: SoulLootのコントラクトアドレス
  const tx = await sampleLoot.approve(SOUL_LOOT, TOKEN_ID);
  ```