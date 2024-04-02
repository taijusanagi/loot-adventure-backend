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
import "./interfaces/ICoin.sol";
import "./interfaces/IERC6551Registry.sol";
import "./interfaces/ISoulControler.sol";

contract SoulMinter is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");
    address public constant ZERO_ADDRESS = 0x0000000000000000000000000000000000000001;

    string[4] private JOB_TYPE = ['Warrior','Guardian','Clown','Tank'];
    string[10] private ARTIFACT_TYPE = [
        'Blank',
        'Naked King', 
        'Dragon Slayer',
        'Dragon Slayer+',
        'Dragon Slayer++',
        'Dragon Slayer+++', 
        'Ruins Hunter',
        'Slime Slayer',
        'Item Master'
    ];

    // NFT Contract (ERC721)
    address private soulLoot;
    // SFT Contract (ERC1155)
    address private equipmentNft;
    address private artifactNft;
    address private jobNft;
    // FT Contract (ERC20)
    address private coin;
    // ERC6551Account(Registry&Account)
    address private erc6551Registry;
    address private implementation;
    // SoulControler
    address private soulControler;

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
    function getCoin() public view returns(address){
        return coin;
    }
    function getCalcContract(address nft_) public view returns(address) {
        return calcContract[nft_];
    }
    function getErc6551Registry() public view returns(address){
        return erc6551Registry;
    }
    function getImplementation() public view returns(address){
        return implementation;    
    }
    function getSoulControler() public view returns(address){
        return soulControler;
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
    function setDeveloperRoles(address[] memory grantedList_) public onlyRole(DEVELOPER_ROLE){
        uint256 _length = grantedList_.length;
        for (uint256 i=0;i< _length; i++){
            _grantRole(DEVELOPER_ROLE, grantedList_[i]);
        }
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
    function setCalcContract(address nft_, address calc_) public onlyRole(DEVELOPER_ROLE) {
        calcContract[nft_] = calc_;
    }
    function setErc6551Registry(address erc6551Registry_) public onlyRole(DEVELOPER_ROLE){
        erc6551Registry = erc6551Registry_;
    }
    function setImplementation(address contract_) public onlyRole(DEVELOPER_ROLE){
        implementation = contract_;
    }
    function setSoulControler(address granted_) public onlyRole(DEVELOPER_ROLE){
        soulControler = granted_;
    }

    //*********************************************
    //Logic
    //*********************************************
    function mintSoul(
        uint256 chainId_,
        address nft_, 
        uint256 tokenId_,
        bytes memory seedData_
    ) public {
        IERC721 _nft = IERC721(nft_);
        require(_nft.ownerOf(tokenId_)==msg.sender, 'SoulMinter Error: You are not NFT owner');
        ISoulLoot _soulLoot = ISoulLoot(soulLoot);
        IERC6551Registry _registry = IERC6551Registry(erc6551Registry);
        ILootByRogueV2 _loot = ILootByRogueV2(nft_);
        
        ISoulCalculator _calc = ISoulCalculator(calcContract[nft_]);
        (ILootByRogueV2.AdventureRecord memory _record, uint256 _tokenId) = _calc.calcSoul(nft_, tokenId_, seedData_);

        // Mint SoulLoot to EOA
        _soulLoot.safeMint(msg.sender, chainId_, nft_, _tokenId, _record);
        _loot.safeTransferFrom(msg.sender, ZERO_ADDRESS, tokenId_);

        // Create TBA
        uint256 __tokenId = _soulLoot.getTokenId(tokenId_, nft_);
        _registry.createAccount(implementation, chainId_, soulLoot, _tokenId, 1, '0x0000000000000000000000000000000000000000');
        address _tba = _registry.account(
            implementation, 
            chainId_, 
            soulLoot,
            __tokenId,
            1
        );
        // Mint Equipmnt&Job&Artifact to TBA
        _mintEquipmentNft(nft_, tokenId_, _tba, seedData_);
        _mintJobNft(nft_, tokenId_, _tba, seedData_);
        _mintArtifactNft(nft_, tokenId_, _tba, seedData_);
    }

    function mintCoin(address recipient_, uint256 amount_, string memory source_) public onlyRole(DEVELOPER_ROLE) {
        _mintCoin(recipient_, amount_, source_);
    }

    function _mintEquipmentNft(address nft_, uint256 tokenId_, address recipient_, bytes memory seedData_) internal virtual {
        IEquipmentNft _equipmentNft = IEquipmentNft(equipmentNft);
        ISoulControler _soulControler = ISoulControler(soulControler);
        // get parameter via calurator contract by NFT(Address & tokenID)
        ISoulCalculator _calc = ISoulCalculator(calcContract[nft_]);
        (
            uint256 _seed,
            uint256[8] memory _equipmentIds,
            string[8] memory _equipmentNames,
            uint256[8] memory _equipmentRarities
        ) = _calc.calcEquipment(nft_, tokenId_, seedData_);

        for(uint i=0; i<8; i++){
            uint256 _tokenId = _equipmentNft.mint(
                recipient_, 
                nft_, 
                tokenId_,
                _seed,
                _equipmentNames[i],
                _equipmentIds[i],
                i,
                _equipmentRarities[i]
            );
            // uint256 _tokenId = _equipmentNft.getTokenId(nft_, _equipmentIds[i], i) - 1;
            _soulControler.attachEquipInit(_tokenId, recipient_, i);
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
            ARTIFACT_TYPE[_artifactType],
            _artifactType,
            _rarity
        );
    }

    function _mintCoin(address recipient_, uint256 amount_, string memory source_) internal virtual {
        ICoin _coin = ICoin(coin);
        _coin.mint(recipient_, amount_, source_);
    }

    function nftOwner(address nft_, uint256 tokenId_) public view returns (address) {
        IERC721 _nft = IERC721(nft_);
        return _nft.ownerOf(tokenId_);
    }
}