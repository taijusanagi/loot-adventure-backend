// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./ILootByRogueV2.sol";

interface ISoulLoot is IERC721{
    struct InputData {
        uint256 seed;
        // up=0, down=1, left=2, right=3
        uint8[] directions;
        // none=0, useItem1=1, useItem2=2
        uint8[] useItems;
    }

    function safeMint(
        address to_,
        uint256 chainId_,
        address nft_,
        uint256 tokenId_,
        ILootByRogueV2.AdventureRecord memory record_
    ) external;
    function getAdventureRecord(uint256 tokenId_) external view returns (ILootByRogueV2.AdventureRecord memory);
    function getSeed(uint256 tokenId_) external view returns (uint256);
    function getTurn(uint256 tokenId_) external view returns (uint16);
    function getMaxHp(uint256 tokenId_) external view returns (uint16);
    function getCurrentHp(uint256 tokenId_) external view returns (uint16);
    function getAttack(uint256 tokenId_) external view returns (uint16);
    function getDefence(uint256 tokenId_) external view returns (uint16);
    function getRecovery(uint256 tokenId_) external view returns (uint16);
}
