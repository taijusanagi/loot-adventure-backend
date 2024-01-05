// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "../interfaces/ISoulNft.sol";

contract SoulLootNft is ERC721, AccessControl, ISoulNft {
    uint256 NFT_ID_PREFIC = 10**7;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");

    string private baseMetadataURIPrefix;
    string private baseMetadataURISuffix;
    uint256 private currentNftId;

    mapping (uint256 => LootSoul) private soul;
    mapping (address => uint256) private nftId;

    //*********************************************
    //Initializer
    //*********************************************
    constructor(string memory uriPrefic_, string memory uriSuffix_) ERC721("SoulLoot", "sLoot") {
        _grantRole(DEVELOPER_ROLE, msg.sender);
        currentNftId = 2000;
        setBaseMetadataURI(uriPrefic_, uriSuffix_);
    }

    //*********************************************
    //Getter
    //*********************************************
    function getLootSoul(uint256 tokenId_) public view returns (LootSoul memory) {
        return soul[tokenId_];
    }
    
    function getSeed(uint256 tokenId_) public view returns (uint256) {
        return soul[tokenId_].seed;
    }
    function getTurn(uint256 tokenId_) public view returns (uint16) {
        return soul[tokenId_].turn;
    }
    function getMaxHp(uint256 tokenId_) public view returns (uint16) {
        return soul[tokenId_].maxHp;
    }
    function getCurrentHp(uint256 tokenId_) public view returns (uint16) {
        return soul[tokenId_].currentHp;
    }
    function getAttack(uint256 tokenId_) public view returns (uint16) {
        return soul[tokenId_].attack;
    }
    function getDefence(uint256 tokenId_) public view returns (uint16) {
        return soul[tokenId_].defence;
    }
    function getRecovery(uint256 tokenId_) public view returns (uint16) {
        return soul[tokenId_].recovery;
    }
    
    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        string memory _output;
        string memory _c = ', ';
        string memory _attributes = string(abi.encodePacked(
            '[', 
            _attribute("Seed", soul[tokenId_].seed), _c, 
            _attribute("Turn", soul[tokenId_].turn), _c, 
            _attribute("Max HP", soul[tokenId_].maxHp), _c, 
            _attribute("Current HP", soul[tokenId_].currentHp), _c, 
            _attribute("Attack", soul[tokenId_].attack), _c, 
            _attribute("Defence", soul[tokenId_].defence), _c, 
            _attribute("Recovery", soul[tokenId_].recovery),
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
        address nft_,
        uint256 tokenId_,
        uint256 seed_,
        uint16 turn_,
        uint16 maxHp_,
        uint16 currentHp_,
        uint16 attack_,
        uint16 defence_,
        uint16 recovery_
    ) public onlyRole(MINTER_ROLE) {
        require(nftId[nft_]!=0, "This nft is not registered");
        LootSoul memory _soul;
        _soul.seed = seed_;
        _soul.turn = turn_;
        _soul.maxHp = maxHp_;
        _soul.currentHp = currentHp_;
        _soul.attack = attack_;
        _soul.defence = defence_;
        _soul.recovery = recovery_;
        _soul.rAddress = nft_;
        _soul.rTokenId = tokenId_;

        uint256 _tokenId = nftId[nft_] * NFT_ID_PREFIC + tokenId_;
        soul[_tokenId] = _soul;

        _safeMint(to_, _tokenId);
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
}