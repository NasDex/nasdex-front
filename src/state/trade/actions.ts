/** @format */

import {createAction} from '@reduxjs/toolkit'

export const updateBlockNumber = createAction<{chainId: number; blockNumber: number}>('app/updateBlockNumber')

export const upDateTradeTradeAmount = createAction<{tradeTradeAmount: string}>('app/upDateTradeTradeAmount')
export const upDateTradeTradeCollateral = createAction<{tradeTradeCollateral: string}>('app/upDateTradeTradeCollateral')
export const upDateTradeCollateralRatio = createAction<{tradeCollateralRatio: string}>('app/upDateTradeCollateralRatio')
export const upDateTradeNowPrice = createAction<{tradeNowPrice: number}>('app/upDateTradeNowPrice')
export const upDateTradeCoinSelect = createAction<{tradeCoinSelect: string}>('app/upDateCoinSelect')
export const upDateCoinStock = createAction<{tradeCoinStock: string}>('app/upDateCoinStock')
export const upDateTradeDeadline = createAction<{deadline: string}>('app/upDateTradeDeadline')
export const upDateTradeSlippageTolerance = createAction<{slippageTolerance: string}>(
  'app/upDateTradeSlippageTolerance',
)
export const upDateIsTab = createAction<{isTab: boolean}>('app/upDateIsTab')
