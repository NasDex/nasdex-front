/** @format */

'use strict'
/** @format */
exports.__esModule = true
exports.simpleRpcProvider = void 0
var ethers_1 = require('ethers')
var getRpcUrl_1 = require('utils/getRpcUrl')
var RPC_URL = getRpcUrl_1['default']()
console.log(RPC_URL, 'RPC_URL##')
exports.simpleRpcProvider = new ethers_1.ethers.providers.JsonRpcProvider(RPC_URL)
exports['default'] = null
