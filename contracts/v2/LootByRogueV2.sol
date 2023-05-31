// SPDX-License-Identifier: MIT
//     __                  __     ____            ____                           
//    / /   ____   ____   / /_   / __ ) __  __   / __ \ ____   ____ _ __  __ ___ 
//   / /   / __ \ / __ \ / __/  / __  |/ / / /  / /_/ // __ \ / __ `// / / // _ \
//  / /___/ /_/ // /_/ // /_   / /_/ // /_/ /  / _, _// /_/ // /_/ // /_/ //  __/
// /_____/\____/ \____/ \__/  /_____/ \__, /  /_/ |_| \____/ \__, / \__,_/ \___/ 
//                                   /____/                 /____/               
// This project was inspired by 0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7 on the Ethereum network.
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./ILootByRogueV2.sol";

contract LootByRogueV2 is ERC721, Ownable, AccessControl, Pausable, ILootByRogueV2 {
    using Counters for Counters.Counter;
    using Strings for uint256;
    using Strings for uint16;
    using Strings for uint8;

    Counters.Counter private _tokenIdCounter;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    ERC721 public lootV1;

    mapping (uint256 => AdventureRecord) public tokens;
    mapping (uint256 => bool) public mintedSeed;

    constructor(address _lootV1) ERC721("LootByRogue", "LOOTR") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        lootV1 = ERC721(_lootV1);
    }

    function safeMint(address to, AdventureRecord calldata record) public whenNotPaused onlyRole(MINTER_ROLE) {
        require(!mintedSeed[record.inputData.seed], "Already minted seed");
        mintedSeed[record.inputData.seed] = true;

        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        tokens[tokenId] = record;

        _safeMint(to, tokenId);
        emit MintSeed(msg.sender, tokenId, record.inputData.seed);
    }

    function convert(address to, AdventureRecord calldata record, uint256 tokenId) public whenNotPaused onlyRole(MINTER_ROLE) {
        require(lootV1.ownerOf(tokenId) == msg.sender, "Caller is not owner");
        require(mintedSeed[record.inputData.seed], "Not reserved seed");
        tokens[tokenId] = record;
        _safeMint(to, tokenId);
        emit MintSeed(msg.sender, tokenId, record.inputData.seed);
    }

    function reserveV1MintdSeed(uint256[] calldata seeds) public onlyOwner {
        uint length = seeds.length;
        for (uint i = 0; i < length; i++) {
            _tokenIdCounter.increment();
            mintedSeed[seeds[i]] = true;
        }
    }

    function isMintedSeed(uint256 seed) public view returns (bool) {
        return mintedSeed[seed];
    }

    string[] private weapons = [
        "Warhammer",
        "Quarterstaff",
        "Maul",
        "Mace",
        "Club",
        "Katana",
        "Falchion",
        "Scimitar",
        "Long Sword",
        "Short Sword",
        "Ghost Wand",
        "Grave Wand",
        "Bone Wand",
        "Wand",
        "Grimoire",
        "Chronicle",
        "Tome",
        "Book"
    ];
    
    string[] private chestArmor = [
        "Divine Robe",
        "Silk Robe",
        "Linen Robe",
        "Robe",
        "Shirt",
        "Demon Husk",
        "Dragonskin Armor",
        "Studded Leather Armor",
        "Hard Leather Armor",
        "Leather Armor",
        "Holy Chestplate",
        "Ornate Chestplate",
        "Plate Mail",
        "Chain Mail",
        "Ring Mail"
    ];
    
    string[] private headArmor = [
        "Ancient Helm",
        "Ornate Helm",
        "Great Helm",
        "Full Helm",
        "Helm",
        "Demon Crown",
        "Dragon's Crown",
        "War Cap",
        "Leather Cap",
        "Cap",
        "Crown",
        "Divine Hood",
        "Silk Hood",
        "Linen Hood",
        "Hood"
    ];
    
    string[] private waistArmor = [
        "Ornate Belt",
        "War Belt",
        "Plated Belt",
        "Mesh Belt",
        "Heavy Belt",
        "Demonhide Belt",
        "Dragonskin Belt",
        "Studded Leather Belt",
        "Hard Leather Belt",
        "Leather Belt",
        "Brightsilk Sash",
        "Silk Sash",
        "Wool Sash",
        "Linen Sash",
        "Sash"
    ];
    
    string[] private footArmor = [
        "Holy Greaves",
        "Ornate Greaves",
        "Greaves",
        "Chain Boots",
        "Heavy Boots",
        "Demonhide Boots",
        "Dragonskin Boots",
        "Studded Leather Boots",
        "Hard Leather Boots",
        "Leather Boots",
        "Divine Slippers",
        "Silk Slippers",
        "Wool Shoes",
        "Linen Shoes",
        "Shoes"
    ];
    
    string[] private handArmor = [
        "Holy Gauntlets",
        "Ornate Gauntlets",
        "Gauntlets",
        "Chain Gloves",
        "Heavy Gloves",
        "Demon's Hands",
        "Dragonskin Gloves",
        "Studded Leather Gloves",
        "Hard Leather Gloves",
        "Leather Gloves",
        "Divine Gloves",
        "Silk Gloves",
        "Wool Gloves",
        "Linen Gloves",
        "Gloves"
    ];
    
    string[] private necklaces = [
        "Necklace",
        "Amulet",
        "Pendant"
    ];
    
    string[] private rings = [
        "Gold Ring",
        "Silver Ring",
        "Bronze Ring",
        "Platinum Ring",
        "Titanium Ring"
    ];
    
    string[] private suffixes = [
        "of Power",
        "of Giants",
        "of Titans",
        "of Skill",
        "of Perfection",
        "of Brilliance",
        "of Enlightenment",
        "of Protection",
        "of Anger",
        "of Rage",
        "of Fury",
        "of Vitriol",
        "of the Fox",
        "of Detection",
        "of Reflection",
        "of the Twins"
    ];
    
    string[] private namePrefixes = [
        "Agony", "Apocalypse", "Armageddon", "Beast", "Behemoth", "Blight", "Blood", "Bramble", 
        "Brimstone", "Brood", "Carrion", "Cataclysm", "Chimeric", "Corpse", "Corruption", "Damnation", 
        "Death", "Demon", "Dire", "Dragon", "Dread", "Doom", "Dusk", "Eagle", "Empyrean", "Fate", "Foe", 
        "Gale", "Ghoul", "Gloom", "Glyph", "Golem", "Grim", "Hate", "Havoc", "Honour", "Horror", "Hypnotic", 
        "Kraken", "Loath", "Maelstrom", "Mind", "Miracle", "Morbid", "Oblivion", "Onslaught", "Pain", 
        "Pandemonium", "Phoenix", "Plague", "Rage", "Rapture", "Rune", "Skull", "Sol", "Soul", "Sorrow", 
        "Spirit", "Storm", "Tempest", "Torment", "Vengeance", "Victory", "Viper", "Vortex", "Woe", "Wrath",
        "Light's", "Shimmering"  
    ];
    
    string[] private nameSuffixes = [
        "Bane",
        "Root",
        "Bite",
        "Song",
        "Roar",
        "Grasp",
        "Instrument",
        "Glow",
        "Bender",
        "Shadow",
        "Whisper",
        "Shout",
        "Growl",
        "Tear",
        "Peak",
        "Form",
        "Sun",
        "Moon"
    ];

    function getAdventureRecord(uint256 tokenId) external view returns (AdventureRecord memory) {
        return tokens[tokenId];
    }

    function getSeed(uint256 tokenId) public view returns (uint256) {
        return tokens[tokenId].inputData.seed;
    }

    function getDirections(uint256 tokenId) external view returns (uint8[] memory) {
        return tokens[tokenId].inputData.directions;
    }

    function getUseItems(uint256 tokenId) external view returns (uint8[] memory) {
        return tokens[tokenId].inputData.useItems;
    }

    function getTurn(uint256 tokenId) public view returns (uint16) {
        return tokens[tokenId].turn;
    }

    function getMaxHp(uint256 tokenId) public view returns (uint16) {
        return tokens[tokenId].maxHp;
    }

    function getCurrentHp(uint256 tokenId) public view returns (uint16) {
        return tokens[tokenId].currentHp;
    }

    function getAttack(uint256 tokenId) public view returns (uint16) {
        return tokens[tokenId].attack;
    }

    function getDefence(uint256 tokenId) public view returns (uint16) {
        return tokens[tokenId].defence;
    }

    function getRecovery(uint256 tokenId) public view returns (uint16) {
        return tokens[tokenId].recovery;
    }
    
    function getWeapon(uint256 tokenId) public view returns (string memory) {
        return pluck(tokens[tokenId].weapon, weapons);
    }
    
    function getChest(uint256 tokenId) public view returns (string memory) {
        return pluck(tokens[tokenId].chestArmor, chestArmor);
    }
    
    function getHead(uint256 tokenId) public view returns (string memory) {
        return pluck(tokens[tokenId].headArmor, headArmor);
    }
    
    function getWaist(uint256 tokenId) public view returns (string memory) {
        return pluck(tokens[tokenId].waistArmor, waistArmor);
    }

    function getFoot(uint256 tokenId) public view returns (string memory) {
        return pluck(tokens[tokenId].footArmor, footArmor);
    }
    
    function getHand(uint256 tokenId) public view returns (string memory) {
        return pluck(tokens[tokenId].handArmor, handArmor);
    }
    
    function getNeck(uint256 tokenId) public view returns (string memory) {
        return pluck(tokens[tokenId].necklace, necklaces);
    }
    
    function getRing(uint256 tokenId) public view returns (string memory) {
        return pluck(tokens[tokenId].ring, rings);
    }

    function getStats(uint256 tokenId, uint256 index) public view returns (uint16) {
        return tokens[tokenId].stats[index];
    }

    function getUnique(uint256 tokenId, uint256 index) public view returns (uint8) {
        return tokens[tokenId].unique[index];
    }

    function getRelics(uint256 tokenId) public view returns (uint256[] memory) {
        return tokens[tokenId].relics;
    }

    function getRelicsLength(uint256 tokenId) public view returns (uint256) {
        return tokens[tokenId].relics.length;
    }

    function pluck(uint256 rand, string[] memory sourceArray) public view returns (string memory) {
        if (rand == 0) {
            return "Empty";
        }
        string memory output = sourceArray[rand % sourceArray.length];
        uint256 greatness = rand % 21;
        if (greatness > 14) {
            output = string(abi.encodePacked(output, " ", suffixes[rand % suffixes.length]));
        }
        if (greatness >= 19) {
            string[2] memory name;
            name[0] = namePrefixes[rand % namePrefixes.length];
            name[1] = nameSuffixes[rand % nameSuffixes.length];
            if (greatness == 19) {
                output = string(abi.encodePacked('"', name[0], ' ', name[1], '" ', output));
            } else {
                output = string(abi.encodePacked('"', name[0], ' ', name[1], '" ', output, " +1"));
            }
        }
        return output;
    }

    function tokenURI(uint256 tokenId) override public view returns (string memory) {
        AdventureRecord memory record = tokens[tokenId];
        string[28] memory parts;
        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';

        parts[1] = record.inputData.seed.toString();

        parts[2] = '</text><text x="10" y="40" class="base">';

        parts[3] = string(abi.encodePacked(record.turn.toString(), '/', record.maxHp.toString(), '/', record.currentHp.toString()));

        parts[4] = string(abi.encodePacked('/', record.attack.toString(), '/', record.defence.toString(), '/', record.recovery.toString()));

        parts[5] = '</text><text x="10" y="60" class="base">';

        parts[6] = string(abi.encodePacked(record.stats[0].toString(), '/', record.stats[1].toString(), '/', record.stats[2].toString(), '/', record.stats[3].toString(), '/'));

        parts[7] = string(abi.encodePacked(record.stats[4].toString(), '/', record.stats[5].toString(), '/', record.unique[0].toString(), '/', record.unique[1].toString(), '/'));

        parts[8] = string(abi.encodePacked(record.unique[2].toString(), '/', record.unique[3].toString()));

        parts[9] = '</text><text x="10" y="80" class="base">';

        parts[10] = getRelicsLength(tokenId).toString();

        parts[11] = '</text><text x="10" y="120" class="base">';

        parts[12] = getWeapon(tokenId);

        parts[13] = '</text><text x="10" y="140" class="base">';

        parts[14] = getChest(tokenId);

        parts[15] = '</text><text x="10" y="160" class="base">';

        parts[16] = getHead(tokenId);

        parts[17] = '</text><text x="10" y="180" class="base">';

        parts[18] = getWaist(tokenId);

        parts[19] = '</text><text x="10" y="200" class="base">';

        parts[20] = getFoot(tokenId);

        parts[21] = '</text><text x="10" y="220" class="base">';

        parts[22] = getHand(tokenId);

        parts[23] = '</text><text x="10" y="240" class="base">';

        parts[24] = getNeck(tokenId);

        parts[25] = '</text><text x="10" y="260" class="base">';

        parts[26] = getRing(tokenId);

        parts[27] = '</text></svg>';

        string memory output = string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7], parts[8]));
        output = string(abi.encodePacked(output, parts[9], parts[10], parts[11], parts[12], parts[13], parts[14], parts[15], parts[16]));
        output = string(abi.encodePacked(output, parts[17], parts[18], parts[19], parts[20], parts[21], parts[22], parts[23], parts[24]));
        output = string(abi.encodePacked(output, parts[25], parts[26], parts[27]));

        string memory c = ', ';
        string memory attributes = string(abi.encodePacked('[', _attribute("seed", parts[1]), c, _attribute("turn", record.turn), c, _attribute("maxHp", record.maxHp), c, _attribute("currentHp", record.currentHp), c));
        attributes = string(abi.encodePacked(attributes, _attribute("attack", record.attack), c, _attribute("defence", record.defence), c, _attribute("recovery", record.recovery), c, _attribute("countRelic", record.relics.length), c));
        attributes = string(abi.encodePacked(attributes, _attribute("countEnemy1", record.stats[0]), c, _attribute("countEnemy2", record.stats[1]), c, _attribute("countEnemy3", record.stats[2]), c, _attribute("countEnemy4", record.stats[3]), c));
        attributes = string(abi.encodePacked(attributes, _attribute("countEnemy5", record.stats[4]), c, _attribute("countEnemy6", record.stats[5]), c, _attribute("countBoss1", record.unique[0]), c, _attribute("countBoss2", record.unique[1]), c));
        attributes = string(abi.encodePacked(attributes, _attribute("countBoss3", record.unique[2]), c, _attribute("countBoss4", record.unique[3]), ']'));

        string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "Loot by Rogue #', tokenId.toString(), '", "description": "Loot by Rogue is a collection of treasure obtained through playing the Rogue game, secured and stored on the blockchain. Feel free to use Loot in any way you want.", "attributes": ', attributes ,', "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));
        output = string(abi.encodePacked('data:application/json;base64,', json));

        return output;
    }

    function _attribute(string memory traitType, string memory value) internal pure returns (string memory) {
        return string(abi.encodePacked('{"trait_type": "', traitType, '", "value": "', value, '"}'));
    }

    function _attribute(string memory traitType, uint256 value) internal pure returns (string memory) {
        return string(abi.encodePacked('{"trait_type": "', traitType, '", "value": ', value.toString(), '}'));
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}