// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "../interfaces/IArmourNft.sol";

contract ArmourNft is ERC1155, AccessControl, IArmourNft {
    uint256 NFT_ID_PREFIX = 10**7;
    uint256 ARMOUR_TYPE_PREFIX = 10**4;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");

    string private baseMetadataURIPrefix;
    string private baseMetadataURISuffix;
    uint256 private currentNftId;

    mapping (address => uint256) private nftId; // NFT Address => NFT ID
    mapping (uint256 => Armour) private armour; // tokenId => Armour Status

    //*********************************************
    //Initializer
    //*********************************************
    constructor(string memory uriPrefic_, string memory uriSuffix_) ERC1155("") {
        _grantRole(DEVELOPER_ROLE, msg.sender);
        currentNftId = 2000;
        setBaseMetadataURI(uriPrefic_, uriSuffix_);
    }

    //*********************************************
    //Getter
    //*********************************************
    function getArmourSeed(uint256 tokenId_) public view returns(uint256){
        return armour[tokenId_].seed;
    }

    function getArmourName(uint256 tokenId_) public view returns(string memory){
        return armour[tokenId_].name;
    }

    function getArmourType(uint256 tokenId_) public view returns(uint256){
        return armour[tokenId_].armourType;
    }
    
    function uri(uint256 tokenId_) public view override returns (string memory) {
        string memory _output;
        string memory _c = ', ';
        string memory _attributes = string(abi.encodePacked(
            '[', 
            _attribute("Seed", armour[tokenId_].seed), _c, 
            _attribute("Name", armour[tokenId_].name), _c,
            _attribute("Type", armour[tokenId_].armourType), _c,
            _attribute("Loot NFT Address", armour[tokenId_].rAddress), _c,
            _attribute("Root NFT Token ID", armour[tokenId_].rTokenId),
            ']'
        ));
        string memory _image = string(abi.encodePacked(
            baseMetadataURIPrefix,
            Strings.toString(armour[tokenId_].armourType),
            baseMetadataURISuffix
        ));
        string memory _json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "Armour NFT #', Strings.toString(tokenId_) ,
            '", "description": "Minted by ', armour[tokenId_].rAddress ,
            '", "attributes": ', 
            _attributes ,
            ', "image": "', 
            _image, 
            '"}'
        ))));
        _output = string(abi.encodePacked('data:application/json;base64,', _json));

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
    function mint(
        address to_,
        address nft_,
        uint256 tokenId_, 
        uint256 seed_,
        string memory name_,
        uint256 id_,
        uint256 type_
    ) public onlyRole(MINTER_ROLE) {
        Armour memory _armour;
        uint256 _tokenId = (nftId[nft_] * NFT_ID_PREFIX) + (type_ * ARMOUR_TYPE_PREFIX) + id_;
        _armour.seed = seed_;
        _armour.name = name_;
        _armour.armourType = type_;
        _armour.rAddress = nft_;
        _armour.rTokenId = tokenId_;

        armour[_tokenId] = _armour;
        _mint(to_, _tokenId, 1, "");
    }

    function _attribute(string memory traitType_, string memory value_) internal pure returns (string memory) {
        return string(abi.encodePacked('{"trait_type": "', traitType_, '", "value": "', value_, '"}'));
    }

    function _attribute(string memory traitType_, uint256 value_) internal pure returns (string memory) {
        return string(abi.encodePacked('{"trait_type": "', traitType_, '", "value": ', Strings.toString(value_), '}'));
    }

    function _attribute(string memory traitType_, address value_) internal pure returns (string memory) {
        return string(abi.encodePacked('{"trait_type": "', traitType_, '", "value": ', value_, '}'));
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}