/** @format */

import {createAction} from '@reduxjs/toolkit'

export const updateBlockNumber = createAction<{chainId: number; blockNumber: number}>('app/updateBlockNumber')

export const upDateManageTradeAmount = createAction<{manageTradeAmount: string}>('app/upDateManageTradeAmount')
export const upDateManageTradeCollateral = createAction<{manageTradeCollateral: string}>(
  'app/upDateManageTradeCollateral',
)
export const upDateManageCollateralRatio = createAction<{manageCollateralRatio: string}>(
  'app/upDateManageCollateralRatio',
)
export const upDateManageNowPrice = createAction<{manageNowPrice: number}>('app/upDateManageNowPrice')
export const upDateCoinSelect = createAction<{manageCoinSelect: string}>('app/upDateCoinSelect')
export const upDateCoinStock = createAction<{manageCoinStock: string}>('app/upDateCoinStock')
export const upDatePositionInfo = createAction<{positionInfo: any}>('app/upPositionupPositionInfo')
export const upDateAssetAmount = createAction<{manageAssetAmount: string}>('app/upDateAssetAmount')
export const upDateNewPositionInfo = createAction<{newPositionInfo: string}>('app/upDateNewPositionInfo')
