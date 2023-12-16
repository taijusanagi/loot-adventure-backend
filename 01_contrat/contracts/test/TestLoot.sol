// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "../interfaces/ILootByRogue.sol";

contract TestLoot is ERC721, Ownable, AccessControl, Pausable, ILootByRogue {
    using Counters for Counters.Counter;
    using Strings for uint256;
    using Strings for uint16;
    using Strings for uint8;

    // Counters.Counter private _tokenIdCounter;
    uint256 private _tokenIdCounter;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    event MintSeed(address validator, uint256 tokenId, uint256 seed);

    mapping (uint256 => AdventureRecord) public tokens;
    mapping (uint256 => bool) public mintedSeed;

    constructor() ERC721("LootByRogue", "LOOTR") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _tokenIdCounter=0;
    }

    function safeMint(address to, AdventureRecord calldata record) public {
        require(!mintedSeed[record.seed], "Already minted seed");
        mintedSeed[record.seed] = true;

        uint256 tokenId = _tokenIdCounter;
        tokens[tokenId] = record;

        _safeMint(to, tokenId);
        _tokenIdCounter++;
        emit MintSeed(msg.sender, tokenId, record.seed);
    }

    string[] private weapons = [
        "Warhammer",
        "Quarterstaff"
    ];
    
    string[] private chestArmor = [
        "Divine Robe",
        "Silk Robe",
        "Linen Robe",
        "Robe",
        "Shirt"
    ];
    
    string[] private headArmor = [
        "Ancient Helm",
        "Ornate Helm"
    ];
    
    string[] private waistArmor = [
        "Ornate Belt",
        "War Belt"
    ];
    
    string[] private footArmor = [
        "Holy Greaves",
        "Ornate Greaves",
        "Greaves"
    ];
    
    string[] private handArmor = [
        "Holy Gauntlets",
        "Ornate Gauntlets"
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
        "of Skill"
    ];
    
    string[] private namePrefixes = [
        "Agony", "Apocalypse", "Armageddon"
    ];
    
    string[] private nameSuffixes = [
        "Bane",
        "Root"
    ];

    function getSeed(uint256 tokenId) public view returns (uint256) {
        return tokens[tokenId].seed;
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

    function getRelic(uint256 tokenId, uint256 index) public view returns (uint256) {
        return tokens[tokenId].relics[index];
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

        parts[1] = record.seed.toString();

        parts[2] = '</text><text x="10" y="40" class="base">';

        parts[3] = string(abi.encodePacked(record.turn.toString(), '/', record.maxHp.toString(), '/', record.currentHp.toString()));

        parts[4] = string(abi.encodePacked('/', record.attack.toString(), '/', record.defence.toString(), '/', record.recovery.toString()));

        parts[5] = '</text><text x="10" y="60" class="base">';

        parts[6] = string(abi.encodePacked(record.stats[0].toString(), '/', record.stats[1].toString(), '/', record.stats[2].toString(), '/', record.stats[3].toString(), '/'));

        parts[7] = string(abi.encodePacked(record.stats[4].toString(), '/', record.stats[5].toString(), '/', record.unique[0].toString(), '/', record.unique[1].toString(), '/'));

        parts[8] = string(abi.encodePacked(record.unique[2].toString(), '/', record.unique[3].toString()));

        parts[9] = '</text><text x="10" y="80" class="base">';

        parts[10] = '</text></svg>';

        string memory output = string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7], parts[8]));

        string memory c = ', ';
        string memory attributes = string(abi.encodePacked('[', _attribute("seed", parts[1]), c, _attribute("turn", record.turn), c, _attribute("maxHp", record.maxHp), c, _attribute("currentHp", record.currentHp), c));
        attributes = string(abi.encodePacked(attributes, _attribute("attack", record.attack), c, _attribute("defence", record.defence), c, _attribute("recovery", record.recovery), c, _attribute("countRelic", record.relics.length), c));
        attributes = string(abi.encodePacked(attributes, _attribute("countEnemy1", record.stats[0]), c, _attribute("countEnemy2", record.stats[1]), c, _attribute("countEnemy3", record.stats[2]), c, _attribute("countEnemy4", record.stats[3]), c));
        attributes = string(abi.encodePacked(attributes, _attribute("countEnemy5", record.stats[4]), c, _attribute("countEnemy6", record.stats[5]), c, _attribute("countBoss1", record.unique[0]), c, _attribute("countBoss2", record.unique[1]), c));
        attributes = string(abi.encodePacked(attributes, _attribute("countBoss3", record.unique[2]), c, _attribute("countBoss4", record.unique[3]), c, _attribute("weapon", parts[12]), c, _attribute("chest", parts[14]), c));
        attributes = string(abi.encodePacked(attributes, _attribute("head", parts[16]), c, _attribute("waist", parts[18]), c, _attribute("foot", parts[20]), c, _attribute("hand", parts[22]), c));
        attributes = string(abi.encodePacked(attributes, _attribute("necklace", parts[24]), c, _attribute("ring", parts[26]), ']'));

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