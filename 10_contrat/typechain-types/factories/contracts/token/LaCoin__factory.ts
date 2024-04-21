/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { LaCoin, LaCoinInterface } from "../../../contracts/token/LaCoin";

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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "source_",
        type: "string",
      },
    ],
    name: "burnCoin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "source_",
        type: "string",
      },
    ],
    name: "getCoin",
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
    name: "MINTER_ROLE",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEquipment",
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
    name: "getTransferRock",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount_",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "source_",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
    name: "setDeveloperRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "equipment_",
        type: "address",
      },
    ],
    name: "setEquipment",
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
    name: "setMinterRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setTransferRockFalse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setTransferRockTrue",
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
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608034620004cf576001600160401b039060409080820183811182821017620004b957825260128152602090712637b7ba20b23b32b73a3ab9329021b7b4b760711b8282015282519383850185811082821117620004b95784526004908186526306c6158560e41b848701528251818111620004a4576003908154906001958683811c9316801562000499575b8884101462000484578190601f938481116200042e575b508890848311600114620003c757600092620003bb575b505060001982851b1c191690861b1782555b8751928311620003a65783548581811c911680156200039b575b8782101462000386578181116200033b575b5085908311600114620002cf57829394959697600093620002c3575b505082851b92600019911b1c19161790555b60ff1990808260065416176006557f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a692836000526005938482528560002033600052825260ff8660002054161562000287575b507f4504b9dfd7400a1522f49a8b4a100552da9236849581fd59b7363eb48c6a474c806000528482528560002033600052825260ff866000205416156200024b575b507fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c2177593846000528082528560002033600052825260ff866000205416156200020d575b85516119c49081620004d58239f35b8460005281528460002090336000525283600020918254161790553390339060008051602062001e99833981519152600080a43880808080620001fe565b80600052848252856000203360005282528560002083858254161790553390339060008051602062001e99833981519152600080a438620001bb565b80600052848252856000203360005282528560002083858254161790553390339060008051602062001e99833981519152600080a43862000179565b01519150388062000114565b90601f1983169184600052866000209260005b81811062000325575098848798999a979697106200030a575b50505050811b01905562000126565b01519060f884600019921b161c1916905538808080620002fb565b8a830151855593870193918801918801620002e2565b84600052866000208280860160051c8201928987106200037c575b0160051c019086905b8281106200036f575050620000f8565b600081550186906200035f565b9250819262000356565b602285634e487b7160e01b6000525260246000fd5b90607f1690620000e6565b604184634e487b7160e01b6000525260246000fd5b015190503880620000ba565b90889350601f19831691866000528a6000209260005b8c828210620004175750508411620003fe575b505050811b018255620000cc565b015160001983871b60f8161c19169055388080620003f0565b8385015186558c97909501949384019301620003dd565b90915084600052886000208480850160051c8201928b86106200047a575b918a91869594930160051c01915b8281106200046a575050620000a3565b600081558594508a91016200045a565b925081926200044c565b602286634e487b7160e01b6000525260246000fd5b92607f16926200008c565b604183634e487b7160e01b6000525260246000fd5b634e487b7160e01b600052604160045260246000fd5b600080fdfe608060408181526004918236101561001657600080fd5b600092833560e01c91826301ffc9a714610f975750816306fdde0314610ea2578163095ea7b314610e7857816318160ddd14610e59578163205581f014610de957816323b872dd14610dac578163248a9ca314610d815781632f2ff15d14610d1f578163313ce56714610d0357816336568abe14610c71578163381368c014610c485781633950935114610bf85781633eda17a314610bd457816342966c6814610b5f5781635130341c14610b39578163705dc02f14610b0c57816370a0823114610ad557816375b238fc14610a9a57816379cc679014610a025781637d440ac1146109b85781639103a0e01461097d57816391d1485414610936578163945d12291461087b57816395d89b4114610760578163a217fddf14610745578163a457c2d71461069d578163a9059cbb1461066c578163d3fc986414610243578163d539139314610208578163d547741f146101c5575063dd62ed3e1461017a57600080fd5b346101c157806003193601126101c15780602092610196611032565b61019e61104d565b6001600160a01b0391821683526001865283832091168252845220549051908152f35b5080fd5b9190503461020457806003193601126102045761020191356101fc60016101ea61104d565b938387526005602052862001546112a5565b6113b0565b80f35b8280fd5b5050346101c157816003193601126101c157602090517f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a68152f35b839150346101c15760603660031901126101c15761025f611032565b60249182356044359367ffffffffffffffff9283861161066857366023870112156106685785810135938411610657578751936020966102a888601f19601f8501160187611095565b8186523684838301011161065357818992858a930183890137860101527f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a680885260058752888820338952875260ff89892054161561049057506001600160a01b0394851694851561044f5761032084600254611426565b60025585885287875288882084815401905585887fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef898c51888152a360065460081c1691821561040257505085966103fc9392606092867fb1982cf70d681c270404fe4902b705912301b15b84fa41f9b74d64baa3fd9042995260018852828a20818b528852867f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92589858d6d04ee2d6d415b85acef810000000091829120558651908152a381519687968752860152840152606083019061100d565b0390a180f35b885162461bcd60e51b81529182018790526022908201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608490fd5b50601f606492878a519362461bcd60e51b85528401528201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152fd5b918887938961049e33611778565b918351906104ab82611063565b60428252878201926060368537825115610641576030845382519060019182101561062f5790607860218501536041915b8183116105c6575050506105865760486105829593859361056a9361055b975197889376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8d8601526105328d8251928391603789019101610fea565b8401917001034b99036b4b9b9b4b733903937b6329607d1b603784015251809386840190610fea565b01036028810186520184611095565b5194859462461bcd60e51b865285015283019061100d565b0390fd5b60648688878188519362461bcd60e51b85528401528201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b909192600f8116601081101561061d576f181899199a1a9b1b9c1cb0b131b232b360811b901a6105f68587611751565b53891c92801561060b576000190191906104dc565b634e487b7160e01b825260118a528882fd5b634e487b7160e01b835260328b528983fd5b634e487b7160e01b8152603289528790fd5b634e487b7160e01b8152603288528690fd5b8880fd5b634e487b7160e01b87526041905285fd5b8680fd5b5050346101c157806003193601126101c15760209061069661068c611032565b6024359033611449565b5160018152f35b905082346107425782600319360112610742576106b8611032565b918360243592338152600160205281812060018060a01b03861682526020522054908282106106f15760208561069685850387336115b7565b608490602086519162461bcd60e51b8352820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152fd5b80fd5b5050346101c157816003193601126101c15751908152602090f35b82843461074257806003193601126107425781519181845492600184811c91818616958615610871575b602096878510811461085e579087899a92868b999a9b5291826000146108345750506001146107d9575b85886107d5896107c6848a0385611095565b5192828493845283019061100d565b0390f35b815286935091907f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b5b82841061081c57505050820101816107c66107d5886107b4565b8054848a018601528895508794909301928101610802565b60ff19168882015294151560051b870190940194508593506107c692506107d591508990506107b4565b634e487b7160e01b835260228a52602483fd5b92607f169261078a565b5050346101c15760203660031901126101c157610896611032565b61089e6110b7565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a69182845260056020528084209160018060a01b03169182855260205260ff8185205416156108eb578380f35b82845260056020528084208285526020528320600160ff1982541617905533917f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d8480a43880808380f35b9050346102045781600319360112610204578160209360ff9261095761104d565b90358252600586528282206001600160a01b039091168252855220549151911615158152f35b5050346101c157816003193601126101c157602090517f4504b9dfd7400a1522f49a8b4a100552da9236849581fd59b7363eb48c6a474c8152f35b8334610742576020366003190112610742576109d2611032565b6109da6110b7565b60068054610100600160a81b03191660089290921b610100600160a81b031691909117905580f35b5050346101c157806003193601126101c15760a07fa258bae80719dab9076bee665c847b4513622dde3284cfade385bdc7405bc852916060610a42611032565b91610a5b6024358094610a568233836116b9565b611887565b8051923384526020840152820152601d60608201527f6275726e206279206f7468657220454f41206f7220436f6e74726163740000006080820152a180f35b5050346101c157816003193601126101c157602090517fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c217758152f35b5050346101c15760203660031901126101c15760209181906001600160a01b03610afd611032565b16815280845220549051908152f35b5050346101c157816003193601126101c157600654905160089190911c6001600160a01b03168152602090f35b8334610742578060031936011261074257610b526110b7565b60ff196006541660065580f35b905034610204576020366003190112610204577fa258bae80719dab9076bee665c847b4513622dde3284cfade385bdc7405bc85291606060a0923591610ba58333611887565b8051923384526020840152820152600d60608201526c313ab9371036bc9031b7b734b760991b6080820152a180f35b5050346101c157816003193601126101c15760209060ff6006541690519015158152f35b5050346101c157806003193601126101c157610696602092610c41610c1b611032565b338352600186528483206001600160a01b03821684528652918490205460243590611426565b90336115b7565b8334610742578060031936011261074257610c616110b7565b600160ff19600654161760065580f35b839150346101c157826003193601126101c157610c8c61104d565b90336001600160a01b03831603610ca8579061020191356113b0565b608490602085519162461bcd60e51b8352820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152fd5b5050346101c157816003193601126101c1576020905160128152f35b9050346102045781600319360112610204573590610d3b61104d565b908284526005602052610d53600182862001546112a5565b828452600560209081528185206001600160a01b039093168086529290528084205460ff16156108eb578380f35b9050346102045760203660031901126102045781602093600192358152600585522001549051908152f35b5050346101c15760603660031901126101c157602090610696610dcd611032565b610dd561104d565b60443591610de48333836116b9565b611449565b5050346101c15760203660031901126101c157610e04611032565b610e0c6110b7565b7f4504b9dfd7400a1522f49a8b4a100552da9236849581fd59b7363eb48c6a474c9182845260056020528084209160018060a01b03169182855260205260ff8185205416156108eb578380f35b5050346101c157816003193601126101c1576020906002549051908152f35b5050346101c157806003193601126101c157602090610696610e98611032565b60243590336115b7565b8284346107425780600319360112610742578151918160035492600184811c91818616958615610f8d575b602096878510811461085e578899509688969785829a529182600014610f66575050600114610f0a575b5050506107d592916107c6910385611095565b9190869350600383527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b5b828410610f4e57505050820101816107c66107d5610ef7565b8054848a018601528895508794909301928101610f35565b60ff19168782015293151560051b860190930193508492506107c691506107d59050610ef7565b92607f1692610ecd565b849134610204576020366003190112610204573563ffffffff60e01b81168091036102045760209250637965db0b60e01b8114908115610fd9575b5015158152f35b6301ffc9a760e01b14905083610fd2565b60005b838110610ffd5750506000910152565b8181015183820152602001610fed565b9060209161102681518092818552858086019101610fea565b601f01601f1916010190565b600435906001600160a01b038216820361104857565b600080fd5b602435906001600160a01b038216820361104857565b6080810190811067ffffffffffffffff82111761107f57604052565b634e487b7160e01b600052604160045260246000fd5b90601f8019910116810190811067ffffffffffffffff82111761107f57604052565b3360009081527f9d977511370a0aca39bae27f77b61d448e526e7cd16429212b70d98e478d5b5e602090815260408083205490927f4504b9dfd7400a1522f49a8b4a100552da9236849581fd59b7363eb48c6a474c9160ff161561111b5750505050565b61112433611778565b9184519061113182611063565b6042825284820192606036853782511561129157603084538251906001918210156112915790607860218501536041915b818311611223575050506111e15760486105829386936111c5936111b6985198899376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8a860152610532815180928c603789019101610fea565b01036028810187520185611095565b5192839262461bcd60e51b84526004840152602483019061100d565b60648486519062461bcd60e51b825280600483015260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b909192600f8116601081101561127d576f181899199a1a9b1b9c1cb0b131b232b360811b901a6112538587611751565b5360041c92801561126957600019019190611162565b634e487b7160e01b82526011600452602482fd5b634e487b7160e01b83526032600452602483fd5b634e487b7160e01b81526032600452602490fd5b60009080825260209060058252604092838120338252835260ff8482205416156112cf5750505050565b6112d833611778565b918451906112e582611063565b6042825284820192606036853782511561129157603084538251906001918210156112915790607860218501536041915b81831161136a575050506111e15760486105829386936111c5936111b6985198899376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8a860152610532815180928c603789019101610fea565b909192600f8116601081101561127d576f181899199a1a9b1b9c1cb0b131b232b360811b901a61139a8587611751565b5360041c92801561126957600019019190611316565b906000918083526005602052604083209160018060a01b03169182845260205260ff6040842054166113e157505050565b8083526005602052604083208284526020526040832060ff1981541690557ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b339380a4565b9190820180921161143357565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b039081169182156115645716918215611513576000828152806020526040812054918083106114bf57604082827fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef958760209652828652038282205586815220818154019055604051908152a3565b60405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608490fd5b60405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608490fd5b60405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608490fd5b6001600160a01b0390811691821561166857169182156116185760207f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925918360005260018252604060002085600052825280604060002055604051908152a3565b60405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608490fd5b60405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608490fd5b9060018060a01b03808316600052600160205260406000209082166000526020526040600020549260001984036116f1575b50505050565b80841061170c576117039303916115b7565b388080806116eb565b60405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606490fd5b908151811015611762570160200190565b634e487b7160e01b600052603260045260246000fd5b604051906060820182811067ffffffffffffffff82111761107f57604052602a82526020820160403682378251156117625760309053815160019081101561176257607860218401536029905b8082116118195750506117d55790565b606460405162461bcd60e51b815260206004820152602060248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b9091600f81166010811015611872576f181899199a1a9b1b9c1cb0b131b232b360811b901a6118488486611751565b5360041c91801561185d5760001901906117c5565b60246000634e487b7160e01b81526011600452fd5b60246000634e487b7160e01b81526032600452fd5b6001600160a01b0316801561193f576000918183528260205260408320548181106118ef57817fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef926020928587528684520360408620558060025403600255604051908152a3565b60405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608490fd5b60405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608490fdfea2646970667358221220663e636684ccd07ad5f69a1ddbac234d3d458555ded3254b9f5a6120c05dfba664736f6c634300081300332f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d";

type LaCoinConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LaCoinConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LaCoin__factory extends ContractFactory {
  constructor(...args: LaCoinConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LaCoin> {
    return super.deploy(overrides || {}) as Promise<LaCoin>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LaCoin {
    return super.attach(address) as LaCoin;
  }
  override connect(signer: Signer): LaCoin__factory {
    return super.connect(signer) as LaCoin__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LaCoinInterface {
    return new utils.Interface(_abi) as LaCoinInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): LaCoin {
    return new Contract(address, _abi, signerOrProvider) as LaCoin;
  }
}
