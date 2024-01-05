// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "../interfaces/IERC6551Registry.sol";
import "../interfaces/ISoulMinter.sol";

contract ERC6551Registry is IERC6551Registry, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");
    
    address private _implementation;
    address private _soulMinter;
    
    error InitializationFailed();

    //*********************************************
    //Initializer
    //*********************************************
    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(DEVELOPER_ROLE, msg.sender);
    }

    //*********************************************
    //Getter
    //*********************************************
    function getImplementation() public view returns(address){
        return _implementation;    
    }

    function getSoulMinter() public view returns(address){
        return _soulMinter;    
    }

    //*********************************************
    //Setter
    //*********************************************
    function setAdminRole(address granted_) public onlyRole(ADMIN_ROLE){
        _grantRole(ADMIN_ROLE, granted_);
    }

    function setDeveloperRole(address granted_) public onlyRole(DEVELOPER_ROLE){
        _grantRole(DEVELOPER_ROLE, granted_);
    }

    function setImplementation(address contract_) public onlyRole(DEVELOPER_ROLE){
        _implementation = contract_;
    }

    function setSoulMinter(address contract_) public onlyRole(DEVELOPER_ROLE){
        _soulMinter = contract_;
    }

    //*********************************************
    //Logic
    //*********************************************
    function createAccount(
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 salt,
        bytes calldata initData
    ) public returns (address) {
        bytes memory code = _creationCode(
            implementation,
            chainId,
            tokenContract,
            tokenId,
            salt
        );

        address _account = Create2.computeAddress(
            bytes32(salt),
            keccak256(code)
        );

        _account = Create2.deploy(0, bytes32(salt), code);

        emit AccountCreated(
            _account,
            implementation,
            chainId,
            tokenContract,
            tokenId,
            salt
        );
        // if (initData.length != 0) {
        //     (bool success, ) = _account.call(initData);
        //     if (!success) revert InitializationFailed();
        // }
        return _account;
    }

    function createSoul(
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 salt,
        bytes calldata initData
    ) public {
        createAccount(
            _implementation,
            chainId,
            tokenContract,
            tokenId,
            salt,
            initData
        );
    }

    function executeMint(
        uint256 chainId_,
        address tokenContract_,
        uint256 tokenId_,
        uint256 salt_,
        bytes memory seedData_
    ) public {
        address _tba = account(
            _implementation, 
            chainId_, 
            tokenContract_, 
            tokenId_, 
            salt_
        );
        ISoulMinter _minter = ISoulMinter(_soulMinter);
        _minter.mintSoul(
            tokenContract_,
            tokenId_, 
            msg.sender,
            _tba, 
            seedData_
        );
    }
    
    function account(
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 salt
    ) public view returns (address) {
        bytes32 bytecodeHash = keccak256(
            _creationCode(implementation, chainId, tokenContract, tokenId, salt)
        );

        return Create2.computeAddress(bytes32(salt), bytecodeHash);
    }

    function _creationCode(
        address implementation_,
        uint256 chainId_,
        address tokenContract_,
        uint256 tokenId_,
        uint256 salt_
    ) internal pure returns (bytes memory) {
        return
            abi.encodePacked(
                hex"3d60ad80600a3d3981f3363d3d373d3d3d363d73",
                implementation_,
                hex"5af43d82803e903d91602b57fd5bf3",
                abi.encode(salt_, chainId_, tokenContract_, tokenId_)
            );
    }
}