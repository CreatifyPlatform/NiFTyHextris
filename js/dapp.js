// const IPFS = IpfsApi;
// const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

let walletAddress;
let NiFTyHextrisContract;
let RandomNumberConsumerContract;

let startGameTXReceipt;
let gameID;
let randomness;
let startGameTXHash;


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
  NiFTyHextrisContract = new web3.eth.Contract(NiFTyHextrisContractABI, NiFTyHextrisContractAddress, {
    from: walletAddress,
    gasPrice: '200000000000' // default gas price in wei, 20 gwei in this case
  });
  RandomNumberConsumerContract = new web3.eth.Contract(RandomNumberConsumerContractABI, RandomNumberConsumerContractAddress, {
    from: walletAddress,
    gasPrice: '200000000000' // default gas price in wei, 20 gwei in this case
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

function getPMRBalance() {
  return new Promise(resolve => {
    NiFTyHextrisContract.methods.balanceOf(walletAddress).call((error, result) => {
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
        // receipt example
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
    console.log("in getRandomNumber");
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

// function submitGameResult(timeTaken, movesMade) {
//   return new Promise(resolve => {
//     PairMatchContract.methods.gameOver(gameID, Date.now(), movesMade, timeTaken).send()
//       .on('transactionHash', function (txHash) {
//         console.log(txHash);
//         resolve(txHash);
//       })
//       .on('confirmation', function (confirmationNumber, receipt) {
//         console.log(confirmationNumber);
//         //console.log(receipt);
//       })
//       .on('receipt', function (receipt) {
//         // receipt example
//         console.log(receipt);
//       })
//       .on('error', function (error, errData) {
//         // Error
//         console.log(error);
//         resolve(errData);
//       });

//   });
// }

async function fetchAccountDetails() {
  // Fetch the Account Details
  walletAddress = web3.utils.toChecksumAddress(await getCoinbase());
  document.getElementById('gamerWalletAddress').innerHTML = walletAddress;
  let walletETHBalance = await getETHBalance();
  document.getElementById('ethBalance').innerHTML = walletETHBalance + " ETH";
}

// async function fetchPairMatchDetails() {
//   let walletPMRBalance = await getPMRBalance();
//   document.getElementById('pmrBalance').innerHTML = walletPMRBalance + " PMR";
// }

async function startDApp() {
  console.log('Starting nifty DApp');
//   overlayOn();
  checkNetwork();
  await fetchAccountDetails();
  initDApp();
//   await fetchPairMatchDetails();
}

function startButtonSpinning(){
  $('#start-game-cta').html(function(){
    return '<span class="'+$(this).data('spinner')+'"></span>';
  }).addClass('spinning');
}

function stopButtonSpinning(){
  $('#start-game-cta').html(function(){
    return '<span class="'+$(this).data('text')+'"></span>';
  }).removeClass('spinning');
}

async function playGame() {
    // Create a TX to generate a Random Number for a gameID/requestID
    startGameTXReceipt = await createGameID();
    gameID = startGameTXReceipt.events.StartGame.returnValues.gameID;
    // document.getElementById('gameID').innerHTML = "Game ID: " + gameID;
    // Show Loading screen replacing with button
  
    // Check for the fulfillRandomness event for the requestID
    randomness = await getRandomNumber();
    let randomNumber = parseFloat(randomness) / (Math.pow(10, randomness.length));
    console.log("randomNumber", randomNumber);
    // have randomNumber ready do derive any number of random numbers from it for randInt():
    // newRandomNumber = randomNumber * Math.random() // ;)
  }
  

async function EndGame(timeTaken, movesMade) {
  startGameTXHash = await submitGameResult(timeTaken, movesMade);
  document.getElementById('gameEndTXHash').innerHTML = "GameOver TX Hash: " + startGameTXHash;
}