import goblin1 from './img/GD2_001Goblin01Green_640x.png';
import goblin2 from './img/GD2_001Goblin02Red_640x.png';
import goblin3 from './img/GD2_001Goblin03Blue_640x.png';
import goblin4 from './img/GD2_001Goblin04Yellow_640x.png';
import wolf1 from './img/GD2_002Wolf01Brown_640x.png';
import wolf2 from './img/GD2_002Wolf02Blue_640x.png';
import wolf3 from './img/GD2_002Wolf03Gray_640x.png';
import wolf4 from './img/GD2_002Wolf04Black_640x.png';
import imp1 from './img/GD2_008Imp01Red_640x.png';
import imp2 from './img/GD2_008Imp02purple_640x.png';
import imp3 from './img/GD2_008Imp03Yellow_640x.png';
import imp4 from './img/GD2_008Imp04Black_640x.png';
import orc1 from './img/GD2_012Orc01Green_640x.png';
import orc2 from './img/GD2_012Orc02Red_640x.png';
import orc3 from './img/GD2_012Orc03Blue_640x.png';
import orc4 from './img/GD2_012Orc04Yellow_640x.png';
import dragon1 from './img/GD2_004Dragon01Green_640x.png';
import dragon2 from './img/GD2_004Dragon02Red_640x.png';
import dragon3 from './img/GD2_004Dragon03Black_640x.png';
import dragon4 from './img/GD2_004Dragon04Yellow_640x.png';
import golem1 from './img/GD2_010Golem01Brown_640x.png';
import golem2 from './img/GD2_010Golem02Gray_640x.png';
import golem3 from './img/GD2_010Golem03Blue_640x.png';
import golem4 from './img/GD2_010Golem04Purple_640x.png';
import { ethers } from 'ethers';

export function EnemyImg({
  rand,
  enemyAttack,
  turn,
}: {
  rand: ethers.BigNumber,
  enemyAttack: number,
  turn: number,
}) {
  const goblin = [goblin1, goblin2, goblin3, goblin4];
  const wolf = [wolf1, wolf2, wolf3, wolf4];
  const imp = [imp1, imp2, imp3, imp4];
  const orc = [orc1, orc2, orc3, orc4];
  const dragon = [dragon1, dragon2, dragon3, dragon4];
  const golem = [golem1, golem2, golem3, golem4];
  const src = () => {
    const enemyType = enemyAttack - Math.floor(turn / 4);
    switch (enemyType) {
      case 0:
        return goblin[getIndex()];
      case 1:
        return wolf[getIndex()];
      case 2:
        return imp[getIndex()];
      case 3:
        return orc[getIndex()];
      case 4:
        return golem[getIndex()];
      case 5:
        return dragon[getIndex()];
      default:
        return goblin1;
    }
  };

  const getIndex = () => {
    return rand.mod(4).toNumber();
  };

  return <img className="h-13 w-13 md:h-24 md:w-24" src={src()} />;
}
