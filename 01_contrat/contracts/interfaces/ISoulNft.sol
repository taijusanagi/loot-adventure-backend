// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface ISoulNft is IERC721{
    struct LootSoul {
        uint256 seed;
        uint16 turn;
        uint16 maxHp;
        uint16 currentHp;
        uint16 attack;
        uint16 defence;
        uint16 recovery;
        address rAddress;
        uint256 rTokenId;
    }

    function safeMint(
        address to_,
        address nft_,
        uint256 tokenId_,
        uint256 seed_,
        uint16 turn_,
        uint16 maxHp_,
        uint16 currentHp_,
        uint16 attack_,
        uint16 defence_,
        uint16 recovery_
    ) external;
    function getSeed(uint256 tokenId_) external view returns (uint256);
    function getTurn(uint256 tokenId_) external view returns (uint16);
    function getMaxHp(uint256 tokenId_) external view returns (uint16);
    function getCurrentHp(uint256 tokenId_) external view returns (uint16);
    function getAttack(uint256 tokenId_) external view returns (uint16);
    function getDefence(uint256 tokenId_) external view returns (uint16);
    function getRecovery(uint256 tokenId_) external view returns (uint16);
}
