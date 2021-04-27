# NiFTyHextris
Browser based Game where players can claim NFT collectibles

## Inspiration

To build a cool game using Chainlink VRF to allow gamers to claim NFTs once they achieve a high score. Refactored version of [Hextris](https://github.com/Hextris/hextris) to support creation of NFT after achieving high score.

## What it does

A browser based Web3 Game where users play a game and claim ERC721 token as rewards. The user starts the game by creating a transaction to the Smart Contract deployed at Rinkeby Testnet. This registers the start of the game & requests for the random number from the Chainlink VRF. The Request ID is registered as the GameID which holds the mapping of the Game Stats for the wallet address. On an average, it takes about 2 block confirmations to get the random number after which the overlay is removed, the game timer starts and user can start playing the game. Once the user gets his score, another transaction is made to end the game which results in updating the game stats for the GameID and rewarding a ERC721 token to the user's wallet.

Note:
1. Users must select Rinkeby Testnet on their Dapp Browser or Metamask.
2. Users must have sufficient rinkeby (rETH) to make the transactions and pay gas fees.
3. If this webpage is opened in a Non-Ethereum browser, User can still play the game but there will be no rewards or gameID created.

## How we built it

HTML, CSS, JavaScript, Solidity, Web3.js, Chainlink

## Steps

0. Show the all time high score from the smart contract
1. Start the Game requesting a random number and gameID from the smart contract
2. Upon Game Over -> Send another tx submitting the scores and create an NFT
3. View the collectibles in the collections section on homepage

## Deployment

### Rinkeby Testnet

RandomNumberConsumer    - 0xC39261096656F5BFe40D142F86e7b608f3996966
NiFTyHextris            - 0x16F5160f82E3E55ccef997eB23C9d469fE9C70ae