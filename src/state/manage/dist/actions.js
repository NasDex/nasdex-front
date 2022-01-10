/** @format */

'use strict'
/** @format */
exports.__esModule = true
exports.upDateAssetAmount =
  exports.upDatePositionInfo =
  exports.upDateCoinStock =
  exports.upDateCoinSelect =
  exports.upDateManageNowPrice =
  exports.upDateManageCollateralRatio =
  exports.upDateManageTradeCollateral =
  exports.upDateManageTradeAmount =
  exports.updateBlockNumber =
    void 0
var toolkit_1 = require('@reduxjs/toolkit')
exports.updateBlockNumber = toolkit_1.createAction('app/updateBlockNumber')
exports.upDateManageTradeAmount = toolkit_1.createAction('app/upDateManageTradeAmount')
exports.upDateManageTradeCollateral = toolkit_1.createAction('app/upDateManageTradeCollateral')
exports.upDateManageCollateralRatio = toolkit_1.createAction('app/upDateManageCollateralRatio')
exports.upDateManageNowPrice = toolkit_1.createAction('app/upDateManageNowPrice')
exports.upDateCoinSelect = toolkit_1.createAction('app/upDateCoinSelect')
exports.upDateCoinStock = toolkit_1.createAction('app/upDateCoinStock')
exports.upDatePositionInfo = toolkit_1.createAction('app/upPositionupPositionInfo')
exports.upDateAssetAmount = toolkit_1.createAction('app/upDateAssetAmount')
