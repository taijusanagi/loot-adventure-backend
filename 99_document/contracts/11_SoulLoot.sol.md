# 2. SoulLootNft.sol
SoulLootのNFT。LootByRogueのLootNftと同様の構成。

## safeMint(address nft_, uint256 tokenId_)
* 概要
  * 元となるNFTを材料としてSoulLootNftをmintする
* 引数
  * nft_：材料となるNFTのコントラクトアドレス（初期はLootByRogueのNFT）
  * tokenId_:材料となるNFTのトークンID
* 利用例
  ```
  const tx = await soulLoot.safeMint(
    SAMPLE_LOOT,
    TOKEN_ID
  );
  ```