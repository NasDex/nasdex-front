/** @format */

'use strict'
/** @format */
exports.__esModule = true
exports.getLpContractCommon =
  exports.getETHOracleContract =
  exports.getSTAOracleContract =
  exports.getMultiCallContract =
  exports.getSwapFactoryContract =
  exports.getSwapRouterContract =
  exports.getShortStockAContract =
  exports.getMasterChefTestContract =
  exports.getNSDXTestContract =
  exports.getPositionsContract =
  exports.getShortStakingContract =
  exports.getShortLockContract =
  exports.getErc20Contract =
  exports.getMintContract =
  exports.getLPContract =
  exports.getMasterchefContract =
  exports.getNSDXVaultfContract =
  exports.getNSDXContract =
    void 0
var ethers_1 = require('ethers')
var nadxVault_json_1 = require('../../src/constants/abis/nadxVault.json')
var masterChef_json_1 = require('../../src/constants/abis/masterChef.json')
var lpContract_json_1 = require('../../src/constants/abis/lpContract.json')
var Mint_json_1 = require('../../src/constants/abis/Mint.json')
var erc20_json_1 = require('../../src/constants/abis/erc20.json')
var nadx_json_1 = require('../../src/constants/abis/nadx.json')
var shortLock_json_1 = require('../../src/constants/abis/shortLock.json')
var shortStaking_json_1 = require('../../src/constants/abis/shortStaking.json')
var position_json_1 = require('../../src/constants/abis/position.json')
var masterChefTest_json_1 = require('../../src/constants/abis/masterChefTest.json')
var nsdxTest_json_1 = require('../../src/constants/abis/nsdxTest.json')
var shortStockA_json_1 = require('../../src/constants/abis/shortStockA.json')
var swapRouter_json_1 = require('../../src/constants/abis/swapRouter.json')
var multiCall_json_1 = require('../../src/constants/abis/multiCall.json')
var ETHOracle_json_1 = require('../../src/constants/abis/ETHOracle.json')
var STAOracle_json_1 = require('../../src/constants/abis/STAOracle.json')
var swapFactory_json_1 = require('../../src/constants/abis/swapFactory.json')
var index_1 = require('../constants/index')
var providers_1 = require('./providers')
var getContract = function (abi, address, signer) {
  var signerOrProvider = signer !== null && signer !== void 0 ? signer : providers_1.simpleRpcProvider
  return new ethers_1.ethers.Contract(address, abi, signerOrProvider)
}
exports.getNSDXContract = function (signer) {
  return getContract(nadx_json_1['default'], index_1.NSDXToken, signer)
}
exports.getNSDXVaultfContract = function (signer) {
  return getContract(nadxVault_json_1['default'], index_1.NSDXVaultAddress, signer)
}
exports.getMasterchefContract = function (signer) {
  return getContract(masterChef_json_1['default'], index_1.MasterChefAddress, signer)
}
exports.getLPContract = function (signer) {
  return getContract(lpContract_json_1['default'], index_1.LPAddress, signer)
}
exports.getMintContract = function (signer) {
  return getContract(Mint_json_1['default'], index_1.mintAddress, signer)
}
exports.getErc20Contract = function (address, signer) {
  return getContract(erc20_json_1['default'], address, signer)
}
exports.getShortLockContract = function (signer) {
  return getContract(shortLock_json_1['default'], index_1.ShortLockAddress, signer)
}
exports.getShortStakingContract = function (signer) {
  return getContract(shortStaking_json_1['default'], index_1.ShortStakingAddress, signer)
}
exports.getPositionsContract = function (signer) {
  return getContract(position_json_1['default'], index_1.PositionsAddress, signer)
}
exports.getNSDXTestContract = function (signer) {
  return getContract(nsdxTest_json_1['default'], index_1.NSDXTestToken, signer)
}
exports.getMasterChefTestContract = function (signer) {
  return getContract(masterChefTest_json_1['default'], index_1.MasterChefTestAddress, signer)
}
exports.getShortStockAContract = function (signer) {
  return getContract(shortStockA_json_1['default'], index_1.ShortTokenAddress, signer)
}
exports.getSwapRouterContract = function (signer) {
  return getContract(swapRouter_json_1['default'], index_1.SwapRouterAddress, signer)
}
exports.getSwapFactoryContract = function (signer) {
  return getContract(swapFactory_json_1['default'], index_1.SwapFactoryAddress, signer)
}
exports.getMultiCallContract = function (signer) {
  return getContract(multiCall_json_1['default'], index_1.MultiCallAddress, signer)
}
exports.getSTAOracleContract = function (signer) {
  return getContract(STAOracle_json_1['default'], index_1.STAOracleAddress, signer)
}
exports.getETHOracleContract = function (signer) {
  return getContract(ETHOracle_json_1['default'], index_1.ETHOracleAddress, signer)
}
exports.getLpContractCommon = function (address, signer) {
  return getContract(lpContract_json_1['default'], address, signer)
}
