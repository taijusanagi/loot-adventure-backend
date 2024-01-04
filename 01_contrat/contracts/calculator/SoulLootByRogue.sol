// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "../lib/Bytecode.sol";
import "../interfaces/ILootByRogueV2.sol";

contract SoulLootByRogue is AccessControl {
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
    // function calcSoul(
    //     address nft_, 
    //     uint256 tokenId_, 
    //     bytes memory data_
    // ) public view returns (bytes memory _data){
    //     ILootByRogueV2 _loot = ILootByRogueV2(nft_);
    //     ILootByRogueV2.AdventureRecord memory _record = _loot.getAdventureRecord(tokenId_);
    //     _data = abi.encodePacked(
    //         _record.inputData.seed,
    //         _record.turn,
    //         _record.maxHp,
    //         _record.currentHp,
    //         _record.attack,
    //         _record.defence,
    //         _record.recovery
    //     );

    //     return _data;
    // }

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
        ILootByRogueV2 _loot = ILootByRogueV2(nft_);
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

    function calcArmour (
        address nft_, 
        uint256 tokenId_, 
        bytes memory data_
    ) public view returns (
        uint256 _seed,
        uint256[8] memory _armourIds,
        string[8] memory _armourNames
    ){
        ILootByRogueV2 _loot = ILootByRogueV2(nft_);
        ILootByRogueV2.AdventureRecord memory _record = _loot.getAdventureRecord(tokenId_);

        return (
            _record.inputData.seed,
            [
                _record.weapon,
                _record.chestArmor,
                _record.headArmor,
                _record.waistArmor,
                _record.footArmor,
                _record.handArmor,
                _record.necklace,
                _record.ring
            ],
            [
                _loot.getWeapon(tokenId_),
                _loot.getChest(tokenId_),
                _loot.getHead(tokenId_),
                _loot.getWaist(tokenId_),
                _loot.getFoot(tokenId_),
                _loot.getHand(tokenId_),
                _loot.getNeck(tokenId_),
                _loot.getRing(tokenId_)
            ]
        );
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