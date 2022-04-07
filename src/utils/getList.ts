/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */

import { mintAddress, USDCaddress, SwapRouterAddress, LongStakingAddress, oracleList, getLpPairDetail } from 'constants/index'
import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { fixD } from 'utils'
import { getLibrary } from 'utils/getLibrary'
import STAOracle from 'constants/abis/STAOracle.json'
import Erc20Abi from 'constants/abis/erc20.json'
import lpContractAbi from 'constants/abis/lpContract.json'
import store from '../state/index'
import { simpleRpcProvider } from './providers'

import {
  upDateAssetsNameInfo,
  upDateCAssetsListInfo,
  upDateAssetsListInfo,
  upDateAllAssetsListInfo,
  updateDefaultCAsset,
  updateDefaultAsset,
  upDateAssetBaseInfoObj
} from 'state/common/actions'

// Please refer note.txt for v1 code
export async function getCommonAssetInfo(account?: string | undefined | null) {
  const dispatch = store.dispatch

  const provider = window.ethereum
  const library = getLibrary(provider) || simpleRpcProvider
  // const assetBaseInfo: any = []
  let assetBaseInfoArr: any = []

  // Get asset list from backend
  const config = await getAssetList()

  const assetBaseInfoObj = JSON.parse(JSON.stringify(config.assetPre))
  const assetsName: any = config.assetsNameInfoPre
  dispatch(updateDefaultCAsset({ defaultCAsset: config.default.cAsset }))
  dispatch(updateDefaultAsset({ defaultAsset: config.default.asset }))
  dispatch(upDateAssetBaseInfoObj({ assetBaseInfoObj: config.assetPre }))

  assetBaseInfoArr = Object.values(assetBaseInfoObj)
  const updatedList: any[] = []
  const updateAsset:any = {}

  // Checking for asset balance and allowance
  for (let i = 0; i < assetBaseInfoArr.length; i++) {
   
    const asset:any = assetBaseInfoArr[i]
   
    const assetContract = new ethers.Contract(asset.address, Erc20Abi, library)
    const assetDecimal =  asset.decimals
    const assetType = asset.type
    const assetName = asset.name
    const assetAddress = asset.address

    if(account !== undefined && account !== null) {
      const balance = await getBalance(assetContract, account, assetDecimal)

      const _promises = []
      _promises.push(getAllowance(assetContract, account, mintAddress, assetDecimal))
      _promises.push(getAllowance(assetContract, account, SwapRouterAddress, assetDecimal))
      _promises.push(getAllowance(assetContract, account, LongStakingAddress, assetDecimal))
      const [mint, swap, longFarm ] = await Promise.all(_promises)

      asset.balance = balance
      asset.mintContractAllowance = mint.isAllowanceGranted 
      asset.swapContractAllowance = swap.isAllowanceGranted
      asset.longFarmAllowance = longFarm.isAllowanceGranted

      // Collateral asset which is not a stablecoin type
      const nonStablecoinCAsset = ['aUST']

      if (assetType === "asset" || nonStablecoinCAsset.includes(assetName)) {
        // Price oracle
        const oracleInfo = oracleList.find(i => i.assetKey === assetName)

        if (oracleInfo !== undefined) {
          const priceOracleContract = new ethers.Contract(oracleInfo.address, STAOracle, library)
          const price = await priceOracleContract.latestRoundData()
          asset.oraclePrice = fixD(formatUnits(price.answer, oracleInfo.decimal), 4)
        }
      }
    }

    // Find swap price
    if(assetType === 'asset') {
      const swapPriceResult = await getSwapPrice(USDCaddress, assetAddress)
      const nAssetTokenPrice = swapPriceResult?.tokenPrice1 // nAssetIndex is 1 in the lp
      asset.swapPrice = nAssetTokenPrice
    } 

    updatedList.push(asset)
    updateAsset[assetName] = asset
  }

  const nonCAsset = ['WMATIC', 'NSDX']
  const cAssetsListInfo = updatedList.filter(a => !nonCAsset.includes(a.name) && a.type === 'cAsset')
  const assetsListInfo  = updatedList.filter(a => a.type === 'asset') 

  dispatch(upDateAssetsNameInfo({ assetsNameInfo: assetsName }))
  dispatch(upDateAssetsListInfo({ assetsListInfo: assetsListInfo }))
  dispatch(upDateCAssetsListInfo({ cAssetsListInfo: cAssetsListInfo }))
  dispatch(upDateAllAssetsListInfo({ allAssetsListInfo: updatedList }))
  dispatch(upDateAssetBaseInfoObj({ assetBaseInfoObj: updateAsset }))
}

async function getBalance(contract: any, account: string, decimal: string){
  const balanceRaw = await contract.balanceOf(account)
  const balance = formatUnits(balanceRaw, decimal)
  return { balance, balanceRaw: balanceRaw.toString() }
}

async function getAllowance(contract:any, account:string, spender:string, decimal: string) {
  const allowanceRaw = await contract.allowance(account, spender)
  const allowance = formatUnits(allowanceRaw, decimal)
  const isAllowanceGranted = parseFloat(allowance) > 0
  return { allowance, allowanceRaw: allowanceRaw.toString(), isAllowanceGranted}
}

export async function getSwapPrice(tokenAaddress: any, tokenBaddress: any, tokenADecimal = "18" , tokenBDecimal = "18") {
  try {
    if (tokenAaddress === undefined || tokenBaddress === undefined) {
      throw new Error(`Token A / Token B address is undefined`)
    }
    const provider = window.ethereum
    const library = getLibrary(provider) ?? simpleRpcProvider

    const lpInfo = getLpPairDetail(tokenAaddress, tokenBaddress)
    if (lpInfo === undefined) {
      throw new Error(`LP info is undefined`)
    }

    const lpAddress = lpInfo.lp
    const contract = new ethers.Contract(lpAddress, lpContractAbi, library)
    const reserves = await contract.getReserves()

    const reserves0Raw = reserves[0].toString()
    const reserves1Raw = reserves[1].toString()

    const reserves0 = formatUnits(reserves0Raw, tokenADecimal)
    const reserves1 = formatUnits(reserves1Raw, tokenBDecimal)

    let tokenPrice0 = 0
    let tokenPrice1 = 0

    if(parseFloat(reserves1) >0  &&  parseFloat(reserves0) > 0) {
      tokenPrice0 = parseFloat(reserves1) / parseFloat(reserves0)
      tokenPrice1 = parseFloat(reserves0) / parseFloat(reserves1)
    }

    const result = {
      token0: lpInfo.tokenA,
      token1: lpInfo.tokenB,
      reserves,
      result: lpAddress,
      reserves0,
      reserves1,
      tokenPrice0,
      tokenPrice1
    }

    console.log(`Get swap price at ${new Date().toString()}`, result)

    return result

  } catch (err: any) {
    console.error(`Error in getSwapPrice(): `, err)
  }
}

export async function getAssetList(): Promise<any> {
  const response = await fetch('https://beta-api.nasdex.xyz/config.json', {
    method: 'get',
  })
  const json = await response.json()
  if (json) {
    return json
  }
}

export async function getOneAssetInfo(asset: string, address: string, account: any, assetBaseInfoObj: any) {
  if (!account) {
    return false
  }
  const provider = window.ethereum
  const library = getLibrary(provider) ?? simpleRpcProvider
  const contract = new ethers.Contract(address, Erc20Abi, library)
  const balance = formatUnits(await contract.balanceOf(account), assetBaseInfoObj[asset].decimals)
  return { balance }
}