// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "../lib/Bytecode.sol";
import "../interfaces/ISoulCalculator.sol";
import "../interfaces/lootNfts/ILootByRogueV2.sol";

contract LootByRogueV2 is AccessControl, ISoulCalculator {
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
    ) public view returns (ILootByRogueV2.AdventureRecord memory record_, uint256 _tokenId){
        ILootByRogueV2 _loot = ILootByRogueV2(nft_);
        ILootByRogueV2.AdventureRecord memory _record = _loot.getAdventureRecord(tokenId_);
        _tokenId = tokenId_;
        return (
            _record,
            _tokenId
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
        ILootByRogueV2 _loot = ILootByRogueV2(nft_);
        ILootByRogueV2.AdventureRecord memory _record = _loot.getAdventureRecord(tokenId_);

        return (
            _record.inputData.seed,
            [_record.weapon, _record.chestArmor, _record.headArmor, _record.waistArmor, _record.footArmor, _record.handArmor, _record.necklace, _record.ring],
            [_loot.getWeapon(tokenId_), _loot.getChest(tokenId_), _loot.getHead(tokenId_), _loot.getWaist(tokenId_), _loot.getFoot(tokenId_), _loot.getHand(tokenId_), _loot.getNeck(tokenId_), _loot.getRing(tokenId_)],
            [
                _calcRarity(_record.weapon),
                _calcRarity(_record.chestArmor),
                _calcRarity(_record.headArmor),
                _calcRarity(_record.waistArmor),
                _calcRarity(_record.footArmor),
                _calcRarity(_record.handArmor),
                _calcRarity(_record.necklace),
                _calcRarity(_record.ring)
            ]
        );
    }

    function calcJob (
        address nft_, 
        uint256 tokenId_, 
        bytes memory data_
    ) public view returns (
        uint256 _seed,
        uint256 _jobType
    ){
        ILootByRogueV2 _loot = ILootByRogueV2(nft_);
        ILootByRogueV2.AdventureRecord memory _record = _loot.getAdventureRecord(tokenId_);

        return (_record.inputData.seed, _record.inputData.seed % 4);
    }

    function calcArtifact(
        address nft_, 
        uint256 tokenId_, 
        bytes memory data_
    ) public view returns(
        uint256 _seed,
        uint256[3] memory _artifactType
    ){
        ILootByRogueV2 _loot = ILootByRogueV2(nft_);
        ILootByRogueV2.AdventureRecord memory _record = _loot.getAdventureRecord(tokenId_);
        uint8 _unique = _record.unique[0] + _record.unique[1] + _record.unique[2] + _record.unique[3];
        // Calculate type
        // Dragon Slayer(type: 2)
        if(_unique==0){
            _artifactType[0]=2; 
        } else if(_unique==1){
            // Dragon Slayer+(type: 3)
            _artifactType[0]=3; 
        } else if(_unique==2){
            // Dragon Slayer++(type: 4)
            _artifactType[0]=4; 
        } else if(_unique > 3){
            // Dragon Slayer+++(type: 5)
            _artifactType[0]=5; 
        }

        // Ruins Hunter(type: 6)
        if(_record.relics.length > 10) {
            _artifactType[1]=6;
        }

        // Naked King(type: 1)
        if(
            _record.weapon==0 && _record.chestArmor==0 && _record.headArmor==0
            && _record.waistArmor==0 && _record.footArmor==0 && _record.handArmor==0
            && _record.necklace==0 && _record.ring==0
        ){
            _artifactType[2] = 1; 
        }

        return (_record.inputData.seed, _artifactType);
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
    function _calcRarity(uint256 pt_) private  pure returns(uint256 rarity_){
        rarity_=0;
        if(pt_ > 0){
            rarity_=1;
            uint256 _greatness = pt_ % 21;
            if(_greatness == 19) {
                rarity_=3;
            } else if(_greatness > 19) {
                rarity_=4;
            } else if(_greatness > 14) {
                rarity_=2;
            }
        }
        return rarity_;
    }
}