export const sampleLootV2Abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "validator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "seed",
          "type": "uint256"
        }
      ],
      "name": "MintSeed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "previousAdminRole",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "newAdminRole",
          "type": "bytes32"
        }
      ],
      "name": "RoleAdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MINTER_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "seed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint8[]",
                  "name": "directions",
                  "type": "uint8[]"
                },
                {
                  "internalType": "uint8[]",
                  "name": "useItems",
                  "type": "uint8[]"
                }
              ],
              "internalType": "struct ILootByRogueV2.InputData",
              "name": "inputData",
              "type": "tuple"
            },
            {
              "internalType": "uint16",
              "name": "turn",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "maxHp",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "currentHp",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "attack",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "defence",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "recovery",
              "type": "uint16"
            },
            {
              "internalType": "uint16[6]",
              "name": "stats",
              "type": "uint16[6]"
            },
            {
              "internalType": "uint8[4]",
              "name": "unique",
              "type": "uint8[4]"
            },
            {
              "internalType": "uint256",
              "name": "weapon",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "chestArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "headArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "waistArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "footArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "handArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "necklace",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ring",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "relics",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct ILootByRogueV2.AdventureRecord",
          "name": "record",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "convert",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getAdventureRecord",
      "outputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "seed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint8[]",
                  "name": "directions",
                  "type": "uint8[]"
                },
                {
                  "internalType": "uint8[]",
                  "name": "useItems",
                  "type": "uint8[]"
                }
              ],
              "internalType": "struct ILootByRogueV2.InputData",
              "name": "inputData",
              "type": "tuple"
            },
            {
              "internalType": "uint16",
              "name": "turn",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "maxHp",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "currentHp",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "attack",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "defence",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "recovery",
              "type": "uint16"
            },
            {
              "internalType": "uint16[6]",
              "name": "stats",
              "type": "uint16[6]"
            },
            {
              "internalType": "uint8[4]",
              "name": "unique",
              "type": "uint8[4]"
            },
            {
              "internalType": "uint256",
              "name": "weapon",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "chestArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "headArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "waistArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "footArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "handArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "necklace",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ring",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "relics",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct ILootByRogueV2.AdventureRecord",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getAttack",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getChest",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getCurrentHp",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getDefence",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getDirections",
      "outputs": [
        {
          "internalType": "uint8[]",
          "name": "",
          "type": "uint8[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getFoot",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getHand",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getHead",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getMaxHp",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getNeck",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getRecovery",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getRelics",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getRelicsLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getRing",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getSeed",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getStats",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getTurn",
      "outputs": [
        {
          "internalType": "uint16",
          "name": "",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getUnique",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getUseItems",
      "outputs": [
        {
          "internalType": "uint8[]",
          "name": "",
          "type": "uint8[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getWaist",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getWeapon",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "seed",
          "type": "uint256"
        }
      ],
      "name": "isMintedSeed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lootV1",
      "outputs": [
        {
          "internalType": "contract ERC721",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "mintedSeed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "rand",
          "type": "uint256"
        },
        {
          "internalType": "string[]",
          "name": "sourceArray",
          "type": "string[]"
        }
      ],
      "name": "pluck",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "seeds",
          "type": "uint256[]"
        }
      ],
      "name": "reserveV1MintdSeed",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "seed",
                  "type": "uint256"
                },
                {
                  "internalType": "uint8[]",
                  "name": "directions",
                  "type": "uint8[]"
                },
                {
                  "internalType": "uint8[]",
                  "name": "useItems",
                  "type": "uint8[]"
                }
              ],
              "internalType": "struct ILootByRogueV2.InputData",
              "name": "inputData",
              "type": "tuple"
            },
            {
              "internalType": "uint16",
              "name": "turn",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "maxHp",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "currentHp",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "attack",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "defence",
              "type": "uint16"
            },
            {
              "internalType": "uint16",
              "name": "recovery",
              "type": "uint16"
            },
            {
              "internalType": "uint16[6]",
              "name": "stats",
              "type": "uint16[6]"
            },
            {
              "internalType": "uint8[4]",
              "name": "unique",
              "type": "uint8[4]"
            },
            {
              "internalType": "uint256",
              "name": "weapon",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "chestArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "headArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "waistArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "footArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "handArmor",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "necklace",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "ring",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "relics",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct ILootByRogueV2.AdventureRecord",
          "name": "record",
          "type": "tuple"
        }
      ],
      "name": "safeMint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_seed",
          "type": "uint256"
        },
        {
          "internalType": "uint16",
          "name": "_turn",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "_maxHp",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "_currentHp",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "_attack",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "_defence",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "_recovery",
          "type": "uint16"
        },
        {
          "internalType": "uint16[6]",
          "name": "_stats",
          "type": "uint16[6]"
        },
        {
          "internalType": "uint8[4]",
          "name": "_unique",
          "type": "uint8[4]"
        },
        {
          "internalType": "uint256",
          "name": "_weapon",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_chestArmor",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_headArmor",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_waistArmor",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_footArmor",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_handArmor",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_necklace",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_ring",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "_relics",
          "type": "uint256[]"
        }
      ],
      "name": "safeMintTemp",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tokens",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "seed",
              "type": "uint256"
            },
            {
              "internalType": "uint8[]",
              "name": "directions",
              "type": "uint8[]"
            },
            {
              "internalType": "uint8[]",
              "name": "useItems",
              "type": "uint8[]"
            }
          ],
          "internalType": "struct ILootByRogueV2.InputData",
          "name": "inputData",
          "type": "tuple"
        },
        {
          "internalType": "uint16",
          "name": "turn",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "maxHp",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "currentHp",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "attack",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "defence",
          "type": "uint16"
        },
        {
          "internalType": "uint16",
          "name": "recovery",
          "type": "uint16"
        },
        {
          "internalType": "uint256",
          "name": "weapon",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "chestArmor",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "headArmor",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "waistArmor",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "footArmor",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "handArmor",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "necklace",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ring",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]