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
import { useCommonState } from 'state/common/hooks'
import { useDispatch } from 'react-redux'
import ETHOracle from '../../constants/abis/ETHOracle.json'
import STAOracle from '../../constants/abis/STAOracle.json'
import { getSwapPrice } from 'utils/getList'
import {
  ETHOracleAddress,
  STAOracleAddress,
  USDCaddress
} from '../../constants/index'
import Erc20Abi from '../../constants/abis/erc20.json'
import { formatUnits } from 'ethers/lib/utils'
import { useTranslation } from 'react-i18next'
const Farm = () => {
  const { t, i18n } = useTranslation()
  const { account } = useActiveWeb3React()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  const provider = window.ethereum
  const library = getLibrary(provider)
  const { assetBaseInfoObj } = commonState
  const [priceList, setPriceList] = useState({ NSDX: '0.0' })
  async function initPrice() {
    const price = await getpriceList()
    // const price = {NSDX: '0.62'}
    setPriceList(price)
  }
  async function initData() {
    let swapPrice: any
    let balance: any
    let oraclePrice: any
    for (let i = 0; i < commonState.allAssetsListInfo.length; i++) {
      const asset = commonState.allAssetsListInfo[i].name
      const contract = new ethers.Contract(commonState.assetBaseInfoObj[asset].address, Erc20Abi, library)
      if (commonState.assetBaseInfoObj[asset] && account) {
        balance = formatUnits(await contract.balanceOf(account), commonState.assetBaseInfoObj[asset].decimals)
      }
      if (commonState.assetBaseInfoObj[asset].type == 'asset') {
        const swapPriceObj = await getSwapPrice(USDCaddress, commonState.assetBaseInfoObj[asset].address)
        if (swapPriceObj) {
          const token0Name = commonState.assetsNameInfo[swapPriceObj.token0]
          const token1Name = commonState.assetsNameInfo[swapPriceObj.token1]
          const reserves0 = Number(
            formatUnits(swapPriceObj.reserves[0], commonState.assetBaseInfoObj[token0Name].decimals),
          )
          const reserves1 = Number(
            formatUnits(swapPriceObj.reserves[1], commonState.assetBaseInfoObj[token1Name].decimals),
          )
          if (swapPriceObj.token0 == commonState.assetBaseInfoObj[asset].address) {
            swapPrice = reserves1 / reserves0
          } else {
            swapPrice = reserves0 / reserves1
          }
        }
        if (asset == 'nSTA') {
          const STAOracleContract = new ethers.Contract(STAOracleAddress, STAOracle, library)
          const STAOraclePrice = await STAOracleContract.latestRoundData()
          oraclePrice = fixD(formatUnits(STAOraclePrice.answer, 8), 4)
        } else if (asset == 'nETH') {
          const ETHOracleContract = new ethers.Contract(ETHOracleAddress, ETHOracle, library)
          const ETHOraclePrice = await ETHOracleContract.latestRoundData()
          oraclePrice = fixD(formatUnits(ETHOraclePrice.answer, 8), 4)
        }
      } else {
        if (asset == 'NSDX') {
          swapPrice = priceList.NSDX
        } else {
          swapPrice = ''
        }
      }
      const Info = { ...commonState.assetBaseInfoObj[asset], swapPrice, balance, oraclePrice }
      dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: Info }))
    }
  }
  useEffect(() => {
    let timer: any
    const getBaseData = () => {
      initData()
      return getBaseData
    }
    const getpriceBaseData = () => {
      initPrice()
      return getpriceBaseData
    }
    if (account) {
      timer = setInterval(getBaseData(), 30000)
    }
    const priceTimer = setInterval(getpriceBaseData(), 30000)
    return () => {
      clearInterval(timer)
      clearInterval(priceTimer)
    }
  }, [account])

  return (
    <div className="farm-container">
      <div className="container-center">
        <Title title={t('Farm')}></Title>
        <div className="farm-banner"></div>
        {/* <img  src={FarmBanner} alt="" /> */}
        <FarmPool></FarmPool>
      </div>
    </div>
  )
}

export default Farm
