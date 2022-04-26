import { ethers } from 'ethers';

const weaponsArr = [
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

const chestArmorArr = [
  'Divine Robe',
  'Silk Robe',
  'Linen Robe',
  'Robe',
  'Shirt',
  'Demon Husk',
  'Dragonskin Armor',
  'Studded Leather Armor',
  'Hard Leather Armor',
  'Leather Armor',
  'Holy Chestplate',
  'Ornate Chestplate',
  'Plate Mail',
  'Chain Mail',
  'Ring Mail',
];

const headArmorArr = [
  'Ancient Helm',
  'Ornate Helm',
  'Great Helm',
  'Full Helm',
  'Helm',
  'Demon Crown',
  "Dragon's Crown",
  'War Cap',
  'Leather Cap',
  'Cap',
  'Crown',
  'Divine Hood',
  'Silk Hood',
  'Linen Hood',
  'Hood',
];

const waistArmorArr = [
  'Ornate Belt',
  'War Belt',
  'Plated Belt',
  'Mesh Belt',
  'Heavy Belt',
  'Demonhide Belt',
  'Dragonskin Belt',
  'Studded Leather Belt',
  'Hard Leather Belt',
  'Leather Belt',
  'Brightsilk Sash',
  'Silk Sash',
  'Wool Sash',
  'Linen Sash',
  'Sash',
];

const footArmorArr = [
  'Holy Greaves',
  'Ornate Greaves',
  'Greaves',
  'Chain Boots',
  'Heavy Boots',
  'Demonhide Boots',
  'Dragonskin Boots',
  'Studded Leather Boots',
  'Hard Leather Boots',
  'Leather Boots',
  'Divine Slippers',
  'Silk Slippers',
  'Wool Shoes',
  'Linen Shoes',
  'Shoes',
];

const handArmorArr = [
  'Holy Gauntlets',
  'Ornate Gauntlets',
  'Gauntlets',
  'Chain Gloves',
  'Heavy Gloves',
  "Demon's Hands",
  'Dragonskin Gloves',
  'Studded Leather Gloves',
  'Hard Leather Gloves',
  'Leather Gloves',
  'Divine Gloves',
  'Silk Gloves',
  'Wool Gloves',
  'Linen Gloves',
  'Gloves',
];

const necklacesArr = ['Necklace', 'Amulet', 'Pendant'];

const ringsArr = [
  'Gold Ring',
  'Silver Ring',
  'Bronze Ring',
  'Platinum Ring',
  'Titanium Ring',
];

const suffixes = [
  'of Power',
  'of Giants',
  'of Titans',
  'of Skill',
  'of Perfection',
  'of Brilliance',
  'of Enlightenment',
  'of Protection',
  'of Anger',
  'of Rage',
  'of Fury',
  'of Vitriol',
  'of the Fox',
  'of Detection',
  'of Reflection',
  'of the Twins',
];

const namePrefixes = [
  'Agony',
  'Apocalypse',
  'Armageddon',
  'Beast',
  'Behemoth',
  'Blight',
  'Blood',
  'Bramble',
  'Brimstone',
  'Brood',
  'Carrion',
  'Cataclysm',
  'Chimeric',
  'Corpse',
  'Corruption',
  'Damnation',
  'Death',
  'Demon',
  'Dire',
  'Dragon',
  'Dread',
  'Doom',
  'Dusk',
  'Eagle',
  'Empyrean',
  'Fate',
  'Foe',
  'Gale',
  'Ghoul',
  'Gloom',
  'Glyph',
  'Golem',
  'Grim',
  'Hate',
  'Havoc',
  'Honour',
  'Horror',
  'Hypnotic',
  'Kraken',
  'Loath',
  'Maelstrom',
  'Mind',
  'Miracle',
  'Morbid',
  'Oblivion',
  'Onslaught',
  'Pain',
  'Pandemonium',
  'Phoenix',
  'Plague',
  'Rage',
  'Rapture',
  'Rune',
  'Skull',
  'Sol',
  'Soul',
  'Sorrow',
  'Spirit',
  'Storm',
  'Tempest',
  'Torment',
  'Vengeance',
  'Victory',
  'Viper',
  'Vortex',
  'Woe',
  'Wrath',
  "Light's",
  'Shimmering',
];

const nameSuffixes = [
  'Bane',
  'Root',
  'Bite',
  'Song',
  'Roar',
  'Grasp',
  'Instrument',
  'Glow',
  'Bender',
  'Shadow',
  'Whisper',
  'Shout',
  'Growl',
  'Tear',
  'Peak',
  'Form',
  'Sun',
  'Moon',
];

const pluck = (rand: ethers.BigNumber, sourceArray: string[]): string => {
  if (rand.toString() === '0') {
    return 'Empty';
  }

  let output = sourceArray[rand.mod(sourceArray.length).toNumber()];
  const greatness = rand.mod(21).toNumber();
  if (greatness === 0) {
    return output;
  }
  if (greatness > 14) {
    output = output + ' ' + suffixes[rand.mod(suffixes.length).toNumber()];
  }
  if (greatness >= 19) {
    const name0 = namePrefixes[rand.mod(namePrefixes.length).toNumber()];
    const name1 = nameSuffixes[rand.mod(nameSuffixes.length).toNumber()];
    if (greatness === 19) {
      output = '"' + name0 + ' ' + name1 + '" ' + output;
    } else {
      output = '"' + name0 + ' ' + name1 + '" ' + output + ' +1';
    }
  }
  return output;
};

export {
  weaponsArr,
  chestArmorArr,
  headArmorArr,
  waistArmorArr,
  footArmorArr,
  handArmorArr,
  necklacesArr,
  ringsArr,
  namePrefixes,
  nameSuffixes,
  pluck,
};
