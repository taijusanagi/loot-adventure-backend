/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  LootByRogueV2,
  LootByRogueV2Interface,
} from "../../../contracts/calculator/LootByRogueV2";

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
        internalType: "bytes",
        name: "data_",
        type: "bytes",
      },
    ],
    name: "calcArtifact",
    outputs: [
      {
        internalType: "uint256",
        name: "_seed",
        type: "uint256",
      },
      {
        internalType: "uint256[3]",
        name: "_artifactType",
        type: "uint256[3]",
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
        internalType: "bytes",
        name: "data_",
        type: "bytes",
      },
    ],
    name: "calcEquipment",
    outputs: [
      {
        internalType: "uint256",
        name: "_seed",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "_equipmentIds",
        type: "uint256[8]",
      },
      {
        internalType: "string[8]",
        name: "_equipmentNames",
        type: "string[8]",
      },
      {
        internalType: "uint256[8]",
        name: "_equipmentRarities",
        type: "uint256[8]",
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
        internalType: "bytes",
        name: "data_",
        type: "bytes",
      },
    ],
    name: "calcJob",
    outputs: [
      {
        internalType: "uint256",
        name: "_seed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_jobType",
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
        name: "nft_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data_",
        type: "bytes",
      },
    ],
    name: "calcSoul",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "seed",
                type: "uint256",
              },
              {
                internalType: "uint8[]",
                name: "directions",
                type: "uint8[]",
              },
              {
                internalType: "uint8[]",
                name: "useItems",
                type: "uint8[]",
              },
            ],
            internalType: "struct ILootByRogueV2.InputData",
            name: "inputData",
            type: "tuple",
          },
          {
            internalType: "uint16",
            name: "turn",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "maxHp",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "currentHp",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "attack",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "defence",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "recovery",
            type: "uint16",
          },
          {
            internalType: "uint16[6]",
            name: "stats",
            type: "uint16[6]",
          },
          {
            internalType: "uint8[4]",
            name: "unique",
            type: "uint8[4]",
          },
          {
            internalType: "uint256",
            name: "weapon",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "chestArmor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "headArmor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "waistArmor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "footArmor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "handArmor",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "necklace",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ring",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "relics",
            type: "uint256[]",
          },
        ],
        internalType: "struct ILootByRogueV2.AdventureRecord",
        name: "record_",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
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
  "0x6080604081815234610109577fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c2177590600090828252602092828452818320338452845260ff8284205416156100d1575b507f4504b9dfd7400a1522f49a8b4a100552da9236849581fd59b7363eb48c6a474c92838352828152818320338452815260ff828420541615610098575b611b44858161010f8239f35b83835282815281832090338452528120600160ff198254161790553391600080516020611c53833981519152339280a43880808061008c565b8083528284528183203384528452818320600160ff1982541617905533903390600080516020611c538339815191528580a43861004e565b600080fdfe608080604052600436101561001357600080fd5b60003560e01c90816301ffc9a71461118757508063205581f014611024578063248a9ca314610ff557806325ea03f414610f7c5780632f2ff15d14610ec957806336568abe14610e375780634adc7cfd14610bbc5780635bb5e701146106be578063759974b3146103e757806375b238fc146103ac5780639103a0e01461037157806391d1485414610324578063a217fddf14610308578063cf293e0f1461010a5763d547741f146100c457600080fd5b34610105576040366003190112610105576101036004356100e36111f0565b908060005260006020526100fe600160406000200154611410565b6115c3565b005b600080fd5b3461010557610118366112e8565b5060006040519161012883611256565b606036843760405163884b889560e01b8152600481019190915292839060249082906001600160a01b03165afa9182156102fc576000926102d7575b5061010082019160ff6101a784519482606061019c61018e838a5116846020809c01511690611aa9565b836040865101511690611aa9565b925101511690611aa9565b60019291168281036102a15750600283525b60026102208201515111610296575b6101208101511580610289575b8061027c575b8061026f575b80610262575b80610255575b80610248575b8061023b575b610230575b51516040519081526000939092908381015b6003861061021d57608085f35b8251815294830194918101918101610210565b8160408401526101fe565b50610200810151156101f9565b506101e0810151156101f3565b506101c0810151156101ed565b506101a0810151156101e7565b50610180810151156101e1565b50610160810151156101db565b50610140810151156101d5565b6006848401526101c8565b600281036102b45750600383525b6101b9565b600381036102c65750600483526101b9565b600310156102af57600583526101b9565b6102f59192503d806000833e6102ed81836112aa565b8101906117e1565b9082610164565b6040513d6000823e3d90fd5b3461010557600036600319011261010557602060405160008152f35b346101055760403660031901126101055761033d6111f0565b600435600052600060205260406000209060018060a01b0316600052602052602060ff604060002054166040519015158152f35b346101055760003660031901126101055760206040517f4504b9dfd7400a1522f49a8b4a100552da9236849581fd59b7363eb48c6a474c8152f35b346101055760003660031901126101055760206040517fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c217758152f35b3461010557602460006103f9366112e8565b509190606061022060405161040d81611239565b60405161041981611256565b858152836020820152836040820152815284602082015284604082015284838201528460808201528460a08201528460c082015260405161045981611272565b60c036823760e082015260405161046f8161128e565b608036823761010082015284610120820152846101408201528461016082015284610180820152846101a0820152846101c0820152846101e08201528461020082015201526040519384809263884b889560e01b825285600483015260018060a01b03165afa9182156102fc576000926106a1575b506040519060408252610535835161034060408501528051610380850152604061051f602083015160606103a08801526103e08701906113d9565b91015184820361037f19016103c08601526113d9565b9261ffff602082015116606084015261ffff604082015116608084015261ffff60608201511660a084015261ffff60808201511660c084015261ffff60a08201511660e084015261ffff60c08201511661010084015260e081015161012084016000905b600682106106875750505061010081015160006101e085015b6004821061066e575050506101208101516102608401526101408101516102808401526101608101516102a08401526101808101516102c08401526101a08101516102e08401526101c08101516103008401526101e08101516103208401526102008101516103408401526102200151828403603f190161036084015280518085526000946020908101939201905b80861061065657505082935060208301520390f35b90926020806001928651815201940195019490610641565b60208060019260ff8651168152019301910190916105b2565b60208060019261ffff865116815201930191019091610599565b6106b79192503d806000833e6102ed81836112aa565b90826104e4565b34610105576106cc366112e8565b50906040516106da81611206565b61010080913690376040516106ee81611206565b60005b828110610bae57505060405161070681611206565b36903760405163884b889560e01b815260048101839052916000836024816001600160a01b0386165afa9283156102fc57600093610b91575b508251516040519261075084611206565b61270f80610120870151068552806101408701510660208601528061016087015106604086015280610180870151066060860152806101a0870151066080860152806101c08701510660a0860152806101e08701510660c08601526102008601510660e0850152604051926107c484611206565b604051639e41b73f60e01b8152600481018290526000816024816001600160a01b0387165afa9081156102fc57600091610b76575b5084526040516377b403ad60e11b8152600481018290526000816024816001600160a01b0387165afa9081156102fc57600091610b5b575b506020850152604051639720c96960e01b8152600481018290526000816024816001600160a01b0387165afa9081156102fc57600091610b40575b5060408581019190915251639bdc1b6960e01b8152600481018290526000816024816001600160a01b0387165afa9081156102fc57600091610b25575b506060850152604051630e99990d60e01b8152600481018290526000816024816001600160a01b0387165afa9081156102fc57600091610b0a575b506080850152604051636a3f934f60e11b8152600481018290526000816024816001600160a01b0387165afa9081156102fc57600091610aef575b5060a0850152604051630ce4135560e31b815260048101829052906000826024816001600160a01b0387165afa80156102fc576000928391610ad5575b5060c086015260405163c08a5dd560e01b8152600481019190915291829060249082906001600160a01b03165afa9081156102fc57600091610ab2575b5060e0830152610a3b610200604051956109b287611206565b6109c0610120820151611abd565b87526109d0610140820151611abd565b60208801526109e3610160820151611abd565b60408801526109f6610180820151611abd565b6060880152610a096101a0820151611abd565b6080880152610a1c6101c0820151611abd565b60a0880152610a2f6101e0820151611abd565b60c08801520151611abd565b60e085015260405192610a5b610240918286019386526020860190611369565b6101208401526103408301919060005b60088110610a8a57505050610a868293610140840190611369565b0390f35b909192602080610aa760019361023f1989820301875287516113b4565b950193019101610a6b565b610acf91503d806000833e610ac781836112aa565b810190611a47565b85610999565b610ae991503d8085833e610ac781836112aa565b8861095c565b610b0491503d806000833e610ac781836112aa565b8761091f565b610b1f91503d806000833e610ac781836112aa565b876108e4565b610b3a91503d806000833e610ac781836112aa565b876108a9565b610b5591503d806000833e610ac781836112aa565b8761086c565b610b7091503d806000833e610ac781836112aa565b87610831565b610b8b91503d806000833e610ac781836112aa565b876107f9565b610ba79193503d806000833e6102ed81836112aa565b918361073f565b6060828201526020016106f1565b346101055760208060031936011261010557610bd66111da565b7fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775918260005260008152604060002033600052815260ff6040600020541615610c9057600083815280825260408082206001600160a01b0390941680835293835290205460ff1615610c4457005b826000526000815260406000209082600052526040600020600160ff1982541617905533917f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d600080a4005b9050610c9b33611648565b91604051610ca88161128e565b60428152828101916060368437815115610e2157603083538151600190811015610e2157607860218401536041905b808211610dc7575050610d8457610d5093610d5f9260489260405196879376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b88860152610d27815180928a603789019101611391565b8401917001034b99036b4b9b9b4b733903937b6329607d1b603784015251809386840190611391565b010360288101855201836112aa565b610d8060405192839262461bcd60e51b8452600484015260248301906113b4565b0390fd5b6064836040519062461bcd60e51b825280600483015260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b9091600f81166010811015610e21576f181899199a1a9b1b9c1cb0b131b232b360811b901a610df68486611637565b5360041c918015610e0b576000190190610cd7565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b3461010557604036600319011261010557610e506111f0565b336001600160a01b03821603610e6c57610103906004356115c3565b60405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608490fd5b3461010557604036600319011261010557600435610ee56111f0565b816000526000602052610eff600160406000200154611410565b81600052600060205260406000209060018060a01b0316908160005260205260ff6040600020541615610f2e57005b8160005260006020526040600020816000526020526040600020600160ff1982541617905533917f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d600080a4005b34610105576000610f8c366112e8565b5060405163884b889560e01b815260048101919091529190829060249082906001600160a01b03165afa80156102fc57604091600091610fda575b5051516003825191808352166020820152f35b610fef91503d806000833e6102ed81836112aa565b82610fc7565b346101055760203660031901126101055760043560005260006020526020600160406000200154604051908152f35b34610105576020806003193601126101055761103e6111da565b7f4504b9dfd7400a1522f49a8b4a100552da9236849581fd59b7363eb48c6a474c918260005260008152604060002033600052815260ff60406000205416156110ac57600083815280825260408082206001600160a01b0390941680835293835290205460ff1615610c4457005b90506110b733611648565b916040516110c48161128e565b60428152828101916060368437815115610e2157603083538151600190811015610e2157607860218401536041905b808211611143575050610d8457610d5093610d5f9260489260405196879376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b88860152610d27815180928a603789019101611391565b9091600f81166010811015610e21576f181899199a1a9b1b9c1cb0b131b232b360811b901a6111728486611637565b5360041c918015610e0b5760001901906110f3565b34610105576020366003190112610105576004359063ffffffff60e01b821680920361010557602091637965db0b60e01b81149081156111c9575b5015158152f35b6301ffc9a760e01b149050836111c2565b600435906001600160a01b038216820361010557565b602435906001600160a01b038216820361010557565b610100810190811067ffffffffffffffff82111761122357604052565b634e487b7160e01b600052604160045260246000fd5b610240810190811067ffffffffffffffff82111761122357604052565b6060810190811067ffffffffffffffff82111761122357604052565b60c0810190811067ffffffffffffffff82111761122357604052565b6080810190811067ffffffffffffffff82111761122357604052565b90601f8019910116810190811067ffffffffffffffff82111761122357604052565b67ffffffffffffffff811161122357601f01601f191660200190565b6060600319820112610105576004356001600160a01b038116810361010557916024359160443567ffffffffffffffff8111610105578160238201121561010557806004013590611338826112cc565b9261134660405194856112aa565b828452602483830101116101055781600092602460209301838601378301015290565b6000915b6008831061137a57505050565b60019082518152602080910192019201919061136d565b60005b8381106113a45750506000910152565b8181015183820152602001611394565b906020916113cd81518092818552858086019101611391565b601f01601f1916010190565b90815180825260208080930193019160005b8281106113f9575050505090565b835160ff16855293810193928101926001016113eb565b600090808252602090828252604092838120338252835260ff8482205416156114395750505050565b61144233611648565b9184519061144f8261128e565b604282528482019260603685378251156115af57603084538251906001918210156115af5790607860218501536041915b818311611541575050506114ff576048610d809386936114e3936114d4985198899376020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8a860152610d27815180928c603789019101611391565b010360288101875201856112aa565b5192839262461bcd60e51b8452600484015260248301906113b4565b60648486519062461bcd60e51b825280600483015260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b909192600f8116601081101561159b576f181899199a1a9b1b9c1cb0b131b232b360811b901a6115718587611637565b5360041c92801561158757600019019190611480565b634e487b7160e01b82526011600452602482fd5b634e487b7160e01b83526032600452602483fd5b634e487b7160e01b81526032600452602490fd5b9060009180835282602052604083209160018060a01b03169182845260205260ff6040842054166115f357505050565b80835282602052604083208284526020526040832060ff1981541690557ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b339380a4565b908151811015610e21570160200190565b6040519061165582611256565b602a8252602082016040368237825115610e2157603090538151600190811015610e2157607860218401536029905b8082116116d85750506116945790565b606460405162461bcd60e51b815260206004820152602060248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b9091600f81166010811015611731576f181899199a1a9b1b9c1cb0b131b232b360811b901a6117078486611637565b5360041c91801561171c576000190190611684565b60246000634e487b7160e01b81526011600452fd5b60246000634e487b7160e01b81526032600452fd5b67ffffffffffffffff81116112235760051b60200190565b519060ff8216820361010557565b81601f820112156101055780519161178383611746565b9261179160405194856112aa565b808452602092838086019260051b820101928311610105578301905b8282106117bb575050505090565b8380916117c78461175e565b8152019101906117ad565b519061ffff8216820361010557565b906020808383031261010557825167ffffffffffffffff93848211610105570190610340828403126101055760409283519461181c86611239565b83518181116101055784016060818403126101055785519061183d82611256565b8051825284810151838111610105578461185891830161176c565b858301528681015190838211610105576118749185910161176c565b8682015286526118858385016117d2565b838701526118948585016117d2565b858701526118a4606085016117d2565b60608701526118b5608085016117d2565b60808701526118c660a085016117d2565b60a08701526118d760c085016117d2565b60c08701528160ff85011215610105578451936118f385611272565b6101a08181019580858811610105578660e08501915b898310611a2f5750505060e0890152836101bf83011215610105578651956119308761128e565b866102209788850192878411610105578890915b848310611a17575050506101008a0152516101208901526102408201516101408901526102608201516101608901526102808201516101808901526102a0820151908801526102c08101516101c08801526102e08101516101e0880152610300810151610200880152610320810151918211610105570181601f82011215610105578051906119de6119d583611746565b965196876112aa565b818652838087019260051b820101928311610105578301905b828210611a08575050505082015290565b815181529083019083016119f7565b8190611a228461175e565b8152019101908890611944565b8190611a3a846117d2565b8152019101908790611909565b6020818303126101055780519067ffffffffffffffff8211610105570181601f82011215610105578051611a7a816112cc565b92611a8860405194856112aa565b8184526020828401011161010557611aa69160208085019101611391565b90565b9060ff8091169116019060ff8211610e0b57565b60009080611ac9575090565b600191506014900660138103611ae0575050600590565b6010811115611af0575050600490565b600c811115611b00575050600390565b60071015611aa6575060029056fea264697066735822122045c1ba68d7c12d384dbdbcad92656d49bb9c0787ae5654f73bef72135dbbfa2064736f6c634300081300332f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d";

type LootByRogueV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LootByRogueV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LootByRogueV2__factory extends ContractFactory {
  constructor(...args: LootByRogueV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LootByRogueV2> {
    return super.deploy(overrides || {}) as Promise<LootByRogueV2>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LootByRogueV2 {
    return super.attach(address) as LootByRogueV2;
  }
  override connect(signer: Signer): LootByRogueV2__factory {
    return super.connect(signer) as LootByRogueV2__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LootByRogueV2Interface {
    return new utils.Interface(_abi) as LootByRogueV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LootByRogueV2 {
    return new Contract(address, _abi, signerOrProvider) as LootByRogueV2;
  }
}
