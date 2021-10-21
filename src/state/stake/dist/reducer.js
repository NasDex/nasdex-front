/** @format */

'use strict'
/**
 * /* eslint-disable @typescript-eslint/ban-types
 *
 * @format
 */
exports.__esModule = true
/** @format */
var toolkit_1 = require('@reduxjs/toolkit')
var actions_1 = require('./actions')
var initialState = {
  stakeBalance: '',
  priceList: {
    NSDX: 0,
    USDC: 0,
  },
}
exports['default'] = toolkit_1.createReducer(initialState, function (builder) {
  return builder
    .addCase(actions_1.setStakeBalance, function (state, action) {
      state.stakeBalance = action.payload.stakeBalance
    })
    .addCase(actions_1.setPriceList, function (state, action) {
      state.priceList = action.payload.priceList
    })
})
