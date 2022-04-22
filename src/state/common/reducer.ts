/** @format */

import { JsonRpcProvider, StaticJsonRpcProvider } from '@ethersproject/providers'
import {createReducer, nanoid} from '@reduxjs/toolkit'
import { USDCaddress, nAssetAddress, NSDXTestToken } from 'constants/index'
import { ethers } from 'ethers'
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
  updateDefaultCAsset,
  loadProvider,
  updateLongFarmingInfo,
  updatePricesRawData,
  updateSwapPrices,
  updateOraclePrices
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
  provider: any
  pricesRaw: any
  swapPrices: any
  oraclePrices: any
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
      address: nAssetAddress,
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
      address: USDCaddress,
      decimals: 6,
      type: 'cAsset',
      unitPrice: 1,
      fixDPrecise: 6,
    },
    NSDX: {
      id: '5',
      name: 'NSDX',
      address: NSDXTestToken,
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
  provider: undefined,
  pricesRaw: [],
  swapPrices: {},
  oraclePrices: {}
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
  .addCase(loadProvider, (state,action) => {
    const libraryProvider = action.payload.provider
    if(libraryProvider !== undefined) {
      const web3Provider = new ethers.providers.Web3Provider(libraryProvider)
      state.provider = web3Provider
    }
  })
  .addCase(updateLongFarmingInfo, (state, action) => {
    state.longFarmingInfo = action.payload.longFarmingInfo
  })
  .addCase(updatePricesRawData, (state, action) => {
    state.pricesRaw = action.payload.pricesRawData
  })
  .addCase(updateSwapPrices, (state, action) => {
    state.swapPrices = action.payload.swapPrices
  })
  .addCase(updateOraclePrices, (state, action) => {
    state.oraclePrices = action.payload.oraclePrices
  })
)
