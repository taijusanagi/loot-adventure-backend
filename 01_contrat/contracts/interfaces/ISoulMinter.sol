// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ISoulMinter {
    function getSoulNftAddress() external view returns(address);
    function getArmourNftAddress() external view returns(address);
    function getItemNftAddress() external view returns(address);
    function getJobNftAddress() external view returns(address);
    function getCalcContract(address nft_) external view returns(address);

    function setSoulNftAddress(address nft_) external;
    function setArmourNftAddress(address nft_) external;
    function setItemNftAddress(address nft_) external;
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