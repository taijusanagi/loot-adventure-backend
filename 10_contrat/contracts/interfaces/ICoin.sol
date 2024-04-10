// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ICoin is IERC20 {
    function setMinterRole(address granted_)external;
    function setDeveloperRole(address granted_)external;
    function setTransferRockTrue()external;
    function setTransferRockFalse()external;

    function mint(address to_, uint256 amount_, string memory source_) external;
    function burn(address from_, uint256 amount_, string memory source_) external;
}