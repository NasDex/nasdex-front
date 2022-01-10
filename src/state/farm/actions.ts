/** @format */

import {createAction} from '@reduxjs/toolkit'

export const updateBlockNumber = createAction<{chainId: number; blockNumber: number}>('app/updateBlockNumber')

export const upDateFarmTradeAmount = createAction<{farmTradeAmount: string}>('app/upDateFarmTradeAmount')
export const upDateFarmTradeCollateral = createAction<{farmTradeCollateral: string}>('app/upDateFarmTradeCollateral')
export const upDateFarmCollateralRatio = createAction<{farmCollateralRatio: string}>('app/upDateFarmCollateralRatio')
export const upDateFarmNowPrice = createAction<{farmNowPrice: number}>('app/upDateFarmNowPrice')
export const upDateFarmSwapPrice = createAction<{farmSwapPrice: number}>('app/upDateFarmSwapPrice')
export const upDateFarmCoinSelect = createAction<{farmCoinSelect: string}>('app/upDateFarmCoinSelect')
export const upDateCoinStock = createAction<{farmCoinStock: string}>('app/upDateCoinStock')
export const upDateFarmSlippageTolerance = createAction<{slippageTolerance: any}>('app/updateSlippageTolerance')
export const upDateFarmDeadline = createAction<{deadline: any}>('app/updateDeadline')
export const upDateFarmReturned = createAction<{farmReturned: string}>('app/upDateFarmReturned')
export const upDateFarmMinimumReceived = createAction<{farmMinimumReceived: string}>('app/upDateFarmMinimumReceived')
export const upDateTxHash = createAction<{hash: string}>('app/upDateTxHash')
export const upDateFarmInitInfo = createAction<{farmInitInfo: string}>('app/upDateFarmInitInfo')
// export const upDateFarmSwapPrice = createAction<{farmSwapPrice: number}>('app/upDateFarmSwapPrice')
