// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./SimpleRougeLoot.sol";

contract SimpleRouge is Pausable, Ownable {
    SimpleRougeLoot public loot;
    using Strings for uint256;
    using Strings for uint128;
    using Strings for uint32;
 
    constructor() {
        loot = new SimpleRougeLoot();
    }

    function pause() public onlyOwner {
        _pause();
        loot.pause();
    }

    function unpause() public onlyOwner {
        _unpause();
        loot.unpause();
    }

    function mint(uint256 seed, uint8[] calldata actions) public whenNotPaused {
        SimpleRougeLoot.AdventureRecord memory results = adventure(seed, actions);
        loot.mint(msg.sender, results);
    }

    function adventure(uint256 seed, uint8[] calldata actions) public pure returns (SimpleRougeLoot.AdventureRecord memory){
        SimpleRougeLoot.AdventureRecord memory record = SimpleRougeLoot.AdventureRecord({
            seed: seed,
            turn: 0,
            hp: 24,
            attack: 8,
            defence: 4,
            recovery: 2,
            weapon: 0,
            chestArmor: 0,
            headArmor: 0,
            waistArmor: 0,
            footArmor: 0,
            handArmor: 0,
            necklace: 0,
            ring: 0
        });
        bool[128][128] memory moved;
        uint256 x = 64;
        uint256 y = 64;
        uint256 currentHp = 24;
        uint256 item = 0;
        string memory s = seed.toString();
 
        uint length = actions.length;
        for (uint i = 0; i < length; i++) {
            record.turn++;

            uint8 ac = actions[i];
            bool useItem = ac % 2 == 0;
            if (ac < 3) {
                require(!moved[x][y+1], "moved");
                moved[x][y+1] = true;
                y++;
            } else if (ac < 5) {
                require(!moved[x][y-1], "moved");
                moved[x][y-1] = true;
                y--;
            } else if (ac < 7) {
                require(!moved[x+1][y], "moved");
                moved[x+1][y] = true;
                x++;
            } else if (ac < 9) {
                require(!moved[x-1][y], "moved");
                moved[x-1][y] = true;
                x--;
            } else {
                revert("error input");
            }

            if (useItem && item == 1) {
                currentHp += heal(record, currentHp, 5);
            }
            uint256 attack = currentAttack(record.attack, useItem, item);
            uint256 defence = currentDefence(record.defence, useItem, item);
            if (useItem) {
                item = 0;
            }

            uint256 rand = random(string(abi.encodePacked(s, x.toString(), y.toString())));
            uint256 drop = rand % 53;

            currentHp -= takeDamage(record, attack, defence, currentHp, rand);
            if (drop < 2) {
                item = uint32(rand % 3 + 1);
            } else if (drop < 5) {
                currentHp += heal(record, currentHp, 1);
            } else if (drop < 8) {
                record.hp += uint32(rand % 3 + 1);
            } else if (drop < 11) {
                record.attack += uint32(rand % 2 + 1);
            } else if (drop < 14) {
                record.defence += uint32(rand % 2 + 1);
            } else if (drop < 17) {
                record.recovery += uint32(rand % 2 + 1);
            } else if (drop < 20) {
                record.weapon = rand;
            } else if (drop < 21) {
                record.chestArmor = rand;
            } else if (drop < 22) {
                record.headArmor = rand;
            } else if (drop < 23) {
                record.waistArmor = rand;
            } else if (drop < 24) {
                record.footArmor = rand;
            } else if (drop < 25) {
                record.handArmor = rand;
            } else if (drop < 26) {
                record.necklace = rand;
            } else if (drop < 27) {
                record.ring = rand;
            }
        }
        return record;
    }

    function heal(SimpleRougeLoot.AdventureRecord memory record, uint256 currentHp, uint256 rate) internal pure returns (uint256) {
        uint256 recovery = record.recovery * rate;
        if (recovery + currentHp <= record.hp) {
            return recovery;
        } else {
            return record.hp - currentHp;
        }
    }

    function takeDamage(SimpleRougeLoot.AdventureRecord memory record, uint256 myAttack, uint256 myDefence, uint256 currentHp, uint256 rand) internal pure returns (uint256) {
        uint256 enemyAttack = rand % 6 + record.turn / 4;
        require(myAttack >= enemyAttack, "cannot move");

        if (myDefence < enemyAttack) {
            require(currentHp >= enemyAttack - myDefence, "hp 0");
            return enemyAttack - record.defence;
        } else {
            return 0;
        }
    }

    function currentAttack(uint32 a, bool useItem, uint256 item) internal pure returns (uint256) {
        return a + (useItem && item == 2 ? 99999 : 0);
    }

    function currentDefence(uint32 d, bool useItem, uint256 item) internal pure returns (uint256) {
        return d + (useItem && item == 3 ? 99999 : 0);
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }
}