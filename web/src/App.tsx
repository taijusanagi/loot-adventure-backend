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
  const [currentHp, setCurrentHp] = useState<number>(15);
  const [maxHp, setMaxHp] = useState<number>(15);
  const [attack, setAttack] = useState<number>(5);
  const [defence, setDefence] = useState<number>(3);
  const [recovery, setRecovery] = useState<number>(5);
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
    const enemyAttack = enemyAttackDmg(r, turn + 1);
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
      setRecovery(r.mod(3).toNumber() + 1 + recovery);
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

  const enemyAttackDmg = (rand: ethers.BigNumber, turn: number): number => {
    return rand
      .mod(5)
      .add(Math.floor(turn / 5))
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

  const canMove = (enemyAttack: number, _x: number, _y: number): boolean => {
    const absX = Math.abs(x - _x);
    const absY = Math.abs(y - _y);
    if (_x < 0 || _y < 0 || _x > 127 || _x > 127) {
      console.log('cannot move end index');
      return false;
    }

    if (!((absX === 1 && absY === 0) || (absX === 0 && absY === 1))) {
      console.log('cannot move');
      return false;
    }

    if (currentAttack() < enemyAttack) {
      console.log('cannot move');
      return false;
    }
    if (
      currentDefence() < enemyAttack &&
      currentHp <= enemyAttack - currentDefence()
    ) {
      console.log('cannot move hp under 0');
      return false;
    }
    return true;
  };

  const panelClassName = (_x: number, _y: number): string => {
    const s = ['container', 'h-full', 'w-full', 'shadow-md'];

    const r = rand(seed, _x, _y);
    const enemyAttack = enemyAttackDmg(r, turn + 1);
    if (isMoved(_x, _y)) {
      s.push('bg-gray-500');
    } else if (!canMove(enemyAttack, _x, _y)) {
      s.push('bg-gray-150');
    } else {
      s.push('cursor-pointer');
      s.push('bg-gray-100');
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
        <div className="grid grid-cols-5 gap-2 w-full h-full bg-gray-200">
          {[-2, -1, 0, 1, 2].map((iy) => {
            return [-2, -1, 0, 1, 2].map((ix) => {
              return (
                <div
                  className={panelClassName(x - ix, y + iy)}
                  onClick={() => adventure(seed, x - ix, y + iy)}
                >
                  <Panel
                    rand={rand(seed, x - ix, y + iy)}
                    enemyAttack={enemyAttackDmg(
                      rand(seed, x - ix, y + iy),
                      turn
                    )}
                    turn={turn}
                  />
                </div>
              );
            });
          })}
        </div>
      </div>

      <div
        className="absolute top-0 right-0 bg-gray-800 m-2 p-2 w-24 h-10 shadow-md z-50 opacity-25 hover:opacity-100 cursor-pointer"
        onClick={() => {
          useItem();
        }}
      >
        <p className="text-l font-bold text-white font-sans text-center align-middle">
          {itemName()}
        </p>
      </div>

      <div className="absolute top-0 left-0 bg-gray-800 m-2 p-2 w-1/6 shadow-md z-50 hover:opacity-0">
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

      <div className="absolute bottom-0 left-0 bg-gray-800 m-2 p-2 shadow-md z-50 opacity-75 hover:opacity-0">
        <div className="container sm font-sans text-white">
          <p>Weapon: {pluck(weapon, weaponsArr)}</p>
          <p>chestArmor: {pluck(chestArmor, chestArmorArr)}</p>
          <p>headArmor: {pluck(headArmor, headArmorArr)}</p>
          <p>waistArmor: {pluck(waistArmor, waistArmorArr)}</p>
          <p>footArmor: {pluck(footArmor, footArmorArr)}</p>
          <p>handArmor: {pluck(handArmor, handArmorArr)}</p>
          <p>necklace: {pluck(necklace, necklacesArr)}</p>
          <p>ring: {pluck(ring, ringsArr)}</p>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 bg-gray-800 m-2 p-2 w-1/6 shadow-md z-50 opacity-25 hover:opacity-100 cursor-pointer">
        <div className="container sm text-center align-middle">
          <Eth seed={seed} move={move} />
        </div>
      </div>
    </div>
  );
}

export default App;
