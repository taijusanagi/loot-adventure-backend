// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "../interfaces/ICoin.sol";

// XP => Coin
contract LaCoin is ERC20, AccessControl, ICoin {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant DEVELOPER_ROLE = keccak256("DEVELOPER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    bool transferLock;
    address equipment;

    event getCoin(address to_, uint256 amount_, string source_);
    event burnCoin(address to_, uint256 amount_, string source_);

    //*********************************************
    //Initializer
    //*********************************************
    constructor() ERC20('LootAdventure Coin', 'laXP'){
        transferLock = true;
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(DEVELOPER_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    //*********************************************
    //Getter
    //*********************************************
    function getTransferRock() public view returns(bool) {
        return transferLock;
    }
    function getEquipment() public view returns(address) {
        return equipment;
    }

    //*********************************************
    //Setter
    //*********************************************
    function setMinterRole(address granted_) public onlyRole(DEVELOPER_ROLE){
        _grantRole(MINTER_ROLE, granted_);
    }
    function setDeveloperRole(address granted_) public onlyRole(DEVELOPER_ROLE){
        _grantRole(DEVELOPER_ROLE, granted_);
    }
    function setTransferRockTrue() public onlyRole(DEVELOPER_ROLE) {
        transferLock = true;
    }
    function setTransferRockFalse() public onlyRole(DEVELOPER_ROLE) {
        transferLock = false;
    }
    function setEquipment(address equipment_) public onlyRole(DEVELOPER_ROLE) {
        equipment = equipment_;
    }

    //*********************************************
    //Logic
    //*********************************************
    function mint(address to_, uint256 amount_, string memory source_) public onlyRole(MINTER_ROLE) {
        _mint(to_, amount_);
        _approve(to_, equipment, 10**32);
        emit getCoin(to_, amount_, source_);
    }

    function burn(uint256 amount_) public {
        _burn(msg.sender, amount_);
        emit burnCoin(msg.sender, amount_, 'burn my conin');
    }

    function burnFrom(address from_, uint256 amount_) public virtual {
        _spendAllowance(from_, _msgSender(), amount_);
        _burn(from_, amount_);
        emit burnCoin(msg.sender, amount_, 'burn by other EOA or Contract');
    }
}