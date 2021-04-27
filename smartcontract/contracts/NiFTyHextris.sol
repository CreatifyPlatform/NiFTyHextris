// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract NiFTyHextris is Context, ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdTracker;

    string private _baseTokenURI;

    RandomNumberConsumer randomNumberGeneratorContract;

    struct Game {
        uint256 startTime;
        uint256 endTime;
        uint256 points;
        uint256 timeTaken;
    }

    event GameStarted(address indexed gamer, bytes32 indexed gameID, uint256 startTime);
    event GameOver(address indexed gamer, bytes32 indexed gameID, uint256 endTime, uint256 points, uint256 timeTaken, uint256 indexed tokenId);

    mapping(address => mapping(bytes32 => Game)) public Games;

    constructor(string memory name, string memory symbol, string memory baseTokenURI, address _randomNumberGeneratorContract) public ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;
        randomNumberGeneratorContract = RandomNumberConsumer(_randomNumberGeneratorContract);
    }

    function startGame() public returns (bytes32 gameID) {
        bytes32 _gameID = randomNumberGeneratorContract.getRandomNumber(block.timestamp);
        Game memory newGame = Game({startTime: block.timestamp, endTime: 0, points: 0, timeTaken: 0});
        Games[msg.sender][_gameID] = newGame;
        emit GameStarted(msg.sender, _gameID, block.timestamp);
        return _gameID;
    }

    function gameOver(bytes32 _gameID, uint256 _points) public virtual {
        uint256 timeTaken = block.timestamp - Games[msg.sender][_gameID].startTime;
        Games[msg.sender][_gameID].endTime = block.timestamp;
        Games[msg.sender][_gameID].points = _points;
        Games[msg.sender][_gameID].timeTaken = timeTaken;
        uint256 tokenId = _tokenIdTracker.current();
        _mint(msg.sender, tokenId);
        _tokenIdTracker.increment();
        emit GameOver(msg.sender, _gameID, block.timestamp, _points, timeTaken, tokenId);
    }
}

// Polygon (Matic) Mumbai Testnet Deployment
// Taken from https://github.com/smartcontractkit/box/blob/master/contracts/RandomNumberConsumer.sol
contract RandomNumberConsumer is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;

    event RequestRandomness(bytes32 indexed requestId, bytes32 keyHash, uint256 seed);
    event RequestRandomnessFulfilled(bytes32 indexed requestId, uint256 randomness);

    /**
     * Constructor inherits VRFConsumerBase
     *
     * Network: Polygon (Matic) Mumbai Testnet
     * Chainlink VRF Coordinator address: 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255
     * LINK token address:                0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Key Hash: 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4
     * Fee: 0.001 * 10 ** 18; // 0.001 LINK
     */
    constructor(address _vrfCoordinator, address _link, bytes32 _keyHash, uint256 _fee) public
        VRFConsumerBase(
            _vrfCoordinator, // VRF Coordinator
            _link // LINK Token
        )
    {
        keyHash = _keyHash;
        fee = _fee;
    }

    /**
     * Requests randomness based on the user input
     */
    function getRandomNumber(uint256 userProvidedSeed) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) > fee, "Not enough LINK to initialte function call");
        uint256 seed = uint256(keccak256(abi.encode(userProvidedSeed, blockhash(block.number)))); // Hash user seed and blockhash
        bytes32 _requestId = requestRandomness(keyHash, fee, seed);
        emit RequestRandomness(_requestId, keyHash, seed);
        return _requestId;
    }

    /** 
     * Requests the address of the Chainlink Token on this network 
     */
    function getChainlinkTokenAddress() public view returns (address) {
        return address(LINK);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
        emit RequestRandomnessFulfilled(requestId, randomness);
    }
}
