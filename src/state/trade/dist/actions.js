/** @format */

'use strict'
/** @format */
exports.__esModule = true
exports.upDateIsTab =
  exports.upDateTradeSlippageTolerance =
  exports.upDateTradeDeadline =
  exports.upDateCoinStock =
  exports.upDateTradeCoinSelect =
  exports.upDateTradeNowPrice =
  exports.upDateTradeCollateralRatio =
  exports.upDateTradeTradeCollateral =
  exports.upDateTradeTradeAmount =
  exports.updateBlockNumber =
    void 0
var toolkit_1 = require('@reduxjs/toolkit')
exports.updateBlockNumber = toolkit_1.createAction('app/updateBlockNumber')
exports.upDateTradeTradeAmount = toolkit_1.createAction('app/upDateTradeTradeAmount')
exports.upDateTradeTradeCollateral = toolkit_1.createAction('app/upDateTradeTradeCollateral')
exports.upDateTradeCollateralRatio = toolkit_1.createAction('app/upDateTradeCollateralRatio')
exports.upDateTradeNowPrice = toolkit_1.createAction('app/upDateTradeNowPrice')
exports.upDateTradeCoinSelect = toolkit_1.createAction('app/upDateCoinSelect')
exports.upDateCoinStock = toolkit_1.createAction('app/upDateCoinStock')
exports.upDateTradeDeadline = toolkit_1.createAction('app/upDateTradeDeadline')
exports.upDateTradeSlippageTolerance = toolkit_1.createAction('app/upDateTradeSlippageTolerance')
exports.upDateIsTab = toolkit_1.createAction('app/upDateIsTab')
