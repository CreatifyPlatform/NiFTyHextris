# SmartContracts -  NiFTyHextris
Smart Contract Development, Testing and Deployment using Hardhat

## Kickstart

1. Replace the API_KEY_PARAMS (ALCHEMY_API_KEY, PRIVATE_KEY, ETHERSCAN_API_KEY) for respective services in `hardhat.config.js`

2. Setup Hardhat - Run the commands

* `npm install`
* `npx hardhat compile`
* `npx hardhat test`
* `npx hardhat run scripts/deploy.js --network rinkeby`
* `npx hardhat verify --network rinkeby --constructor-args randomNumberConsumerArguments.js 0xC39261096656F5BFe40D142F86e7b608f3996966`
* `npx hardhat verify --network rinkeby --constructor-args niftyHextrisArguments.js 0x16F5160f82E3E55ccef997eB23C9d469fE9C70ae`

Note: For Localhost deployment run `npx hardhat run --network localhost scripts/deploy.js` while running `npx hardhat node` in another terminal window.

3. Check the verified contract at `etherscan.io`
- RandomNumberConsumer - `https://rinkeby.etherscan.io/address/0xC39261096656F5BFe40D142F86e7b608f3996966#code`
- NiFTyHextris - `https://rinkeby.etherscan.io/address/0x16F5160f82E3E55ccef997eB23C9d469fE9C70ae#code`