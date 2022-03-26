/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */

import {SEOracleAddress, ETHOracleAddress, mintAddress, USDCaddress, SwapFactoryAddress, SwapRouterAddress, LongStakingAddress} from 'constants/index'
import {ethers} from 'ethers'
import {formatUnits} from 'ethers/lib/utils'
import {fixD} from 'utils'
import {getLibrary} from 'utils/getLibrary'
import MintAbi from 'constants/abis/Mint.json'
import ETHOracle from 'constants/abis/ETHOracle.json'
import STAOracle from 'constants/abis/STAOracle.json'
import Erc20Abi from 'constants/abis/erc20.json'
import SwapFactoryAbi from 'constants/abis/swapFactory.json'
import lpContractAbi from 'constants/abis/lpContract.json'
import store from '../state/index'
import {simpleRpcProvider} from './providers'

import {
  upDateAssetBaseInfoObj,
  upDateAssetsNameInfo,
  upDateCAssetsListInfo,
  upDateAssetsListInfo,
  upDateAllAssetsListInfo,
  upDateCommonFee,
  upDateOpenWeb,
  updateDefaultCAsset,
  updateDefaultAsset
} from 'state/common/actions'
import { upDateCoinSelect as upDateMintCoinSelect, upDateCoinStock as upDateMintCoinStock } from 'state/mint/actions'
import { upDateFarmCoinSelect, upDateCoinStock as upDateFarmCoinStock } from 'state/farm/actions'
import { upDateTradeCoinSelect, upDateCoinStock as upDateTradeCoinStock } from 'state/trade/actions'
import { upDatePositionInfo} from 'state/manage/actions'
export async function getCommonAssetInfo(account?: string) {
  const dispatch = store.dispatch
  dispatch(upDatePositionInfo({ positionInfo: {
    assetTokenName: 'nSE',
    assetToken: '',
    cAssetToken: '',
    cAssetTokenName: 'USDC',
    assetAmount: '',
    cAssetAmount: '',
    cRatio: '',
    isShort: '',
  } }))
  dispatch(upDateMintCoinSelect({ mintCoinSelect: '' }))
  dispatch(upDateMintCoinStock({ mintCoinStock: '' }))
  dispatch(upDateFarmCoinSelect({ farmCoinSelect: '' }))
  dispatch(upDateFarmCoinStock({ farmCoinStock: '' }))
  dispatch(upDateTradeCoinSelect({ tradeCoinSelect: '' }))
  dispatch(upDateTradeCoinStock({ tradeCoinStock: '' }))
  dispatch(upDateOpenWeb({openWeb: false}))
  const provider = window.ethereum
  const library = getLibrary(provider) || simpleRpcProvider
  const assetBaseInfo: any = []
  let assetBaseInfoArr: any = []
  const config = await getAssetList()
  dispatch(updateDefaultCAsset({defaultCAsset: config.default.cAsset}))
  dispatch(updateDefaultAsset({ defaultAsset: config.default.asset }))
  const assetBaseInfoObj: any = config.assetPre
  Object.keys(assetBaseInfoObj).forEach(function (assetName) {
    assetBaseInfo.push(assetBaseInfoObj[assetName])
  })
  assetBaseInfoArr = assetBaseInfo
  const assetsName: any = config.assetsNameInfoPre
  const assetsListInfo: any = []
  const allAssetsListInfo: any = []
  const cAssetsListInfo: any = []
  for (let i = 0; i < assetBaseInfoArr.length; i++) {
    const asset = assetBaseInfoArr[i].name
    if (account) {
      const contract = new ethers.Contract(assetBaseInfoObj[asset].address, Erc20Abi, library)
      const balance = formatUnits(await contract.balanceOf(account), assetBaseInfoObj[asset].decimals)
      if (assetBaseInfoObj[asset] && account) {
        assetBaseInfoObj[asset].balance = balance
      }
      const result = await contract.allowance(account, mintAddress)
      const allowance = Number(formatUnits(result.toString(), assetBaseInfoObj[asset].decimals))
      if (allowance <= 0 && assetBaseInfoObj[asset]) {
        assetBaseInfoObj[asset].mintContractAllowance = false
      } else {
        assetBaseInfoObj[asset].mintContractAllowance = true
      }
      const swapResult = await contract.allowance(account, SwapRouterAddress)
      const swapContractAllowance = Number(formatUnits(swapResult.toString(), assetBaseInfoObj[asset].decimals))
      if (swapContractAllowance <= 0 && assetBaseInfoObj[asset]) {
        assetBaseInfoObj[asset].swapContractAllowance = false
      } else {
        assetBaseInfoObj[asset].swapContractAllowance = true
      }
      const longFarmResult = await contract.allowance(account, LongStakingAddress)
      const longFarmAllowance = Number(formatUnits(longFarmResult.toString(), assetBaseInfoObj[asset].decimals))
      if (longFarmAllowance <= 0 && assetBaseInfoObj[asset]) {
        assetBaseInfoObj[asset].longFarmAllowance = false
      } else {
        assetBaseInfoObj[asset].longFarmAllowance = true
      }
    }
    if (assetBaseInfoObj[asset].type == 'asset') {
      const swapPriceResult = await getSwapPrice(USDCaddress, assetBaseInfoObj[asset].address)
      if (swapPriceResult) {
        const token0Name = assetsName[swapPriceResult.token0]
        const token1Name = assetsName[swapPriceResult.token1]
        
        const reserves0 = Number(formatUnits(swapPriceResult.reserves[0], assetBaseInfoObj[token0Name].decimals))
        const reserves1 = Number(formatUnits(swapPriceResult.reserves[1], assetBaseInfoObj[token1Name].decimals))

        if (swapPriceResult.token0 == assetBaseInfoObj[asset].address) {
          assetBaseInfoObj[asset].swapPrice = reserves1 / reserves0
        } else {
          assetBaseInfoObj[asset].swapPrice = reserves0 / reserves1
        }
      }
    }
    if (assetBaseInfoObj[asset].type == 'asset') {
      assetsListInfo.push(assetBaseInfoObj[asset])
    } else {
      if (assetBaseInfoObj[asset].name !== 'WMATIC') {
        if (assetBaseInfoObj[asset].name !== 'NSDX') {
          cAssetsListInfo.push(assetBaseInfoObj[asset])
        }
      }
    }
    allAssetsListInfo.push(assetBaseInfoObj[asset])
  }

  const MintContract = new ethers.Contract(mintAddress, MintAbi, library)
  const feerate = (await MintContract.feeRate()) / 1000
  const SEOracleContract = new ethers.Contract(SEOracleAddress, STAOracle, library)
  const SEOraclePrice = await SEOracleContract.latestRoundData()
  assetBaseInfoObj['nSE'].oraclePrice = fixD(formatUnits(SEOraclePrice.answer, 8), 4)
  dispatch(upDateAssetsNameInfo({assetsNameInfo: assetsName}))
  dispatch(upDateAssetBaseInfoObj({assetBaseInfoObj: assetBaseInfoObj}))
  dispatch(upDateAssetsListInfo({assetsListInfo: assetsListInfo}))
  dispatch(upDateCAssetsListInfo({cAssetsListInfo: cAssetsListInfo}))
  dispatch(upDateAllAssetsListInfo({allAssetsListInfo: allAssetsListInfo}))
  dispatch(upDateCommonFee({feeRate: feerate * 100}))
}

export async function getAssetList(): Promise<any> {
  const response = await fetch('https://test-api.nasdex.xyz/config.json', {
    method: 'get',
  })
  const json = await response.json()
  if (json) {
    return json
  }
}

export async function getSwapPrice(tokenAaddress: any, tokenBaddress: any) {
  let price: any
  const provider = window.ethereum
  const library = getLibrary(provider)??simpleRpcProvider
  const swapFactoryContract = new ethers.Contract(SwapFactoryAddress, SwapFactoryAbi, library)
  const result = await swapFactoryContract.getPair(tokenAaddress, tokenBaddress)
  if (Number(formatUnits(result, 18)) > 0) {
    const contract = new ethers.Contract(result, lpContractAbi, library)
    const reserves = await contract.getReserves()
    const token0 = await contract.token0()
    const token1 = await contract.token1()
    return {token0, token1, reserves, result}
  }
}

export async function getOneAssetInfo(asset: string, address: string, account: any, assetBaseInfoObj: any) {
  if (!account) {
    return false
  }
  const provider = window.ethereum
  const library = getLibrary(provider)??simpleRpcProvider
  const contract = new ethers.Contract(address, Erc20Abi, library)
  const balance = formatUnits(await contract.balanceOf(account), assetBaseInfoObj[asset].decimals)
  return {balance}
}

