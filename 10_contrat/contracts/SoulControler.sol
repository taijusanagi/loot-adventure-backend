// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./lib/Bytecode.sol";
import "./interfaces/lootNfts/ISoulLoot.sol";
import "./interfaces/gameNfts/IEquipmentNft.sol";
import "./interfaces/gameNfts/IArtifactNft.sol";
import "./interfaces/gameNfts/IItemNft.sol";
import "./interfaces/ISoulCalculator.sol";
import "./interfaces/IXp.sol";

contract SoulControler is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");
    
    // NFT Contract (ERC721)
    address private soulLoot;
    // SFT Contract (ERC1155)
    address private equipmentNft;
    address private itemNft;
    address private artifactNft;
    // FT Contract (ERC20)
    address private xp;

    address private treasury;

    //*********************************************
    //Initializer
    //*********************************************
    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(DEVELOPER_ROLE, msg.sender);
        treasury = msg.sender;
    }

    //*********************************************
    //Getter
    //*********************************************
    function getSoulLoot() public view returns(address){
        return soulLoot;
    }

    function getEquipmentNft() public view returns(address){
        return equipmentNft;
    }

    function getItemNft() public view returns(address){
        return itemNft;
    }

    function getArtifactNft() public view returns(address){
        return artifactNft;
    }

    function getXp() public view returns(address){
        return xp;
    }

    function getTreasury() public view returns(address){
        return treasury;
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

    function setSoulLoot(address nft_) public onlyRole(DEVELOPER_ROLE) {
        soulLoot = nft_;
    }

    function setEquipmentNft(address nft_) public onlyRole(DEVELOPER_ROLE) {
        equipmentNft = nft_;
    }
    
    function setItemNft(address nft_) public onlyRole(DEVELOPER_ROLE) {
        itemNft = nft_;
    }

    function setArtifactNft(address nft_) public onlyRole(DEVELOPER_ROLE) {
        artifactNft = nft_;
    }

    function setXp(address ft_) public onlyRole(DEVELOPER_ROLE) {
        xp = ft_;
    }

    function setTreasury(address treasury_) public onlyRole(DEVELOPER_ROLE) {
        treasury = treasury_;
    }

    //*********************************************
    //Logic
    //*********************************************
    function setNftsOnGame(address player_) public onlyRole(DEVELOPER_ROLE) {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        IArtifactNft _artifactNft = IArtifactNft(artifactNft);
        IItemNft _itemNft = IItemNft(itemNft);

        _equipmentNft.setOnGame(player_);
        // _artifactNft.setOnGame(msg.sender);
        // _itemNft.setOnGame(msg.sender);
    }

    function transferEquipmentNft(
        address from_, 
        uint256 tokenIdEquipment_
    ) public onlyRole(DEVELOPER_ROLE){
        IERC1155 _equipmentNft = IERC1155(equipmentNft);
        // IERC1155 _artifactNft = IERC1155(artifactNft);
        // IERC1155 _itemNft = IERC1155(itemNft);
        _equipmentNft.safeTransferFrom(from_, treasury, tokenIdEquipment_, 1, '0x00');
    }
}