/** @format */

import {createAction} from '@reduxjs/toolkit'

export const updateBlockNumber = createAction<{chainId: number; blockNumber: number}>('app/updateBlockNumber')

export const upDateMintTradeAmount = createAction<{mintTradeAmount: string}>('app/upDateMintTradeAmount')
export const upDateMintTradeCollateral = createAction<{mintTradeCollateral: string}>('app/upDateMintTradeCollateral')
export const upDateMintCollateralRatio = createAction<{mintCollateralRatio: string}>('app/upDateMintCollateralRatio')
export const upDateMintNowPrice = createAction<{mintNowPrice: number}>('app/upDateMintNowPrice')
export const upDateCoinSelect = createAction<{mintCoinSelect: string}>('app/upDateCoinSelect')
export const upDateCoinStock = createAction<{mintCoinStock: string}>('app/upDateCoinStock')
export const upDateTxHash = createAction<{hash: any}>('app/upDateTxHash')
export const upDateMintSlippageTolerance = createAction<{slippageTolerance: any}>('app/updateMintSlippageTolerance')
export const upDateMintDeadline = createAction<{deadline: any}>('app/updateMintDeadline')
export const upDateMintInitInfo = createAction<{mintInitInfo: string}>('app/upDateMintInitInfo')
