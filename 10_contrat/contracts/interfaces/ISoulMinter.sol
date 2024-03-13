// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ISoulMinter {
    function getEquipmentNftAddress() external view returns(address);
    function getArtifactNftAddress() external view returns(address);
    function getJobNftAddress() external view returns(address);
    function getCalcContract(address nft_) external view returns(address);

    function setEquipmentNftAddress(address nft_) external;
    function setArtifactNftAddress(address nft_) external;
    function setJobNftAddress(address nft_) external;
    function setCalcContract(address nft_, address calc_) external;

    function mintSoul(
        address nft_, 
        uint256 tokenId_,
        address owner_,
        address recipient_,
        bytes memory seedData_
    ) external;
}