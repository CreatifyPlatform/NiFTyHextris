let walletAddress;
let NiFTyHextrisContract;
let RandomNumberConsumerContract;

let startGameTXReceipt;
let gameID;
let randomness;
let endGameTXHash;


// Inject our version of web3.js into the DApp.
window.addEventListener('load', async () => {
  // $('#main-popup').modal('show');

  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      // Acccounts now exposed
      startDApp();
      web3.eth.sendTransaction({
        /* ... */ });
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
    web3.eth.sendTransaction({
      /* ... */ });
  }
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. Install MetaMask to continue!');
  }
})

function checkNetwork() {
  web3.eth.net.getNetworkType((err, netId) => {
    switch (netId) {
      case "main":
        console.log('The Mainnet');
        break
      case "ropsten":
        console.log('Ropsten Test Network');
        break
      case "rinkeby":
        console.log('Rinkeby Test Network');
        break
      case "goerli":
        console.log('Goerli Test Network');
        break
      case "kovan":
        console.log('Kovan Test Network');
        break
      default:
        console.log('This is an Unknown Network');
    }
    if (netId != "rinkeby") {
      alert("Please connect to Rinkeby Testnet to Continue!");
    } else {
      console.log("Connected to Rinkeby Testnet!");
    }
  });
}

function initDApp() {
  RandomNumberConsumerContract = new web3.eth.Contract(RandomNumberConsumerContractABI, RandomNumberConsumerContractAddress, {
    from: walletAddress,
    gasPrice: '30000000000' // default gas price in wei, 30 gwei in this case
  });
  NiFTyHextrisContract = new web3.eth.Contract(NiFTyHextrisContractABI, NiFTyHextrisContractAddress, {
    from: walletAddress,
    gasPrice: '30000000000' // default gas price in wei, 30 gwei in this case
  });
}

function getCoinbase() {
  return new Promise(resolve => {
    web3.eth.getCoinbase((error, result) => {
      if (!error) {
        console.log("Coinbase: " + result);
        resolve(result);
      } else {
        resolve(error);
      }
    });
  });
}

function getETHBalance() {
  return new Promise(resolve => {
    web3.eth.getBalance(walletAddress, (error, result) => {
      if (!error) {
        console.log(web3.utils.fromWei(result, "ether"));
        resolve(web3.utils.fromWei(result, "ether"));
      } else {
        resolve(error);
      }
    });
  });
}

function createGameID() {
  return new Promise(resolve => {
    NiFTyHextrisContract.methods.startGame().send()
    .on('transactionHash', function (txHash) {
      console.log(txHash);
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      console.log(confirmationNumber);
      //console.log(receipt);
    })
    .on('receipt', function (receipt) {
      // receipt
      console.log(receipt);
      resolve(receipt);
    })
    .on('error', function (error, errData) {
      // Error
      console.log(error);
      resolve(errData);
    });
  });
}

function getRandomNumber() {
  return new Promise(resolve => {
    RandomNumberConsumerContract.once('RequestRandomnessFulfilled', {
      filter: {
        requestId: gameID
      },
      fromBlock: startGameTXReceipt.blockNumber
    }, function (error, event) {
      if (!error) {
        resolve(event.returnValues.randomness);
        console.log(event.returnValues.randomness);
      } else {
        resolve(error);
      }
    });
  });
}

function submitGameResult() {
  return new Promise(resolve => {
    NiFTyHextrisContract.methods.gameOver(gameID, score).send()
    .on('transactionHash', function (txHash) {
      console.log(txHash);
      resolve(txHash);
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      console.log(confirmationNumber);
      //console.log(receipt);
    })
    .on('receipt', function (receipt) {
      // receipt example
      console.log(receipt);
    })
    .on('error', function (error, errData) {
      // Error
      console.log(error);
      resolve(errData);
    });
  });
}

async function fetchAccountDetails() {
  // Fetch the Account Details
  walletAddress = web3.utils.toChecksumAddress(await getCoinbase());
  document.getElementById('gamerWalletAddress').innerHTML = walletAddress;
  let walletETHBalance = await getETHBalance();
  document.getElementById('ethBalance').innerHTML = " | " + walletETHBalance + "Ξ";
}

async function startDApp() {
  checkNetwork();
  await fetchAccountDetails();
  initDApp();
  console.log('Ready to Start NiFTy Game');
  document.getElementById('gameStatus').innerHTML = "Click To Start NiFTy Game!";
  // Add button overlay to start Web3 Game
  document.getElementById("web3GameOptions").innerHTML = "<button id='startBtn' onclick='playGame();'></button>";
}

function playGame() {
  if(watcher.gameStatus == "readyToStart") {
    watcher.gameStatus = "startWeb3Game";
  }
  if(watcher.gameStatus == "startWeb3Game") {
    console.log("Already Requested a GameID...");
    document.getElementById('gameStatus').innerHTML = "Already Requested a GameID...";
  }
  if(watcher.gameStatus == "inGame") {
    console.log("Already in game. Exit to start new game...");
    document.getElementById('gameStatus').innerHTML = "Already in game. Exit to start new game...";
  }
}

watcher.registerListener(function(val) {
  if(val == "startWeb3Game") {
    console.log("Calling Smart Contract");
    document.getElementById('gameStatus').innerHTML = "Calling Smart Contract...";
    startWeb3Game();
  }
  if(val == "inGame") {
    init();
    console.log("Playing the Game with GameID: " + gameID);
    document.getElementById('gameStatus').innerHTML = "Game ID: " + gameID;
  }
  if(val == "gameOver") {
    console.log("Submitting Game Score");
    document.getElementById('gameStatus').innerHTML = "Submitting Game Score";
    endGame();
  }
  if(val == "gameScoreSubmitted") {
    console.log("Game Score Submitted with TX: " + endGameTXHash);
    document.getElementById('gameStatus').innerHTML = "Ready To Start New Game!";
    alert("Game Score Submitted with TX: " + endGameTXHash);
    watcher.gameStatus = "readyToStart";
  }
});

async function startWeb3Game() {
  document.getElementById('gameStatus').innerHTML = "Fetching GameID from Blockchain...";
  // Create a TX to generate a Random Number for a gameID/requestID
  startGameTXReceipt = await createGameID();
  gameID = startGameTXReceipt.events.GameStarted.returnValues.gameID;
  document.getElementById('gameStatus').innerHTML = "Game ID: " + gameID;
  // Show Loading screen replacing with button
  document.getElementById('gameStatus').innerHTML = "Awaiting Random Number...";
  // Check for the fulfillRandomness event for the requestID
  randomness = await getRandomNumber();
  let randomNumber = parseFloat(randomness) / (Math.pow(10, randomness.length));
  console.log("randomNumber ", randomNumber);
  document.getElementById('gameStatus').innerHTML = "Random Number: " + randomNumber;
  // have randomNumber ready do derive any number of random numbers from it for randInt():
  // newRandomNumber = randomNumber * Math.random() // ;)
  watcher.gameStatus = "inGame";
}

async function endGame() {
  endGameTXHash = await submitGameResult();
  //document.getElementById('gameEndTXHash').innerHTML = "GameOver TX Hash: " + startGameTXHash;
  watcher.gameStatus = "gameScoreSubmitted";
}