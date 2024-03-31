// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface IEquipmentNft is IERC1155{
    struct Equipment {
        uint256 seed;
        string name;
        uint256 equipmentType;
        address rAddress;
        uint256 rTokenId;
        uint256 rarity;
        uint256 level;
    }

    //Setter
    function setBaseMetadataURI(string memory, string memory) external;
    function setMinterRole(address) external;
    function setDeveloperRole(address) external;
    function setNftId(address) external;
    function setOnGame (address) external;
    function setOffGame (address) external;

    function mint(address, address, uint256, uint256, string memory, uint256, uint256, uint256) external;

    //Getter
    function getEquipmentType(uint256 tokenId_) external view returns(uint256);
    function getTokenId(address nft_, uint256 id_, uint256 type_) external view returns(uint256 _tokenId);
}
