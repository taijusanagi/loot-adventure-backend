import { ethers } from 'ethers';
import { EnemyImg } from './EnemyImg';

export function Panel({
  rand,
  enemyAttack,
  turn,
}: {
  rand: ethers.BigNumber,
  enemyAttack: number,
  turn: number,
}) {
  const dropName = () => {
    const drop = rand.mod(53).toNumber();
    if (drop < 2) {
      return 'Drop Item';
    } else if (drop < 5) {
      return 'Heal';
    } else if (drop < 8) {
      return 'MaxHP +' + (rand.mod(3).toNumber() + 1);
    } else if (drop < 11) {
      return 'Attack +' + (rand.mod(2).toNumber() + 1);
    } else if (drop < 14) {
      return 'Defence +' + (rand.mod(2).toNumber() + 1);
    } else if (drop < 17) {
      return 'Recovery +' + (rand.mod(3).toNumber() + 1);
    } else if (drop < 20) {
      return 'Drop Weapon';
    } else if (drop < 21) {
      return 'Drop Chest';
    } else if (drop < 22) {
      return 'Drop Head';
    } else if (drop < 23) {
      return 'Drop Waist';
    } else if (drop < 24) {
      return 'Drop Foot';
    } else if (drop < 25) {
      return 'Drop Hand';
    } else if (drop < 26) {
      return 'Drop Necklace';
    } else if (drop < 27) {
      return 'Drop Ring';
    }
  };

  return (
    <div className="relative flex justify-center object-center items-center place-content-center w-full h-full">
      <EnemyImg rand={rand} enemyAttack={enemyAttack} turn={turn} />

      <div className="absolute top-0 inset-x-0 m-2 p-2 z-10">
        <p className="text-gray-400 font-sans font-bold">{dropName()}</p>
      </div>

      <div className="absolute bottom-0 right-0 m-2 p-2 z-10">
        <p className="text-2xl font-bold text-red-400 font-sans">
          {enemyAttack}
        </p>
      </div>
      {/* <p className="break-all">{rand.toString()}</p> */}
    </div>
  );
}
