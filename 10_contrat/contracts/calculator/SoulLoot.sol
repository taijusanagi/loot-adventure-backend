// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "../lib/Bytecode.sol";
import "../interfaces/lootNfts/ISoulLoot.sol";
import "../interfaces/ISoulCalculator.sol";
import "../interfaces/lootNfts/ILootByRogueV2.sol";

contract SoulLoot is AccessControl, ISoulCalculator {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");

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
    function calcSoul(
        address nft_, 
        uint256 tokenId_, 
        bytes memory data_
    ) public view returns (
        uint256,
        uint16,
        uint16,
        uint16,
        uint16,
        uint16,
        uint16
    ){
        ISoulLoot _loot = ISoulLoot(nft_);
        ILootByRogueV2.AdventureRecord memory _record = _loot.getAdventureRecord(tokenId_);
        return (
            _record.inputData.seed,
            _record.turn,
            _record.maxHp,
            _record.currentHp,
            _record.attack,
            _record.defence,
            _record.recovery
        );
    }

    function calcEquipment (
        address nft_, 
        uint256 tokenId_, 
        bytes memory data_
    ) public view returns (
        uint256 _seed,
        uint256[8] memory _equipmentIds,
        string[8] memory _equipmentNames,
        uint256[8] memory _equipmentRarities
    ){
        ISoulLoot _loot = ISoulLoot(nft_);
        ILootByRogueV2.AdventureRecord memory _record = _loot.getAdventureRecord(tokenId_);
        uint256 _rarity = 1;

        return (
            _record.inputData.seed,
            [_record.weapon, _record.chestArmor, _record.headArmor, _record.waistArmor, _record.footArmor, _record.handArmor, _record.necklace, _record.ring],
            [_loot.getWeapon(tokenId_), _loot.getChest(tokenId_), _loot.getHead(tokenId_), _loot.getWaist(tokenId_), _loot.getFoot(tokenId_), _loot.getHand(tokenId_), _loot.getNeck(tokenId_), _loot.getRing(tokenId_)],
            [_rarity,_rarity,_rarity,_rarity,_rarity,_rarity,_rarity,_rarity]
        );
    }

    function calcArtifact (
        address nft_, 
        uint256 tokenId_, 
        bytes memory data_
    ) public view returns (
        uint256 _seed,
        uint256 _artifactType
    ){
        ISoulLoot _loot = ISoulLoot(nft_);
        ILootByRogueV2.AdventureRecord memory _record = _loot.getAdventureRecord(tokenId_);

        return (_record.inputData.seed, _record.inputData.seed % 4);
    }

    function calcItem(
        address nft_, 
        uint256 tokenId_, 
        bytes memory data_
    ) public view returns(
        uint256 _seed,
        uint256 _itemType,
        uint256 _rarity
    ){
        ISoulLoot _loot = ISoulLoot(nft_);
        ILootByRogueV2.AdventureRecord memory _record = _loot.getAdventureRecord(tokenId_);
        uint16 _stats = _record.stats[0] + _record.stats[1] + _record.stats[2] + _record.stats[3] + _record.stats[4] + _record.stats[5];
        uint8 _unique = _record.unique[0] + _record.unique[1] + _record.unique[2] + _record.unique[3];
        uint256 _pt = _stats + (_unique * 10);
        if (_pt > 400) {
            _rarity = 2;
        } else if(_pt > 200) {
            _rarity = 1;
        } else {
            _rarity = 0;
        }
        return (_record.inputData.seed, _record.inputData.seed % 10 ,1);
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

    //*********************************************
    //Logic
    //*********************************************
}