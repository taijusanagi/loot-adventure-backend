// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IArtifactNft {
    struct Artifact {
        uint256 seed;
        uint256 artifactType;
        string name;
        uint256 rarity;
        address rAddress;
        uint256 rTokenId;
    }

    //Setter
    function setBaseMetadataURI(string memory, string memory) external;
    function setMinterRole(address) external;
    function setDeveloperRole(address) external;
    function setNftId(address) external;
    function setOnGame (address) external;

    function mint(
        address to_,
        address nft_,
        uint256 tokenId_, 
        uint256 seed_,
        string memory name_,
        uint256 type_,
        uint256 rarity_
    ) external;
}
