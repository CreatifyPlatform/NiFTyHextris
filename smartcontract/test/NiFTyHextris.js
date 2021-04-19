const { expect } = require("chai");
const { assert } = require("hardhat");
const RandomNumberConsumer = artifacts.require("RandomNumberConsumer");
const NiFTyHextris = artifacts.require("NiFTyHextris");
const {BN, constants, expectEvent, expectRevert} = require('@openzeppelin/test-helpers');

let accounts;
let randomNumberConsumer;
let niftyHextris;
let owner;
let consumer;
let stranger;

// Vanilla Mocha test. Increased compatibility with tools that integrate Mocha.
describe("NiFTyHextris Contract", function() {

  before(async function() {
    accounts = await web3.eth.getAccounts();
    owner       = accounts[0];
    consumer    = accounts[1];
    stranger    = accounts[2];
    randomNumberConsumer = await RandomNumberConsumer.new("0x8C7382F9D8f56b33781fE506E897a4F1e2d17255", "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4", "1000000000000000");
    niftyHextris = await NiFTyHextris.new("NiFTyHextris", "NFTY", "https://localhost:3000/niftyhex/games/", randomNumberConsumer.address);
  });
  
  // TODO: Perform complete coverage tests
  describe("NiFTyHextris deployment", function() {
    it("Should return the right name and symbol of the token once NiFTyHextris is deployed", async function() {
      assert.equal(await niftyHextris.name(), "NiFTyHextris");
      assert.equal(await niftyHextris.symbol(), "NFTY");
    });
  });


  // checking that the proper events are emitted
  describe("TODO startGame() event", function() {
    it("Should emit GameStarted event", async function() {
      // gameID = await randomNumberConsumer.getRandomNumber(Date.now());
      // console.log(gameID);
      // expectEvent(await niftyHextris.startGame());
    });
  });

});


describe("RandomNumberConsumer Contract", function() {

  before(async function() {
    accounts = await web3.eth.getAccounts();
    owner       = accounts[0];
    consumer    = accounts[1];
    stranger    = accounts[2];
    randomNumberConsumer = await RandomNumberConsumer.new("0x8C7382F9D8f56b33781fE506E897a4F1e2d17255", "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4", "1000000000000000");
    niftyHextris = await NiFTyHextris.new("NiFTyHextris", "NFTY", "https://localhost:3000/niftyhex/games/", randomNumberConsumer.address);
  });
  
  // TODO: Perform complete coverage tests
  describe("TODO RandomNumberConsumer deployment", function() {
    it("Should return todo once RandomNumberConsumer is deployed", async function() {
      // assert.equal(await niftyHextris.name(), "NiFTyHextris");
      // assert.equal(await niftyHextris.symbol(), "NFTY");
    });
  });

  describe("getChainlinkTokenAddress()", function() {
    it("Should return the right chain link token address", async function() {
      address = await randomNumberConsumer.getChainlinkTokenAddress();
      assert.equal(address, "0x326C977E6efc84E512bB9C30f76E30c160eD06FB");
      // console.log('address: ', address);
    });
  });

});