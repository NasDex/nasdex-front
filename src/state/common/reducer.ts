/** @format */

import {createReducer, nanoid} from '@reduxjs/toolkit'
import {
  upDateOpenConfirmManageSuccess,
  upDateManageOpenConfirm,
  upDateAssetBaseInfoObj,
  upDateOneAssetBaseInfo,
  upDateFarmingPositionInfo,
  upDateAssetsNameInfo,
  upDateCAssetsListInfo,
  upDateAssetsListInfo,
  upDateAllAssetsListInfo,
  upDateProfileSlippageTolerance,
  upDateProfileMintDeadline,
  upDateCommonFee,
  upDateOpenWeb,
  updateDefaultAsset,
  updateDefaultCAsset
} from './actions'

export interface ApplicationState {
  openConfirmManageSuccess: boolean
  manageOpenConfirm: boolean
  openWeb: boolean
  assetBaseInfoObj: any
  farmingPositionInfo: any
  assetsNameInfo: any
  assetsListInfo: any
  cAssetsListInfo: any
  allAssetsListInfo: any
  longFarmingInfo: any
  profileSlippageTolerance: any
  profileMintDeadline: any
  feeRate: any
  defaultAsset: string
  defaultCAsset: string
}

const initialState: ApplicationState = {
  defaultAsset: 'nSE',
  defaultCAsset: 'USDC',
  openConfirmManageSuccess: false,
  openWeb: false,
  manageOpenConfirm: false,
  assetsListInfo: [],
  cAssetsListInfo: [],
  allAssetsListInfo: [],
  profileSlippageTolerance: '1',
  profileMintDeadline: '20',
  feeRate: '',
  longFarmingInfo: [],
  assetsNameInfo: {},
  assetBaseInfoObj: {
    nSE: {
      id: '0',
      name: 'nSE',
      address: '0xc7D14a939eE0265BEAB7456394E50Ccc6C665298',
      type: 'asset',
      balance: '',
      decimals: 18,
      unitPrice: 35,
      fixDPrecise: 18,
      oraclePrice: '',
    },
    USDC: {
      id: '4',
      name: 'USDC',
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      decimals: 6,
      type: 'cAsset',
      unitPrice: 1,
      fixDPrecise: 6,
    },
    NSDX: {
      id: '5',
      name: 'NSDX',
      address: '0xE8d17b127BA8b9899a160D9a07b69bCa8E08bfc6',
      decimals: 18,
      type: 'oneAsset',
      unitPrice: 1,
      fixDPrecise: 18,
    },
  },
  farmingPositionInfo: {
    positionId: '',
    isShort: false,
  },
}
export default createReducer(initialState, builder =>
  builder
    .addCase(upDateOpenConfirmManageSuccess, (state, action) => {
      state.openConfirmManageSuccess = action.payload.openConfirmManageSuccess
    })
    .addCase(upDateOpenWeb, (state, action) => {
      state.openWeb = action.payload.openWeb
    })
    .addCase(upDateManageOpenConfirm, (state, action) => {
      state.manageOpenConfirm = action.payload.manageOpenConfirm
    })
    .addCase(upDateAssetBaseInfoObj, (state, action) => {
      // console.log(action.payload.assetBaseInfoObj,'action.payload.assetBaseInfoObj11')
      state.assetBaseInfoObj = action.payload.assetBaseInfoObj
    })
    .addCase(upDateOneAssetBaseInfo, (state, action) => {
      // console.log(action.payload.oneAssetBaseInfo,'action.payload.oneAssetBaseInfoObj$$$$$$$')
      state.assetBaseInfoObj[action.payload.oneAssetBaseInfo.name] = action.payload.oneAssetBaseInfo
    })
    .addCase(upDateFarmingPositionInfo, (state, action) => {
      state.farmingPositionInfo = action.payload.farmingPositionInfo
    })
    .addCase(upDateAssetsNameInfo, (state, action) => {
      state.assetsNameInfo = action.payload.assetsNameInfo
    })
    .addCase(upDateAssetsListInfo, (state, action) => {
      state.assetsListInfo = action.payload.assetsListInfo
    })
    .addCase(upDateCAssetsListInfo, (state, action) => {
      state.cAssetsListInfo = action.payload.cAssetsListInfo
    })
    .addCase(upDateAllAssetsListInfo, (state, action) => {
      state.allAssetsListInfo = action.payload.allAssetsListInfo
    })
    .addCase(upDateProfileSlippageTolerance, (state, action) => {
      state.profileSlippageTolerance = action.payload.profileSlippageTolerance
    })
    .addCase(upDateProfileMintDeadline, (state, action) => {
      state.profileMintDeadline = action.payload.profileMintDeadline
    })
    .addCase(upDateCommonFee, (state, action) => {
      state.feeRate = action.payload.feeRate
    })
  .addCase(updateDefaultAsset, (state, action) => {
      state.defaultAsset = action.payload.defaultAsset
  })
  .addCase(updateDefaultCAsset, (state, action) => {
      state.defaultCAsset = action.payload.defaultCAsset
    })
)