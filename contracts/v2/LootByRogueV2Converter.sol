// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./ILootByRogueV2.sol";
import "./RogueV2.sol";

contract LootByRogueV2Converter is RogueV2, Pausable, Ownable {
    IERC721 public lootV1;

    constructor(address _lootV2, address _lootV1) RogueV2(_lootV2) {
        lootV1 = IERC721(_lootV1);
    }

    function convert(ILootByRogueV2.InputData calldata inputData, uint256 tokenId) external whenNotPaused {
        require(inputData.directions.length == inputData.useItems.length, "Lengths do not match");
        require(lootV1.ownerOf(tokenId) == msg.sender, "Caller is not owner");
        ILootByRogueV2.AdventureRecord memory results = adventure(inputData);
        lootV1.safeTransferFrom(msg.sender, address(this), tokenId);
        loot.safeMint(msg.sender, results);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
