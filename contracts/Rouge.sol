// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./RougeLoot.sol";

import "hardhat/console.sol";

contract Rouge is Pausable, Ownable {
    RougeLoot public loot;

    constructor() {
        loot = new RougeLoot();
    }

    function pause() public onlyOwner {
        _pause();
        loot.pause();
    }

    function unpause() public onlyOwner {
        _unpause();
        loot.unpause();
    }
}