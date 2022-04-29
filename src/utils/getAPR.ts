/** @format */

import { getLpDetailByAddress, longStakes, shortStakes } from "../constants/index"
import { simpleRpcProvider } from "./providers"

export async function getApr(
  price: any,
  ele: any,
  MasterChefTestContract: any,
  LongStakingContract: any,
  account: any,
  MasterChefTestAddress: any,
  LongStakingAddress: any,
  formatUnits: any,
  lTokenAbi: any,
  ethers: any,
  library: any,
  commonState: any,
  longFarmingUserInfo: any,
  swapPrices: any
) {
  const {assetBaseInfoObj, assetsNameInfo} = commonState
  // let longPoolInfoItem: any = {}
 
  // let Reward: any
  // let asset: any
  // let assetNum: any
  // let cAsset: any
  // let cAssetNum: any

  const info: any = {}

  const longId = ele.longId == '' ? ele.id : ele.longId
  const _promises = []

  _promises.push(MasterChefTestContract.nsdxPerBlock())
  _promises.push(MasterChefTestContract.totalAllocPoint())
  _promises.push( ele.longId == '' ? MasterChefTestContract.poolInfo(longId) : LongStakingContract.poolInfo(longId))
  _promises.push(LongStakingContract.pendingNSDX(Number(longId), account))

  const [nsdxPerBlock, totalAllocPoint, longPoolInfoItem, Reward] = await Promise.all(_promises)

  if(longPoolInfoItem !== undefined && account) {
    if (ele.longId == '') {
        info.longAllocPoint = longPoolInfoItem.allocPoint.toString()
        info.longToken = longPoolInfoItem.lpToken
    } else {
      
        info.longrootPid = longPoolInfoItem.rootPid.toString()
        info.longToken = longPoolInfoItem.lpToken

        const longPoolInfoItemDetails = await MasterChefTestContract.poolInfo(info.longrootPid)
        info.longAllocPoint = longPoolInfoItemDetails.allocPoint.toString()
    }
  }

  const customProvider = simpleRpcProvider
  const longContract =  new ethers.Contract(info.longToken, lTokenAbi, customProvider)
  const _longPromises = []
  _longPromises.push(longContract.totalSupply())
  _longPromises.push(longContract.token0())
  _longPromises.push(longContract.token1())
  _longPromises.push(longContract.getReserves())
  const [totalSupplyRaw, token0, token1, reserves] = await Promise.all(_longPromises)

  const reserves0 = parseFloat(formatUnits(reserves[0], 6))
  const reserves1 = parseFloat(formatUnits(reserves[1], 18))
  const totalSupply = parseFloat(formatUnits(totalSupplyRaw, 18))
  const amount = Number(formatUnits(longFarmingUserInfo.amount, 18))

  let assetNum = 0
  let cAssetNum = 0
  if (token0 == assetBaseInfoObj[ele.cAssetName].address) {
    assetNum = Number(reserves1)
    cAssetNum = Number(reserves0)
  } else {
    assetNum = Number(reserves0)
    cAssetNum = Number(reserves1)
  }

  const asset = (Number(amount) / totalSupply) * reserves0
  const cAsset = (Number(amount) / totalSupply) * Number(reserves1)

  const assetSwapPrice = swapPrices[`${ele.name}/USDC`]

  const longTvlF =
    assetNum * assetSwapPrice + cAssetNum * assetBaseInfoObj[ele.cAssetName].unitPrice
  let longAprP: any
  const day = Number(formatUnits(nsdxPerBlock, 18)) * 43200
  if (Number(formatUnits(nsdxPerBlock, 18)) > 0 && longTvlF > 0) {
    longAprP = ((((day * Number(info.longAllocPoint)) / Number(totalAllocPoint)) * 365 * price.NSDX) / longTvlF) * 100
  } else {
    longAprP = ''
  }

  return {longAprP, info, longPoolInfoItem, Reward, asset, cAsset, totalSupply}

  // const totalSupplyRaw = await 
  // const longTotalSupply = parseFloat(formatUnits(totalSupplyRaw, 18))

  // console.log(`Prices raw`, pricesRaw)
  // const prices = pricesRaw[`${ele.name}/USDC`]
  // const swapPrice = swapPrices[`${ele.name}/USDC`]

  // console.log(`Prices`, prices)
  // console.log(`Swap prices`, swapPrice)

  // if(prices !== undefined) {
  //   const reserves0 = parseFloat(formatUnits(prices.reserves0, 6))
  //   const reserves1 = parseFloat(formatUnits(prices.reserves1, 18))

  //   const userStakedAmountRaw = longFarmingUserInfo.amount
  //   const userStakedAmount = parseFloat(formatUnits(userStakedAmountRaw, 18))

  //   asset = (userStakedAmount / longTotalSupply ) * reserves0
  //   cAsset = (userStakedAmount / longTotalSupply ) * reserves1

  //   const longTvlF = reserves0 * 
  // //   assetNum * assetBaseInfoObj[ele.name].swapPrice + cAssetNum * assetBaseInfoObj[ele.cAssetName].unitPrice
  // }

  



  // const nsdxPerBlock = await MasterChefTestContract.nsdxPerBlock()
  // const totalAllocPoint = await MasterChefTestContract.totalAllocPoint()
  
  // if (ele.longId == '') {
  //   longPoolInfoItem = await MasterChefTestContract.poolInfo(Number(ele.id))
  //   Reward = await MasterChefTestContract.pendingNSDX(Number(ele.id), account)
  //   if (longPoolInfoItem && account) {
  //     info.longAllocPoint = longPoolInfoItem.allocPoint.toString()
  //     info.longToken = longPoolInfoItem.lpToken
  //   }
  // } else {
  //   console.log(`Long id ${Number(ele.longId)}`)
  //   longPoolInfoItem = await LongStakingContract.poolInfo(Number(ele.longId))
  //   console.log(longPoolInfoItem)
  //   Reward = await LongStakingContract.pendingNSDX(Number(ele.longId), account)
  //   if (longPoolInfoItem && account) {
  //     info.longrootPid = longPoolInfoItem.rootPid.toString()
  //     info.longToken = longPoolInfoItem.lpToken
  //   }
  //   const longPoolInfoItemDetails = await MasterChefTestContract.poolInfo(info.longrootPid)
  //   if (longPoolInfoItemDetails && account) {
  //     info.longAllocPoint = longPoolInfoItemDetails.allocPoint.toString()
  //   }
  // }
  // const customProvider = simpleRpcProvider
  // const longContract = new ethers.Contract(info.longToken, lTokenAbi, customProvider)
  // const decimals = await longContract.decimals()
  // const totalStaked = await longContract.totalSupply()
  // const totalStakedNum = Number(formatUnits(totalStaked, decimals.toString()))
  // const token0 = await longContract.token0()
  // const token1 = await longContract.token1()
  // const reserves = await longContract.getReserves()
  // const token0Name = assetsNameInfo[token0]
  // const token1Name = assetsNameInfo[token1]
  // const reserves0 = Number(formatUnits(reserves[0], assetBaseInfoObj[token0Name].decimals))
  // const reserves1 = Number(formatUnits(reserves[1], assetBaseInfoObj[token1Name].decimals))
  // const amount = Number(formatUnits(longFarmingUserInfo.amount, assetBaseInfoObj[ele.name].decimals))
  // if (token0 == assetBaseInfoObj[ele.cAssetName].address) {
  //   assetNum = Number(reserves1)
  //   cAssetNum = Number(reserves0)
  //   asset = (Number(amount) / totalStakedNum) * Number(reserves1)
  //   cAsset = (Number(amount) / totalStakedNum) * Number(reserves0)
  // } else {
  //   assetNum = Number(reserves0)
  //   cAssetNum = Number(reserves1)
  //   asset = (Number(amount) / totalStakedNum) * Number(reserves0)
  //   cAsset = (Number(amount) / totalStakedNum) * Number(reserves1)
  // }
  // const longTvlF =
  //   assetNum * assetBaseInfoObj[ele.name].swapPrice + cAssetNum * assetBaseInfoObj[ele.cAssetName].unitPrice
  // let longAprP: any
  // const day = Number(formatUnits(nsdxPerBlock, 18)) * 43200
  // if (Number(formatUnits(nsdxPerBlock, 18)) > 0 && longTvlF > 0) {
  //   longAprP = ((((day * Number(info.longAllocPoint)) / Number(totalAllocPoint)) * 365 * price.NSDX) / longTvlF) * 100
  // } else {
  //   longAprP = ''
  // }
  // return {longAprP, info, longPoolInfoItem, Reward, asset, cAsset, totalStakedNum}

  return null
}

export async function getNADXApr(farmPoolItem: any, MasterChefTestContract: any, account: any, formatUnits: any) {
  const info: any = {}
  const nsdxPerBlock = await MasterChefTestContract.nsdxPerBlock()
  const totalAllocPoint = await MasterChefTestContract.totalAllocPoint()
  const longFarmingUserInfo = await MasterChefTestContract.userInfo(Number(farmPoolItem.id), account)
  const longPoolInfoItem = await MasterChefTestContract.poolInfo(Number(farmPoolItem.id))
  if (longPoolInfoItem && account) {
    info.longAllocPoint = longPoolInfoItem.allocPoint.toString()
  }
  let longAprP: any
  const longTvlF = Number(formatUnits(longFarmingUserInfo.amount, 18))
  const day = Number(formatUnits(nsdxPerBlock, 18)) * 43200
  if (Number(formatUnits(nsdxPerBlock, 18)) > 0 && longTvlF > 0) {
    longAprP = ((((day * Number(info.longAllocPoint)) / Number(totalAllocPoint)) * 365) / longTvlF) * 100
  } else {
    longAprP = ''
  }
  return longAprP
}

export async function getCommonLongApr(
  price: any,
  farmPoolItem: any,
  MasterChefTestContract: any,
  LongStakingContract: any,
  account: any,
  LongStakingAddress: any,
  formatUnits: any,
  lpTokenAbi: any,
  ethers: any,
  library: any,
  commonState: any,
) {
  try {
    const {assetBaseInfoObj, assetsNameInfo} = commonState
    const nsdxPerBlock = await MasterChefTestContract.nsdxPerBlock()
    const info: any = {}
    let asset: any
    let cAsset: any
    let swapPrice: any
    const totalAllocPoint = await MasterChefTestContract.totalAllocPoint()
  
   
    // const longPoolInfoItem = await LongStakingContract.poolInfo(Number(farmPoolItem.longId))
    // if (longPoolInfoItem) {
    //   info.longrootPid = longPoolInfoItem.rootPid.toString()
    //   info.longToken = longPoolInfoItem.lpToken
    //   console.log(`Farm pool item ${longId}, root id ${info.longrootPid}, lpToken ${info.longToken}`)
    // }
    const longId = farmPoolItem.longId
    const longPoolInfoItem = longStakes.filter(l => l.longId === parseFloat(longId)) 
    if(longPoolInfoItem === undefined || longPoolInfoItem.length <= 0) {
      console.log(`Long pool info item is undefined`)
      return
    }
  
    const { lpToken, rootId } = longPoolInfoItem[0]
    const longPoolInfoItemDetails = await MasterChefTestContract.poolInfo(rootId)
    if (longPoolInfoItemDetails) {
      info.longAllocPoint = longPoolInfoItemDetails.allocPoint.toString()
    }
  
    // Create LP Contract
    const customProvider = simpleRpcProvider
    const longContract = new ethers.Contract(lpToken, lpTokenAbi, customProvider) // lp contract
    const reserves = await longContract.getReserves()
    const tokenPairInfo = await getLpDetailByAddress(lpToken)
    if(tokenPairInfo === null) {
      console.log(`Missing token pair info`)
      return
    }
    const token0 = tokenPairInfo.tokenA
    const reserves0 = Number(formatUnits(reserves[0], tokenPairInfo.tokenADecimal))
    const reserves1 = Number(formatUnits(reserves[1], tokenPairInfo.tokenBDecimal))
  
    if (reserves0 == 0 && reserves1 == 0) {
      asset = 0
      cAsset = 0
      swapPrice = 0
    } else {
      if (token0 == assetBaseInfoObj[farmPoolItem.cAssetName].address) {
        asset = Number(reserves1)
        cAsset = Number(reserves0)
        swapPrice = Number(reserves0) / Number(reserves1)
      } else {
        asset = Number(reserves0)
        cAsset = Number(reserves1)
        swapPrice = Number(reserves1) / Number(reserves0)
      }
    }
  
    const longTvlF = asset * swapPrice + cAsset * assetBaseInfoObj[farmPoolItem.cAssetName].unitPrice
    const day = Number(formatUnits(nsdxPerBlock, 18)) * 43200
    let longAprP: any
    if (Number(formatUnits(nsdxPerBlock, 18)) > 0 && longTvlF > 0) {
      longAprP =
        ((((day * Number(info.longAllocPoint)) / Number(totalAllocPoint.toString())) * 365 * Number(price.NSDX)) /
          longTvlF) *
        100
    } else if (longTvlF == 0) {
      longAprP = '0'
    } else {
      longAprP = ''
    }
  
    return {longAprP, swapPrice, longTvlF: longTvlF == 0 ? '0' : longTvlF}
  } catch(err) {
    console.log(`Error in farm`, err)
  }
}

export async function getCommonShortApr(
  oraclePrice: any,
  price: any,
  farmPoolItem: any,
  MasterChefTestContract: any,
  ShortStakingContract: any,
  account: any,
  MasterChefTestAddress: any,
  formatUnits: any,
  lTokenAbi: any,
  ethers: any,
  library: any,
  commonState: any,
) {
  try {
    const nsdxPerBlock = await MasterChefTestContract.nsdxPerBlock()
    const {assetBaseInfoObj, assetName} = commonState
    const info: any = {}
    const totalAllocPoint = await MasterChefTestContract.totalAllocPoint()
  
    // const shortPoolInfoItem = await ShortStakingContract.poolInfo(Number(farmPoolItem.shortId))
    // if (shortPoolInfoItem) {
    //   info.rootPid = shortPoolInfoItem.rootPid.toString()
    //   info.shortToken = shortPoolInfoItem.shortToken
  
    //   console.log(`Farm pool item short id ${farmPoolItem.shortId}, root id ${ info.rootPid}, short token ${info.shortToken.toString()}`)
    // }
    const shortId = farmPoolItem.shortId
    const shortPoolInfoItem = shortStakes.filter(s => s.shortId === parseFloat(shortId))
    if(shortPoolInfoItem === undefined || shortPoolInfoItem.length <= 0) {
      console.log(`Short pool info item is undefined`)
      return
    }
  
    const { shortToken, shortTokenDecimal, rootId } = shortPoolInfoItem[0]
    const shortPoolInfoItemDetails = await MasterChefTestContract.poolInfo(rootId)
    if (shortPoolInfoItemDetails) {
      info.shortAllocPoint = shortPoolInfoItemDetails.allocPoint.toString()
    }
  
    const customProvider = simpleRpcProvider
    const shortContract = new ethers.Contract(shortToken, lTokenAbi, customProvider)
    const totalStaked = await shortContract.totalSupply()
    const totalStakedNum = formatUnits(totalStaked, shortTokenDecimal)
  
    let shortAprP: any
    const shortTvlF = totalStakedNum * Number(oraclePrice)
    // console.log(`${farmPoolItem.name} shortTvlF , ${shortTvlF} = ${totalStakedNum} * ${oraclePrice}`)
    const day = Number(formatUnits(nsdxPerBlock, 18)) * 43200
    if (Number(formatUnits(nsdxPerBlock, 18)) > 0 && shortTvlF > 0) {
      shortAprP =
      ((((day * Number(info.shortAllocPoint)) / Number(Number(totalAllocPoint.toString()))) * 365 * price.NSDX) /
          shortTvlF) *
        100
      // console.log(`${farmPoolItem.name} shortAprP ${shortAprP}= ((((${day} * ${Number(info.shortAllocPoint)}) / ${Number(Number(totalAllocPoint.toString()))}) * 365 * ${price.NSDX}) /
      //   ${shortTvlF}) *
      // 100`)
    } else if (shortTvlF == 0) {
      shortAprP = '0'
    } else {
      //shortAprP = ''
    }
  
    return {shortAprP, shortTvlF: shortTvlF == 0 ? '0' : shortTvlF}
  } catch(err) {
    console.log(`Error get short apr`,err)
  }
}

export async function getRecevied(
  getSwapPrice: any,
  longTvlF: any,
  commonState: any,
  cAssetTokenName: any,
  assetTokenName: any,
  amount: any,
  formatUnits: any,
) {
  let swapPrice: any = {}
  let LPtotal
  let asset
  let cAsset
  if (assetTokenName == 'NSDX') {
    return false
  } else {
    swapPrice = await getSwapPrice(
      commonState.assetBaseInfoObj[cAssetTokenName].address,
      commonState.assetBaseInfoObj[assetTokenName].address,
    )
    if (swapPrice) {
      const token0Name = commonState.assetsNameInfo[swapPrice.token0]
      const token1Name = commonState.assetsNameInfo[swapPrice.token1]
      const reserves0 = Number(formatUnits(swapPrice.reserves[0], commonState.assetBaseInfoObj[token0Name].decimals))
      const reserves1 = Number(formatUnits(swapPrice.reserves[1], commonState.assetBaseInfoObj[token1Name].decimals))
      LPtotal = longTvlF
      const token0Type = commonState.assetBaseInfoObj[token0Name].type
      if (token0Type == 'asset') {
        asset = (Number(amount) / LPtotal) * Number(reserves0)
        cAsset = (Number(amount) / LPtotal) * Number(reserves1)
      } else {
        asset = (Number(amount) / LPtotal) * Number(reserves1)
        cAsset = (Number(amount) / LPtotal) * Number(reserves0)
      }
    }
    return {asset, cAsset}
  }
}
