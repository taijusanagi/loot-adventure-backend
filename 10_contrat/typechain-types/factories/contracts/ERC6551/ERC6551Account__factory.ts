/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ERC6551Account,
  ERC6551AccountInterface,
} from "../../../contracts/erc6551/ERC6551Account";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_size",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_start",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_end",
        type: "uint256",
      },
    ],
    name: "InvalidCodeAtRange",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "executeCall",
    outputs: [
      {
        internalType: "bytes",
        name: "result",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "isValidSignature",
    outputs: [
      {
        internalType: "bytes4",
        name: "magicValue",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60808060405234610016576109d9908161001c8239f35b600080fdfe6080604052600436101561001b575b361561001957600080fd5b005b6000803560e01c90816301ffc9a7146100ae57508063150b7a02146100a95780631626ba7e146100a45780638da5cb5b1461009f5780639e5d4c491461009a578063affed0e014610095578063bc197c8114610090578063f23a6e611461008b5763fc0c546a0361000e57610545565b6104ea565b61045a565b61040b565b610334565b6102b3565b61021b565b61014b565b34610104576020366003190112610104576004359063ffffffff60e01b821680920361010457506301ffc9a760e01b81149081156100f3575b50151560805260206080f35b630801407360e31b149050816100e7565b80fd5b6001600160a01b0381160361011857565b600080fd5b9181601f840112156101185782359167ffffffffffffffff8311610118576020838186019501011161011857565b3461011857608036600319011261011857610167600435610107565b610172602435610107565b60643567ffffffffffffffff81116101185761019290369060040161011d565b5050604051630a85bd0160e11b8152602090f35b634e487b7160e01b600052604160045260246000fd5b6020810190811067ffffffffffffffff8211176101d857604052565b6101a6565b90601f8019910116810190811067ffffffffffffffff8211176101d857604052565b67ffffffffffffffff81116101d857601f01601f191660200190565b346101185760403660031901126101185760243567ffffffffffffffff8111610118573660238201121561011857806004013590610258826101ff565b61026560405191826101dd565b82815236602484840101116101185760006020846102af95602461029496018386013783010152600435610744565b6040516001600160e01b031990911681529081906020820190565b0390f35b346101185760003660031901126101185760206102ce610673565b6040516001600160a01b039091168152f35b919082519283825260005b84811061030c575050826000602080949584010152601f8019910116010190565b6020818301810151848301820152016102eb565b9060206103319281815201906102e0565b90565b60603660031901126101185760043561034c81610107565b60443567ffffffffffffffff81116101185761036c90369060040161011d565b916001600160a01b0361037d610673565b1633036103d4576000928392610398604051809381936105b8565b0391602435905af16103a86105d9565b90156103cc576102af906103bd60005461061f565b60005560405191829182610320565b602081519101fd5b60405162461bcd60e51b815260206004820152600f60248201526e2737ba103a37b5b2b71037bbb732b960891b6044820152606490fd5b34610118576000366003190112610118576020600054604051908152f35b9181601f840112156101185782359167ffffffffffffffff8311610118576020808501948460051b01011161011857565b346101185760a036600319011261011857610476600435610107565b610481602435610107565b67ffffffffffffffff604435818111610118576104a2903690600401610429565b5050606435818111610118576104bc903690600401610429565b5050608435908111610118576104d690369060040161011d565b505060405163bc197c8160e01b8152602090f35b346101185760a036600319011261011857610506600435610107565b610511602435610107565b60843567ffffffffffffffff81116101185761053190369060040161011d565b505060405163f23a6e6160e01b8152602090f35b3461011857600036600319011261011857303b605f198101908082116105b35761056f9130610903565b6060818051810103126101185760208101516040820151606092839061059483610107565b0151604080519384526001600160a01b03909216602084015290820152f35b610609565b908092918237016000815290565b604051906105d3826101bc565b60008252565b3d15610604573d906105ea826101ff565b916105f860405193846101dd565b82523d6000602084013e565b606090565b634e487b7160e01b600052601160045260246000fd5b60001981146105b35760010190565b90816060910312610118578051916040602083015161064c81610107565b92015190565b6040513d6000823e3d90fd5b90816020910312610118575161033181610107565b604051637e062a3560e11b8152606081600481305afa90811561070657600080918193610712575b50460361070b576040516331a9108f60e11b81526004810192909252602090829060249082906001600160a01b03165afa908115610706576000916106de575090565b610331915060203d81116106ff575b6106f781836101dd565b81019061065e565b503d6106ed565b610652565b5050600090565b915050610736915060603d811161073d575b61072e81836101dd565b81019061062e565b913861069b565b503d610724565b61074c610673565b6107568383610849565b60058195929510156108335715938461081d575b508315610789575b50505061077e57600090565b630b135d3f60e11b90565b60009293509082916040516107d0816107c26020820194630b135d3f60e11b998a875260248401526040604484015260648301906102e0565b03601f1981018352826101dd565b51915afa906107dd6105d9565b8261080f575b826107f3575b5050388080610772565b90915060208180518101031261011857602001511438806107e9565b9150602082511015916107e3565b6001600160a01b0383811691161493503861076a565b634e487b7160e01b600052602160045260246000fd5b90604181511460001461087757610873916020820151906060604084015193015160001a90610881565b9091565b5050600090600290565b9291907f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083116108f75791608094939160ff602094604051948552168484015260408301526060820152600093849182805260015afa156107065781516001600160a01b038116156108f1579190565b50600190565b50505050600090600390565b9291833b90811561098b5781831161097e57828110610954578280910391039080821060001461094c5750905b60405193601f19603f840116850160405282855260208501903c565b905090610930565b60405163162544fd60e11b8152600481019290925260248201929092526044810191909152606490fd5b50505090506103316105c6565b505050905060405161099c816101bc565b600081529056fea26469706673582212202d7c63f3d33c6a9c708b837ec7652af83f1674fdd96c133310e62e8eb198e12c64736f6c63430008130033";

type ERC6551AccountConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC6551AccountConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC6551Account__factory extends ContractFactory {
  constructor(...args: ERC6551AccountConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC6551Account> {
    return super.deploy(overrides || {}) as Promise<ERC6551Account>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC6551Account {
    return super.attach(address) as ERC6551Account;
  }
  override connect(signer: Signer): ERC6551Account__factory {
    return super.connect(signer) as ERC6551Account__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC6551AccountInterface {
    return new utils.Interface(_abi) as ERC6551AccountInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC6551Account {
    return new Contract(address, _abi, signerOrProvider) as ERC6551Account;
  }
}