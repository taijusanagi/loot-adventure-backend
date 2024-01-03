// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./lib/Bytecode.sol";
import "./interfaces/ISoulNft.sol";
import "./interfaces/IArmourNft.sol";

contract SoulMinter is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");

    address private soulNftAddress;
    address private armourNftAddress;
    address private itemNftAddress;
    address private jobNftAddress;

    mapping (address => address) calcContract;

    //*********************************************
    //Initializer
    //*********************************************
    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(DEVELOPER_ROLE, msg.sender);
    }

    //*********************************************
    //Getter
    //*********************************************
    function getSoulNftAddress() public view returns(address){
        return soulNftAddress;
    }

    function getArmourNftAddress() public view returns(address){
        return armourNftAddress;
    }

    function getItemNftAddress() public view returns(address){
        return itemNftAddress;
    }

    function getJobNftAddress() public view returns(address){
        return jobNftAddress;
    }

    //*********************************************
    //Setter
    //*********************************************
    function setAdminRole(address granted_) public onlyRole(ADMIN_ROLE){
        _grantRole(ADMIN_ROLE, granted_);
    }

    function setDeveloperRole(address granted_) public onlyRole(DEVELOPER_ROLE){
        _grantRole(DEVELOPER_ROLE, granted_);
    }

    function setSoulNftAddress(address nftAddress_) public onlyRole(DEVELOPER_ROLE) {
        soulNftAddress = nftAddress_;
    }

    function setArmourNftAddress(address nftAddress_) public onlyRole(DEVELOPER_ROLE) {
        armourNftAddress = nftAddress_;
    }
    
    function setItemNftAddress(address nftAddress_) public onlyRole(DEVELOPER_ROLE) {
        itemNftAddress = nftAddress_;
    }

    function setJobNftAddress(address nftAddress_) public onlyRole(DEVELOPER_ROLE) {
        jobNftAddress = nftAddress_;
    }

    //*********************************************
    //Logic
    //*********************************************
    function mintSoul(address nft_, uint256 tokenId_, bytes memory seedData_) public {
        require(msg.sender == nftOwner(nft_, tokenId_), "Not token owner");
        _mintSoulNft(nft_, tokenId_, seedData_);
        _mintArmourNft(nft_, tokenId_, seedData_);
    }

    function _mintSoulNft(address nft_, uint256 tokenId_, bytes memory seedData_) internal virtual {
        ISoulNft _soulNft = ISoulNft(soulNftAddress);
        // get parameter via calurator contract by NFT(Address & tokenID)

        _soulNft.safeMint(
            msg.sender,
            nft_,
            tokenId_,
            100,
            100,
            100,
            100,
            100,
            100,
            100
        );
    }

    function _mintArmourNft(address nft_, uint256 tokenId_, bytes memory seedData_) internal virtual {
        IArmourNft _armourNft = IArmourNft(armourNftAddress);
        // get parameter via calurator contract by NFT(Address & tokenID)
        _armourNft.mint(
            msg.sender,
            nft_,
            tokenId_,
            100,
            'sample',
            1
        );
    }

    function nftOwner(address nft_, uint256 tokenId_) public view returns (address) {
        IERC721 _nft = IERC721(nft_);
        return _nft.ownerOf(tokenId_);
    }
}