/** @format */

import react, { useEffect, useState } from 'react'
import FarmBanner from '../../img/farm/light-banner@2x.png'
import Title from '../../components/Title'
import FarmPool from '../../components/Farm/farmPool'
import '../../style/Farm/index.less'
import { ethers } from 'ethers'
import { fixD, getpriceList } from 'utils'
import { upDateOneAssetBaseInfo } from 'state/common/actions'
import { useActiveWeb3React } from 'hooks'
import { getLibrary } from 'utils/getLibrary'
import { useCommonState, useProvider } from 'state/common/hooks'
import { useDispatch } from 'react-redux'
import ETHOracle from '../../constants/abis/ETHOracle.json'
import STAOracle from '../../constants/abis/STAOracle.json'
import { getSwapPrice } from 'utils/getList'
import {
  oracleList,
  SEOracleAddress,
  USDCaddress
} from '../../constants/index'
import { useStakeState } from 'state/stake/hooks'
import { useLpContract } from 'constants/hooks/useContract'
import { setPriceList } from 'state/stake/actions'
import Erc20Abi from '../../constants/abis/erc20.json'
import { formatUnits } from 'ethers/lib/utils'
import { useTranslation } from 'react-i18next'
import { simpleRpcProvider } from 'utils/providers'
const Farm = () => {
  const { t, i18n } = useTranslation()
  const { account } = useActiveWeb3React()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  // const provider = window.ethereum
  // const library = getLibrary(provider) ?? simpleRpcProvider
  const library = useProvider()
  const { assetBaseInfoObj } = commonState
  const stakeState = useStakeState()
  const { priceList } = stakeState
  const LPContract = useLpContract()
  async function initPrice() {
    const reservesValue = await LPContract.getReserves()
    let currencyANum: any
    let currencyBNum: any
    if (reservesValue && reservesValue[0]) {
      currencyANum = Number(formatUnits(reservesValue[0], 6))
    }
    if (reservesValue && reservesValue[1]) {
      currencyBNum = Number(formatUnits(reservesValue[1], 18))
    }
    dispatch(
      setPriceList({
        priceList: {
          NSDX: fixD(currencyANum / currencyBNum, 2),
        },
      }),
    )
  }
  async function                                                                                                                                                                                               initData() {
    let swapPrice: any
    let balance: any
    let oraclePrice: any

    if(commonState.allAssetsListInfo === undefined) {
      return
    }

    const nAsset = commonState.allAssetsListInfo.filter((a :any) => a.type === "asset")

    for (let i = 0; i < nAsset.length; i++) {
      const asset = commonState.allAssetsListInfo[i].name
      
      // Getting swap price
      const swapPriceObj = await getSwapPrice(
        USDCaddress, 
        commonState.assetBaseInfoObj[asset].address, 
        "6",
        commonState.assetBaseInfoObj[asset].decimals,
        library
      )
      if (swapPriceObj) {
        const token0Name = commonState.assetsNameInfo[swapPriceObj.token0]
        const token1Name = commonState.assetsNameInfo[swapPriceObj.token1]
        const reserves0 = Number(
          formatUnits(swapPriceObj.reserves[0], commonState.assetBaseInfoObj[token0Name]?.decimals),
        )
        const reserves1 = Number(
          formatUnits(swapPriceObj.reserves[1], commonState.assetBaseInfoObj[token1Name]?.decimals),
        )

        if (reserves0 == 0 && reserves1 == 0) {
          swapPrice = 0
        } else {
          if (swapPriceObj.token0 == commonState.assetBaseInfoObj[asset].address) {
            swapPrice = reserves1 / reserves0
          } else {
            swapPrice = reserves0 / reserves1
          }
        }
      }
    
      // Getting oracle price
      const oracleInfo = oracleList.find(i => i.assetKey === asset)
      const customProvider = simpleRpcProvider
      if (oracleInfo !== undefined) {
        const priceOracleContract = new ethers.Contract(oracleInfo.address, STAOracle, customProvider)
        const price = await priceOracleContract.latestRoundData()
        oraclePrice = fixD(formatUnits(price.answer, oracleInfo.decimal), 4)
      }
     
      const Info = { ...commonState.assetBaseInfoObj[asset], swapPrice, oraclePrice }
      dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: Info }))
    }
  }
  useEffect(() => {
    if(account !== undefined) {
      let timer: any
      const getBaseData = () => {
        initData()
        return getBaseData
      }
      initPrice()
      if (account) {
        timer = setInterval(getBaseData(), 30000)
      }
      return () => {
        clearInterval(timer)                 
      }
    }
  }, [])

  return (
    <div className="farm-container">
      <div className="container-center">
        <Title title={t('Farm')}></Title>
        <div className="farm-banner"></div>
        <FarmPool priceList={priceList}></FarmPool>
      </div>
    </div>
  )
}

export default Farm
