/** @format */

import {createReducer} from '@reduxjs/toolkit'
import {
  upDateTradeCollateralRatio,
  upDateTradeTradeAmount,
  upDateTradeTradeCollateral,
  upDateTradeNowPrice,
  upDateTradeCoinSelect,
  upDateCoinStock,
  upDateTradeDeadline,
  upDateTradeSlippageTolerance,
  upDateIsTab,
} from './actions'

export interface ApplicationState {
  tradeTradeAmount: string
  tradeTradeCollateral: string
  tradeCollateralRatio: string
  tradeNowPrice: number
  tradeCoinSelect: string
  tradeCoinStock: string
  deadline: string
  slippageTolerance: string
  isTab: boolean
}

const initialState: ApplicationState = {
  tradeTradeAmount: '',
  tradeTradeCollateral: '',
  tradeCollateralRatio: '',
  tradeNowPrice: 0,
  tradeCoinSelect: '',
  tradeCoinStock: '',
  deadline: '20',
  slippageTolerance: '1',
  isTab: false,
}

export default createReducer(initialState, builder =>
  builder
    .addCase(upDateTradeCollateralRatio, (state, action) => {
      state.tradeCollateralRatio = action.payload.tradeCollateralRatio
    })
    .addCase(upDateTradeTradeAmount, (state, action) => {
      state.tradeTradeAmount = action.payload.tradeTradeAmount
    })
    .addCase(upDateTradeTradeCollateral, (state, action) => {
      state.tradeTradeCollateral = action.payload.tradeTradeCollateral
    })
    .addCase(upDateTradeNowPrice, (state, action) => {
      state.tradeNowPrice = action.payload.tradeNowPrice
    })
    .addCase(upDateTradeCoinSelect, (state, action) => {
      state.tradeCoinSelect = action.payload.tradeCoinSelect
    })
    .addCase(upDateCoinStock, (state, action) => {
      state.tradeCoinStock = action.payload.tradeCoinStock
    })
    .addCase(upDateTradeSlippageTolerance, (state, action) => {
      state.slippageTolerance = action.payload.slippageTolerance
    })
    .addCase(upDateTradeDeadline, (state, action) => {
      state.deadline = action.payload.deadline
    })
    .addCase(upDateIsTab, (state, action) => {
      state.isTab = action.payload.isTab
    }),
)
