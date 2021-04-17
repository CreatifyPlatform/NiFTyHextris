require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// API_KEY & PRIVATE_KEY
const ALCHEMY_API_KEY = "ALCHEMY_API_KEY_PARAM";
const RINKEBY_PRIVATE_KEY = "PRIVATE_KEY_PARAM";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.12",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: "ETHERSCAN_API_KEY_PARAM"
  }
};