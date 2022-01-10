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
import { USDCaddress } from '../../constants/index'
import { useDispatch } from 'react-redux'
import Erc20Abi from '../../constants/abis/erc20.json'
import { getLibrary } from 'utils/getLibrary'
import { ethers } from 'ethers'
import { upDateOneAssetBaseInfo } from 'state/common/actions'
import {
  ETHOracleAddress,
  STAOracleAddress,
} from '../../constants/index'
import ETHOracle from '../../constants/abis/ETHOracle.json'
import STAOracle from '../../constants/abis/STAOracle.json'
import { useTranslation } from 'react-i18next'

const Profile: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const pageName = props.match.params.pageName
  const { account } = useWeb3React()
  const commonState = useCommonState()
  const dispatch = useDispatch()
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
    const provider = window.ethereum
    const library = getLibrary(provider)
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
      timer = setInterval(getBaseData(), 5000)
    }
    const priceTimer = setInterval(getpriceBaseData(), 30000)
    return () => {
      clearInterval(timer)
      clearInterval(priceTimer)
    }
  }, [account])
  return (
    <div className="profile-container">
      <div className="container-center">
        <Title title={t('Profile')} hasOpen hasAddress />
        <div className="profile-content">
          <div className="profile-data">
            {/* <ProfileCard priceList={priceList.NSDX}></ProfileCard> */}
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
