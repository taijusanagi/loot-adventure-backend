// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./lib/Bytecode.sol";
import "./interfaces/lootNfts/ISoulLootNft.sol";
import "./interfaces/gameNfts/ISoulNft.sol";
import "./interfaces/gameNfts/IArmourNft.sol";
import "./interfaces/gameNfts/IJobNft.sol";
import "./interfaces/gameNfts/IItemNft.sol";
import "./interfaces/ISoulCalculator.sol";
import "./interfaces/IXp.sol";

contract SoulMinter is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");

    string[4] private JOB_TYPE = ['Warrior','Guardian','Clown','Tank'];
    string[10] private ITEM_TYPE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

    // NFT Contract (ERC721)
    address private soulNft;
    address private soulLootAddress;
    // SFT Contract (ERC1155)
    address private armourNft;
    address private itemNft;
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
    function getSoulNft() public view returns(address){
        return soulNft;
    }

    function getSoulLoot() public view returns(address){
        return soulLootAddress;
    }

    function getArmourNft() public view returns(address){
        return armourNft;
    }

    function getItemNft() public view returns(address){
        return itemNft;
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

    function setSoulNft(address nft_) public onlyRole(DEVELOPER_ROLE) {
        soulNft = nft_;
    }

    function setSoulLoot(address nft_) public onlyRole(DEVELOPER_ROLE) {
        soulLootAddress = nft_;
    }

    function setArmourNft(address nft_) public onlyRole(DEVELOPER_ROLE) {
        armourNft = nft_;
    }
    
    function setItemNft(address nft_) public onlyRole(DEVELOPER_ROLE) {
        itemNft = nft_;
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
        _mintSoulNft(nft_, tokenId_, recipient_, seedData_);
        _mintArmourNft(nft_, tokenId_, recipient_, seedData_);
        _mintJobNft(nft_, tokenId_, recipient_, seedData_);
        _mintItemNft(nft_, tokenId_, recipient_, seedData_);
        _mintXp(recipient_, 10**18, 'LA000|Create SOul');
    }

    function _mintSoulNft(
        address nft_, 
        uint256 tokenId_, 
        address recipient_,
        bytes memory seedData_
    ) internal virtual {
        ISoulNft _soulNft = ISoulNft(soulNft);
        // get parameter via calurator contract by NFT(Address & tokenID)
        ISoulCalculator _calc = ISoulCalculator(calcContract[nft_]);
        (
            uint256 _seed,
            uint16 _turn,
            uint16 _maxHp,
            uint16 _currentHp,
            uint16 _attack,
            uint16 _defence,
            uint16 _recovery
        ) = _calc.calcSoul(nft_, tokenId_, seedData_);
        _soulNft.safeMint(
            recipient_,
            nft_,
            tokenId_,
            _seed,
            _turn,
            _maxHp,
            _currentHp,
            _attack,
            _defence,
            _recovery
        );
    }

    function _mintArmourNft(address nft_, uint256 tokenId_, address recipient_, bytes memory seedData_) internal virtual {
        IArmourNft _armourNft = IArmourNft(armourNft);
        // get parameter via calurator contract by NFT(Address & tokenID)
        ISoulCalculator _calc = ISoulCalculator(calcContract[nft_]);
        (
            uint256 _seed,
            uint256[8] memory _armourIds,
            string[8] memory _armourNames
        ) = _calc.calcArmour(nft_, tokenId_, seedData_);

        for(uint i; i<8; i++){
            _armourNft.mint(
                recipient_, 
                nft_, 
                tokenId_,
                _seed,
                _armourNames[i],
                _armourIds[i],
                i
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

    function _mintItemNft(address nft_, uint256 tokenId_, address recipient_, bytes memory seedData_) internal virtual {
        IItemNft _itemNft = IItemNft(itemNft);
        ISoulCalculator _calc = ISoulCalculator(calcContract[nft_]);
        (
            uint256 _seed,
            uint256 _itemType,
            uint256 _rarity
        ) = _calc.calcItem(nft_, tokenId_, seedData_);
        _itemNft.mint(
            recipient_, 
            nft_, 
            tokenId_,
            _seed,
            ITEM_TYPE[_itemType],
            _itemType,
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