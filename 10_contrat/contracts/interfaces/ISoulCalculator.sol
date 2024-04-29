// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./lootNfts/ILootByRogueV2.sol";

interface ISoulCalculator {
    function calcSoul(
        address nft_, 
        uint256 tokenId_, 
        bytes memory seedData_
    ) external returns (
        ILootByRogueV2.AdventureRecord memory _record,
        uint256 _tokenId
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

    function calcJob(
        address nft_, 
        uint256 tokenId_, 
        bytes memory seedData_
    ) external view returns (
        uint256 _seed,
        uint256 _jobType
    );

    function calcArtifact(
        address nft_, 
        uint256 tokenId_, 
        bytes memory seedData_
    ) external view returns (
        uint256 _seed,
        uint256[3] memory _artifactType
    );
}
