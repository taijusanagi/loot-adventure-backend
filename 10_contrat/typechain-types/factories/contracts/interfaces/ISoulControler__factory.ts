/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ISoulControler,
  ISoulControlerInterface,
} from "../../../contracts/interfaces/ISoulControler";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "eoa_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tba_",
        type: "address",
      },
    ],
    name: "attachEquip",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tba_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "type_",
        type: "uint256",
      },
    ],
    name: "attachEquipInit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "eoa_",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "tokenIds_",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "tba_",
        type: "address",
      },
    ],
    name: "attachEquips",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds_",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "tba_",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "types_",
        type: "uint256[]",
      },
    ],
    name: "attachEquipsInit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getArtifactNftAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nft_",
        type: "address",
      },
    ],
    name: "getCalcContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEquipmentNftAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getJobNftAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nft_",
        type: "address",
      },
    ],
    name: "setArtifactNftAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nft_",
        type: "address",
      },
      {
        internalType: "address",
        name: "calc_",
        type: "address",
      },
    ],
    name: "setCalcContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nft_",
        type: "address",
      },
    ],
    name: "setEquipmentNftAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nft_",
        type: "address",
      },
    ],
    name: "setJobNftAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ISoulControler__factory {
  static readonly abi = _abi;
  static createInterface(): ISoulControlerInterface {
    return new utils.Interface(_abi) as ISoulControlerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISoulControler {
    return new Contract(address, _abi, signerOrProvider) as ISoulControler;
  }
}
