/** @format */

'use strict'
/** @format */
exports.__esModule = true
exports.getLPContract = exports.getMasterchefContract = exports.getNSDXVaultfContract = exports.getNSDXContract = void 0
var ethers_1 = require('ethers')
var nadxVault_json_1 = require('../../src/constants/abis/nadxVault.json')
var masterChef_json_1 = require('../../src/constants/abis/masterChef.json')
var lpContract_json_1 = require('../../src/constants/abis/lpContract.json')
var nadx_json_1 = require('../../src/constants/abis/nadx.json')
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
