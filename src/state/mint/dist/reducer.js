/** @format */

'use strict'
/** @format */
exports.__esModule = true
var toolkit_1 = require('@reduxjs/toolkit')
// import { useErc20Contract } from 'constants/hooks/useContract'
var actions_1 = require('./actions')
var initialState = {
  blockNumber: {},
  walletModalOpen: false,
  settingsMenuOpen: false,
  mintTradeAmount: '',
  mintTradeCollateral: '',
  mintCollateralRatio: '',
  mintNowPrice: 35,
  mintCoinSelect: 'USDT',
  mintCoinStock: 'nTENCT',
  mintCoinObject: {
    USDT: {
      name: 'USDT',
      address: '0x519130DA1C46CF79F39A0339016c07c77f938fCB',
      balance: '',
    },
  },
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
    .addCase(actions_1.upDateCoinStock, function (state, action) {
      state.mintCoinStock = action.payload.mintCoinStock
    })
    .addCase(actions_1.getCoinBalance, function (state, action) {
      state.mintCoinObject = action.payload.coinBaseInfo
    })
})
