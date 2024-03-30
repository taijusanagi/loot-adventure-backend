// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ISoulControler {
    function getEquipmentNftAddress() external view returns(address);
    function getArtifactNftAddress() external view returns(address);
    function getJobNftAddress() external view returns(address);
    function getCalcContract(address nft_) external view returns(address);
    function setEquipmentNftAddress(address nft_) external;
    function setArtifactNftAddress(address nft_) external;
    function setJobNftAddress(address nft_) external;
    function setCalcContract(address nft_, address calc_) external;

    function attachEquip(address eoa_,uint256 tokenId_,address tba_) external;
    function attachEquipInit(uint256 tokenId_,address tba_, uint256 type_) external;
    function attachEquips(address eoa_,uint256[] memory tokenIds_,address tba_) external;
    function attachEquipsInit(uint256[] memory tokenIds_,address tba_, uint256[] memory types_) external;
}