// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../v1/ILootByRogue.sol";
import "../v1/Rogue.sol";

contract TestRogue is Rogue {
    constructor(address _loot, address _costToken, uint256 _cost, address _receipt)
        Rogue(_loot, _costToken, _cost, _receipt) {}

    function testMint(uint256 seed, uint8[] calldata directions, uint8[] calldata items) external whenNotPaused {
        require(directions.length == items.length, "Lengths do not match");
        require(costToken.transferFrom(msg.sender, receipt, cost), "Transfer failed");

        ILootByRogue.AdventureRecord memory results = testAdventure(seed, directions, items);
        loot.safeMint(msg.sender, results);
    }

    function testInitAdventureRecord(uint256 seed) internal pure returns (ILootByRogue.AdventureRecord memory){
        return ILootByRogue.AdventureRecord({
            seed: seed,
            turn: 0,
            maxHp: 5000,
            currentHp: 5000,
            attack: 5000,
            defence: 5000,
            recovery: 5000,
            stats: [uint16(0), uint16(0), uint16(0), uint16(0), uint16(0), uint16(0)],
            unique: [uint8(0), uint8(0), uint8(0), uint8(0)],
            weapon: 0,
            chestArmor: 0,
            headArmor: 0,
            waistArmor: 0,
            footArmor: 0,
            handArmor: 0,
            necklace: 0,
            ring: 0,
            relics: new uint256[](0)
        });
    }

    function testInitTemporary() internal pure returns (Temporary memory) {
        return initTemporary();
    }

    function testAdventure(uint256 seed, uint8[] calldata directions, uint8[] calldata items) public view returns (ILootByRogue.AdventureRecord memory){
        uint256[MAX_RELIC] memory relics;
        ILootByRogue.AdventureRecord memory record = testInitAdventureRecord(seed);
        Temporary memory t = testInitTemporary();
        uint64 bosses = createBosses(seed);
        uint256[SIZE] memory moved;
        setMoved(moved, t.x, t.y);
        
        uint length = directions.length;
        for (uint i = 0; i < length;) {
            unchecked {
                record.turn++;
            }

            // up=0, down=1, left=2, right=3
            uint8 v = directions[i];
            if (v == 0) {
                require(!(t.y == SIZE - 1 || isMoved(moved, t.x, t.y + 1)), "Movement is not allowed");
                t.y++;
            } else if (v == 1) {
                require(!(t.y == 0 || isMoved(moved, t.x, t.y - 1)), "Movement is not allowed");
                t.y--;
            } else if (v == 2) {
                require(!(t.x == 0 || isMoved(moved, t.x - 1, t.y)), "Movement is not allowed"); 
                t.x--;
            } else if (v == 3) {
                require(!(t.x == SIZE - 1 || isMoved(moved, t.x + 1, t.y)), "Movement is not allowed"); 
                t.x++;
            } else {
                revert("Invalid value in directions");
            }
            setMoved(moved, t.x, t.y);

            // none=0, heal_portion=1, defence_portion=2, loot_lock=3, reroll=4
            uint8 item = 0;
            if (items[i] == 1) {
                item = t.item1;
                t.item1 = 0;
                useItem(record, t, item);
            } else if (items[i] == 2) {
                item = t.item2;
                t.item2 = 0;
                useItem(record, t, item);
            }

            uint256 rand = random(seed, t.rerollCount, t.x, t.y);
            uint256 events = rand % 1357;
            record.currentHp -= calcTakeDamage(record, t, rand, bosses);
            if (events < 588) {
                if (item != 3) {
                    uint256 drop = randomLoot(rand, record.turn);
                    if (events < 70) {
                        record.weapon = drop;
                    } else if (events < 144) {
                        record.chestArmor = drop;
                    } else if (events < 218) {
                        record.headArmor = drop;
                    } else if (events < 292) {
                        record.waistArmor = drop;
                    } else if (events < 366) {
                        record.footArmor = drop;
                    } else if (events < 440) {
                        record.handArmor = drop;
                    } else if (events < 514) {
                        record.necklace = drop;
                    } else if (events < 588) {
                        record.ring = drop;
                    }
                }
            } else if (events < 763) {
                record.currentHp += calcHeal(record, 1);
            } else if (events < 948) {
                record.maxHp += uint16(rand % 4 + 6);
            } else if (events < 1046) {
                record.attack += uint16(rand % 2 + 1);
            } else if (events < 1144) {
                record.defence += uint16(rand % 2 + 1);
            } else if (events < 1242) {
                record.recovery += uint16(rand % 3 + 1);
            } else if (events < 1331) {
                if (t.item1 == 0) {
                    t.item1 = uint8(rand % 4 + 1);
                } else if (t.item2 == 0) {
                    t.item2 = uint8(rand % 4 + 1);
                }
            } else if (events < 1336) {
                tributeGeyser(record);
            } else if (events < 1342) {
                t.exit = record.turn;
            } else if (events < 1347 && t.relicCount < MAX_RELIC) {
                relics[t.relicCount] = rand;
                t.relicCount += 1;
            }

            unchecked {
                i++;
            }
        }
        // require(t.exit == length, "The end point is not the exit");

        if (t.relicCount != 0) {
            uint256[] memory tmp = new uint256[](t.relicCount);
            for (uint256 i = 0; i < t.relicCount; i++) {
                tmp[i] = relics[i];
            }
            record.relics = tmp;
        }
        return record;
    }

    function testCalcHeal(ILootByRogue.AdventureRecord memory record, uint256 rate) public pure returns (uint16) {
        return calcHeal(record, rate);
    }

    function testDifficulty(uint256 turn) public pure returns (uint256) {
        return calcDifficulty(turn);
    }

    function testEnemyType(uint256 rand) public pure returns (uint256) {
        return calcEnemyType(rand);
    }

    function testCalcMobDamage(uint8 enemyType, uint16 turn, uint16 playerAttack) public pure returns (uint16) {
        return calcMobDamage(enemyType, turn, playerAttack);
    }

    function testValcBossDamage(uint8 bossType, uint16 turn, uint16 playerAttack) public pure returns (uint16) {
        return calcBossDamage(bossType, turn, playerAttack);
    }

    function testCalcTakeDamage(ILootByRogue.AdventureRecord memory record, Temporary memory t, uint256 rand, uint64 bosses) public pure returns (uint16) {
        return calcTakeDamage(record, t, rand, bosses);
    }

    function testUseItem(ILootByRogue.AdventureRecord memory record, Temporary memory t, uint8 item) public pure returns (Temporary memory) {
        useItem(record, t, item);
        return t;
    }

    function testTributeGeyser(ILootByRogue.AdventureRecord memory record) public pure returns (ILootByRogue.AdventureRecord memory) {
        tributeGeyser(record);
        return record;
    }

    function testTributeGeyserAttack(uint256 rand) public pure returns (uint16) {
        return tributeGeyserAttack(rand);
    }

    function testTributeGeyserDefence(uint256 rand) public pure returns (uint16) {
        return tributeGeyserDefence(rand);
    }

    function testTributeGeyserRecovery(uint256 rand) public pure returns (uint16) {
        return tributeGeyserRecovery(rand);
    }

    function testRarity(uint256 rand) public pure returns (uint16) {
        return rarity(rand);
    }

    function testIsMoved(uint256[SIZE] memory moved, uint8 x, uint8 y) public pure returns (bool) {
        return isMoved(moved, x, y);
    }

    function testSetMoved(uint256[SIZE] memory moved, uint8 x, uint8 y) public pure returns (uint256[SIZE] memory) {
        setMoved(moved, x, y);
        return moved;
    }

    function testRandom(uint256 seed, uint8 rerollCount, uint8 x, uint8 y) public view returns (uint256) {
        return random(seed, rerollCount, x, y);
    }

    function testRandomLoot(uint256 r, uint16 turn) public pure returns (uint256) {
        return randomLoot(r, turn);
    }

    function testCreateBosses(uint256 seed) public pure returns (uint64) {
        return createBosses(seed);
    }

    function testCheckMatchBoss(uint64 packedValue, uint8 x, uint8 y) internal pure returns (int8) {
        return checkMatchBoss(packedValue, x, y);
    }
}