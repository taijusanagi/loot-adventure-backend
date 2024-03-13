// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./lib/Bytecode.sol";
import "./interfaces/lootNfts/ISoulLoot.sol";
import "./interfaces/gameNfts/IEquipmentNft.sol";
import "./interfaces/gameNfts/IJobNft.sol";
import "./interfaces/gameNfts/IArtifactNft.sol";
import "./interfaces/ISoulCalculator.sol";
import "./interfaces/IXp.sol";

contract SoulMinter is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");

    string[4] private JOB_TYPE = ['Warrior','Guardian','Clown','Tank'];
    string[10] private ITEM_TYPE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

    // NFT Contract (ERC721)
    address private soulLoot;
    // SFT Contract (ERC1155)
    address private equipmentNft;
    address private artifactNft;
    address private jobNft;
    // FT Contract (ERC20)
    address private xp;

    mapping (address => address) calcContract;

    //*********************************************
    //Initializer
    //*********************************************
    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(DEVELOPER_ROLE, msg.sender);
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

    function getXp() public view returns(address){
        return xp;
    }


    function getCalcContract(address nft_) public view returns(address) {
        return calcContract[nft_];
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

    function setXp(address ft_) public onlyRole(DEVELOPER_ROLE) {
        xp = ft_;
    }

    function setCalcContract(address nft_, address calc_) public onlyRole(DEVELOPER_ROLE) {
        calcContract[nft_] = calc_;
    }

    //*********************************************
    //Logic
    //*********************************************
    function mintSoul(
        address nft_, 
        uint256 tokenId_,
        address owner_,
        address recipient_,
        bytes memory seedData_
    ) public {
        require(owner_ == nftOwner(nft_, tokenId_), "Not token owner");
        _mintEquipmentNft(nft_, tokenId_, recipient_, seedData_);
        _mintJobNft(nft_, tokenId_, recipient_, seedData_);
        _mintArtifactNft(nft_, tokenId_, recipient_, seedData_);
        // _mintXp(recipient_, 10**20, 'LA000|Create Soul');
    }

    function _mintEquipmentNft(address nft_, uint256 tokenId_, address recipient_, bytes memory seedData_) internal virtual {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        // get parameter via calurator contract by NFT(Address & tokenID)
        ISoulCalculator _calc = ISoulCalculator(calcContract[nft_]);
        (
            uint256 _seed,
            uint256[8] memory _equipmentIds,
            string[8] memory _equipmentNames,
            uint256[8] memory _equipmentRarities
        ) = _calc.calcEquipment(nft_, tokenId_, seedData_);

        for(uint i=0; i<8; i++){
            _equipmentNft.mint(
                recipient_, 
                nft_, 
                tokenId_,
                _seed,
                _equipmentNames[i],
                _equipmentIds[i],
                i,
                _equipmentRarities[i]
            );
        }
    }

    function _mintJobNft(address nft_, uint256 tokenId_, address recipient_, bytes memory seedData_) internal virtual {
        IJobNft _jobNft = IJobNft(jobNft);
        ISoulCalculator _calc = ISoulCalculator(calcContract[nft_]);
        (
            uint256 _seed,
            uint256 _jobType
        ) = _calc.calcJob(nft_, tokenId_, seedData_);
        _jobNft.mint(
            recipient_, 
            nft_, 
            tokenId_,
            _seed,
            JOB_TYPE[_jobType],
            _jobType
        );
    }

    function _mintArtifactNft(address nft_, uint256 tokenId_, address recipient_, bytes memory seedData_) internal virtual {
        IArtifactNft _artifactNft = IArtifactNft(artifactNft);
        ISoulCalculator _calc = ISoulCalculator(calcContract[nft_]);
        (
            uint256 _seed,
            uint256 _artifactType,
            uint256 _rarity
        ) = _calc.calcArtifact(nft_, tokenId_, seedData_);
        _artifactNft.mint(
            recipient_, 
            nft_, 
            tokenId_,
            _seed,
            ITEM_TYPE[_artifactType],
            _artifactType,
            _rarity
        );
    }

    function _mintXp(address recipient_, uint256 amount_, string memory source_) internal virtual {
        IXp _xp = IXp(xp);
        _xp.mint(recipient_, amount_, source_);
    }

    function nftOwner(address nft_, uint256 tokenId_) public view returns (address) {
        IERC721 _nft = IERC721(nft_);
        return _nft.ownerOf(tokenId_);
    }
}