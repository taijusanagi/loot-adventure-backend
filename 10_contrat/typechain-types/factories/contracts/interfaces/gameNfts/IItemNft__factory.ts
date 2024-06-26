/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IItemNft,
  IItemNftInterface,
} from "../../../../contracts/interfaces/gameNfts/IItemNft";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        internalType: "address",
        name: "nft_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "seed_",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "type_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rarity_",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "setBaseMetadataURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "setDeveloperRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "setMinterRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "setNftId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "setOnGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IItemNft__factory {
  static readonly abi = _abi;
  static createInterface(): IItemNftInterface {
    return new utils.Interface(_abi) as IItemNftInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IItemNft {
    return new Contract(address, _abi, signerOrProvider) as IItemNft;
  }
}
