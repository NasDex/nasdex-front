/** @format */

'use strict'
/** @format */
exports.__esModule = true
var toolkit_1 = require('@reduxjs/toolkit')
var actions_1 = require('./actions')
var initialState = {
  blockNumber: {},
  walletModalOpen: false,
  settingsMenuOpen: false,
  manageTradeAmount: '',
  manageTradeCollateral: '',
  manageCollateralRatio: '',
  manageNowPrice: 35,
  manageCoinSelect: 'USDC',
  manageCoinStock: 'nTENCT',
  positionInfo: {},
  manageAssetAmount: '',
  cAssetAmount: '',
}
exports['default'] = toolkit_1.createReducer(initialState, function (builder) {
  return builder
    .addCase(actions_1.upDateManageCollateralRatio, function (state, action) {
      state.manageCollateralRatio = action.payload.manageCollateralRatio
    })
    .addCase(actions_1.upDateManageTradeAmount, function (state, action) {
      state.manageTradeAmount = action.payload.manageTradeAmount
    })
    .addCase(actions_1.upDateManageTradeCollateral, function (state, action) {
      state.manageTradeCollateral = action.payload.manageTradeCollateral
    })
    .addCase(actions_1.upDateManageNowPrice, function (state, action) {
      state.manageNowPrice = 35
    })
    .addCase(actions_1.upDateCoinSelect, function (state, action) {
      state.manageCoinSelect = action.payload.manageCoinSelect
    })
    .addCase(actions_1.upDateCoinStock, function (state, action) {
      state.manageCoinStock = action.payload.manageCoinStock
    })
    .addCase(actions_1.upDatePositionInfo, function (state, action) {
      state.positionInfo = action.payload.positionInfo
    })
    .addCase(actions_1.upDateAssetAmount, function (state, action) {
      console.log(action.payload.manageAssetAmount, 'action.payload.manageAssetAmount##')
      state.manageAssetAmount = action.payload.manageAssetAmount
    })
})
