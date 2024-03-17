/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  SoulMinter,
  SoulMinterInterface,
} from "../../contracts/SoulMinter";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEVELOPER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getArtifactNft",
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
    name: "getEquipmentNft",
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
    name: "getJobNft",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSoulLoot",
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
    name: "getXp",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient_",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "seedData_",
        type: "bytes",
      },
    ],
    name: "mintSoul",
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
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
    ],
    name: "nftOwner",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "granted_",
        type: "address",
      },
    ],
    name: "setAdminRole",
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
    name: "setArtifactNft",
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
        name: "granted_",
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
        name: "nft_",
        type: "address",
      },
    ],
    name: "setEquipmentNft",
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
    name: "setJobNft",
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
    name: "setSoulLoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "ft_",
        type: "address",
      },
    ],
    name: "setXp",
    outputs: [],
    stateMutability: "nonpayable",
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
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608034620005985760808101906001600160401b0380831182841017620005825760409283526200002f6200059d565b9160078352602092662bb0b93934b7b960c91b848201528152620000526200059d565b600881526723bab0b93234b0b760c11b8482015283820152620000746200059d565b916005928381526421b637bbb760d91b8582015285830152620000966200059d565b916004928381526354616e6b60e01b86820152606082015260016000915b8483106200045f5750505084516101408101818110838211176200044a578694929452620000e16200059d565b60018152606160f81b868201528152620000fa6200059d565b60018152603160f91b8682015285820152620001156200059d565b60018152606360f81b8682015286820152620001306200059d565b60018152601960fa1b8682015260608201526200014c6200059d565b60018152606560f81b868201526080820152620001686200059d565b60018152603360f91b8682015260a0820152620001846200059d565b60018152606760f81b8682015260c0820152620001a06200059d565b60018152600d60fb1b8682015260e0820152620001bc6200059d565b60018152606960f81b86820152610100820152620001d96200059d565b60018152603560f91b8682015261012082015292816000945b600a8610620003135787877fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c2177580600052600082528260002033600052825260ff83600020541615620002d3575b507f4504b9dfd7400a1522f49a8b4a100552da9236849581fd59b7363eb48c6a474c9081600052600081528260002033600052815260ff8360002054161562000292575b82516117449081620006148239f35b81600052600081528260002090336000525281600020600160ff198254161790553390339060008051602062001d58833981519152600080a4818062000283565b80600052600082528260002033600052825282600020600160ff198254161790553390339060008051602062001d58833981519152600080a4826200023f565b805180519084821162000435579088916200032f8754620005bd565b90601f91828111620003fa575b508391831160011462000388579180600195928695946000926200037c575b5050600019600383901b1c191690841b1787555b01940195019492620001f2565b0151905038806200035b565b939190601f1982169088600052846000209160005b818110620003e1575091839160019788979695889510620003c7575b505050811b0187556200036f565b015160001960f88460031b161c19169055388080620003b9565b8783015184558d9660019094019392830192016200039d565b62000424908960005285600020848087018a1c8201928888106200042b575b01891c0190620005fa565b386200033c565b9250819262000419565b604187634e487b7160e01b6000525260246000fd5b604184634e487b7160e01b6000525260246000fd5b805180519085821162000435579088916200047b8554620005bd565b90601f9182811162000546575b5083918311600114620004d457918060019592869594600092620004c8575b5050600019600383901b1c191690841b1785555b01920192019190620000b4565b015190503880620004a7565b939190601f1982169086600052846000209160005b8181106200052d57509183916001978897969588951062000513575b505050811b018555620004bb565b015160001960f88460031b161c1916905538808062000505565b8783015184558d966001909401939283019201620004e9565b62000571908760005285600020848d818801901c82019288881062000578575b018d1c0190620005fa565b3862000488565b9250819262000566565b634e487b7160e01b600052604160045260246000fd5b600080fd5b60408051919082016001600160401b038111838210176200058257604052565b90600182811c92168015620005ef575b6020831014620005d957565b634e487b7160e01b600052602260045260246000fd5b91607f1691620005cd565b81811062000606575050565b60008155600101620005fa56fe608080604052600436101561001357600080fd5b60003560e01c90816301ffc9a714610f63575080630d6037ea14610f205780631df97de014610ec5578063205581f014610e40578063248a9ca314610e115780632f2ff15d14610d5e57806336568abe14610ccc5780633f023ef81461071f5780634adc7cfd146104a45780634db9706c1461047b5780635e8dc9b114610452578063610d59691461040f57806373ebd3ae146103e657806375b238fc146103ab5780638b34b3d7146103825780639103a0e01461034757806391d14854146102fa578063945ff5eb146102b757806394d3818614610274578063a217fddf14610258578063b603c7d01461021f578063b7314645146101e4578063d547741f146101a3578063dcb285f81461017a5763fcaa4f0b1461013257600080fd5b346101755760203660031901126101755761014b610fb6565b610153611083565b601280546001600160a01b0319166001600160a01b0392909216919091179055005b600080fd5b34610175576000366003190112610175576010546040516001600160a01b039091168152602090f35b34610175576040366003190112610175576101e26004356101c2610fcc565b908060005260006020526101dd600160406000200154611271565b6113c3565b005b346101755760203660031901126101755760206001600160a01b0380610208610fb6565b166000526014825260406000205416604051908152f35b3461017557604036600319011261017557602061024661023d610fb6565b60243590611692565b6040516001600160a01b039091168152f35b3461017557600036600319011261017557602060405160008152f35b346101755760203660031901126101755761028d610fb6565b610295611083565b601380546001600160a01b0319166001600160a01b0392909216919091179055005b34610175576020366003190112610175576102d0610fb6565b6102d8611083565b600f80546001600160a01b0319166001600160a01b0392909216919091179055005b3461017557604036600319011261017557610313610fcc565b600435600052600060205260406000209060018060a01b0316600052602052602060ff604060002054166040519015158152f35b346101755760003660031901126101755760206040517f4504b9dfd7400a1522f49a8b4a100552da9236849581fd59b7363eb48c6a474c8152f35b34610175576000366003190112610175576011546040516001600160a01b039091168152602090f35b346101755760003660031901126101755760206040517fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c217758152f35b34610175576000366003190112610175576012546040516001600160a01b039091168152602090f35b3461017557602036600319011261017557610428610fb6565b610430611083565b601080546001600160a01b0319166001600160a01b0392909216919091179055005b34610175576000366003190112610175576013546040516001600160a01b039091168152602090f35b3461017557600036600319011261017557600f546040516001600160a01b039091168152602090f35b3461017557602080600319360112610175576104be610fb6565b7fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775918260005260008152604060002033600052815260ff604060002054161561057857600083815280825260408082206001600160a01b0390941680835293835290205460ff161561052c57005b826000526000815260406000209082600052526040600020600160ff1982541617905533917f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d600080a4005b905061058333611448565b9160405161059081611029565b604281528281019160603684378151156107095760308353815160019081101561070957607860218401536041905b8082116106af57505061066c57610638936106479260489260405196879376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8886015261060f815180928a60378901910161137b565b8401917001034b99036b4b9b9b4b733903937b6329607d1b60378401525180938684019061137b565b01036028810185520183611045565b61066860405192839262461bcd60e51b84526004840152602483019061139e565b0390fd5b6064836040519062461bcd60e51b825280600483015260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b9091600f81166010811015610709576f181899199a1a9b1b9c1cb0b131b232b360811b901a6106de8486611437565b5360041c9180156106f35760001901906105bf565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b346101755760a036600319011261017557610738610fb6565b6044356001600160a01b0381169081900361017557606435906001600160a01b0382168203610175576084359067ffffffffffffffff8211610175573660238301121561017557816004013561078d81611067565b9261079b6040519485611045565b8184523660248383010111610175578160009260246020930183870137840101526001600160a01b036107d060243586611692565b1603610c95576010546001600160a01b03848116600090815260146020526040808220549051635bb5e70160e01b815293831692849116818061081a886024358c6004850161159d565b03915afa8015610a195760008092600094600093610b72575b5060005b60088110610aaf576012546001600160a01b03808b166000908152601460205260409081902054815163097a80fd60e21b81528d948d94908116938d939091839116818061088c876024358c6004850161159d565b03915afa8015610a1957600091600091610a76575b50600481101561070957833b156101755760405163d70aa72f60e01b81526001600160a01b0386811660048301528716602480830191909152356044820152606481019290925260c06084830152909260009184919082908490829061090d60c48301600183016115d5565b9060a483015203925af1918215610a195761097492610a67575b506011546001600160a01b038581166000908152601460205260409081902054905163cf293e0f60e01b815294928216936060938693929092169183918291906024358b6004850161159d565b03915afa938415610a1957600092600090600096610a25575b50600a81101561070957823b1561017557600094859160405197889687958694638308f32f60e01b865260018060a01b0316600486015260018060a01b031660248501526024356044850152606484015260e060848401526109f560e48401836005016115d5565b9160a484015260c483015203925af18015610a1957610a1057005b6101e290610fe2565b6040513d6000823e3d90fd5b93505093506060823d8211610a5f575b81610a4260609383611045565b81010312610175578151936040602084015193015194928661098d565b3d9150610a35565b610a7090610fe2565b84610927565b9150506040813d604011610aa7575b81610a9260409383611045565b810103126101755760208151910151866108a1565b3d9150610a85565b610ab981876115c4565b51610ac482876115c4565b51610acf83876115c4565b5190843b156101755760405163144d982960e11b81526001600160a01b03808d1660048301528d166024808301919091523560448201526064810187905261010060848201529260009284928392909190610b2f9061010485019061139e565b9160a48401528660c484015260e4830152038183875af18015610a1957610b63575b5060001981146106f357600101610837565b610b6c90610fe2565b89610b51565b9450925050503d90816000843e610b898284611045565b61024083838101031261017557825192610ba883820160208301611557565b906101208101519367ffffffffffffffff851161017557808201601f8684010112156101755760405194610bdb8661100c565b8590828401610100828601011161017557808401915b610100828601018310610c1d5750505090610140610c129282019101611557565b939092939188610833565b82519067ffffffffffffffff821161017557848601601f83858901010112156101755781838701015190610c5082611067565b610c5d6040519182611045565b82815286880160208486888c010101011161017557610c8a6020949385948580850191898d01010161137b565b815201920191610bf1565b60405162461bcd60e51b815260206004820152600f60248201526e2737ba103a37b5b2b71037bbb732b960891b6044820152606490fd5b3461017557604036600319011261017557610ce5610fcc565b336001600160a01b03821603610d01576101e2906004356113c3565b60405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608490fd5b3461017557604036600319011261017557600435610d7a610fcc565b816000526000602052610d94600160406000200154611271565b81600052600060205260406000209060018060a01b0316908160005260205260ff6040600020541615610dc357005b8160005260006020526040600020816000526020526040600020600160ff1982541617905533917f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d600080a4005b346101755760203660031901126101755760043560005260006020526020600160406000200154604051908152f35b3461017557602036600319011261017557610e59610fb6565b610e61611083565b6001600160a01b031660008181527fcf0e2fee954c1b210b650a2cee16f85c2d817015d3803a8d10b7d7ece2d5321260205260409020547f4504b9dfd7400a1522f49a8b4a100552da9236849581fd59b7363eb48c6a474c919060ff1615610dc357005b3461017557604036600319011261017557610ede610fb6565b610ee6610fcc565b90610eef611083565b6001600160a01b03908116600090815260146020526040902080546001600160a01b03191692909116919091179055005b3461017557602036600319011261017557610f39610fb6565b610f41611083565b601180546001600160a01b0319166001600160a01b0392909216919091179055005b34610175576020366003190112610175576004359063ffffffff60e01b821680920361017557602091637965db0b60e01b8114908115610fa5575b5015158152f35b6301ffc9a760e01b14905083610f9e565b600435906001600160a01b038216820361017557565b602435906001600160a01b038216820361017557565b67ffffffffffffffff8111610ff657604052565b634e487b7160e01b600052604160045260246000fd5b610100810190811067ffffffffffffffff821117610ff657604052565b6080810190811067ffffffffffffffff821117610ff657604052565b90601f8019910116810190811067ffffffffffffffff821117610ff657604052565b67ffffffffffffffff8111610ff657601f01601f191660200190565b3360009081527fcf0e2fee954c1b210b650a2cee16f85c2d817015d3803a8d10b7d7ece2d53212602090815260408083205490927f4504b9dfd7400a1522f49a8b4a100552da9236849581fd59b7363eb48c6a474c9160ff16156110e75750505050565b6110f033611448565b918451906110fd82611029565b6042825284820192606036853782511561125d576030845382519060019182101561125d5790607860218501536041915b8183116111ef575050506111ad57604861066893869361119193611182985198899376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8a86015261060f815180928c60378901910161137b565b01036028810187520185611045565b5192839262461bcd60e51b84526004840152602483019061139e565b60648486519062461bcd60e51b825280600483015260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b909192600f81166010811015611249576f181899199a1a9b1b9c1cb0b131b232b360811b901a61121f8587611437565b5360041c9280156112355760001901919061112e565b634e487b7160e01b82526011600452602482fd5b634e487b7160e01b83526032600452602483fd5b634e487b7160e01b81526032600452602490fd5b600090808252602090828252604092838120338252835260ff84822054161561129a5750505050565b6112a333611448565b918451906112b082611029565b6042825284820192606036853782511561125d576030845382519060019182101561125d5790607860218501536041915b818311611335575050506111ad57604861066893869361119193611182985198899376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8a86015261060f815180928c60378901910161137b565b909192600f81166010811015611249576f181899199a1a9b1b9c1cb0b131b232b360811b901a6113658587611437565b5360041c928015611235576000190191906112e1565b60005b83811061138e5750506000910152565b818101518382015260200161137e565b906020916113b78151809281855285808601910161137b565b601f01601f1916010190565b9060009180835282602052604083209160018060a01b03169182845260205260ff6040842054166113f357505050565b80835282602052604083208284526020526040832060ff1981541690557ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b339380a4565b908151811015610709570160200190565b604051906060820182811067ffffffffffffffff821117610ff657604052602a82526020820160403682378251156107095760309053815160019081101561070957607860218401536029905b8082116114e95750506114a55790565b606460405162461bcd60e51b815260206004820152602060248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b9091600f81166010811015611542576f181899199a1a9b1b9c1cb0b131b232b360811b901a6115188486611437565b5360041c91801561152d576000190190611495565b60246000634e487b7160e01b81526011600452fd5b60246000634e487b7160e01b81526032600452fd5b9080601f8301121561017557604051916115708361100c565b8290610100810192831161017557905b82821061158d5750505090565b8151815260209182019101611580565b6115c1939260609260018060a01b031682526020820152816040820152019061139e565b90565b9060088110156107095760051b0190565b80546000939260018083169383821c938515611688575b6020958686108114611672578585529081156116535750600114611612575b5050505050565b90939495506000929192528360002092846000945b83861061163f5750505050010190388080808061160b565b805485870183015294019385908201611627565b60ff19168685015250505090151560051b01019150388080808061160b565b634e487b7160e01b600052602260045260246000fd5b93607f16936115ec565b90604051906331a9108f60e11b8252600482015260208160248160018060a01b038096165afa908115610a19576000916116cd575b50905090565b6020813d8211611706575b816116e560209383611045565b81010312611702575191821682036116ff575080386116c7565b80fd5b5080fd5b3d91506116d856fea26469706673582212204547b76315de0059a7b4619da6feacf008b12b12cc4839ef2dbf658f7bbed97764736f6c634300081300332f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d";

type SoulMinterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SoulMinterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SoulMinter__factory extends ContractFactory {
  constructor(...args: SoulMinterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SoulMinter> {
    return super.deploy(overrides || {}) as Promise<SoulMinter>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SoulMinter {
    return super.attach(address) as SoulMinter;
  }
  override connect(signer: Signer): SoulMinter__factory {
    return super.connect(signer) as SoulMinter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SoulMinterInterface {
    return new utils.Interface(_abi) as SoulMinterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SoulMinter {
    return new Contract(address, _abi, signerOrProvider) as SoulMinter;
  }
}
