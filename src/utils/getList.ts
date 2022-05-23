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
  upDateAssetBaseInfoObj,
  updateLongFarmingInfo
} from 'state/common/actions'

// Please refer note.txt for v1 code
export async function getCommonAssetInfo(library: any ,account?: string | undefined | null) {
  const dispatch = store.dispatch

  // const provider = window.ethereum
  // const library = getLibrary(provider) || simpleRpcProvider
  // const assetBaseInfo: any = []
  const customProvider = simpleRpcProvider
  let assetBaseInfoArr: any = []

  // Get asset list from backend
  const config = await getAssetList()

  const assetBaseInfoObj = JSON.parse(JSON.stringify(config.assetPre))
  const assetsName: any = config.assetsNameInfoPre
  const longFarmingInfo: any = config.longFarmingInfoPre
  dispatch(updateDefaultCAsset({ defaultCAsset: config.default.cAsset }))
  dispatch(updateDefaultAsset({ defaultAsset: config.default.asset }))
  dispatch(upDateAssetBaseInfoObj({ assetBaseInfoObj: config.assetPre }))
  dispatch(upDateAssetsNameInfo({assetsNameInfo: assetsName}))
  dispatch(updateLongFarmingInfo({ longFarmingInfo: longFarmingInfo }))

  assetBaseInfoArr = Object.values(assetBaseInfoObj)
  const updatedList: any[] = []
  const updateAsset:any = {}

  // Checking for asset balance and allowance
  for (let i = 0; i < assetBaseInfoArr.length; i++) {
   
    const asset:any = assetBaseInfoArr[i]
   
    const assetContract = new ethers.Contract(asset.address, Erc20Abi, customProvider)

    const assetDecimal =  asset.decimals
    const assetType = asset.type
    const assetName = asset.name
    const assetAddress = asset.address

    if(account !== undefined && account !== null) {
      const balance = await getBalance(assetContract, account, assetDecimal)
      asset.balance = balance.balance

      // const _promises = []
      // _promises.push(getAllowance(assetContract, account, mintAddress, assetDecimal))
      // _promises.push(getAllowance(assetContract, account, SwapRouterAddress, assetDecimal))
      // _promises.push(getAllowance(assetContract, account, LongStakingAddress, assetDecimal))
      // const [mint, swap ] = await Promise.all(_promises)

      // asset.mintContractAllowance = mint.isAllowanceGranted 
      // asset.swapContractAllowance = swap.isAllowanceGranted
      // asset.longFarmAllowance = longFarm.isAllowanceGranted

      // Collateral asset which is not a stablecoin type
      const nonStablecoinCAsset = ['aUST']

      if (assetType === "asset" || nonStablecoinCAsset.includes(assetName)) {
        // Price oracle
        const oracleInfo = oracleList.find(i => i.assetKey === assetName)

        if (oracleInfo !== undefined) {
          const priceOracleContract = new ethers.Contract(oracleInfo.address, STAOracle, customProvider)
          const price = await priceOracleContract.latestRoundData()
          asset.oraclePrice = fixD(formatUnits(price.answer, oracleInfo.decimal), 4)
        }
      }
    }

    // Find swap price
    if(assetType === 'asset') {
      const swapPriceResult = await getSwapPrice(USDCaddress, assetAddress, "6", assetDecimal.toString(), library)
      const nAssetTokenPrice = swapPriceResult?.tokenPrice1 // nAssetIndex is 1 in the lp
      asset.swapPrice = nAssetTokenPrice
    } 

    updatedList.push(asset)
    updateAsset[assetName] = asset
  }

  const nonCAsset = ['WMATIC', 'NSDX']
  const cAssetsListInfo = updatedList.filter(a => !nonCAsset.includes(a.name) && a.type === 'cAsset')
  const assetsListInfo  = updatedList.filter(a => a.type === 'asset') 

  // dispatch(upDateAssetsNameInfo({ assetsNameInfo: assetsName }))
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

export async function getAllowance(contract:any, account:string, spender:string, decimal: string) {
  try {
    const allowanceRaw = await contract.allowance(account, spender)
    const allowance = formatUnits(allowanceRaw, decimal)
    const isAllowanceGranted = parseFloat(allowance) > 0
    return { allowance, allowanceRaw: allowanceRaw.toString(), isAllowanceGranted}
  } catch(err) {
    console.log(`Error`, err)
    return { allowance: "0", allowanceRaw: "0", isAllowanceGranted: false}
  }
}

export async function getSwapPrice(tokenAaddress: any, tokenBaddress: any, tokenADecimal = "18" , tokenBDecimal = "18", library: any) {
  try {
    if (tokenAaddress === undefined || tokenBaddress === undefined) {
      throw new Error(`Token A / Token B address is undefined`)
    }
    // const provider = window.ethereum
    // const library = getLibrary(provider) ?? simpleRpcProvider
    const lpInfo = getLpPairDetail(tokenAaddress, tokenBaddress)
    if (lpInfo === undefined) {
      // console.log(`LP info is undefined for ${tokenAaddress} and  ${tokenBaddress}, quit getSwapPrice()`)
      return
    }

    const lpAddress = lpInfo.lp
    const customProvider = simpleRpcProvider
    // console.log(`Provider at ${new Date().toString()} `, customProvider)
    // console.log(`lp address ${lpAddress}`)
    const contract = new ethers.Contract(lpAddress, lpContractAbi, customProvider)
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

    // console.log(`Refresh swap price for ${lpAddress} at ${new Date().toString()} , token0 ${tokenPrice0}, token1 ${tokenPrice1}`)

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

    return result

  } catch (err: any) {
    console.error(`Error in getSwapPrice() : `, err)
  }
}

export async function getOraclePrice(assetName: string) {
  try {
    if (assetName === undefined || assetName === "") {
      throw new Error(`Token A / Token B address is undefined`)
    }
    
    const oracleInfo = oracleList.find(i => i.assetKey.toLowerCase() === assetName.toLowerCase())
    if (oracleInfo === undefined) {
      console.log(`Oracle info is undefined for ${assetName}`)
      return
    }

    const customProvider = simpleRpcProvider
    const contract = new ethers.Contract(oracleInfo.address, STAOracle, customProvider)
    const price = await contract.latestRoundData()
    const decimals = await contract.decimals()
    const oraclePrice = fixD(formatUnits(price.answer, decimals), 4)

    return oraclePrice

  } catch (err: any) {
    console.error(`Error in getSwapPrice() : `, err)
  }
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

export async function totalSupply(assetAddress: string, assetDecimal = "18") {
  try {
    if (assetAddress === undefined || assetAddress === "") {
      throw new Error(`Asset address is undefined`)
    }
    
    const customProvider = simpleRpcProvider
    const contract = new ethers.Contract(assetAddress, Erc20Abi, customProvider)
    const totalSupplyRaw = await contract.totalSupply()
    const totalSupply = fixD(formatUnits(totalSupplyRaw, assetDecimal), 4)
   
    return { totalSupply, totalSupplyRaw}

  } catch (err: any) {
    console.error(`Error in totalSupply() : `, err)
  }
}
