const { expect } = require("chai");
const { assert } = require("hardhat");
const RandomNumberConsumer = artifacts.require("RandomNumberConsumer");
const NiFTyHextris = artifacts.require("NiFTyHextris");
const {BN, constants, expectEvent, expectRevert} = require('@openzeppelin/test-helpers');

let accounts;
let randomNumberConsumer;
let niftyHextris;
let owner;
let nonOwner;

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("NiFTyHextris Contract", function() {

  before(async function() {
    accounts = await web3.eth.getAccounts();
    owner       = accounts[0];
    nonOwner    = accounts[1];
    randomNumberConsumer = await RandomNumberConsumer.new("0x8C7382F9D8f56b33781fE506E897a4F1e2d17255", "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4", "1000000000000000");
    niftyHextris = await NiFTyHextris.new("NiFTyHextris", "NFTY", "https://localhost:3000/niftyhex/games/", randomNumberConsumer.address);
  });
  
  // TODO: Perform complete coverage tests
  describe("Deployment", function() {
    it("Should return the right name and symbol of the token once it's deployed", async function() {
      assert.equal(await niftyHextris.name(), "NiFTyHextris");
      assert.equal(await niftyHextris.symbol(), "NFTY");
    });
  });
});