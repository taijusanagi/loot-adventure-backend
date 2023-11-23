// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
// import {AccessControlEnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";

contract Launchpad {
    uint256 public constant SIZE = 64;
    uint8 public constant MAX_RELIC = 16;

    struct Temporary {
        uint8 x;
        uint8 y;
        uint8 rerollCount;
        uint8 item1;
        uint8 item2;
        uint8 relicCount;
        uint16 defenceBuffTurn;
        uint16 exit;
    }

    mapping (address => Temporary) private playingRecord;
    mapping (address => address) private tempEoaList;

    // --------------------------------------------------
    // Initialize
    // --------------------------------------------------
    constructor(){

    }

    // --------------------------------------------------
    // Modifier
    // --------------------------------------------------

    // --------------------------------------------------
    // Getter
    // --------------------------------------------------
    function getRecord() public view returns (Temporary memory) {
        return playingRecord[msg.sender];
    }

    // --------------------------------------------------
    // Setter
    // --------------------------------------------------
    function initTemporary() internal pure returns (Temporary memory) {
        return Temporary({
            x: uint8(SIZE / 2),
            y: uint8(SIZE / 2),
            rerollCount: 0,
            item1: 0,
            item2: 0,
            relicCount: 0,
            defenceBuffTurn: 0,
            exit: 0
        });
    }

    function initRecord(address tempEoa_) public {
        // トークン支払いとか入れるか？（Bot対策は入れたい）
        Temporary memory _temporary = initTemporary();
        tempEoaList[msg.sender] = tempEoa_;
        playingRecord[msg.sender] = _temporary;
    }

    function updateRecord(uint8 x_, uint8 y_) public {
        Temporary memory _temporary = initTemporary();
        _temporary.x = x_;
        _temporary.y = y_;
        playingRecord[msg.sender] = _temporary;
    }
}