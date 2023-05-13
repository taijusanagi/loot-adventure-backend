import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BigNumber, Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('TestRogue', async () => {
  let owner: SignerWithAddress;
  let tester1: SignerWithAddress;
  let tester2: SignerWithAddress;
  let tokenReceipt: SignerWithAddress;
  let rogue: Contract;
  let lootByRogue: Contract;
  let erc20: Contract;

  beforeEach(async () => {
    [owner, tester1, tester2, tokenReceipt] = await ethers.getSigners();

    const f1 = await ethers.getContractFactory('LootByRogue', owner);
    lootByRogue = await f1.deploy();
    await lootByRogue.deployed();

    const f2 = await ethers.getContractFactory('MockERC20', owner);
    erc20 = await f2.deploy();
    await erc20.deployed();

    const f3 = await ethers.getContractFactory('TestRogue', owner);
    rogue = await f3.deploy(
      lootByRogue.address,
      erc20.address,
      ethers.utils.parseEther('1'),
      tokenReceipt.address
    );
    await rogue.deployed();

    const role = await lootByRogue.MINTER_ROLE();
    await lootByRogue.grantRole(role, rogue.address);

    await erc20.transfer(tester1.address, ethers.utils.parseEther('100'));
    await erc20
      .connect(tester1)
      .approve(rogue.address, ethers.utils.parseEther('100'));

    await erc20.transfer(tester2.address, ethers.utils.parseEther('1'));
    await erc20
      .connect(tester2)
      .approve(rogue.address, ethers.utils.parseEther('1'));
  });

  describe('testMint', async () => {
    it('Move to the wall', async () => {
      const move0 = new Array(31).fill(0);
      const move1 = new Array(32).fill(1);
      const move2 = new Array(32).fill(2);
      const move3 = new Array(31).fill(3);
      const item = new Array(31).fill(0);
      await rogue.connect(tester1).testMint(0, move0, item);
      await rogue.connect(tester1).testMint(1, move1, [...item, 0]);
      await rogue.connect(tester1).testMint(2, move2, [...item, 0]);
      await rogue.connect(tester1).testMint(3, move3, item);

      expect(tester1.address).equal(await lootByRogue.ownerOf(1));
      expect(tester1.address).equal(await lootByRogue.ownerOf(2));
      expect(tester1.address).equal(await lootByRogue.ownerOf(3));
      expect(tester1.address).equal(await lootByRogue.ownerOf(4));
    });

    it('Move over the wall', async () => {
      const move0 = new Array(32).fill(0);
      const move1 = new Array(33).fill(1);
      const move2 = new Array(33).fill(2);
      const move3 = new Array(32).fill(3);
      const item = new Array(32).fill(0);

      const msg = 'Movement is not allowed';
      await expect(
        rogue.connect(tester1).testMint(0, move0, item)
      ).to.be.revertedWith(msg);
      await expect(
        rogue.connect(tester1).testMint(1, move1, [...item, 0])
      ).to.be.revertedWith(msg);
      await expect(
        rogue.connect(tester1).testMint(2, move2, [...item, 0])
      ).to.be.revertedWith(msg);
      await expect(
        rogue.connect(tester1).testMint(3, move3, item)
      ).to.be.revertedWith(msg);
    });

    it('About half move', async () => {
      const f = () => {
        const move: number[] = [];
        const item: number[] = [];
        const save = (d: number) => {
          item.push(0);
          move.push(d);
        };
        let [x, y] = [32, 32];
        while (!(y === 63 && x === 63)) {
          if (y !== 63 && (x === 0 || x === 63)) {
            save(0);
            y += 1;
            if (y === 63 && x === 63) break;
          }
          if (y % 2 === 0) {
            save(3);
            x += 1;
          } else {
            save(2);
            x -= 1;
          }
        }
        return [move, item];
      };

      const [move, item] = f();
      await rogue.connect(tester1).testMint(0, move, item);
      expect(tester1.address).equal(await lootByRogue.ownerOf(1));
    });
  });

  it('testDifficulty', async () => {
    const calcDifficulty = (turn: number): number => {
      return Math.floor(((turn * turn) / 2 + 100 * turn) / 500);
    };
    const expectResults = new Array(1000)
      .fill(0)
      .map((_, i) => calcDifficulty(i));

    const promises = expectResults.map(async (v, i) => {
      const n: BigNumber = await rogue.testDifficulty(i);
      expect(n.toNumber()).equal(v);
    });
    await Promise.all(promises);
  });

  describe('loot', async () => {
    it('testRarity', async () => {
      expect(await rogue.testRarity(0)).equal(0);
      expect(await rogue.testRarity(1)).equal(1);
      expect(await rogue.testRarity(14)).equal(1);
      expect(await rogue.testRarity(15)).equal(2);
      expect(await rogue.testRarity(18)).equal(2);
      expect(await rogue.testRarity(19)).equal(3);
      expect(await rogue.testRarity(20)).equal(4);
      expect(await rogue.testRarity(21)).equal(1);
      expect(await rogue.testRarity(35)).equal(1);
      expect(await rogue.testRarity(36)).equal(2);
      expect(await rogue.testRarity(39)).equal(2);
      expect(await rogue.testRarity(40)).equal(3);
      expect(await rogue.testRarity(41)).equal(4);
      expect(await rogue.testRarity(42)).equal(1);
    });

    it('pluck', async () => {
      const weapons = [
        'Warhammer',
        'Quarterstaff',
        'Maul',
        'Mace',
        'Club',
        'Katana',
        'Falchion',
        'Scimitar',
        'Long Sword',
        'Short Sword',
        'Ghost Wand',
        'Grave Wand',
        'Bone Wand',
        'Wand',
        'Grimoire',
        'Chronicle',
        'Tome',
        'Book',
      ];
      expect(await lootByRogue.pluck(0, weapons)).equal('Empty');
      expect(await lootByRogue.pluck(1, weapons)).equal('Quarterstaff');
      expect(await lootByRogue.pluck(14, weapons)).equal('Grimoire');
      expect(await lootByRogue.pluck(15, weapons)).equal(
        'Chronicle of the Twins'
      );
      expect(await lootByRogue.pluck(18, weapons)).equal('Warhammer of Titans');
      expect(await lootByRogue.pluck(19, weapons)).equal(
        '"Dragon Root" Quarterstaff of Skill'
      );
      expect(await lootByRogue.pluck(20, weapons)).equal(
        '"Dread Bite" Maul of Perfection +1'
      );
      expect(await lootByRogue.pluck(21, weapons)).equal('Mace');
      expect(await lootByRogue.pluck(35, weapons)).equal('Book');
      expect(await lootByRogue.pluck(36, weapons)).equal(
        'Warhammer of Perfection'
      );
      expect(await lootByRogue.pluck(39, weapons)).equal('Mace of Protection');
      expect(await lootByRogue.pluck(40, weapons)).equal(
        '"Maelstrom Roar" Club of Anger'
      );
      expect(await lootByRogue.pluck(41, weapons)).equal(
        '"Mind Grasp" Katana of Rage +1'
      );
      expect(await lootByRogue.pluck(42, weapons)).equal('Falchion');
    });
  });

  it('testEnemyType', async () => {
    const calcMobEnemyType = (rand: BigNumber): number => {
      const n = rand.mod(100).toNumber();
      return Math.floor((n ** 2 + n * 200) / 5000);
    };
    const expectResults = new Array(100)
      .fill(0)
      .map((_, i) => calcMobEnemyType(BigNumber.from(i)));
    const promises = expectResults.map(async (v, i) => {
      const n: BigNumber = await rogue.testEnemyType(i);
      expect(n.toNumber()).equal(v);
    });
    await Promise.all(promises);

    expect((await rogue.testEnemyType(0)).toNumber()).equal(0);
    expect((await rogue.testEnemyType(99)).toNumber()).equal(5);
    expect((await rogue.testEnemyType(100)).toNumber()).equal(0);
  });
});
