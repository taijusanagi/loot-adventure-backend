import { useState } from 'react';
import { ethers } from 'ethers';
import { Panel } from './Panel';
import { Eth } from './Eth';
import {
  weaponsArr,
  chestArmorArr,
  headArmorArr,
  waistArmorArr,
  footArmorArr,
  handArmorArr,
  necklacesArr,
  ringsArr,
  pluck,
} from './Loot';

function App() {
  const rand = (seed: number, x: number, y: number): ethers.BigNumber => {
    return ethers.BigNumber.from(
      ethers.utils.solidityKeccak256(
        ['string'],
        [seed.toString() + x.toString() + y.toString()]
      )
    );
  };

  const [seed] = useState<number>(
    Math.floor(Math.random() * (9007199254740990 - 1) + 1)
  );
  const [x, setX] = useState<number>(64);
  const [y, setY] = useState<number>(64);
  const [move, setMove] = useState<number[]>([]);
  const [moved] = useState<{
    [x: number]: { [y: number]: boolean },
  }>({});
  const [item, setItem] = useState<number>(0);
  const [usedItem, setUsedItem] = useState<number>(0);
  const [turn, setTurn] = useState<number>(0);
  const [currentHp, setCurrentHp] = useState<number>(24);
  const [maxHp, setMaxHp] = useState<number>(24);
  const [attack, setAttack] = useState<number>(8);
  const [defence, setDefence] = useState<number>(4);
  const [recovery, setRecovery] = useState<number>(2);
  const [weapon, setWeapon] = useState<ethers.BigNumber>(
    ethers.BigNumber.from(0)
  );
  const [chestArmor, setChestArmor] = useState<ethers.BigNumber>(
    ethers.BigNumber.from(0)
  );
  const [headArmor, setHeadArmor] = useState<ethers.BigNumber>(
    ethers.BigNumber.from(0)
  );
  const [waistArmor, setWaistArmor] = useState<ethers.BigNumber>(
    ethers.BigNumber.from(0)
  );
  const [footArmor, setFootArmor] = useState<ethers.BigNumber>(
    ethers.BigNumber.from(0)
  );
  const [handArmor, setHandArmor] = useState<ethers.BigNumber>(
    ethers.BigNumber.from(0)
  );
  const [necklace, setNecklace] = useState<ethers.BigNumber>(
    ethers.BigNumber.from(0)
  );
  const [ring, setRing] = useState<ethers.BigNumber>(ethers.BigNumber.from(0));

  const adventure = (seed: number, _x: number, _y: number) => {
    if (isMoved(_x, _y)) {
      console.log('already moved area');
      return;
    }
    const r = rand(seed, _x, _y);
    const enemyAttack = enemyAttackDmg(r, nextTurn());
    if (!canMove(enemyAttack, _x, _y)) {
      return;
    }

    if (_x in moved) {
      moved[_x][_y] = true;
    } else {
      moved[_x] = {};
      moved[_x][_y] = true;
    }

    if (x === _x) {
      if (usedItem === 0) {
        y < _y ? setMove([...move, 1]) : setMove([...move, 3]);
      } else {
        y < _y ? setMove([...move, 2]) : setMove([...move, 4]);
      }
    } else {
      if (usedItem === 0) {
        x < _x ? setMove([...move, 5]) : setMove([...move, 7]);
      } else {
        x < _x ? setMove([...move, 6]) : setMove([...move, 8]);
      }
    }

    if (currentDefence() < enemyAttack) {
      setCurrentHp(currentHp - (enemyAttack - currentDefence()));
    }

    const drop = r.mod(53).toNumber();
    if (drop < 2) {
      setItem(r.mod(3).toNumber() + 1);
    } else if (drop < 5) {
      setCurrentHp(currentHp + heal(1));
    } else if (drop < 8) {
      setMaxHp(r.mod(3).toNumber() + 1 + maxHp);
    } else if (drop < 11) {
      setAttack(r.mod(2).toNumber() + 1 + attack);
    } else if (drop < 14) {
      setDefence(r.mod(2).toNumber() + 1 + defence);
    } else if (drop < 17) {
      setRecovery(r.mod(2).toNumber() + 1 + recovery);
    } else if (drop < 20) {
      setWeapon(r);
    } else if (drop < 21) {
      setChestArmor(r);
    } else if (drop < 22) {
      setHeadArmor(r);
    } else if (drop < 23) {
      setWaistArmor(r);
    } else if (drop < 24) {
      setFootArmor(r);
    } else if (drop < 25) {
      setHandArmor(r);
    } else if (drop < 26) {
      setNecklace(r);
    } else if (drop < 27) {
      setRing(r);
    }

    setX(_x);
    setY(_y);
    setTurn(turn + 1);
    setUsedItem(0);
  };

  const enemyAttackDmg = (r: ethers.BigNumber, t: number): number => {
    return r
      .mod(6)
      .add(Math.floor(t / 4))
      .toNumber();
  };

  const heal = (rate: number): number => {
    const r = recovery * rate;
    if (r + currentHp <= maxHp) {
      return r;
    } else {
      return maxHp - currentHp;
    }
  };

  const isMoved = (_x: number, _y: number): boolean => {
    if (_x in moved) {
      const movedY = moved[_x];
      if (_y in movedY) {
        return true;
      }
    }
    return false;
  };

  const isEnd = (_x: number, _y: number): boolean => {
    if (_x < 0 || _y < 0 || _x > 127 || _y > 127) {
      return true;
    } else {
      return false;
    }
  };

  const canMove = (enemyAttack: number, _x: number, _y: number): boolean => {
    const absX = Math.abs(x - _x);
    const absY = Math.abs(y - _y);
    if (isEnd(_x, _y)) {
      return false;
    }

    if (!((absX === 1 && absY === 0) || (absX === 0 && absY === 1))) {
      return false;
    }

    if (currentAttack() < enemyAttack) {
      return false;
    }
    if (
      currentDefence() < enemyAttack &&
      currentHp <= enemyAttack - currentDefence()
    ) {
      return false;
    }
    return true;
  };

  const panelClassName = (_x: number, _y: number): string => {
    const s = ['container', 'h-full', 'w-full', 'shadow-md'];

    const r = rand(seed, _x, _y);
    const enemyAttack = enemyAttackDmg(r, nextTurn());
    if (isMoved(_x, _y)) {
      s.push('bg-gray-500');
    } else if (!canMove(enemyAttack, _x, _y)) {
      s.push('bg-gray-150');
    } else {
      s.push('cursor-pointer');
      s.push('bg-gray-100');
    }

    if (Math.abs(x - _x) === 3) {
      s.push('hidden md:block');
    }

    if (Math.abs(x - _x) === 4) {
      s.push('hidden xl:block');
    }
    return s.join(' ');
  };

  const useItem = () => {
    if (item === 0) {
      console.log('no item');
    } else {
      if (item === 1) {
        setCurrentHp(currentHp + heal(5));
      }
      setUsedItem(item);
      setItem(0);
    }
  };

  const currentAttack = () => {
    return attack + (usedItem === 2 ? 99999 : 0);
  };

  const currentDefence = () => {
    return defence + (usedItem === 3 ? 99999 : 0);
  };

  const nextTurn = () => {
    return turn + 1;
  };

  const lootColor = (val: ethers.BigNumber): string => {
    if (val.eq(0)) {
      return 'text-gray-500';
    }
    const greatness = val.mod(21).toNumber();
    if (greatness > 14 && greatness < 19) {
      return 'text-blue-500';
    }
    if (greatness >= 19) {
      if (greatness === 19) {
        return 'text-purple-500';
      } else {
        return 'text-orange-500';
      }
    }
    return '';
  };

  const itemName = () => {
    switch (item) {
      case 0:
        return 'Empty';
      case 1:
        return 'Portion';
      case 2:
        return 'Attack Up';
      case 3:
        return 'Defence Up';
      default:
        return 'Empty';
    }
  };

  return (
    <div className="relative bg-gray-400 w-screen h-screen">
      <div className="w-full h-full">
        <div className="grid grid-cols-5 md:grid-cols-7 xl:grid-cols-9 gap-2 w-full h-full bg-gray-200">
          {[-2, -1, 0, 1, 2].map((iy) => {
            return [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((ix) => {
              return (
                <div
                  key={'key' + iy + ix}
                  className={panelClassName(x + ix, y + iy)}
                  onClick={() => adventure(seed, x + ix, y + iy)}
                >
                  <Panel
                    rand={rand(seed, x + ix, y + iy)}
                    enemyAttack={enemyAttackDmg(
                      rand(seed, x + ix, y + iy),
                      nextTurn()
                    )}
                    playerAttack={currentAttack()}
                    playerDefence={currentDefence()}
                    turn={nextTurn()}
                    currentHp={currentHp}
                    isPlayer={ix === 0 && iy === 0}
                    isEnd={isEnd(x + ix, y + iy)}
                  />
                </div>
              );
            });
          })}
        </div>
      </div>

      <div
        className="absolute top-0 right-0 bg-gray-800 m-2 p-2 w-40 md:w-30 h-10 shadow-md z-50 opacity-25 hover:opacity-100 cursor-pointer"
        onClick={() => {
          useItem();
        }}
      >
        <p className="text-l font-bold text-white font-sans text-center align-middle">
          {itemName()}
        </p>
      </div>

      <div className="absolute top-0 left-0 bg-gray-800 m-2 p-2 w-1/2 md:w-1/6 shadow-md z-50 hover:opacity-0">
        <div className="container sm font-bold font-sans text-white">
          <p>Trun: {turn}</p>
          <p>
            HP: {currentHp} / {maxHp}
          </p>
          <p>Attack: {currentAttack()}</p>
          <p>Defence: {currentDefence()}</p>
          <p>Recovery: {recovery}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 bg-gray-800 m-2 p-2 shadow-md z-50 opacity-25 hover:opacity-100">
        <div className="container text-sm md:text-base sm font-sans text-white">
          <p className={lootColor(weapon)}>
            Weapon: {pluck(weapon, weaponsArr)}
          </p>
          <p className={lootColor(chestArmor)}>
            ChestArmor: {pluck(chestArmor, chestArmorArr)}
          </p>
          <p className={lootColor(headArmor)}>
            HeadArmor: {pluck(headArmor, headArmorArr)}
          </p>
          <p className={lootColor(waistArmor)}>
            WaistArmor: {pluck(waistArmor, waistArmorArr)}
          </p>
          <p className={lootColor(footArmor)}>
            FootArmor: {pluck(footArmor, footArmorArr)}
          </p>
          <p className={lootColor(handArmor)}>
            HandArmor: {pluck(handArmor, handArmorArr)}
          </p>
          <p className={lootColor(necklace)}>
            Necklace: {pluck(necklace, necklacesArr)}
          </p>
          <p className={lootColor(ring)}>Ring: {pluck(ring, ringsArr)}</p>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 bg-gray-800 m-2 p-2 w-1/2 md:w-1/6 shadow-md z-50 opacity-25 hover:opacity-100 cursor-pointer">
        <div className="container text-sm md:text-base sm text-center align-middle">
          <Eth seed={seed} move={move} />
        </div>
      </div>
    </div>
  );
}

export default App;
