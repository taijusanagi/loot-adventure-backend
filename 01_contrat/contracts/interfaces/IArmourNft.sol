// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IArmourNft {
    struct Armour {
        uint256 seed;
        string name;
        uint256 armourType;
        address rAddress;
        uint256 rTokenId;
    }

    //Setter
    function setBaseMetadataURI(string memory, string memory) external;
    function setMinterRole(address) external;
    function setDeveloperRole(address) external;
    function setNftId(address) external;

    function mint(address, address, uint256, uint256, string memory, uint256) external;
}
