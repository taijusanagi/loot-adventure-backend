// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
// import {AccessControlEnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "../interfaces/ILootByRogueV2.sol";
import "./RogueV3.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Launchpad is RogueV3, Pausable, Ownable {
    IERC20 public costToken;
    uint256 public cost;
    address public receipt;
    mapping (address => ILootByRogueV2.AdventureRecord) private playingRecord;
    mapping (address => address) private tempEoaList;
    mapping (address => uint256) private seedList;

    // --------------------------------------------------
    // Initialize
    // --------------------------------------------------
    constructor(address lootV3_, address costToken_, uint256 cost_, address receipt_) RogueV3(lootV3_){
        costToken = IERC20(costToken_);
        cost = cost_;
        receipt = receipt_;
    }

    // --------------------------------------------------
    // Modifier
    // --------------------------------------------------

    // --------------------------------------------------
    // Getter
    // --------------------------------------------------
    function getSeed(address player_) public view returns(uint256 seed){
        return seedList[player_];
    }

    function getTempEoa(address palyer_) public view returns(address tempEoa){
        return tempEoaList[player_];
    }

    // --------------------------------------------------
    // Setter
    // --------------------------------------------------
    function setCostToken(address costToken_) public onlyOwner() {
        costToken = IERC20(costToken_);
    }

    function setCost(uint256 cost_) public onlyOwner() {
        cost = cost_;
    }

    function setReceipt(address receipt_) public onlyOwner() {
        receipt = receipt_;
    }

    // --------------------------------------------------
    // Main Logic
    // --------------------------------------------------
    function initRecord(
        address tempEoa_
    ) public {
        // 特定のNFTを持っている人だけが使えるにようにしたい
        tempEoaList[msg.sender] = tempEoa_;
        ILootByRogueV2.AdventureRecord memory _record = initAdventureRecordExternal();
        uint256 _seed = _record.inputData.seed;
        playingRecord[tempEoa_] = _record;
        seedList[msg.sender] = _seed;
    }

    function writeRecord(
        ILootByRogueV2.InputData calldata inputData_
    ) external {
        // address _player = tempEoaList[msg.sender];
        // require(inputData_.seed == seedList[_player]);
        playingRecord[msg.sender] = adventureRead(inputData_, playingRecord[msg.sender]);
    }

    function mint(address tempEoa_) external whenNotPaused {
        require(tempEoaList[msg.sender] == tempEoa_, "Address requested is not set");
        require(costToken.transferFrom(msg.sender, receipt, cost), "Transfer failed");
        ILootByRogueV2.AdventureRecord memory _results = playingRecord[msg.sender];
        loot.safeMint(msg.sender, _results);
        //----
        //TBAを指定させてそこにNFTを発行する形としたい
        //----
        // address _tba = ....;
        // loot.safeMint(_tba, results_);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}