export const soulControlerAbi = [
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
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "weapon",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "cheastArmor",
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
        "indexed": false,
        "internalType": "struct SoulControler.Equips",
        "name": "equips",
        "type": "tuple"
      }
    ],
    "name": "SeizureEquipment",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "weapon",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "cheastArmor",
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
        "indexed": false,
        "internalType": "struct SoulControler.Equips",
        "name": "equips",
        "type": "tuple"
      }
    ],
    "name": "UpdateEquips",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "ADMIN_ROLE",
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
    "name": "DEVELOPER_ROLE",
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
        "internalType": "uint256",
        "name": "tokenId_",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "tba_",
        "type": "address"
      }
    ],
    "name": "attachEquip",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId_",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "tba_",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "type_",
        "type": "uint256"
      }
    ],
    "name": "attachEquipInit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "tokenIds_",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "tba_",
        "type": "address"
      }
    ],
    "name": "attachEquips",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "tokenIds_",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "tba_",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "types_",
        "type": "uint256[]"
      }
    ],
    "name": "attachEquipsInit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "level_",
        "type": "uint256"
      }
    ],
    "name": "getAmountByLevel",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
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
        "name": "tokenId_",
        "type": "uint256"
      }
    ],
    "name": "getAmountByToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getArtifactNft",
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
    "name": "getCoin",
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
    "name": "getEquipmentNft",
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
        "internalType": "address",
        "name": "owner_",
        "type": "address"
      }
    ],
    "name": "getEquips",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "weapon",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cheastArmor",
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
        "name": "tba_",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "type_",
        "type": "uint256"
      }
    ],
    "name": "getIsEquip",
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
    "name": "getJobNft",
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
    "inputs": [],
    "name": "getSoulLoot",
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
    "name": "getTreasury",
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
        "name": "tba_",
        "type": "address"
      }
    ],
    "name": "seizureEquipment",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "granted_",
        "type": "address"
      }
    ],
    "name": "setAdminRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nft_",
        "type": "address"
      }
    ],
    "name": "setArtifactNft",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ft_",
        "type": "address"
      }
    ],
    "name": "setCoin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "granted_",
        "type": "address"
      }
    ],
    "name": "setDeveloperRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nft_",
        "type": "address"
      }
    ],
    "name": "setEquipmentNft",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nft_",
        "type": "address"
      }
    ],
    "name": "setJobNft",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "granted_",
        "type": "address"
      }
    ],
    "name": "setMinterRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "setNftsOffGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "setNftsOnGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nft_",
        "type": "address"
      }
    ],
    "name": "setSoulLoot",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "treasury_",
        "type": "address"
      }
    ],
    "name": "setTreasury",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "eoa_",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId_",
        "type": "uint256"
      }
    ],
    "name": "withdrawEquip",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]