// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ISoulCalculator {
    function calcSoul(
        address nft_, 
        uint256 tokenId_, 
        bytes memory seedData_
    ) external view returns (
        uint256 _seed,
        uint16 _turn,
        uint16 _maxHp,
        uint16 _currentHp,
        uint16 _attack,
        uint16 _defence,
        uint16 _recovery
    );

    function calcEquipment(
        address nft_, 
        uint256 tokenId_, 
        bytes memory seedData_
    ) external view returns (
        uint256 _seed,
        uint256[8] memory _equipmentIds,
        string[8] memory _equipmentNames,
        uint256[8] memory _equipmentRarities
    );

    function calcArtifact(
        address nft_, 
        uint256 tokenId_, 
        bytes memory seedData_
    ) external view returns (
        uint256 _seed,
        uint256 _artifactType
    );

    function calcItem(
        address nft_, 
        uint256 tokenId_, 
        bytes memory seedData_
    ) external view returns (
        uint256 _seed,
        uint256 _itemType,
        uint256 _rarity
    );
}
