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
    event UpdateEquips(address owner,Equips equips);
    event SeizureEquipment(address owner, uint256 tokenId, Equips equips);
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
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
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
    function getAmountByLevel(uint256 level_) external view returns(uint256 _amount){
        IEquipmentNft _equipment = IEquipmentNft(equipmentNft);
        _amount = _equipment.getAmountByLevel(level_);
    }
    function getAmountByToken(uint256 tokenId_) external view returns(uint256 _amount){
        IEquipmentNft _equipment = IEquipmentNft(equipmentNft);
        _amount = _equipment.getAmountByToken(tokenId_);
    }

    function getIsEquip(address tba_, uint256 type_) public view returns(bool){
        if(type_==0 && equips[tba_].weapon!=0){
            return true;
        } else if(type_==1 && equips[tba_].cheastArmor!=0){
            return true;
        } else if(type_==2 && equips[tba_].headArmor!=0){
            return true;
        } else if(type_==3 && equips[tba_].waistArmor!=0){
            return true;
        } else if(type_==4 && equips[tba_].footArmor!=0){
           return true;
        } else if(type_==5 && equips[tba_].handArmor!=0){
            return true;
        } else if(type_==6 && equips[tba_].necklace!=0){
            return true;
        } else if(type_==7 && equips[tba_].ring!=0){
            return true;
        }
        return false;
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
    function setMinterRole(address granted_) public onlyRole(DEVELOPER_ROLE){
        _grantRole(MINTER_ROLE, granted_);
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

    function setNftsOnGame() public {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        _equipmentNft.setOnGame(msg.sender);
    }

    function setNftsOffGame() public onlyRole(DEVELOPER_ROLE) {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        _equipmentNft.setOffGame(msg.sender);
    }

    //*********************************************
    //Logic
    //*********************************************
    function seizureEquipment(
        address tba_
    ) public onlyRole(DEVELOPER_ROLE) returns (uint256 _tokenId){
        uint256 _index = block.timestamp % 10;
        if(_index == 0){
            return 0;
        }

        Equips memory _equip = equips[tba_];
        uint256[4] memory _tokenIds;
        uint256[4] memory _tokenTypes;
        uint256 _counter = 0;
        if(_equip.weapon!=0){
            _tokenIds[_counter] = _equip.weapon;
            _tokenTypes[_counter] = 0;
            _counter++;
        } 
        if(_equip.cheastArmor!=0){
            _tokenIds[_counter] = _equip.cheastArmor;
            _tokenTypes[_counter] = 1;
            _counter++;
        }
        if(_equip.headArmor!=0){
            _tokenIds[_counter] = _equip.headArmor;
            _tokenTypes[_counter] = 2;
            _counter++;
        }
        if(_equip.footArmor!=0){
            _tokenIds[_counter] = _equip.footArmor;
            _tokenTypes[_counter] = 4;
            _counter++;
        }

        if(_counter > 0){
            uint256 _index2 = block.timestamp % _counter;
            IERC1155 _equipmentNft = IERC1155(equipmentNft);
            
            if(_tokenTypes[_index2]==0){
                _equip.weapon=0;
            } else if(_tokenTypes[_index2]==1) {
                _equip.cheastArmor=0;
            } else if(_tokenTypes[_index2]==2) {
                _equip.headArmor=0;
            } else if(_tokenTypes[_index2]==4) {
                _equip.footArmor=0;
            } 
            equips[tba_] = _equip;
            _tokenId = _tokenIds[_index2];
            require(_tokenId!=0, 'TBA do not have this Equipment');
            _equipmentNft.safeTransferFrom(tba_, treasury, _tokenId, 1, '0x00');
            emit SeizureEquipment(tba_, _tokenId, _equip);
        } else {
            return 0;
        }
    }

    function _attachEquip(
        uint256 tokenId_,
        address tba_,
        uint256 type_
    ) private {
        if(type_==0){
          equips[tba_].weapon = tokenId_;
        } else if(type_==1){
          equips[tba_].cheastArmor = tokenId_;
        } else if(type_==2){
          equips[tba_].headArmor = tokenId_;
        } else if(type_==3){
          equips[tba_].waistArmor = tokenId_;
        } else if(type_==4){
          equips[tba_].footArmor = tokenId_;
        } else if(type_==5){
          equips[tba_].handArmor = tokenId_;
        } else if(type_==6){
          equips[tba_].necklace = tokenId_;
        } else if(type_==7){
          equips[tba_].ring = tokenId_;
        }
    }

    function attachEquip(
        uint256 tokenId_,
        address tba_
    ) public {
        IEquipmentNft _equipment = IEquipmentNft(equipmentNft);
        require(_equipment.balanceOf(msg.sender, tokenId_)>0, 'SoulControler | You are not EquipmentNft owner');
        uint256 _type = _equipment.getEquipmentType(tokenId_);
        if(getIsEquip(tba_, _type)){
            _withdrawEquip(msg.sender, tba_, _type);
        }
        _equipment.safeTransferFrom(msg.sender, tba_, tokenId_, 1, '0x00');
        _attachEquip(tokenId_, tba_, _type);
        emit UpdateEquips(tba_, equips[tba_]);
    }

    function attachEquipInit(
        uint256 tokenId_,
        address tba_,
        uint256 type_
    ) public onlyRole(MINTER_ROLE){
        _attachEquip(tokenId_, tba_, type_);
        emit UpdateEquips(tba_, equips[tba_]);
    }

    function attachEquips(
        uint256[] memory tokenIds_,
        address tba_
    ) public onlyRole(MINTER_ROLE){
        IEquipmentNft _equipment = IEquipmentNft(equipmentNft);
        for (uint256 i=0; i<tokenIds_.length; i++){
            require(_equipment.balanceOf(msg.sender, tokenIds_[i])>0,'SoulControler | You are not token owner or SoulMinter');
            uint256 _type = _equipment.getEquipmentType(tokenIds_[i]);
            if(getIsEquip(tba_, _type)){
                _withdrawEquip(msg.sender, tba_, _type);
            }
            _equipment.safeTransferFrom(msg.sender, tba_, tokenIds_[i], 1, '0x00');
            _attachEquip(tokenIds_[i], tba_, _type);
            emit UpdateEquips(tba_, equips[tba_]);
        }
    }

    function attachEquipsInit(
        uint256[] memory tokenIds_,
        address tba_,
        uint256[] memory types_
    ) public onlyRole(MINTER_ROLE){
        for (uint256 i=0; i<tokenIds_.length; i++){
            _attachEquip(tokenIds_[i], tba_, types_[i]);
            emit UpdateEquips(tba_, equips[tba_]);
        }
    }
    
    // Withdraw
    function _withdrawEquip(
        address eoa_,
        address tba_,
        uint256 type_
    ) private {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        uint256 _tokenId = 0;
        Equips memory _equip = equips[tba_];
        if(type_==0){
            _tokenId = _equip.weapon;
            _equip.weapon = 0;
        } else if(type_==1){
            _tokenId = _equip.cheastArmor;
            _equip.cheastArmor = 0;
        } else if(type_==2){
            _tokenId = equips[tba_].headArmor;
            _equip.headArmor = 0;
        } else if(type_==3){
            _tokenId = equips[tba_].waistArmor;
            _equip.waistArmor = 0;
        } else if(type_==4){
            _tokenId = equips[tba_].footArmor;
            _equip.footArmor = 0;
        } else if(type_==5){
            _tokenId = equips[tba_].handArmor;
            _equip.handArmor = 0;
        } else if(type_==6){
            _tokenId = equips[tba_].necklace;
            _equip.necklace = 0;
        } else if(type_==7){
            _tokenId = equips[tba_].ring;
            _equip.ring = 0;
        }

        require(_tokenId!=0, 'SoulControler | You do not set this Equipment-Type');
        equips[tba_]=_equip;
        _equipmentNft.safeTransferFrom(tba_, eoa_, _tokenId, 1, '0x00');
    }

    function withdrawEquip(
        address eoa_,
        uint256 tokenId_
    ) public {
        IEquipmentNft _equipment = IEquipmentNft(equipmentNft);
        require(_equipment.balanceOf(msg.sender, tokenId_)>0, 'SoulControler | You are not EquipmentNft owner');
        uint256 _type = _equipment.getEquipmentType(tokenId_);
        _withdrawEquip(eoa_, msg.sender, _type);
        emit UpdateEquips(msg.sender, equips[msg.sender]);
    }
}