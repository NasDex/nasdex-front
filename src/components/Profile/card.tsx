/** @format */

import { useEffect, useState } from 'react'
import '../../style/Profile/card.less'
import { getAssetList, getOraclePrice, totalSupply } from 'utils/getList'
import { Skeleton } from 'antd'
import { useWeb3React } from '@web3-react/core'
import { useCommonState, useProvider } from 'state/common/hooks'
import { fixD } from 'utils'
import { getSwapPrice } from 'utils/getList'
import { ethers } from 'ethers'
import Erc20Abi from '../../constants/abis/erc20.json'
import { NSDXTestToken, MasterChefTestAddress } from '../../constants'
import { formatUnits } from 'ethers/lib/utils'
import { useLpContract } from 'constants/hooks/useContract'
import { useTranslation } from 'react-i18next'
import { simpleRpcProvider } from 'utils/providers'
interface ProfileCardProps {
  text?: string
  icon?: string
  bgImg?: string
  value?: string
  priceList?: any
}

const ProfileCard: React.FC<ProfileCardProps> = props => {
  const { t, i18n } = useTranslation()
  const [assetValueArray, setAssetValueArray] = useState([])
  const [assetNumArray, setAssetNumArray] = useState([])
  const [totalTvl, setTotalNum] = useState('')
  const { account } = useWeb3React()
  const commonState = useCommonState()
  // const provider = window.ethereum
  // const library = getLibrary(provider) ?? simpleRpcProvider
  const library = useProvider()
  const LPContract = useLpContract()

  // Start get total tvl when asset list info and long farming info are available
  useEffect(() => {
    if(commonState.assetsListInfo.length < 0) {
      console.log(`Missing nAssets`)
      return
    }
    if(commonState.longFarmingInfo.length < 0) {
      console.log(`Missing long farming info`)
      return
    }
    const getBaseData = () => {
      getTotalTVL()
      return getBaseData
    }
    const timer = setInterval(getBaseData(), 30000)
    return () => {
      clearInterval(timer)
    }
  }, [account, commonState.assetsListInfo, commonState.longFarmingInfo])

  // Getting total supply in each nAssets
  async function nAssetsPrices() {
    try {
      const nAssets = commonState.assetsListInfo
      const nAssetsTotalValues:any = [] // Total sum up of nAssets value
      if(nAssets.length > 0) {
        for(let i = 0; i < nAssets.length; i ++) {
          const nAssetAddress = nAssets[i].address
          const nAssetName = nAssets[i].name
          const nAssetDecimal = commonState.assetBaseInfoObj[nAssetName].decimals
  
          const _promises = []
          
          // Getting total supply
          _promises.push(totalSupply(nAssetAddress, nAssetDecimal))
          _promises.push(getOraclePrice(nAssetName))
  
          const result = await Promise.all(_promises)
          
          if(result.length > 0) {
            const totalSupply = result[0].totalSupply
            const oraclePrice = result[1]

            const totalnAssetValue = totalSupply * oraclePrice
            nAssetsTotalValues.push(totalnAssetValue)
          }
        }
        setAssetValueArray(nAssetsTotalValues)
      }
    } catch(err) {
      console.log(`Error in getting prices for nAsset`)
    }
  }

  // Getting total value for each nAssets lp pair
  async function nAssetsLpPairPrice() {
    try {
      const lpPairs = commonState.longFarmingInfo
      const lpPairsTotalValue:any = [] // Total sum up of nAssets value

      const nAssetAtZeroIndex = ["nTSLA"]

      if(lpPairs.length > 0) {
        for(let i = 0; i < lpPairs.length; i ++) {
          const lpPair = lpPairs[i]

          const token0Name = nAssetAtZeroIndex.includes(lpPair.name) ? lpPair.name : lpPair.cAssetName
          const token0Info = commonState.assetBaseInfoObj[token0Name]
          const token0Type = token0Info.type
          
          const token1Name = nAssetAtZeroIndex.includes(lpPair.name) ? lpPair.cAssetName : lpPair.name
          const token1Info = commonState.assetBaseInfoObj[token1Name]

          const swapPriceObj = await getSwapPrice(
            token0Info.address,
            token1Info.address,
            token0Info.decimals,
            token1Info.decimals,
            library
          )

          if(swapPriceObj === undefined) {
            throw new Error(`Swap price object is undefined`)
          }

          const { reserves0, reserves1, tokenPrice1, tokenPrice0} = swapPriceObj

          let tvl = 0
          if(token0Type === 'cAsset') {
            const token0UnitPrice = token0Info.unitPrice
            tvl = (parseFloat(reserves0) * token0UnitPrice) + (parseFloat(reserves1) * tokenPrice1)
            // console.log(`${token1Name}, tvl = (${parseFloat(reserves0)} * ${token0UnitPrice})  + (${parseFloat(reserves1)} * ${tokenPrice1}) `)
          } else {
            const token1UnitPrice = token1Info.unitPrice
            tvl = (parseFloat(reserves0) * tokenPrice0) + (parseFloat(reserves1) * token1UnitPrice)
            // console.log(`${token1Name}, tvl = (${parseFloat(reserves0)} * ${tokenPrice0})  + (${parseFloat(reserves1)} * ${token1UnitPrice}) `)
          }
          lpPairsTotalValue.push(tvl)
        }
        setAssetNumArray(lpPairsTotalValue)

      }
    } catch(err) {
      console.log(`Error in getting prices for nAsset`)
    }
  }


  async function getTotalTVL() {
    await nAssetsPrices()
    await nAssetsLpPairPrice()

    // const assetValueInfo: any = []
    // let totalAssetValue: any
    // const customProvider = simpleRpcProvider
    // if (commonState.assetsListInfo.length > 0) {
    //   commonState.assetsListInfo.forEach(async (position: any) => {
    //     const asset = position.name
    //     const contract = new ethers.Contract(commonState.assetBaseInfoObj[asset].address, Erc20Abi, customProvider)
    //     const totalNum = await contract.totalSupply()
    //     const totalAsset = formatUnits(totalNum, commonState.assetBaseInfoObj[asset].decimals)
    //     totalAssetValue = Number(totalAsset) * commonState.assetBaseInfoObj[asset].swapPrice
    //     assetValueInfo.push(totalAssetValue)
    //     setAssetValueArray(assetValueInfo)
    //   })
    // }
    // const assetNumInfo: any = []
    // const config = await getAssetList()
    // if (config.longFarmingInfoPre.length > 0) {
    //   let tvl: any
    //   config.longFarmingInfoPre.forEach(async (pool: any) => {
    //     const swapPriceObj = await getSwapPrice(
    //       commonState.assetBaseInfoObj[pool.cAssetName].address,
    //       commonState.assetBaseInfoObj[pool.name].address,
    //       commonState.assetBaseInfoObj[pool.cAssetName].decimals,
    //       commonState.assetBaseInfoObj[pool.name].decimals,
    //       library
    //     )
    //     if (swapPriceObj) {
    //       const token0Name = commonState.assetsNameInfo[swapPriceObj.token0]
    //       const token1Name = commonState.assetsNameInfo[swapPriceObj.token1]
    //       const reserves0 = Number(
    //         formatUnits(swapPriceObj.reserves[0], commonState.assetBaseInfoObj[token0Name]?.decimals),
    //       )
    //       const reserves1 = Number(
    //         formatUnits(swapPriceObj.reserves[1], commonState.assetBaseInfoObj[token1Name]?.decimals),
    //       )
        
    //       if (commonState.assetBaseInfoObj[token0Name]?.type == 'cAsset') {
    //         tvl = reserves0 * commonState.assetBaseInfoObj[token0Name]?.unitPrice +
    //           reserves1 * commonState.assetBaseInfoObj[token1Name]?.swapPrice
    //       } else {
    //         tvl = reserves0 * commonState.assetBaseInfoObj[token0Name]?.swapPrice +
    //           reserves1 * commonState.assetBaseInfoObj[token1Name]?.unitPrice
    //       }

    //       console.log(`${token1Name} tvl ${tvl}, type ${commonState.assetBaseInfoObj[token0Name]?.type}`)
    //     }
    //     assetNumInfo.push(tvl)
    //     setAssetNumArray(assetNumInfo)
    //   })
    // }
  }

  async function getTotalValue(assetValueArray: any, assetNumArray: any) {
    const config = await getAssetList()
    let tvl: any
    if (assetNumArray.length == config.longFarmingInfoPre.length && assetValueArray.length == commonState.assetsListInfo.length) {
      const arr = assetNumArray.concat(assetValueArray)
      const sum = arr.reduce(function (a: any, b: any) {
        return a + b
      })

      const customProvider = simpleRpcProvider
      
      // Total Staked Nasdex token
      const NSDXContract = new ethers.Contract(NSDXTestToken, Erc20Abi, customProvider)
      const totalNadx = formatUnits(await NSDXContract.balanceOf(MasterChefTestAddress), commonState.assetBaseInfoObj['NSDX']?.decimals)
      const NSDXtotalValue = Number(totalNadx) * props.priceList.NSDX

      // NSDX/USDC LP pair
      const reservesValue = await LPContract.getReserves()
      const token0 = await LPContract.token0()
      const token1 = await LPContract.token1()
      const token0Name = commonState.assetsNameInfo[token0]
      const token1Name = commonState.assetsNameInfo[token1]
      const reserves0 = Number(formatUnits(reservesValue[0], commonState.assetBaseInfoObj[token0Name].decimals))
      const reserves1 = Number(formatUnits(reservesValue[1], commonState.assetBaseInfoObj[token1Name].decimals))
      if (commonState.assetBaseInfoObj[token0Name]?.type == 'cAsset') {
        tvl = reserves0 * commonState.assetBaseInfoObj[token0Name]?.unitPrice +
          reserves1 * props.priceList.NSDX
      } else {
        tvl = reserves0 * props.priceList.NSDX +
          reserves1 * commonState.assetBaseInfoObj[token1Name]?.unitPrice
      }
      const totalValue = sum + NSDXtotalValue + tvl
      setTotalNum(totalValue)
    }
  }
  useEffect(() => {
    getTotalValue(assetValueArray, assetNumArray)
  }, [assetValueArray, assetNumArray])

  function thousands(num: any) {
    const str = num.toString()
    const reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    return str.replace(reg, "$1,")
  }
  return (
    <div className="card-list">
      <div className="priceTit">
        <p>{t('TVL')}: </p>
        <span className='symbol'>$</span>
        {!totalTvl ?
          <Skeleton active paragraph={{ rows: 0 }} /> :
          <span className='tvlNum'>{thousands(fixD(totalTvl, 2))}</span>
        }
      </div>
      <div className="priceTit-nadx">
        <p>NSDX {t('Price')}:</p>
        <span className='symbol'>$</span>
        <span> {props.priceList.NSDX ? fixD(props.priceList.NSDX, 2) : <Skeleton active paragraph={{ rows: 0 }} />}</span>
      </div>
    </div>
  )
}
export default ProfileCard
