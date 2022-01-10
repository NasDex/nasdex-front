/** @format */

'use strict'

exports.__esModule = true
exports.NSDXToken =
  exports.MasterChefAddress =
  exports.NSDXVaultAddress =
  exports.NetworkContextName =
  exports.NSDXPrice =
  exports.ChainId =
    void 0
/** @format */
// export enum ChainId {
//   // MAINNET = 137,
//   MAINNET = 80001,
// }

var ChainId
;(function (ChainId) {
  ChainId[(ChainId['MAINNET'] = 80001)] = 'MAINNET' // BSCTESTNET = 97
})((ChainId = exports.ChainId || (exports.ChainId = {})))

exports.NSDXPrice = 0.25
exports.NetworkContextName = 'NETWORK'
exports.NSDXVaultAddress = '0x954757d5fd408E562b9a7B60f6377706BCc8274A' //自动复投代理合约

exports.MasterChefAddress = '0xCc89c6A9f0b86F9ec2B03e458A4Ac2969528eac1' //主矿池

exports.NSDXToken = '0xf495C59dF44a9784FEcaC65307C2848a99a59D00' //代币
