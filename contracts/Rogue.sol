// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./RogueLoot.sol";

contract Rogue is Pausable, Ownable {
    RogueLoot public loot;
    using Strings for uint256;

    struct AdventureData {
        uint256 x;
        uint256 y;
        uint256 currentHp;
        uint256 rerollCount;
        uint256 item1;
        uint256 item2;
        uint256 exit;
    }

    constructor() {
        loot = new RogueLoot();
    }

    function pause() public onlyOwner {
        _pause();
        loot.pause();
    }

    function unpause() public onlyOwner {
        _unpause();
        loot.unpause();
    }

    function mint(uint256 seed, uint8[] calldata actions, uint8[] calldata useItem) public whenNotPaused {
        // payable value

        RogueLoot.AdventureRecord memory results = adventure(seed, actions, useItem);
        loot.mint(msg.sender, results);
    }

    function adventure(uint256 seed, uint8[] calldata actions, uint8[] calldata useItem) public pure returns (RogueLoot.AdventureRecord memory){
        RogueLoot.AdventureRecord memory record = RogueLoot.AdventureRecord({
            seed: seed,
            turn: 0,
            hp: 36,
            attack: 8,
            defence: 6,
            recovery: 4,
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
        AdventureData memory d = AdventureData({
            x: 64,
            y: 64,
            currentHp: 36,
            rerollCount: 0,
            item1: 0,
            item2: 0,
            exit: 0
        });
        string memory s = seed.toString();
 
        uint length = actions.length;
        for (uint i = 0; i < length; i++) {
            record.turn++;

            uint8 ac = actions[i];
            if (ac == 0) {
                require(!moved[d.x][d.y+1], "moved");
                moved[d.x][d.y+1] = true;
                d.y++;
            } else if (ac == 1) {
                require(!moved[d.x][d.y-1], "moved");
                moved[d.x][d.y-1] = true;
                d.y--;
            } else if (ac == 2) {
                require(!moved[d.x+1][d.y], "moved");
                moved[d.x+1][d.y] = true;
                d.x++;
            } else if (ac == 3) {
                require(!moved[d.x-1][d.y], "moved");
                moved[d.x-1][d.y] = true;
                d.x--;
            } else {
                revert("error input");
            }

            uint256 item = 0;
            if (useItem[i] == 1) {
                item = d.item1;
                d.item1 = 0;
            } else if (useItem[i] == 2) {
                item = d.item2;
                d.item2 = 0;
            }

            if (item == 1) {
                d.currentHp += heal(record, d.currentHp, 5);
            } else if (item == 4) {
                d.rerollCount += 1;
            }

            uint256 rand = random(string(
                abi.encodePacked(
                    s,
                    d.rerollCount.toString(),
                    d.x.toString(),
                    d.y.toString()
                )));

            uint256 drop = rand % 197;
            d.currentHp -= takeDamage(record, d.currentHp, item, rand);
            if (drop < 15) {
                if (d.item1 == 0) {
                    d.item1 = rand % 4 + 1;
                } else if (d.item2 == 0) {
                    d.item2 = rand % 4 + 1;
                }
            } else if (drop < 35) {
                d.currentHp += heal(record, d.currentHp, 1);
            } else if (drop < 60) {
                record.hp += uint32(rand % 3 + 1);
            } else if (drop < 75) {
                record.attack += uint32(rand % 2 + 1);
            } else if (drop < 90) {
                record.defence += uint32(rand % 2 + 1);
            } else if (drop < 105) {
                record.recovery += uint32(rand % 2 + 1);
            } else if (item != 3) {
                if (drop < 115) {
                    record.weapon = rand;
                } else if (drop < 125) {
                    record.chestArmor = rand;
                } else if (drop < 135) {
                    record.headArmor = rand;
                } else if (drop < 145) {
                    record.waistArmor = rand;
                } else if (drop < 155) {
                    record.footArmor = rand;
                } else if (drop < 165) {
                    record.handArmor = rand;
                } else if (drop < 175) {
                    record.necklace = rand;
                } else if (drop < 185) {
                    record.ring = rand;
                } else if (drop < 187) {
                    d.exit = record.turn;
                }
            }
        }
        require(d.exit == length, "The end point is not the exit");
        return record;
    }

    function heal(RogueLoot.AdventureRecord memory record, uint256 currentHp, uint256 rate) internal pure returns (uint256) {
        uint256 recovery = record.recovery * rate;
        if (recovery + currentHp <= record.hp) {
            return recovery;
        } else {
            return record.hp - currentHp;
        }
    }

    function takeDamage(RogueLoot.AdventureRecord memory record, uint256 currentHp, uint256 item, uint256 rand) internal pure returns (uint256) {
        uint256 n = rand % 100;
        uint256 enemyAttack = (n ** 2 + n * 200) / 5000 + record.turn / 3;
        if (record.attack < enemyAttack) {
            enemyAttack += (record.attack - enemyAttack * 2);
        }

        uint256 playerDefence = record.defence;
        if (item == 2) {
            playerDefence += 99999;
        }
        if (playerDefence < enemyAttack) {
            require(currentHp >= enemyAttack - playerDefence, "hp less than 0");
            return enemyAttack - record.defence;
        } else {
            return 0;
        }
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }
}