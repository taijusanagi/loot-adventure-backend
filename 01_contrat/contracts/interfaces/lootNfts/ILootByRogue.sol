// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

interface ILootByRogue {
    struct AdventureRecord {
        uint256 seed;
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

    //function safeMint(address to, AdventureRecord calldata record) external;
    
    function getSeed(uint256 tokenId) external view returns (uint256);

    function getTurn(uint256 tokenId) external view returns (uint16);

    function getMaxHp(uint256 tokenId) external view returns (uint16);

    function getCurrentHp(uint256 tokenId) external view returns (uint16);

    function getAttack(uint256 tokenId) external view returns (uint16);

    function getDefence(uint256 tokenId) external view returns (uint16);

    function getRecovery(uint256 tokenId) external view returns (uint16);

    function getWeapon(uint256 tokenId) external view returns (string memory);

    function getChest(uint256 tokenId) external view returns (string memory);

    function getHead(uint256 tokenId) external view returns (string memory);

    function getWaist(uint256 tokenId) external view returns (string memory);

    function getFoot(uint256 tokenId) external view returns (string memory);

    function getHand(uint256 tokenId) external view returns (string memory);

    function getNeck(uint256 tokenId) external view returns (string memory);

    function getRing(uint256 tokenId) external view returns (string memory);

    function getStats(uint256 tokenId, uint256 index) external view returns (uint16);

    function getUnique(uint256 tokenId, uint256 index) external view returns (uint8);

    function getRelics(uint256 tokenId) external view returns (uint256[] memory);

    function getRelicsLength(uint256 tokenId) external view returns (uint256);

    function getRelic(uint256 tokenId, uint256 index) external view returns (uint256);

    function safeMint(address to, uint256 _seed,
        uint16 _turn,
        uint16 _maxHp,
        uint16 _currentHp,
        uint16 _attack,
        uint16 _defence,
        uint16 _recovery,
        uint16[6] memory  _stats,
        uint8[4] memory _unique,
        uint256 _weapon,
        uint256 _chestArmor,
        uint256 _headArmor,
        uint256 _waistArmor,
        uint256 _footArmor,
        uint256 _handArmor,
        uint256 _necklace,
        uint256 _ring,
        uint256[] memory _relics
    ) external;
}