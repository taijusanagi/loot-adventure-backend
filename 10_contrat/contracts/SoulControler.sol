// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./lib/Bytecode.sol";
import "./interfaces/lootNfts/ISoulLoot.sol";
import "./interfaces/gameNfts/IEquipmentNft.sol";
import "./interfaces/gameNfts/IJobNft.sol";
import "./interfaces/gameNfts/IArtifactNft.sol";
import "./interfaces/ISoulCalculator.sol";
import "./interfaces/ICoin.sol";

contract SoulControler is AccessControl {
    event UpdateEquips(
        address onwer_,
        uint256 weapon,
        uint256 cheastArmor,
        uint256 headArmor,
        uint256 waistArmor,
        uint256 footArmor,
        uint256 handArmor,
        uint256 necklace,
        uint256 ring
    );
    // tokenId in equipmentNft(ERC1155)
    struct Equips {
        uint256 weapon;
        uint256 cheastArmor;
        uint256 headArmor;
        uint256 waistArmor;
        uint256 footArmor;
        uint256 handArmor;
        uint256 necklace;
        uint256 ring;
    }
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");
    
    // NFT Contract (ERC721)
    address private soulLoot;
    // SFT Contract (ERC1155)
    address private equipmentNft;
    address private artifactNft;
    address private jobNft;
    // FT Contract (ERC20)
    address private coin;
    address private treasury;

    mapping (address => Equips) equips; // NFT onwer => Equips   

    //*********************************************
    //Initializer
    //*********************************************
    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(DEVELOPER_ROLE, msg.sender);
        treasury = msg.sender;
    }

    //*********************************************
    //Getter
    //*********************************************
    function getSoulLoot() public view returns(address){
        return soulLoot;
    }

    function getEquipmentNft() public view returns(address){
        return equipmentNft;
    }

    function getArtifactNft() public view returns(address){
        return artifactNft;
    }

    function getJobNft() public view returns(address){
        return jobNft;
    }

    function getCoin() public view returns(address){
        return coin;
    }

    function getTreasury() public view returns(address){
        return treasury;
    }

    function getEquips(address owner_) public view returns(
        uint256 weapon,
        uint256 cheastArmor,
        uint256 headArmor,
        uint256 waistArmor,
        uint256 footArmor,
        uint256 handArmor,
        uint256 necklace,
        uint256 ring
    ){
        return (
            equips[owner_].weapon,
            equips[owner_].cheastArmor,
            equips[owner_].headArmor,
            equips[owner_].waistArmor,
            equips[owner_].footArmor,
            equips[owner_].handArmor,
            equips[owner_].necklace,
            equips[owner_].ring
        );
    }

    //*********************************************
    //Setter
    //*********************************************
    function setAdminRole(address granted_) public onlyRole(ADMIN_ROLE){
        _grantRole(ADMIN_ROLE, granted_);
    }

    function setDeveloperRole(address granted_) public onlyRole(DEVELOPER_ROLE){
        _grantRole(DEVELOPER_ROLE, granted_);
    }

    function setSoulLoot(address nft_) public onlyRole(DEVELOPER_ROLE) {
        soulLoot = nft_;
    }

    function setEquipmentNft(address nft_) public onlyRole(DEVELOPER_ROLE) {
        equipmentNft = nft_;
    }
    
    function setArtifactNft(address nft_) public onlyRole(DEVELOPER_ROLE) {
        artifactNft = nft_;
    }

    function setJobNft(address nft_) public onlyRole(DEVELOPER_ROLE) {
        jobNft = nft_;
    }

    function setCoin(address ft_) public onlyRole(DEVELOPER_ROLE) {
        coin = ft_;
    }

    function setTreasury(address treasury_) public onlyRole(DEVELOPER_ROLE) {
        treasury = treasury_;
    }

    function setEquips(
        uint256 weapon_,
        uint256 chestArmor_,
        uint256 headArmor_,
        uint256 waistArmor_,
        uint256 footArmor_,
        uint256 handArmor_,
        uint256 necklace_,
        uint256 ring_
    ) public {
        IERC1155 _equipmentNft = IERC1155(equipmentNft);
        _setWeapon(_equipmentNft, weapon_);
        _setChestArmor(_equipmentNft, chestArmor_);
        _setHeadArmor(_equipmentNft, headArmor_);
        _setWaistArmor(_equipmentNft, waistArmor_);
        _setFootArmor(_equipmentNft, footArmor_);
        _setHandArmor(_equipmentNft, handArmor_);
        _setNecklace(_equipmentNft, necklace_);
        _setRing(_equipmentNft, ring_);
        emit UpdateEquips(msg.sender, weapon_, chestArmor_, headArmor_, waistArmor_, footArmor_, handArmor_, necklace_, ring_);
    }

    function setEquipsOff() public {
        IERC1155 _equipmentNft = IERC1155(equipmentNft);
        _setWeapon(_equipmentNft, 0);
        _setChestArmor(_equipmentNft, 0);
        _setHeadArmor(_equipmentNft, 0);
        _setWaistArmor(_equipmentNft, 0);
        _setFootArmor(_equipmentNft, 0);
        _setHandArmor(_equipmentNft, 0);
        _setNecklace(_equipmentNft, 0);
        _setRing(_equipmentNft, 0);
        emit UpdateEquips(msg.sender, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    function setWeapon(uint256 tokenId_) public {
        IERC1155 _equipmentNft = IERC1155(equipmentNft);
        _setWeapon(_equipmentNft, tokenId_);
        Equips memory _equips = equips[msg.sender];
        emit UpdateEquips(msg.sender, tokenId_, tokenId_, _equips.headArmor, _equips.waistArmor, _equips.footArmor, _equips.handArmor, _equips.necklace, _equips.ring);
    }
    function setHeadArmor(uint256 tokenId_) public {
        IERC1155 _equipmentNft = IERC1155(equipmentNft);
        _setHeadArmor(_equipmentNft, tokenId_);
        Equips memory _equips = equips[msg.sender];
        emit UpdateEquips(msg.sender, _equips.weapon, _equips.weapon, tokenId_, _equips.waistArmor, _equips.footArmor, _equips.handArmor, _equips.necklace, _equips.ring);
    }
    function setChestArmor(uint256 tokenId_) public {
        IERC1155 _equipmentNft = IERC1155(equipmentNft);
        _setChestArmor(_equipmentNft, tokenId_);
        Equips memory _equips = equips[msg.sender];
        emit UpdateEquips(msg.sender, _equips.weapon, tokenId_, _equips.headArmor, _equips.waistArmor, _equips.footArmor, _equips.handArmor, _equips.necklace, _equips.ring);
    }
    function setWaistArmor(uint256 tokenId_) public {
        IERC1155 _equipmentNft = IERC1155(equipmentNft);
        _setWaistArmor(_equipmentNft, tokenId_);
        Equips memory _equips = equips[msg.sender];
        emit UpdateEquips(msg.sender, _equips.weapon, _equips.weapon, _equips.headArmor, tokenId_, _equips.footArmor, _equips.handArmor, _equips.necklace, _equips.ring);
    }
    function setFootArmor(uint256 tokenId_) public {
        IERC1155 _equipmentNft = IERC1155(equipmentNft);
        _setFootArmor(_equipmentNft, tokenId_);
        Equips memory _equips = equips[msg.sender];
        emit UpdateEquips(msg.sender, _equips.weapon, _equips.weapon, _equips.headArmor, _equips.waistArmor, tokenId_, _equips.handArmor, _equips.necklace, _equips.ring);
    }
    function setHandArmor(uint256 tokenId_) public {
        IERC1155 _equipmentNft = IERC1155(equipmentNft);
        _setHandArmor(_equipmentNft, tokenId_);
        Equips memory _equips = equips[msg.sender];
        emit UpdateEquips(msg.sender, _equips.weapon, _equips.weapon, _equips.headArmor, _equips.waistArmor, _equips.footArmor, tokenId_, _equips.necklace, _equips.ring);
    }
    function setNecklace(uint256 tokenId_) public {
        IERC1155 _equipmentNft = IERC1155(equipmentNft);
        _setNecklace(_equipmentNft, tokenId_);
        Equips memory _equips = equips[msg.sender];
        emit UpdateEquips(msg.sender, _equips.weapon, _equips.weapon, _equips.headArmor, _equips.waistArmor, _equips.footArmor, _equips.handArmor, tokenId_, _equips.ring);
    }
    function setRing(uint256 tokenId_) public {
        IERC1155 _equipmentNft = IERC1155(equipmentNft);
        _setRing(_equipmentNft, tokenId_);
        Equips memory _equips = equips[msg.sender];
        emit UpdateEquips(msg.sender, tokenId_, _equips.weapon, _equips.headArmor, _equips.waistArmor, _equips.footArmor, _equips.handArmor, _equips.necklace, tokenId_);
    }

    function _setWeapon(IERC1155 equipmentNft_, uint256 tokenId_) private {
        require(equipmentNft_.balanceOf(msg.sender, tokenId_) > 0 || tokenId_ == 0);
        equips[msg.sender].weapon = tokenId_;
    }
    function _setChestArmor(IERC1155 equipmentNft_, uint256 tokenId_) private {
        require(equipmentNft_.balanceOf(msg.sender, tokenId_) > 0 || tokenId_ == 0);
        equips[msg.sender].weapon = tokenId_;
    }
    function _setHeadArmor(IERC1155 equipmentNft_, uint256 tokenId_) private {
        require(equipmentNft_.balanceOf(msg.sender, tokenId_) > 0 || tokenId_ == 0);
        equips[msg.sender].headArmor = tokenId_;
    }
    function _setWaistArmor(IERC1155 equipmentNft_, uint256 tokenId_) private {
        require(equipmentNft_.balanceOf(msg.sender, tokenId_) > 0 || tokenId_ == 0);
        equips[msg.sender].waistArmor = tokenId_;
    }
    function _setFootArmor(IERC1155 equipmentNft_, uint256 tokenId_) private {
        require(equipmentNft_.balanceOf(msg.sender, tokenId_) > 0 || tokenId_ == 0);
        equips[msg.sender].footArmor = tokenId_;
    }
    function _setHandArmor(IERC1155 equipmentNft_, uint256 tokenId_) private {
        require(equipmentNft_.balanceOf(msg.sender, tokenId_) > 0 || tokenId_ == 0);
        equips[msg.sender].handArmor = tokenId_;
    }
    function _setNecklace(IERC1155 equipmentNft_, uint256 tokenId_) private {
        require(equipmentNft_.balanceOf(msg.sender, tokenId_) > 0 || tokenId_ == 0);
        equips[msg.sender].necklace = tokenId_;
    }
    function _setRing(IERC1155 equipmentNft_, uint256 tokenId_) private {
        require(equipmentNft_.balanceOf(msg.sender, tokenId_) > 0 || tokenId_ == 0);
        equips[msg.sender].ring = tokenId_;
    }

    //*********************************************
    //Logic
    //*********************************************
    function setNftsOnGame() public {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        _equipmentNft.setOnGame(msg.sender);
    }

    function setNftsOffGame() public onlyRole(DEVELOPER_ROLE){
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        _equipmentNft.setOffGame(msg.sender);
    }

    function transferEquipment(
        address from_
    ) public onlyRole(DEVELOPER_ROLE){
        uint256 _count = 0;
        uint256[] memory _equipArray;
        Equips memory _equips = equips[from_];
        uint256 _index = block.timestamp % 10;
        uint256 _tokenId;
        if(_index==0){
            _tokenId = _equips.weapon;
        } else if(_index==1){
            _tokenId = _equips.cheastArmor;
        } else if(_index==2){
            _tokenId = _equips.headArmor;
        } else if(_index==3){
            _tokenId = _equips.waistArmor;
        } else if(_index==4){
            _tokenId = _equips.footArmor;
        } else if(_index==5){
            _tokenId = _equips.handArmor;
        } else if(_index==6){
            _tokenId = _equips.necklace;
        } else if(_index==7){
            _tokenId = _equips.ring;
        }

        if(_tokenId > 0){
            IERC1155 _equipmentNft = IERC1155(equipmentNft);
            uint256 _tokenIdEquipment = _equipArray[_index];
            _equipmentNft.safeTransferFrom(from_, treasury, _tokenIdEquipment, 1, '0x00');
        }
    }

    function transferArtifact(
        address from_, 
        uint256 tokenIdArtifact_
    ) public onlyRole(DEVELOPER_ROLE){
        IERC1155 _artifactNft = IERC1155(artifactNft);
        _artifactNft.safeTransferFrom(from_, treasury, tokenIdArtifact_, 1, '0x00');
    }

    function transferNfts(
        address from_, 
        uint256 tokenIdEquipment_,
        uint256 tokenIdArtifact_
    ) public onlyRole(DEVELOPER_ROLE){
        IERC1155 _equipmentNft = IERC1155(equipmentNft);
        _equipmentNft.safeTransferFrom(from_, treasury, tokenIdEquipment_, 1, '0x00');
        IERC1155 _artifactNft = IERC1155(artifactNft);
        _artifactNft.safeTransferFrom(from_, treasury, tokenIdArtifact_, 1, '0x00');
    }
}