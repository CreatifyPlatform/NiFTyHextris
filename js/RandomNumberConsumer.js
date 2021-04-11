var RandomNumberConsumerContractAddress = "0xeB9fe27CeB59B34144121333DeB7768138EE4F99";

var RandomNumberConsumerContractABI = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "bytes32",
                "name": "requestId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "keyHash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "seed",
                "type": "uint256"
            }
        ],
        "name": "RequestRandomness",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "bytes32",
                "name": "requestId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "randomness",
                "type": "uint256"
            }
        ],
        "name": "RequestRandomnessFulfilled",
        "type": "event"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "userProvidedSeed",
            "type": "uint256"
        }],
        "name": "getRandomNumber",
        "outputs": [{
            "internalType": "bytes32",
            "name": "requestId",
            "type": "bytes32"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }],
        "name": "nonces",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "randomResult",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "bytes32",
                "name": "requestId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "randomness",
                "type": "uint256"
            }
        ],
        "name": "rawFulfillRandomness",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "bytes32",
                "name": "_keyHash",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "_fee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_seed",
                "type": "uint256"
            }
        ],
        "name": "requestRandomness",
        "outputs": [{
            "internalType": "bytes32",
            "name": "requestId",
            "type": "bytes32"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]