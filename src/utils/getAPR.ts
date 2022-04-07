/** @format */

import { getLpDetailByAddress, nAssetShort } from "../constants/index"

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
) {
  const {assetBaseInfoObj, assetsNameInfo} = commonState
  let longPoolInfoItem: any = {}
  const info: any = {}
  let Reward: any
  let asset: any
  let assetNum: any
  let cAsset: any
  let cAssetNum: any
  const nsdxPerBlock = await MasterChefTestContract.nsdxPerBlock()
  const totalAllocPoint = await MasterChefTestContract.totalAllocPoint()
  if (ele.longId == '') {
    longPoolInfoItem = await MasterChefTestContract.poolInfo(Number(ele.id))
    Reward = await MasterChefTestContract.pendingNSDX(Number(ele.id), account)
    if (longPoolInfoItem && account) {
      info.longAllocPoint = longPoolInfoItem.allocPoint.toString()
      info.longToken = longPoolInfoItem.lpToken
    }
  } else {
    longPoolInfoItem = await LongStakingContract.poolInfo(Number(ele.longId))
    Reward = await LongStakingContract.pendingNSDX(Number(ele.longId), account)
    if (longPoolInfoItem && account) {
      info.longrootPid = longPoolInfoItem.rootPid.toString()
      info.longToken = longPoolInfoItem.lpToken
    }
    const longPoolInfoItemDetails = await MasterChefTestContract.poolInfo(info.longrootPid)
    if (longPoolInfoItemDetails && account) {
      info.longAllocPoint = longPoolInfoItemDetails.allocPoint.toString()
    }
  }
  const longContract = new ethers.Contract(info.longToken, lTokenAbi, library)
  const decimals = await longContract.decimals()
  const totalStaked = await longContract.totalSupply()
  const totalStakedNum = Number(formatUnits(totalStaked, decimals.toString()))
  const token0 = await longContract.token0()
  const token1 = await longContract.token1()
  const reserves = await longContract.getReserves()
  const token0Name = assetsNameInfo[token0]
  const token1Name = assetsNameInfo[token1]
  const reserves0 = Number(formatUnits(reserves[0], assetBaseInfoObj[token0Name].decimals))
  const reserves1 = Number(formatUnits(reserves[1], assetBaseInfoObj[token1Name].decimals))
  const amount = Number(formatUnits(longFarmingUserInfo.amount, assetBaseInfoObj[ele.name].decimals))
  if (token0 == assetBaseInfoObj[ele.cAssetName].address) {
    assetNum = Number(reserves1)
    cAssetNum = Number(reserves0)
    asset = (Number(amount) / totalStakedNum) * Number(reserves1)
    cAsset = (Number(amount) / totalStakedNum) * Number(reserves0)
  } else {
    assetNum = Number(reserves0)
    cAssetNum = Number(reserves1)
    asset = (Number(amount) / totalStakedNum) * Number(reserves0)
    cAsset = (Number(amount) / totalStakedNum) * Number(reserves1)
  }
  const longTvlF =
    assetNum * assetBaseInfoObj[ele.name].swapPrice + cAssetNum * assetBaseInfoObj[ele.cAssetName].unitPrice
  let longAprP: any
  const day = Number(formatUnits(nsdxPerBlock, 18)) * 43200
  if (Number(formatUnits(nsdxPerBlock, 18)) > 0 && longTvlF > 0) {
    longAprP = ((((day * Number(info.longAllocPoint)) / Number(totalAllocPoint)) * 365 * price.NSDX) / longTvlF) * 100
  } else {
    longAprP = ''
  }
  return {longAprP, info, longPoolInfoItem, Reward, asset, cAsset, totalStakedNum}
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
  lTokenAbi: any,
  ethers: any,
  library: any,
  commonState: any,
) {
  const {assetBaseInfoObj, assetsNameInfo} = commonState
  const nsdxPerBlock = await MasterChefTestContract.nsdxPerBlock()
  const info: any = {}
  let asset: any
  let cAsset: any
  let swapPrice: any
  const totalAllocPoint = await MasterChefTestContract.totalAllocPoint()
  const longPoolInfoItem = await LongStakingContract.poolInfo(Number(farmPoolItem.longId))
  if (longPoolInfoItem) {
    info.longrootPid = longPoolInfoItem.rootPid.toString()
    info.longToken = longPoolInfoItem.lpToken
  }
  const longPoolInfoItemDetails = await MasterChefTestContract.poolInfo(info.longrootPid)
  if (longPoolInfoItemDetails) {
    info.longAllocPoint = longPoolInfoItemDetails.allocPoint.toString()
  }
  const longContract = new ethers.Contract(info.longToken, lTokenAbi, library) // lp contract
  let longAprP: any
  const tokenPairInfo = await getLpDetailByAddress(info.longToken)
  const token0 = tokenPairInfo.tokenA
  const token1 = tokenPairInfo.tokenB
  // const token0 = await longContract.token0()
  // const token1 = await longContract.token1()
  const reserves = await longContract.getReserves()
  const token0Name = assetsNameInfo[token0]
  const token1Name = assetsNameInfo[token1]
  const reserves0 = Number(formatUnits(reserves[0], assetBaseInfoObj[token0Name]?.decimals))
  const reserves1 = Number(formatUnits(reserves[1], assetBaseInfoObj[token1Name]?.decimals))

  // debugger
  // if(farmPoolItem.name === 'nTSLA') {
  //   console.log(`Address ${info.longToken} , Reserves0 ${reserves0.toString()}, reserves1 ${reserves1.toString()}`)
  // }

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
  const nsdxPerBlock = await MasterChefTestContract.nsdxPerBlock()
  const {assetBaseInfoObj, assetName} = commonState
  const info: any = {}
  const totalAllocPoint = await MasterChefTestContract.totalAllocPoint()
  const shortPoolInfoItem = await ShortStakingContract.poolInfo(Number(farmPoolItem.shortId))
  if (shortPoolInfoItem) {
    info.rootPid = shortPoolInfoItem.rootPid.toString()
    info.shortToken = shortPoolInfoItem.shortToken
  }
  const shortPoolInfoItemDetails = await MasterChefTestContract.poolInfo(info.rootPid)
  if (shortPoolInfoItemDetails) {
    info.shortAllocPoint = shortPoolInfoItemDetails.allocPoint.toString()
  }
  const shortContract = new ethers.Contract(info.shortToken, lTokenAbi, library)
  const decimals = nAssetShort.find(s => s.address.toLowerCase() === info.shortToken.toLowerCase())?.decimal || 18
  const totalStaked = await shortContract.totalSupply()
  const totalStakedNum = Number(formatUnits(totalStaked, decimals.toString()))
  let shortAprP: any
  const shortTvlF = totalStakedNum * Number(oraclePrice)
  const day = Number(formatUnits(nsdxPerBlock, 18)) * 43200
  if (Number(formatUnits(nsdxPerBlock, 18)) > 0 && shortTvlF > 0) {
    shortAprP =
      ((((day * Number(info.shortAllocPoint)) / Number(Number(totalAllocPoint.toString()))) * 365 * price.NSDX) /
        shortTvlF) *
      100
  } else if (shortTvlF == 0) {
    shortAprP = '0'
  } else {
    shortAprP = ''
  }

  return {shortAprP, shortTvlF: shortTvlF == 0 ? '0' : shortTvlF}
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
