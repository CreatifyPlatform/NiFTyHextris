# SmartContracts -  NiFTyHextris
Smart Contract Development, Testing and Deployment using Hardhat

## Kickstart

1. Replace the API_KEY_PARAMS (ALCHEMY_API_KEY, PRIVATE_KEY, ETHERSCAN_API_KEY) for respective services in `hardhat.config.js`

2. Setup Hardhat - Run the commands

* `npm install`
* `npx hardhat compile`
* `npx hardhat test`
* `npx hardhat run scripts/deploy.js --network rinkeby`
* `npx hardhat verify --network rinkeby --constructor-args randomNumberConsumerArguments.js 0xD9C8e8a2EEC0f5D7723E08Fa1fCa5A9b007b8b14`
* `npx hardhat verify --network rinkeby --constructor-args niftyHextrisArguments.js 0x99Af68711af938cF11F9efCA6F472CD243C3b259`

Note: For Localhost deployment run `npx hardhat run --network localhost scripts/deploy.js` while running `npx hardhat node` in another terminal window.

3. Check the verified contract at `etherscan.io`
- RandomNumberConsumer - `https://rinkeby.etherscan.io/address/0xD9C8e8a2EEC0f5D7723E08Fa1fCa5A9b007b8b14#code`
- NiFTyHextris - `https://rinkeby.etherscan.io/address/0x99Af68711af938cF11F9efCA6F472CD243C3b259#code`