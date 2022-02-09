/** @format */

import {createReducer} from '@reduxjs/toolkit'
// import { useErc20Contract } from 'constants/hooks/useContract'
import {
  upDateMintCollateralRatio,
  upDateMintTradeAmount,
  upDateMintTradeCollateral,
  upDateMintNowPrice,
  upDateCoinSelect,
  upDateCoinStock,
  upDateTxHash,
  upDateMintSlippageTolerance,
  upDateMintDeadline,
  upDateMintInitInfo,
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
  mintCoinStock: string
  hash: string
  slippageTolerance: string
  deadline: string
  mintInitInfo: string
}

const initialState: ApplicationState = {
  blockNumber: {},
  walletModalOpen: false,
  settingsMenuOpen: false,
  hash: '',
  mintTradeAmount: '',
  mintTradeCollateral: '',
  mintCollateralRatio: '',
  mintInitInfo: '',
  mintNowPrice: 35,
  mintCoinSelect: '',
  mintCoinStock: '',
  slippageTolerance: '0',
  deadline: '',
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
    })
    .addCase(upDateCoinStock, (state, action) => {
      state.mintCoinStock = action.payload.mintCoinStock
    })
    .addCase(upDateTxHash, (state, action) => {
      state.hash = action.payload.hash
    })
    .addCase(upDateMintSlippageTolerance, (state, action) => {
      state.slippageTolerance = action.payload.slippageTolerance
    })
    .addCase(upDateMintDeadline, (state, action) => {
      state.deadline = action.payload.deadline
    })
    .addCase(upDateMintInitInfo, (state, action) => {
      state.mintInitInfo = action.payload.mintInitInfo
    }),
)
