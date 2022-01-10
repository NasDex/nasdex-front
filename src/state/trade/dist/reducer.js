/** @format */

'use strict'
/** @format */
exports.__esModule = true
var toolkit_1 = require('@reduxjs/toolkit')
var actions_1 = require('./actions')
var initialState = {
  tradeTradeAmount: '',
  tradeTradeCollateral: '',
  tradeCollateralRatio: '',
  tradeNowPrice: 0,
  tradeCoinSelect: 'USDT',
  tradeCoinStock: 'nSTA',
  deadline: '',
  slippageTolerance: '0.1',
  isTab: false,
}
exports['default'] = toolkit_1.createReducer(initialState, function (builder) {
  return builder
    .addCase(actions_1.upDateTradeCollateralRatio, function (state, action) {
      state.tradeCollateralRatio = action.payload.tradeCollateralRatio
    })
    .addCase(actions_1.upDateTradeTradeAmount, function (state, action) {
      state.tradeTradeAmount = action.payload.tradeTradeAmount
    })
    .addCase(actions_1.upDateTradeTradeCollateral, function (state, action) {
      state.tradeTradeCollateral = action.payload.tradeTradeCollateral
    })
    .addCase(actions_1.upDateTradeNowPrice, function (state, action) {
      state.tradeNowPrice = action.payload.tradeNowPrice
    })
    .addCase(actions_1.upDateTradeCoinSelect, function (state, action) {
      state.tradeCoinSelect = action.payload.tradeCoinSelect
    })
    .addCase(actions_1.upDateCoinStock, function (state, action) {
      state.tradeCoinStock = action.payload.tradeCoinStock
    })
    .addCase(actions_1.upDateTradeSlippageTolerance, function (state, action) {
      state.slippageTolerance = action.payload.slippageTolerance
    })
    .addCase(actions_1.upDateTradeDeadline, function (state, action) {
      state.deadline = action.payload.deadline
    })
    .addCase(actions_1.upDateIsTab, function (state, action) {
      state.isTab = action.payload.isTab
    })
})
