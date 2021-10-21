/** @format */

'use strict'
/** @format */
exports.__esModule = true
exports.upDateCoinSelect =
  exports.upDateMintNowPrice =
  exports.upDateMintCollateralRatio =
  exports.upDateMintTradeCollateral =
  exports.upDateMintTradeAmount =
  exports.updateBlockNumber =
    void 0
var toolkit_1 = require('@reduxjs/toolkit')
exports.updateBlockNumber = toolkit_1.createAction('app/updateBlockNumber')
exports.upDateMintTradeAmount = toolkit_1.createAction('app/upDateMintTradeAmount')
exports.upDateMintTradeCollateral = toolkit_1.createAction('app/upDateMintTradeCollateral')
exports.upDateMintCollateralRatio = toolkit_1.createAction('app/upDateMintCollateralRatio')
exports.upDateMintNowPrice = toolkit_1.createAction('app/upDateMintNowPrice')
exports.upDateCoinSelect = toolkit_1.createAction('app/upDateCoinSelect')
