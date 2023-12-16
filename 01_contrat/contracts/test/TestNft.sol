// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestNft is ERC721 {
  constructor() ERC721("TestNft", "TNFT") {}

  function _baseURI() internal pure override returns (string memory) {
    return "https://cats.wagumi.xyz/metadata/";
  }

  function safeMint(address to, uint256 tokenId) public {
    _safeMint(to, tokenId);
  }
}