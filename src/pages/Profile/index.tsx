/** @format */

import react, { useEffect, useState } from 'react'
import ProfileCard from '../../components/Profile/card'
import CoinList from '../../components/Profile/coinList'
import Title from '../../components/Title'
import ProfileList from '../../components/Profile/profileList'
import { formatUnits } from 'ethers/lib/utils'
import '../../style/Profile/index.less'
import { useWeb3React } from '@web3-react/core'
import { fixD, getpriceList } from 'utils'
import { useCommonState } from 'state/common/hooks'
import { getSwapPrice } from 'utils/getList'
import { oracleList, USDCaddress } from '../../constants/index'
import { useDispatch } from 'react-redux'
import Erc20Abi from '../../constants/abis/erc20.json'
import { getLibrary } from 'utils/getLibrary'
import { ethers } from 'ethers'
import { useStakeState } from 'state/stake/hooks'
import { useLpContract } from 'constants/hooks/useContract'
import { setPriceList } from 'state/stake/actions'
import { upDateOneAssetBaseInfo } from 'state/common/actions'
import {
  ETHOracleAddress,
  SEOracleAddress,
} from '../../constants/index'
import ETHOracle from '../../constants/abis/ETHOracle.json'
import STAOracle from '../../constants/abis/STAOracle.json'
import { useTranslation } from 'react-i18next'
import { simpleRpcProvider } from 'utils/providers'

const Profile: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const pageName = props.match.params.pageName
  const { account } = useWeb3React()
  const commonState = useCommonState()
  const dispatch = useDispatch()
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
  async function initData() {
    let swapPrice: any
    let balance: any
    let oraclePrice: any
    const provider = window.ethereum
    const library = getLibrary(provider) ?? simpleRpcProvider
    for (let i = 0; i < commonState.allAssetsListInfo.length; i++) {
      const asset = commonState.allAssetsListInfo[i].name
      const contract = new ethers.Contract(commonState.assetBaseInfoObj[asset].address, Erc20Abi, library)
      if (commonState.assetBaseInfoObj[asset] && account) {
        balance = formatUnits(await contract.balanceOf(account), commonState.assetBaseInfoObj[asset].decimals)
      }
      if (
        commonState.assetBaseInfoObj[asset].type == 'asset' ||
        commonState.assetBaseInfoObj[asset].isNoNStableCoin == 1
      ) {
        const swapPriceObj = await getSwapPrice(USDCaddress, commonState.assetBaseInfoObj[asset].address)
        if (swapPriceObj) {
          const token0Name = commonState.assetsNameInfo[swapPriceObj.token0]
          const token1Name = commonState.assetsNameInfo[swapPriceObj.token1]
          const reserves0 = Number(
            formatUnits(swapPriceObj.reserves[0], commonState.assetBaseInfoObj[token0Name]?.decimals),
          )
          const reserves1 = Number(
            formatUnits(swapPriceObj.reserves[1], commonState.assetBaseInfoObj[token1Name]?.decimals),
          )
          if (swapPriceObj.token0 == commonState.assetBaseInfoObj[asset].address) {
            swapPrice = reserves1 / reserves0
          } else {
            swapPrice = reserves0 / reserves1
          }
        }

        const oracle = oracleList.find(ol => ol.assetKey == asset)
        if (oracle) {
          const contract = new ethers.Contract(oracle.address, STAOracle, library) 
          const price = await contract.latestRoundData()
          const decimals = await contract.decimals()
          oraclePrice = fixD(formatUnits(price.answer, decimals), 4)
        }

        // if (asset == 'nSE') {
        //   const SEOracleContract = new ethers.Contract(SEOracleAddress, STAOracle, library)
        //   const SEOraclePrice = await SEOracleContract.latestRoundData()
        //   oraclePrice = fixD(formatUnits(SEOraclePrice.answer, 8), 4)
        // }
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
    initPrice()
    if (account) {
      timer = setInterval(getBaseData(), 5000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [account])
  return (
    <div className="profile-container">
      <div className="container-center">
        <Title title={t('Profile')} hasOpen hasAddress />
        <div className="profile-content">
          <div className="profile-data">
            <ProfileCard priceList={priceList}></ProfileCard>
            <CoinList priceList={priceList}></CoinList>
          </div>
          <div className="profile-list">
            <ProfileList priceList={priceList} pageName={pageName}></ProfileList>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
