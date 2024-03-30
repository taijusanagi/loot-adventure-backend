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
        address owner,
        Equips equips
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
        address from_
    ) public onlyRole(DEVELOPER_ROLE){
        Equips memory _equips = equips[from_];
        uint256 _index = block.timestamp % 10;
        uint256 _tokenId;
        if(_index==0){
            _tokenId = _equips.weapon;
            equips[from_].weapon = 0;
        } else if(_index==1){
            _tokenId = _equips.cheastArmor;
            equips[from_].cheastArmor = 0;
        } else if(_index==2){
            _tokenId = _equips.headArmor;
            equips[from_].headArmor = 0;
        } else if(_index==3){
            _tokenId = _equips.waistArmor;
            equips[from_].waistArmor = 0;
        } else if(_index==4){
            _tokenId = _equips.footArmor;
            equips[from_].footArmor = 0;
        } else if(_index==5){
            _tokenId = _equips.handArmor;
            equips[from_].handArmor = 0;
        } else if(_index==6){
            _tokenId = _equips.necklace;
            equips[from_].necklace = 0;
        } else if(_index==7){
            _tokenId = _equips.ring;
            equips[from_].ring = 0;
        }

        if(_tokenId > 0){
            IERC1155 _equipmentNft = IERC1155(equipmentNft);
            _equipmentNft.safeTransferFrom(from_, treasury, _tokenId, 1, '0x00');
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
          equips[tba_].footArmor = tokenId_;
        } else if(type_==4){
          equips[tba_].handArmor = tokenId_;
        } else if(type_==5){
          equips[tba_].necklace = tokenId_;
        } else if(type_==6){
          equips[tba_].ring = tokenId_;
        }
    }

    function attachEquip(
        address eoa_,
        uint256 tokenId_,
        address tba_
    ) public {
        IEquipmentNft _equipment = IEquipmentNft(equipmentNft);
        require(
            hasRole(MINTER_ROLE, msg.sender) || _equipment.balanceOf(msg.sender, tokenId_)>0,
            'SoulControler | You are not token owner or SoulMinter'
        );
        uint256 _type = _equipment.getEquipmentType(tokenId_);
        _withdawEquip(eoa_, tokenId_, tba_, _type);
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
        address eoa_,
        uint256[] memory tokenIds_,
        address tba_
    ) public onlyRole(MINTER_ROLE){
        IEquipmentNft _equipment = IEquipmentNft(equipmentNft);
        for (uint256 i=0; i<tokenIds_.length; i++){
            require(
                hasRole(MINTER_ROLE, msg.sender) || _equipment.balanceOf(msg.sender, tokenIds_[i])>0,
                'SoulControler | You are not token owner or SoulMinter'
            );
            uint256 _type = _equipment.getEquipmentType(tokenIds_[i]);
            _withdawEquip(eoa_, tokenIds_[i], tba_, _type);
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
    function _withdawEquip(
        address eoa_,
        uint256 tokenId_,
        address tba_,
        uint256 type_
    ) private {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        uint256 _tokenId = 0;
        require(_equipmentNft.balanceOf(msg.sender, tokenId_)>0, 'You are not owner of EquipmentNFT');
        if(type_==0){
            if(equips[tba_].weapon!=0){
                _tokenId = equips[tba_].weapon;
            }
            equips[tba_].weapon = tokenId_;
        } else if(type_==1){
            if(equips[tba_].cheastArmor!=0){
                _tokenId = equips[tba_].cheastArmor;
            }
            equips[tba_].cheastArmor = 0;
        } else if(type_==2){
            if(equips[tba_].headArmor!=0){
                _tokenId = equips[tba_].headArmor;
            }
            equips[tba_].headArmor = 0;
        } else if(type_==3){
            if(equips[tba_].footArmor!=0){
                _tokenId = equips[tba_].footArmor;
            }
            equips[tba_].footArmor = 0;
        } else if(type_==4){
            if(equips[tba_].handArmor!=0){
                _tokenId = equips[tba_].handArmor;
            }
            equips[tba_].handArmor = 0;
        } else if(type_==5){
            if(equips[tba_].necklace!=0){
                _tokenId = equips[tba_].necklace;
            }
            equips[tba_].necklace = 0;
        } else if(type_==6){
            if(equips[tba_].ring!=0){
                _tokenId = equips[tba_].ring;
            }
            equips[tba_].ring = 0;
        }
        
        if(_tokenId!=0){
            _equipmentNft.safeTransferFrom(tba_, eoa_, _tokenId, 1, '0x00');
        }
    }

    function withdawEquip(
        address eoa_,
        uint256 tokenId_
    ) public {
        IEquipmentNft _equipment = IEquipmentNft(equipmentNft);
        require(_equipment.balanceOf(msg.sender, tokenId_)>0, 'You are not EquipmentNft owner');
        uint256 _type = _equipment.getEquipmentType(tokenId_);
        _withdawEquip(eoa_, tokenId_, msg.sender, _type);
    }
}