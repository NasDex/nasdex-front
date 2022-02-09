/** @format */

import {createReducer} from '@reduxjs/toolkit'
import {
  upDateFarmCollateralRatio,
  upDateFarmTradeAmount,
  upDateFarmTradeCollateral,
  upDateFarmNowPrice,
  upDateFarmCoinSelect,
  upDateCoinStock,
  upDateFarmSlippageTolerance,
  upDateFarmDeadline,
  upDateFarmSwapPrice,
  upDateFarmReturned,
  upDateFarmMinimumReceived,
  upDateTxHash,
  upDateFarmInitInfo,
} from './actions'

export interface ApplicationState {
  blockNumber: {[chainId: number]: number}
  walletModalOpen: boolean
  settingsMenuOpen: boolean
  farmTradeAmount: string
  farmTradeCollateral: string
  farmCollateralRatio: string
  farmNowPrice: number
  farmSwapPrice: number
  farmCoinSelect: string
  farmCoinStock: string
  slippageTolerance: string
  deadline: string
  farmReturned: string
  farmMinimumReceived: string
  hash: string
  farmInitInfo: string
}

const initialState: ApplicationState = {
  blockNumber: {},
  walletModalOpen: false,
  settingsMenuOpen: false,
  farmTradeAmount: '',
  farmTradeCollateral: '',
  farmCollateralRatio: '',
  farmNowPrice: 35,
  farmSwapPrice: 40,
  farmCoinSelect: '',
  farmCoinStock: '',
  slippageTolerance: '1',
  deadline: '20',
  farmReturned: '',
  farmMinimumReceived: '',
  hash: '',
  farmInitInfo: '',
}

export default createReducer(initialState, builder =>
  builder
    .addCase(upDateFarmCollateralRatio, (state, action) => {
      state.farmCollateralRatio = action.payload.farmCollateralRatio
    })
    .addCase(upDateFarmTradeAmount, (state, action) => {
      state.farmTradeAmount = action.payload.farmTradeAmount
    })
    .addCase(upDateFarmTradeCollateral, (state, action) => {
      state.farmTradeCollateral = action.payload.farmTradeCollateral
    })
    .addCase(upDateFarmNowPrice, (state, action) => {
      state.farmNowPrice = action.payload.farmNowPrice
    })
    .addCase(upDateFarmCoinSelect, (state, action) => {
      state.farmCoinSelect = action.payload.farmCoinSelect
    })
    .addCase(upDateCoinStock, (state, action) => {
      state.farmCoinStock = action.payload.farmCoinStock
    })
    .addCase(upDateFarmSlippageTolerance, (state, action) => {
      state.slippageTolerance = action.payload.slippageTolerance
    })
    .addCase(upDateFarmDeadline, (state, action) => {
      state.deadline = action.payload.deadline
    })
    .addCase(upDateFarmSwapPrice, (state, action) => {
      state.farmSwapPrice = action.payload.farmSwapPrice
    })
    .addCase(upDateFarmReturned, (state, action) => {
      state.farmReturned = action.payload.farmReturned
    })
    .addCase(upDateFarmMinimumReceived, (state, action) => {
      state.farmMinimumReceived = action.payload.farmMinimumReceived
    })
    .addCase(upDateTxHash, (state, action) => {
      state.hash = action.payload.hash
    })
    .addCase(upDateFarmInitInfo, (state, action) => {
      state.farmInitInfo = action.payload.farmInitInfo
    }),
)
