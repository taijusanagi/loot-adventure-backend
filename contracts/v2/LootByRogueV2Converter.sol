// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./RogueV2.sol";

interface ILootByRogue is IERC721 {
    function getSeed(uint256 tokenId) external view returns (uint256);
    function getTurn(uint256 tokenId) external view returns (uint16);
}

contract LootByRogueV2Converter is RogueV2, Pausable, Ownable, IERC721Receiver {
    ILootByRogue public lootV1;

    constructor(address _lootV2, address _lootV1) RogueV2(_lootV2) {
        lootV1 = ILootByRogue(_lootV1);
    }

    function convert(ILootByRogueV2.InputData calldata inputData, uint256 tokenId) external whenNotPaused {
        require(inputData.directions.length == inputData.useItems.length, "Lengths do not match");
        require(lootV1.ownerOf(tokenId) == msg.sender, "Caller is not owner");
        require(lootV1.isApprovedForAll(msg.sender, address(this)), "Caller is not approved");
        require(lootV1.getSeed(tokenId) == inputData.seed, "Invalid seed");
        ILootByRogueV2.AdventureRecord memory results = adventure(inputData);
        require(lootV1.getTurn(tokenId) == results.turn, "Invalid turn");

        lootV1.safeTransferFrom(msg.sender, address(this), tokenId);
        loot.convert(msg.sender, results, tokenId);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external pure returns (bytes4) {
        return this.onERC721Received.selector; 
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
