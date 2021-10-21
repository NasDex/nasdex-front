/** @format */

import {createReducer} from '@reduxjs/toolkit'
import {
  upDateMintCollateralRatio,
  upDateMintTradeAmount,
  upDateMintTradeCollateral,
  upDateMintNowPrice,
  upDateCoinSelect,
} from './actions'

export interface ApplicationState {
  blockNumber: {[chainId: number]: number}
  walletModalOpen: boolean
  settingsMenuOpen: boolean
  mintTradeAmount: string
  mintTradeCollateral: string
  mintCollateralRatio: string
  mintNowPrice: number
  mintCoinSelect: string
}

const initialState: ApplicationState = {
  blockNumber: {},
  walletModalOpen: false,
  settingsMenuOpen: false,
  mintTradeAmount: '',
  mintTradeCollateral: '',
  mintCollateralRatio: '200',
  mintNowPrice: 0,
  mintCoinSelect: 'USDC',
}

export default createReducer(initialState, builder =>
  builder
    .addCase(upDateMintCollateralRatio, (state, action) => {
      state.mintCollateralRatio = action.payload.mintCollateralRatio
    })
    .addCase(upDateMintTradeAmount, (state, action) => {
      state.mintTradeAmount = action.payload.mintTradeAmount
    })
    .addCase(upDateMintTradeCollateral, (state, action) => {
      state.mintTradeCollateral = action.payload.mintTradeCollateral
    })
    .addCase(upDateMintNowPrice, (state, action) => {
      state.mintNowPrice = action.payload.mintNowPrice
    })
    .addCase(upDateCoinSelect, (state, action) => {
      state.mintCoinSelect = action.payload.mintCoinSelect
    }),
)
