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
  mintTradeAmount: '',
  mintTradeCollateral: '',
  mintCollateralRatio: '200',
  mintNowPrice: 0,
  mintCoinSelect: 'USDC',
}
exports['default'] = toolkit_1.createReducer(initialState, function (builder) {
  return builder
    .addCase(actions_1.upDateMintCollateralRatio, function (state, action) {
      state.mintCollateralRatio = action.payload.mintCollateralRatio
    })
    .addCase(actions_1.upDateMintTradeAmount, function (state, action) {
      state.mintTradeAmount = action.payload.mintTradeAmount
    })
    .addCase(actions_1.upDateMintTradeCollateral, function (state, action) {
      state.mintTradeCollateral = action.payload.mintTradeCollateral
    })
    .addCase(actions_1.upDateMintNowPrice, function (state, action) {
      state.mintNowPrice = action.payload.mintNowPrice
    })
    .addCase(actions_1.upDateCoinSelect, function (state, action) {
      state.mintCoinSelect = action.payload.mintCoinSelect
    })
})
