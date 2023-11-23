export const launchpadAbi = [
    {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
    },
    {
    "inputs": [],
    "name": "MAX_RELIC",
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
    "inputs": [],
    "name": "SIZE",
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
    "inputs": [],
    "name": "getRecord",
    "outputs": [
        {
        "components": [
            {
            "internalType": "uint8",
            "name": "x",
            "type": "uint8"
            },
            {
            "internalType": "uint8",
            "name": "y",
            "type": "uint8"
            },
            {
            "internalType": "uint8",
            "name": "rerollCount",
            "type": "uint8"
            },
            {
            "internalType": "uint8",
            "name": "item1",
            "type": "uint8"
            },
            {
            "internalType": "uint8",
            "name": "item2",
            "type": "uint8"
            },
            {
            "internalType": "uint8",
            "name": "relicCount",
            "type": "uint8"
            },
            {
            "internalType": "uint16",
            "name": "defenceBuffTurn",
            "type": "uint16"
            },
            {
            "internalType": "uint16",
            "name": "exit",
            "type": "uint16"
            }
        ],
        "internalType": "struct Launchpad.Temporary",
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
        "internalType": "address",
        "name": "tempEoa_",
        "type": "address"
        }
    ],
    "name": "initRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint8",
        "name": "x_",
        "type": "uint8"
        },
        {
        "internalType": "uint8",
        "name": "y_",
        "type": "uint8"
        }
    ],
    "name": "updateRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    }
]
