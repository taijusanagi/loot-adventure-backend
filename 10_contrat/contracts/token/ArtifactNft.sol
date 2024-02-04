// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "../interfaces/gameNfts/IArtifactNft.sol";

contract ArtifactNft is ERC1155, AccessControl, IArtifactNft {
    uint256 NFT_ID_PREFIX = 10**7;
    uint256 TYPE_PREFIX = 10**4;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");

    string private baseMetadataURIPrefix;
    string private baseMetadataURISuffix;
    uint256 private currentNftId;

    mapping (address => uint256) private nftId; // NFT Address => NFT ID
    mapping (uint256 => Artifact) private artifact; // tokenId => Artifact Status

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
    function getArtifactSeed(uint256 tokenId_) public view returns(uint256){
        return artifact[tokenId_].seed;
    }

    function getartifactName(uint256 tokenId_) public view returns(string memory){
        return artifact[tokenId_].name;
    }

    function getArtifactType(uint256 tokenId_) public view returns(uint256){
        return artifact[tokenId_].artifactType;
    }
    
    function uri(uint256 tokenId_) public view override returns (string memory) {
        string memory _output;
        string memory _c = ', ';
        string memory _attributes = string(abi.encodePacked(
            '[', 
            _attribute("Seed", artifact[tokenId_].seed), _c, 
            _attribute("Name", artifact[tokenId_].name), _c,
            _attribute("Type", artifact[tokenId_].artifactType), _c,
            _attribute("Loot NFT Token ID", artifact[tokenId_].rTokenId),
            ']'
        ));
        string memory _image = string(abi.encodePacked(
            baseMetadataURIPrefix,
            Strings.toString(artifact[tokenId_].artifactType),
            baseMetadataURISuffix
        ));
        string memory _json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "Artifact NFT #', Strings.toString(tokenId_) ,
            '", "description": "Minted by a NFT' ,
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
        uint256 type_
    ) public onlyRole(MINTER_ROLE) {
        Artifact memory _artifact;
        uint256 _tokenId = (nftId[nft_] * NFT_ID_PREFIX) + (type_ * TYPE_PREFIX);
        _artifact.seed = seed_;
        _artifact.name = name_;
        _artifact.artifactType = type_;
        _artifact.rAddress = nft_;
        _artifact.rTokenId = tokenId_;

        artifact[_tokenId] = _artifact;
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

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        internal virtual override(ERC1155)
    {
        require(from == address(0), "Artifact-Nft Error: Token is SOUL BOUND");
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}