// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "../interfaces/lootNfts/ISoulLoot.sol";
import "../interfaces/lootNfts/ILootByRogueV2.sol";

contract SoulLootNft is ERC721, AccessControl, ISoulLoot {
    event mintSoulLoot(address from, address to, uint256 tokenId, uint256 rChainId, address rAddress, uint256 rTokenId);
    
    uint256 NFT_ID_PREFIC = 10**7;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");

    string private baseMetadataURIPrefix;
    string private baseMetadataURISuffix;
    uint256 private currentNftId;

    mapping (uint256 => ILootByRogueV2.AdventureRecord) private record;
    mapping (uint256 => uint256) private rChainId;
    mapping (uint256 => address) private rAddress;
    mapping (uint256 => uint256) private rTokenId;
    mapping (address => uint256) private nftId;

    //*********************************************
    //Initializer
    //*********************************************
    constructor(string memory uriPrefic_, string memory uriSuffix_) ERC721("SoulLoot", "sLoot") {
        _grantRole(DEVELOPER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        currentNftId = 2000;
        setBaseMetadataURI(uriPrefic_, uriSuffix_);
    }

    //*********************************************
    //Getter
    //*********************************************
    function getNftId(address nft_) public view returns (uint256) {
        return nftId[nft_];
    }
    function getAdventureRecord(uint256 tokenId_) public view returns (ILootByRogueV2.AdventureRecord memory) {
        return record[tokenId_];
    }
    function getRChainId(uint256 tokenId_) public view returns (uint256) {
        return rChainId[tokenId_];
    }
    function getRAddress(uint256 tokenId_) public view returns (address) {
        return rAddress[tokenId_];
    }
    function getRTokenId(uint256 tokenId_) public view returns (uint256) {
        return rTokenId[tokenId_];
    }
    function getSeed(uint256 tokenId_) public view returns (uint256) {
        return record[tokenId_].inputData.seed;
    }
    function getTurn(uint256 tokenId_) public view returns (uint16) {
        return record[tokenId_].turn;
    }
    function getMaxHp(uint256 tokenId_) public view returns (uint16) {
        return record[tokenId_].maxHp;
    }
    function getCurrentHp(uint256 tokenId_) public view returns (uint16) {
        return record[tokenId_].currentHp;
    }
    function getAttack(uint256 tokenId_) public view returns (uint16) {
        return record[tokenId_].attack;
    }
    function getDefence(uint256 tokenId_) public view returns (uint16) {
        return record[tokenId_].defence;
    }
    function getRecovery(uint256 tokenId_) public view returns (uint16) {
        return record[tokenId_].recovery;
    }
    function getTokenId(uint256 tokenId_, address nft_) public view returns (uint256) {
        uint256 _tokenId = nftId[nft_] * NFT_ID_PREFIC + tokenId_;
        return _tokenId;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        string memory _output;
        string memory _c = ', ';
        string memory _attributes = string(abi.encodePacked(
            '[', 
            _attribute("Seed", record[tokenId_].inputData.seed), _c, 
            _attribute("Turn", record[tokenId_].turn), _c, 
            _attribute("Max HP", record[tokenId_].maxHp), _c, 
            _attribute("Current HP", record[tokenId_].currentHp), _c, 
            _attribute("Attack", record[tokenId_].attack), _c, 
            _attribute("Defence", record[tokenId_].defence), _c, 
            _attribute("Recovery", record[tokenId_].recovery),
            ']'
        ));

        uint256 _nftId = tokenId_ / NFT_ID_PREFIC;
        string memory _image = string(abi.encodePacked(
            baseMetadataURIPrefix,
            Strings.toString(_nftId),
            baseMetadataURISuffix
        ));

        string memory _json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "Soul NFT #', Strings.toString(tokenId_), '", "description": "Minted by Loot NFT", "attributes": ', _attributes ,', "image": "', _image, '"}'
        ))));
        _output = string(abi.encodePacked('data:application/json;base64,', _json));

        return _output;
    }

    function tokenURIfromRLoot(address nft_, uint256 tokenId_) public view returns(string memory){
        uint256 _nftId = nftId[nft_];
        uint256 _tokenId = _nftId * NFT_ID_PREFIC + tokenId_;
        string memory _output = tokenURI(_tokenId);
        return _output;
    }

    //*********************************************
    //Setter
    //*********************************************
    function setBaseMetadataURI(string memory uriPrefix_, string memory uriSuffix_) public { 
        baseMetadataURIPrefix = uriPrefix_;
        baseMetadataURISuffix = uriSuffix_;
    }
    function setMinterRole(address granted_) public onlyRole(DEVELOPER_ROLE){
        _grantRole(MINTER_ROLE, granted_);
    }
    function setDeveloperRole(address granted_) public onlyRole(DEVELOPER_ROLE){
        _grantRole(DEVELOPER_ROLE, granted_);
    }
    function setNftId (address nft_) public onlyRole(DEVELOPER_ROLE) {
        nftId[nft_] = currentNftId;
        currentNftId++;
    }

    //*********************************************
    //Logic
    //*********************************************
    function safeMint(
        address to_,
        uint256 chainId_,
        address nft_,
        uint256 tokenId_,
        ILootByRogueV2.AdventureRecord memory record_
    ) public onlyRole(MINTER_ROLE){
        require(nftId[nft_]!=0, 'This nft is not registered');

        uint256 _tokenId = nftId[nft_] * NFT_ID_PREFIC + tokenId_;
        record[_tokenId] = record_;
        rChainId[_tokenId] = chainId_;
        rAddress[_tokenId] = nft_;
        rTokenId[_tokenId] = tokenId_;

        // Mint SoulLootNft
        _mint(to_, _tokenId);

        emit mintSoulLoot(address(0), to_, _tokenId, chainId_, nft_, tokenId_);
    }

    function _attribute(string memory traitType_, string memory value_) internal pure returns (string memory) {
        return string(abi.encodePacked('{"trait_type": "', traitType_, '", "value": "', value_, '"}'));
    }

    function _attribute(string memory traitType_, uint256 value_) internal pure returns (string memory) {
        return string(abi.encodePacked('{"trait_type": "', traitType_, '", "value": ', Strings.toString(value_), '}'));
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override (ERC721, AccessControl, IERC165) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) public returns (bytes4){
        return this.onERC721Received.selector;
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) public returns (bytes4){
        return this.onERC1155Received.selector;
    }
}