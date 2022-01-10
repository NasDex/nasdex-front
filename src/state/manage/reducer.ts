/** @format */

import {createReducer} from '@reduxjs/toolkit'
import {
  upDateManageCollateralRatio,
  upDateManageTradeAmount,
  upDateManageTradeCollateral,
  upDateManageNowPrice,
  upDateCoinSelect,
  upDateCoinStock,
  upDatePositionInfo,
  upDateAssetAmount,
  upDateNewPositionInfo,
} from './actions'

export interface ApplicationState {
  blockNumber: {[chainId: number]: number}
  walletModalOpen: boolean
  settingsMenuOpen: boolean
  manageTradeAmount: string
  manageTradeCollateral: string
  manageCollateralRatio: string
  manageNowPrice: number
  manageCoinSelect: string
  manageCoinStock: string
  positionInfo: any
  manageAssetAmount: string
  cAssetAmount: string
  newPositionInfo: string
}

const initialState: ApplicationState = {
  blockNumber: {},
  walletModalOpen: false,
  settingsMenuOpen: false,
  manageTradeAmount: '',
  manageTradeCollateral: '',
  manageCollateralRatio: '',
  manageNowPrice: 35,
  manageCoinSelect: 'USDC',
  manageCoinStock: 'nETH',
  positionInfo: {
    assetTokenName: 'nETH',
    assetToken: '',
    cAssetToken: '',
    cAssetTokenName: 'USDC',
    assetAmount: '',
    cAssetAmount: '',
    cRatio: '',
    isShort: '',
  },
  manageAssetAmount: '',
  cAssetAmount: '',
  newPositionInfo: '',
}

export default createReducer(initialState, builder =>
  builder
    .addCase(upDateManageCollateralRatio, (state, action) => {
      console.log(action.payload.manageCollateralRatio, ' action.payload.manageCollateralRatio#')
      state.manageCollateralRatio = action.payload.manageCollateralRatio
    })
    .addCase(upDateManageTradeAmount, (state, action) => {
      state.manageTradeAmount = action.payload.manageTradeAmount
    })
    .addCase(upDateManageTradeCollateral, (state, action) => {
      state.manageTradeCollateral = action.payload.manageTradeCollateral
    })
    .addCase(upDateManageNowPrice, (state, action) => {
      state.manageNowPrice = 35
    })
    .addCase(upDateCoinSelect, (state, action) => {
      state.manageCoinSelect = action.payload.manageCoinSelect
    })
    .addCase(upDateCoinStock, (state, action) => {
      state.manageCoinStock = action.payload.manageCoinStock
    })
    .addCase(upDatePositionInfo, (state, action) => {
      // console.log(action.payload.positionInfo,'action.payload.positionInfo##')
      state.positionInfo = action.payload.positionInfo
      // console.log(state.positionInfo,'state.positionInfo##')
    })
    .addCase(upDateAssetAmount, (state, action) => {
      console.log(action.payload.manageAssetAmount, 'action.payload.manageAssetAmount##')
      state.manageAssetAmount = action.payload.manageAssetAmount
    })
    .addCase(upDateNewPositionInfo, (state, action) => {
      state.newPositionInfo = action.payload.newPositionInfo
    }),
)
