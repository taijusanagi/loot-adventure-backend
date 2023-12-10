// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import './ILoot.sol';
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface ILootByRogueV2 is IERC721, ILoot {
    event MintSeed(address validator, uint256 tokenId, uint256 seed);

    struct InputData {
        uint256 seed;
        // up=0, down=1, left=2, right=3
        uint8[] directions;
        // none=0, useItem1=1, useItem2=2
        uint8[] useItems;
    }

    struct AdventureRecord {
        InputData inputData;
        uint16 turn;
        uint16 maxHp;
        uint16 currentHp;
        uint16 attack;
        uint16 defence;
        uint16 recovery;
        uint16[6] stats;
        uint8[4] unique;
        uint256 weapon;
        uint256 chestArmor;
        uint256 headArmor;
        uint256 waistArmor;
        uint256 footArmor;
        uint256 handArmor;
        uint256 necklace;
        uint256 ring;
        uint256[] relics;
    }

    function safeMint(address to, AdventureRecord calldata record) external;

    function convert(address to, AdventureRecord calldata record, uint256 tokenId) external;

    function reserveV1MintdSeed(uint256[] calldata seeds) external;

    function isMintedSeed(uint256 seed) external view returns (bool);

    function getAdventureRecord(uint256 tokenId) external view returns (AdventureRecord memory);
    
    function getSeed(uint256 tokenId) external view returns (uint256);

    function getDirections(uint256 tokenId) external view returns (uint8[] memory);

    function getUseItems(uint256 tokenId) external view returns (uint8[] memory);

    function getTurn(uint256 tokenId) external view returns (uint16);

    function getMaxHp(uint256 tokenId) external view returns (uint16);

    function getCurrentHp(uint256 tokenId) external view returns (uint16);

    function getAttack(uint256 tokenId) external view returns (uint16);

    function getDefence(uint256 tokenId) external view returns (uint16);

    function getRecovery(uint256 tokenId) external view returns (uint16);

    function getStats(uint256 tokenId, uint256 index) external view returns (uint16);

    function getUnique(uint256 tokenId, uint256 index) external view returns (uint8);

    function getRelics(uint256 tokenId) external view returns (uint256[] memory);

    function getRelicsLength(uint256 tokenId) external view returns (uint256);
}
