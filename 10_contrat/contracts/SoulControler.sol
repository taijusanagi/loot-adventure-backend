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
            _equipmentNft.safeTransferFrom(from_, treasury, _tokenId, 1, '0x00');
        }
    }

    function attachWeapon(
        uint256 tokenId_,
        address tba_
    ) public {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        require(_equipmentNft.balanceOf(msg.sender, tokenId_)>0, 'You are not owner of EquipmentNFT');
        //Check EauipmentType
        uint256 _type = _equipmentNft.getEquipmentType(tokenId_);

        require(_type==0, 'This EquipmentNFT is not weapon(type: 0)');
        if(equips[tba_].weapon!=0){
            uint256 _tokenId=equips[tba_].weapon;
            _equipmentNft.safeTransferFrom(tba_, msg.sender, _tokenId, 1, '0x00');
        }
        _equipmentNft.safeTransferFrom(msg.sender, tba_, tokenId_, 1, '0x00');
        equips[tba_].weapon = tokenId_;
        emit UpdateEquips(msg.sender, equips[tba_]);
    }

    function attachCheastArmor(
        uint256 tokenId_,
        address tba_
    ) public {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        require(_equipmentNft.balanceOf(msg.sender, tokenId_)>0, 'You are not owner of EquipmentNFT');
        //Check EauipmentType
        uint256 _type = _equipmentNft.getEquipmentType(tokenId_);

        require(_type==1, 'This EquipmentNFT is not cheastArmor(type: 1)');
        if(equips[tba_].cheastArmor!=0){
            uint256 _tokenId=equips[tba_].cheastArmor;
            _equipmentNft.safeTransferFrom(tba_, msg.sender, _tokenId, 1, '0x00');
        }
        _equipmentNft.safeTransferFrom(msg.sender, tba_, tokenId_, 1, '0x00');
        equips[tba_].cheastArmor = tokenId_;
        emit UpdateEquips(msg.sender, equips[tba_]);
    }

    function attachHeadArmor(
        uint256 tokenId_,
        address tba_
    ) public {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        require(_equipmentNft.balanceOf(msg.sender, tokenId_)>0, 'You are not owner of EquipmentNFT');
        //Check EauipmentType
        uint256 _type = _equipmentNft.getEquipmentType(tokenId_);

        require(_type==2, 'This EquipmentNFT is not headArmor(type: 2)');
        if(equips[tba_].headArmor!=0){
            uint256 _tokenId=equips[tba_].headArmor;
            _equipmentNft.safeTransferFrom(tba_, msg.sender, _tokenId, 1, '0x00');
        }
        _equipmentNft.safeTransferFrom(msg.sender, tba_, tokenId_, 1, '0x00');
        equips[tba_].headArmor = tokenId_;
        emit UpdateEquips(msg.sender, equips[tba_]);
    }

    function attachWaistArmor(
        uint256 tokenId_,
        address tba_
    ) public {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        require(_equipmentNft.balanceOf(msg.sender, tokenId_)>0, 'You are not owner of EquipmentNFT');
        //Check EauipmentType
        uint256 _type = _equipmentNft.getEquipmentType(tokenId_);

        require(_type==3, 'This EquipmentNFT is not waistArmor(type: 3)');
        if(equips[tba_].waistArmor!=0){
            uint256 _tokenId=equips[tba_].waistArmor;
            _equipmentNft.safeTransferFrom(tba_, msg.sender, _tokenId, 1, '0x00');
        }
        _equipmentNft.safeTransferFrom(msg.sender, tba_, tokenId_, 1, '0x00');
        equips[tba_].waistArmor = tokenId_;
        emit UpdateEquips(msg.sender, equips[tba_]);
    }

    function attachFootArmor(
        uint256 tokenId_,
        address tba_
    ) public {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        require(_equipmentNft.balanceOf(msg.sender, tokenId_)>0, 'You are not owner of EquipmentNFT');
        //Check EauipmentType
        uint256 _type = _equipmentNft.getEquipmentType(tokenId_);

        require(_type==4, 'This EquipmentNFT is not waistArmor(type: 4)');
        if(equips[tba_].footArmor!=0){
            uint256 _tokenId=equips[tba_].footArmor;
            _equipmentNft.safeTransferFrom(tba_, msg.sender, _tokenId, 1, '0x00');
        }
        _equipmentNft.safeTransferFrom(msg.sender, tba_, tokenId_, 1, '0x00');
        equips[tba_].footArmor = tokenId_;
        emit UpdateEquips(msg.sender, equips[tba_]);
    }

    function attachHandArmor(
        uint256 tokenId_,
        address tba_
    ) public {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        require(_equipmentNft.balanceOf(msg.sender, tokenId_)>0, 'You are not owner of EquipmentNFT');
        //Check EauipmentType
        uint256 _type = _equipmentNft.getEquipmentType(tokenId_);

        require(_type==5, 'This EquipmentNFT is not waistArmor(type: 5)');
        if(equips[tba_].handArmor!=0){
            uint256 _tokenId=equips[tba_].handArmor;
            _equipmentNft.safeTransferFrom(tba_, msg.sender, _tokenId, 1, '0x00');
        }
        _equipmentNft.safeTransferFrom(msg.sender, tba_, tokenId_, 1, '0x00');
        equips[tba_].handArmor = tokenId_;
        emit UpdateEquips(msg.sender, equips[tba_]);
    }

    function attachNecklace(
        uint256 tokenId_,
        address tba_
    ) public {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        require(_equipmentNft.balanceOf(msg.sender, tokenId_)>0, 'You are not owner of EquipmentNFT');
        //Check EauipmentType
        uint256 _type = _equipmentNft.getEquipmentType(tokenId_);

        require(_type==6, 'This EquipmentNFT is not waistArmor(type: 6)');
        if(equips[tba_].necklace!=0){
            uint256 _tokenId=equips[tba_].necklace;
            _equipmentNft.safeTransferFrom(tba_, msg.sender, _tokenId, 1, '0x00');
        }
        _equipmentNft.safeTransferFrom(msg.sender, tba_, tokenId_, 1, '0x00');
        equips[tba_].necklace = tokenId_;
        emit UpdateEquips(msg.sender, equips[tba_]);
    }

    function attachRing(
        uint256 tokenId_,
        address tba_
    ) public {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        require(_equipmentNft.balanceOf(msg.sender, tokenId_)>0, 'You are not owner of EquipmentNFT');
        //Check EauipmentType
        uint256 _type = _equipmentNft.getEquipmentType(tokenId_);

        require(_type==7, 'This EquipmentNFT is not waistArmor(type: 7)');
        if(equips[tba_].ring!=0){
            uint256 _tokenId=equips[tba_].ring;
            _equipmentNft.safeTransferFrom(tba_, msg.sender, _tokenId, 1, '0x00');
        }
        _equipmentNft.safeTransferFrom(msg.sender, tba_, tokenId_, 1, '0x00');
        equips[tba_].ring = tokenId_;
        emit UpdateEquips(msg.sender, equips[tba_]);
    }

    // setEquipments
    // 
}