/** @format */

import {createAction} from '@reduxjs/toolkit'



export const upDateManageOpenConfirm = createAction<{manageOpenConfirm: boolean}>('app/upDateManageOpenConfirm')
export const upDateOpenWeb = createAction<{openWeb: boolean}>('app/upDateOpenWeb')


export const upDateOpenConfirmManageSuccess = createAction<{openConfirmManageSuccess: boolean}>(
  'app/upDateOpenConfirmManageSuccess',
)
export const upDateAssetBaseInfoObj = createAction<{assetBaseInfoObj: any}>('app/upDateAssetBaseInfoObj')
export const upDateOneAssetBaseInfo = createAction<{oneAssetBaseInfo: any}>('app/upDateOneAssetBaseInfo')
export const upDateFarmingPositionInfo = createAction<{farmingPositionInfo: any}>('app/upDateFarmingPositionInfo')
export const upDateAssetsNameInfo = createAction<{assetsNameInfo: any}>('app/upDateAssetsNameInfo')
export const upDateAssetsListInfo = createAction<{assetsListInfo: any}>('app/upDateAssetsListInfo')
export const upDateCAssetsListInfo = createAction<{cAssetsListInfo: any}>('app/upDateCAssetsListInfo')
export const upDateAllAssetsListInfo = createAction<{allAssetsListInfo: any}>('app/upDateAllAssetsListInfo')
export const upDateProfileSlippageTolerance = createAction<{profileSlippageTolerance: string}>(
  'app/upDateProfileSlippageTolerance',
)
export const upDateProfileMintDeadline = createAction<{profileMintDeadline: string}>('app/upDateProfileMintDeadline')
export const upDateCommonFee = createAction<{feeRate: any}>('app/upDateCommonFee')
export const updateDefaultCAsset = createAction<{defaultCAsset: string}>('app/updateDefaultCAsset')
export const updateDefaultAsset = createAction<{defaultAsset: string}>('app/updateDefaultAsset')

