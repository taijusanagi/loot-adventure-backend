// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ILootByRogue.sol";

contract Rogue is Pausable, Ownable {
    ILootByRogue public loot;
    IERC20 public costToken;
    uint256 public cost;
    address public receipt;
    uint256 public constant SIZE = 64;
    uint8 public constant MAX_RELIC = 16;

    struct Temporary {
        uint8 x;
        uint8 y;
        uint8 rerollCount;
        uint8 item1;
        uint8 item2;
        uint8 relicCount;
        uint16 defenceBuffTurn;
        uint16 exit;
    }

    constructor(address _loot, address _costToken, uint256 _cost, address _receipt) {
        loot = ILootByRogue(_loot);
        costToken = IERC20(_costToken);
        cost = _cost;
        receipt = _receipt;
    }

    function setCostToken(IERC20 _costToken) public onlyOwner() {
        costToken = _costToken;
    }

    function setReceipt(address _receipt) public onlyOwner() {
        receipt = _receipt;
    }

    function mint(uint256 seed, uint8[] calldata directions, uint8[] calldata items) public whenNotPaused {
        require(directions.length == items.length, "Lengths do not match");
        require(costToken.transferFrom(msg.sender, receipt, cost), "Transfer failed");

        ILootByRogue.AdventureRecord memory results = adventure(seed, directions, items);
        loot.safeMint(msg.sender, results);
    }

    function initAdventureRecord(uint256 seed) public pure returns (ILootByRogue.AdventureRecord memory){
        return ILootByRogue.AdventureRecord({
            seed: seed,
            turn: 0,
            maxHp: 36,
            currentHp: 36,
            attack: 8,
            defence: 6,
            recovery: 4,
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

    function initTemporary() public pure returns (Temporary memory){
        return Temporary({
            x: uint8(SIZE / 2),
            y: uint8(SIZE / 2),
            rerollCount: 0,
            item1: 0,
            item2: 0,
            relicCount: 0,
            defenceBuffTurn: 0,
            exit: 0
        });
    }

    function adventure(uint256 seed, uint8[] calldata directions, uint8[] calldata items) public view returns (ILootByRogue.AdventureRecord memory){
        uint256[MAX_RELIC] memory relics;
        ILootByRogue.AdventureRecord memory record = initAdventureRecord(seed);
        Temporary memory t = initTemporary();
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
            uint256 events = rand % 197;
            record.currentHp -= calcTakeDamage(record, t, rand, bosses);
            if (events < 80) {
                if (item != 3) {
                    uint256 drop = randomLoot(rand, record.turn);
                    if (events < 10) {
                        record.weapon = drop;
                    } else if (events < 20) {
                        record.chestArmor = drop;
                    } else if (events < 30) {
                        record.headArmor = drop;
                    } else if (events < 40) {
                        record.waistArmor = drop;
                    } else if (events < 50) {
                        record.footArmor = drop;
                    } else if (events < 60) {
                        record.handArmor = drop;
                    } else if (events < 70) {
                        record.necklace = drop;
                    } else if (events < 80) {
                        record.ring = drop;
                    }
                }
            } else if (events < 105) {
                record.currentHp += calcHeal(record, 1);
            } else if (events < 130) {
                record.maxHp += uint16(rand % 3 + 1);
            } else if (events < 142) {
                record.attack += uint16(rand % 2 + 1);
            } else if (events < 154) {
                record.defence += uint16(rand % 2 + 1);
            } else if (events < 166) {
                record.recovery += uint16(rand % 2 + 1);
            } else if (events < 178) {
                if (t.item1 == 0) {
                    t.item1 = uint8(rand % 4 + 1);
                } else if (t.item2 == 0) {
                    t.item2 = uint8(rand % 4 + 1);
                }
            } else if (events < 182) {
                tributeGeyser(record);
            } else if (events < 185) {
                t.exit = record.turn;
            } else if (events < 187 && t.relicCount < MAX_RELIC) {
                relics[t.relicCount] = rand;
                t.relicCount += 1;
            }

            unchecked {
                i++;
            }
        }
        require(t.exit == length, "The end point is not the exit");

        if (t.relicCount != 0) {
            uint256[] memory tmp = new uint256[](t.relicCount);
            for (uint256 i = 0; i < t.relicCount; i++) {
                tmp[i] = relics[i];
            }
            record.relics = tmp;
        }
        return record;
    }

    function calcHeal(ILootByRogue.AdventureRecord memory record, uint256 rate) internal pure returns (uint16) {
        uint256 recovery = record.recovery * rate;
        if (recovery + record.currentHp <= record.maxHp) {
            return uint16(recovery);
        } else {
            return record.maxHp - record.currentHp;
        }
    }

    function difficulty(uint16 turn) internal pure returns (uint256) {
        return turn * (turn + 250) / 1000;
    }

    function calcMobDamage(uint8 enemyType, uint16 turn, uint16 playerAttack) internal pure returns (uint16) {
        uint16 enemyAttack = uint16(enemyType + difficulty(turn));
        if (playerAttack < enemyAttack) {
            enemyAttack += (enemyAttack - playerAttack) * 2;
        }
        return enemyAttack;
    }

    function calcBossDamage(uint8 bossType, uint16 turn, uint16 playerAttack) internal pure returns (uint16) {
        uint256 boss = (bossType + 1) * 12;
        uint16 enemyAttack = uint16(boss + difficulty(turn));
        if (playerAttack < enemyAttack) {
            enemyAttack += (enemyAttack - playerAttack) * 2;
        }
        return enemyAttack;
    }

    function calcTakeDamage(ILootByRogue.AdventureRecord memory record, Temporary memory t, uint256 rand, uint64 bosses) internal pure returns (uint16) {
        int8 boss = checkMatchBoss(bosses, t.x, t.y);
        uint16 damage = 0;
        if (boss == -1) {
            uint256 n = rand % 100;
            uint8 enemyType = uint8((n * n + n * 200) / 5000);
            damage = calcMobDamage(enemyType, record.turn, record.attack);
            record.stats[enemyType] += 1;
        } else {
            damage = calcBossDamage(uint8(boss), record.turn, record.attack);
            record.unique[uint8(boss)] += 1;
        }

        uint16 playerDefence = record.defence;
        if (record.turn < t.defenceBuffTurn) {
            playerDefence += 100;
        }
        if (playerDefence < damage) {
            require(damage - playerDefence <= record.currentHp, "HP less than 0");
            return damage - playerDefence;
        } else {
            return 0;
        }
    }

    function useItem(ILootByRogue.AdventureRecord memory record, Temporary memory t, uint8 item) internal pure {
        if (item == 1) {
            record.currentHp += calcHeal(record, 3);
        } else if (item == 2) {
            t.defenceBuffTurn = record.turn + 3;
        } else if (item == 4) {
            t.rerollCount += 1;
        }
    }

    function tributeGeyser(ILootByRogue.AdventureRecord memory record) internal pure {
        uint16 dmg = 0;
        uint16 tmp = 0;

        tmp = tributeGeyserAttack(record.weapon);
        record.attack += tmp;
        dmg += tmp;

        tmp = tributeGeyserDefence(record.chestArmor)
            + tributeGeyserDefence(record.headArmor)
            + tributeGeyserDefence(record.waistArmor)
            + tributeGeyserDefence(record.footArmor)
            + tributeGeyserDefence(record.handArmor);
        record.defence += tmp;
        dmg += tmp;

        tmp = tributeGeyserRecovery(record.necklace)
            + tributeGeyserRecovery(record.ring);
        record.recovery += tmp;
        dmg += tmp;

        dmg = dmg * 2;
        if (record.currentHp <= dmg) {
            record.currentHp = 1;
        } else {
            record.currentHp -= dmg;
        }

        record.weapon = 0;
        record.chestArmor = 0;
        record.headArmor = 0;
        record.waistArmor = 0;
        record.footArmor = 0;
        record.handArmor = 0;
        record.necklace = 0;
        record.ring = 0;
    }

    function tributeGeyserAttack(uint256 rand) internal pure returns (uint16) {
        uint16 r = rarity(rand);
        if (r == 1) {
            return 10;
        }
        if (r == 2) {
            return 15;
        }
        if (r == 3) {
            return 30;
        }
        if (r == 4) {
            return 31;
        }
        return 0;
    }

    function tributeGeyserDefence(uint256 rand) internal pure returns (uint16) {
        uint16 r = rarity(rand);
        if (r == 1) {
            return 2;
        }
        if (r == 2) {
            return 3;
        }
        if (r == 3) {
            return 7;
        }
        if (r == 4) {
            return 8;
        }
        return 0;
    }

    function tributeGeyserRecovery(uint256 rand) internal pure returns (uint16) {
        uint16 r = rarity(rand);
        if (r == 1) {
            return 4;
        }
        if (r == 2) {
            return 7;
        }
        if (r == 3) {
            return 14;
        }
        if (r == 4) {
            return 15;
        }
        return 0;
    }

    function rarity(uint256 rand) internal pure returns (uint16) {
        if (rand == 0) {
            return 0;
        }
        uint256 greatness = rand % 21;
        if (greatness < 15) {
            return 1;
        }
        if (greatness < 19) {
            return 2;
        }
        if (greatness == 19) {
            return 3;
        } else {
            return 4;
        }
    }

    function isMoved(uint256[SIZE] memory moved, uint8 x, uint8 y) internal pure returns (bool) {
        return moved[y] & (1 << x) != 0;
    }

    function setMoved(uint256[SIZE] memory moved, uint8 x, uint8 y) internal pure {
        moved[y] |= (1 << x);
    }

    function random(uint256 seed, uint8 rerollCount, uint8 x, uint8 y) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.chainid, seed, rerollCount, x, y)));
    }

    function randomLoot(uint256 r, uint16 turn) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(r, turn)));
    }

    function createBosses(uint256 seed) internal pure returns (uint64) {
        return packUint8ToUint64([
            uint8(seed % 79019 % SIZE), uint8(seed % 58899 % SIZE),
            uint8(seed % 69861 % SIZE), uint8(seed % 12874 % SIZE),
            uint8(seed % 45501 % SIZE), uint8(seed % 35065 % SIZE),
            uint8(seed % 23667 % SIZE), uint8(seed % 72190 % SIZE)
        ]);
    }

    function packUint8ToUint64(uint8[8] memory d) internal pure returns (uint64) {
        return uint64(d[0]) << 56 | uint64(d[1]) << 48 |
               uint64(d[2]) << 40 | uint64(d[3]) << 32 |
               uint64(d[4]) << 24 | uint64(d[5]) << 16 |
               uint64(d[6]) << 8  | uint64(d[7]);
    }

    function checkMatchBoss(uint64 packedValue, uint8 x, uint8 y) internal pure returns (int8) {
        if (uint8(packedValue >> 56) == x) {
            if (uint8(packedValue >> 48) == y) return 0;
        }
        if (uint8(packedValue >> 40) == x) {
            if (uint8(packedValue >> 32) == y) return 1;
        }
        if (uint8(packedValue >> 24) == x) {
            if (uint8(packedValue >> 16) == y) return 2;
        }
        if (uint8(packedValue >> 8) == x) {
            if (uint8(packedValue) == y) return 3;
        }
        return -1;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}