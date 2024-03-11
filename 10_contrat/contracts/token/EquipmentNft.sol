// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "../interfaces/gameNfts/IEquipmentNft.sol";

contract EquipmentNft is ERC1155, AccessControl, IEquipmentNft {
    event mintEquipment(address _to, uint256 _tokenId, uint256 _type, string _name, uint256 _val);
    event updateEquipment(uint256 _tokenId, uint256 _seed, string _name, uint256 _equipmentType, address _rAddress, uint256 _rTokenId, uint256 _rarity, uint256 _level);
    uint256 NFT_ID_PREFIX = 10**7;
    uint256 TYPE_PREFIX = 10**4;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");
    bytes32 public constant CONTROLER_ROLE = keccak256("CONTROLER_ROLE");

    string private baseMetadataURIPrefix;
    string private baseMetadataURISuffix;
    uint256 private currentNftId;
    address private xp;
    uint256 private kValLevelUp;
    address private treasury;

    mapping (address => uint256) private nftId; // NFT Address => NFT ID
    mapping (uint256 => Equipment) private equipment; // tokenId => Equipment Status
    mapping (address => bool) private onGame; // Owner => On Game Status
    mapping (uint256 => uint256) private baseValRarity; // Rarity => Base value
    mapping (uint256 => uint256) private baseValLevel; // Level => Base value

    //*********************************************
    //Initializer
    //*********************************************
    constructor(string memory uriPrefic_, string memory uriSuffix_) ERC1155("") {
        _grantRole(DEVELOPER_ROLE, msg.sender);
        _grantRole(CONTROLER_ROLE, msg.sender);
        setTreasury(msg.sender);
        currentNftId = 2000;
        setBaseMetadataURI(uriPrefic_, uriSuffix_);

        baseValRarity[0] = 0;
        baseValRarity[1] = 3;
        baseValRarity[2] = 6;
        baseValRarity[3] = 9;

        kValLevelUp = 5;
    }

    //*********************************************
    //Getter
    //*********************************************
    function getEquipmentSeed(uint256 tokenId_) public view returns(uint256){
        return equipment[tokenId_].seed;
    }

    function getEquipmentName(uint256 tokenId_) public view returns(string memory){
        return equipment[tokenId_].name;
    }

    function getEquipmentType(uint256 tokenId_) public view returns(uint256){
        return equipment[tokenId_].equipmentType;
    }

    function getBaseValRarity(uint256 rarity_) public view returns (uint256 _value) {
        return baseValRarity[rarity_];
    }

    function getBaseValLevel(uint256 level_) public view returns (uint256 _value) {
        return baseValLevel[level_];
    }

    function getXp() public view returns(address){
        return xp;
    }

    function getTreasury() public view returns(address){
        return treasury;
    }

    function getKValLevelup() public view returns(uint256){
        return kValLevelUp;
    }
    
    function uri(uint256 tokenId_) public view override returns (string memory) {
        string memory _output;
        string memory _c = ', ';
        string memory _attributes = string(abi.encodePacked(
            '[', 
            _attribute("Seed", equipment[tokenId_].seed), _c, 
            _attribute("Name", equipment[tokenId_].name), _c,
            _attribute("Type", equipment[tokenId_].equipmentType), _c,
            _attribute("Loot NFT Token ID", equipment[tokenId_].rTokenId),
            ']'
        ));
        string memory _image = string(abi.encodePacked(
            baseMetadataURIPrefix,
            Strings.toString(equipment[tokenId_].equipmentType),
            baseMetadataURISuffix
        ));
        string memory _json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "Equipment NFT #', Strings.toString(tokenId_) ,
            '", "description": "Minted by a Nft' ,
            '", "attributes": ', 
            _attributes ,
            ', "image": "', 
            _image, 
            '"}'
        ))));
        _output = string(abi.encodePacked('data:application/json;base64,', _json));

        return _output;
    }

    function name() public view returns (string memory){
        return 'LootAdventure EquipmentNft';
    }

    function getEquipmentVal(uint256 tokenId_) public view returns (uint256 _value) {
        Equipment memory _equipment = equipment[tokenId_];
        _value = _equipment.seed % 5 + baseValLevel[_equipment.level] + baseValRarity[_equipment.rarity];
        if(_equipment.equipmentType == 1){
            _equipment.seed % 5 + baseValLevel[_equipment.level] + baseValRarity[_equipment.rarity];
        }
        return _value;
    }

    //*********************************************
    //Setter
    //*********************************************
    function setBaseMetadataURI(string memory uriPrefix_, string memory uriSuffix_) public onlyRole(DEVELOPER_ROLE) { 
        baseMetadataURIPrefix = uriPrefix_;
        baseMetadataURISuffix = uriSuffix_;
    }

    function setMinterRole(address granted_) public onlyRole(DEVELOPER_ROLE){
        _grantRole(MINTER_ROLE, granted_);
    }

    function setDeveloperRole(address granted_) public onlyRole(DEVELOPER_ROLE){
        _grantRole(DEVELOPER_ROLE, granted_);
    }

    function setControlerRole(address granted_) public onlyRole(DEVELOPER_ROLE){
        _grantRole(CONTROLER_ROLE, granted_);
    }

    function setNftId (address nft_) public onlyRole(DEVELOPER_ROLE) {
        nftId[nft_] = currentNftId;
        currentNftId++;
    }

    function setOnGame (address owner_) public {
        require(
            hasRole(CONTROLER_ROLE, msg.sender) || hasRole(DEVELOPER_ROLE, msg.sender),
            'EquipmentNft: You are not granted for this operation'
        );
        onGame[owner_] = true;
    }

    function setOffGame (address owner_) public {
        require(
            hasRole(CONTROLER_ROLE, msg.sender) || hasRole(DEVELOPER_ROLE, msg.sender),
            'EquipmentNft: You are not granted for this operation'
        );
        onGame[owner_] = false;
    }

    function setBaseValRarity(uint256 rarity_, uint256 val_) public onlyRole(DEVELOPER_ROLE) {
        baseValRarity[rarity_] = val_;
    }

    function setBaseValLevel(uint256 level_, uint256 val_) public onlyRole(DEVELOPER_ROLE) {
        baseValLevel[level_] = val_;
    }

    function setXp(address ft_) public onlyRole(DEVELOPER_ROLE) {
        xp = ft_;
    }

    function setTreasury(address treasury_) public onlyRole(DEVELOPER_ROLE) {
        treasury = treasury_;
    }

    function setKValLevelup(uint256 kVal_)  public onlyRole(DEVELOPER_ROLE){
        kValLevelUp = kVal_;
    }

    //*********************************************
    //Logic
    //*********************************************
    function mint(
        address to_,
        address nft_,
        uint256 tokenId_, 
        uint256 seed_,
        string memory name_,
        uint256 id_,
        uint256 type_,
        uint256 rarity_
    ) public onlyRole(MINTER_ROLE) {
        Equipment memory _equipment;
        uint256 _tokenId = (nftId[nft_] * NFT_ID_PREFIX) + (type_ * TYPE_PREFIX) + id_;
        _equipment.seed = seed_;
        _equipment.name = name_;
        _equipment.equipmentType = type_;
        _equipment.rAddress = nft_;
        _equipment.rTokenId = tokenId_;
        _equipment.rarity = rarity_;
        _equipment.level = 1;
        equipment[_tokenId] = _equipment;

        onGame[to_] = false;
        _mint(to_, _tokenId, 1, "");

        uint256 _value = getEquipmentVal(tokenId_);
        emit mintEquipment(to_, _tokenId, type_, name_, _value);
        emit updateEquipment(
            _tokenId, 
            _equipment.seed,
            _equipment.name,
            _equipment.equipmentType,
            _equipment.rAddress,
            _equipment.rTokenId,
            _equipment.rarity,
            _equipment.level
        );
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require(
            (from == _msgSender() && !onGame[from]) 
            || (isApprovedForAll(from, _msgSender())  && !onGame[from])
            || (hasRole(CONTROLER_ROLE, msg.sender) && onGame[from]),
            "ERC1155: caller is not token owner or approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
        emit updateEquipment(
            id, 
            equipment[id].seed,
            equipment[id].name,
            equipment[id].equipmentType,
            equipment[id].rAddress,
            equipment[id].rTokenId,
            equipment[id].rarity,
            equipment[id].level
        );
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        require(
            (from == _msgSender() && !onGame[from]) 
            || (isApprovedForAll(from, _msgSender())  && !onGame[from])
            || (hasRole(CONTROLER_ROLE, msg.sender) && onGame[from]),
            "ERC1155: caller is not token owner or approved"
        );
        _safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    function levelUp(
        uint256 tokenId_
    ) public {
        IERC20 _xp = IERC20(xp);
        Equipment memory _equipment = equipment[tokenId_];
        uint256 _level = _equipment.level;
        uint256 _amount = (100 + _level * kValLevelUp) * (10 ** 16);
        (bool _success) = _xp.transferFrom(msg.sender, treasury, _amount);
        require(_success, 'EquipmentNFT error: Your XP Token is insufficient');

        _equipment.level = _level + 1;
        equipment[tokenId_] = _equipment;
        emit updateEquipment(
            tokenId_, 
            _equipment.seed,
            _equipment.name,
            _equipment.equipmentType,
            _equipment.rAddress,
            _equipment.rTokenId,
            _equipment.rarity,
            _equipment.level
        );
    } 

    function _attribute(string memory traitType_, string memory value_) internal pure returns (string memory) {
        return string(abi.encodePacked('{"trait_type": "', traitType_, '", "value": "', value_, '"}'));
    }

    function _attribute(string memory traitType_, uint256 value_) internal pure returns (string memory) {
        return string(abi.encodePacked('{"trait_type": "', traitType_, '", "value": ', Strings.toString(value_), '}'));
    }

    function _attribute(string memory traitType_, address value_) internal pure returns (string memory) {
        return string(abi.encodePacked('{"trait_type": "', traitType_, '", "value": ', value_, '}'));
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}