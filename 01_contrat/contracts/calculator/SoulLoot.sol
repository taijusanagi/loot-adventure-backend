// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "../lib/Bytecode.sol";
import "../interfaces/ISoulNft.sol";
import "../interfaces/ISoulCalculator.sol";

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
        ISoulNft _loot = ISoulNft(nft_);
        ISoulNft.LootSoul memory _lootSoul = _loot.getLootSoul(tokenId_);
        return (
            _lootSoul.seed,
            _lootSoul.turn,
            _lootSoul.maxHp,
            _lootSoul.currentHp,
            _lootSoul.attack,
            _lootSoul.defence,
            _lootSoul.recovery
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
        ISoulNft _loot = ISoulNft(nft_);
        ISoulNft.LootSoul memory _lootSoul = _loot.getLootSoul(tokenId_);
        uint256 _a = 1;
        return (
            _lootSoul.seed,
            [
                _a,
                _a,
                _a,
                _a,
                _a,
                _a,
                _a,
                _a
            ],
            [
                'a',
                'a',
                'a',
                'a',
                'a',
                'a',
                'a',
                'a'
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