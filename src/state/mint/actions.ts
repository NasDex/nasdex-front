/** @format */

import {createAction} from '@reduxjs/toolkit'

export const updateBlockNumber = createAction<{chainId: number; blockNumber: number}>('app/updateBlockNumber')

export const upDateMintTradeAmount = createAction<{mintTradeAmount: string}>('app/upDateMintTradeAmount')
export const upDateMintTradeCollateral = createAction<{mintTradeCollateral: string}>('app/upDateMintTradeCollateral')
export const upDateMintCollateralRatio = createAction<{mintCollateralRatio: string}>('app/upDateMintCollateralRatio')
export const upDateMintNowPrice = createAction<{mintNowPrice: number}>('app/upDateMintNowPrice')
export const upDateCoinSelect = createAction<{mintCoinSelect: string}>('app/upDateCoinSelect')
