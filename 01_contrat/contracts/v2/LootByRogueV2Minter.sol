// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/ILootByRogueV2.sol";
import "./RogueV2.sol";

contract LootByRogueV2Minter is RogueV2, Pausable, Ownable {
    IERC20 public costToken;
    uint256 public cost;
    address public receipt;

    constructor(address _lootV2, address _costToken, uint256 _cost, address _receipt) RogueV2(_lootV2) {
        costToken = IERC20(_costToken);
        cost = _cost;
        receipt = _receipt;
    }

    function setCostToken(address _costToken) public onlyOwner() {
        costToken = IERC20(_costToken);
    }

    function setCost(uint256 _cost) public onlyOwner() {
        cost = _cost;
    }

    function setReceipt(address _receipt) public onlyOwner() {
        receipt = _receipt;
    }

    function mint(ILootByRogueV2.InputData calldata inputData) external whenNotPaused {
        require(inputData.directions.length == inputData.useItems.length, "Lengths do not match");
        require(costToken.transferFrom(msg.sender, receipt, cost), "Transfer failed");
        ILootByRogueV2.AdventureRecord memory results = adventure(inputData);
        loot.safeMint(msg.sender, results);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}

