# 2. ERC6551Registry.sol
* Token Bound Accountを作成するFactory Contract
* ERC6551に準拠
* TBA作成時にSoulMinter.solを実行して、LootNFTからEquipmentNFT等のmintも実行(詳細は[SoulMinter.sol](XXXX)を参照) 

## createSoul(uint256 chainId, address tokenContract uint256 tokenId, uint256 salt, bytes calldata initData)
### 概要
* ERC6551のcreateAccount関数によってTBA生成(裏ではOpenzeppelinのCreate2.solを利用)
* 同時にSoulMinter.solのmintSoul関数によって下記トークンのmintを実行
  * EquipmentNFT
  * ArtifactNFT
  * ItemNFT
  
### 引数
引数|型|概要
--|--|--|
chainID|uint256|TBAが紐づくNFTのChainID
tokenContract|address|TBAが紐づくNFTのアドレス
tokenId|uint256|TBAが紐づくNFTのアドレス
salt|uint256|TBA作成時のSalt値
initData|bytes|TBA作成時に実行されるTX(未使用)

### 利用例(開発環境)
  ```typescript
  const tx = await erc6551Registry.createSoul(
    420, // MCH Verce(Testnet)のアドレス
    SOUL_LOOT, //SoulLootのアドレス
    TOKEN_ID, //SoulLootのトークンID
    1,
    '0x0000000000000000000000000000000000000000'
  );
  ```