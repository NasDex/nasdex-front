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
  defaultAsset: any
  defaultCAsset: any
}

const initialState: ApplicationState = {
  defaultAsset: 'nETH',
  defaultCAsset: 'USDC',
  openConfirmManageSuccess: false,
  openWeb: false,
  manageOpenConfirm: false,
  assetsListInfo: [],
  cAssetsListInfo: [],
  allAssetsListInfo: [],
  profileSlippageTolerance: '0.1',
  profileMintDeadline: '20',
  feeRate: '',
  longFarmingInfo: [],
  assetsNameInfo: {},
  assetBaseInfoObj: {
    nSTA: {
      id: '0',
      name: 'nSTA',
      address: '0xed50Ce4259e4afa184D7d5b1d9e4A5244F12C58e',
      type: 'asset',
      balance: '',
      decimals: 18,
      unitPrice: 35,
      fixDPrecise: 18,
      oraclePrice: '',
    },
    nETH: {
      id: '1',
      name: 'nETH',
      address: '0xAE53Ad289fEf1Ff08d07c06808Fb3888150608b9',
      decimals: 18,
      type: 'asset',
      unitPrice: 35,
      fixDPrecise: 18,
      oraclePrice: '',
      balance: '',
    },
    USDC: {
      id: '4',
      name: 'USDC',
      address: '0x5E76EA44D394025126Fa3BDf30F7EBAbb1E27E35',
      decimals: 6,
      type: 'cAsset',
      unitPrice: 1,
      fixDPrecise: 6,
    },
    NSDX: {
      id: '5',
      name: 'NSDX',
      address: '0xd6936dc98c58c314cb2c5e2e9531fa9df437a3b4',
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
      // console.log(action.payload.assetBaseInfoObj,'action.payload.assetBaseInfoObj9888888898')
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
