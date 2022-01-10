/** @format */

import react, { useEffect, useState } from 'react'
import '../../style/Profile/card.less'
import { getAssetList } from 'utils/getList'
import { useWeb3React } from '@web3-react/core'
import { useCommonState } from 'state/common/hooks'
import { fixD } from 'utils'
import { getSwapPrice } from 'utils/getList'
import { getLibrary } from 'utils/getLibrary'
import { ethers } from 'ethers'
import Erc20Abi from '../../constants/abis/erc20.json'
import { NSDXTestToken, MasterChefTestAddress } from '../../constants'
import { formatUnits } from 'ethers/lib/utils'
import { useTranslation } from 'react-i18next'
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
  const [totalTvl, setTotalNum] = useState(0)
  const { account } = useWeb3React()
  const commonState = useCommonState()
  const provider = window.ethereum
  const library = getLibrary(provider)
  useEffect(() => {
    const getBaseData = () => {
      getTotalTVL()
      return getBaseData
    }
    const timer = setInterval(getBaseData(), 30000)
    return () => {
      clearInterval(timer)
    }
  }, [account, commonState.assetsListInfo])
  function thousands(num: any) {
    const str = num.toString()
    const reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    return str.replace(reg, "$1,")
  }
  async function getTotalTVL() {
    const assetValueInfo: any = []
    let totalAssetValue: any
    if (commonState.assetsListInfo.length > 0) {
      commonState.assetsListInfo.forEach(async (position: any) => {
        const asset = position.name
        const contract = new ethers.Contract(commonState.assetBaseInfoObj[asset].address, Erc20Abi, library)
        const totalNum = await contract.totalSupply()
        const totalAsset = formatUnits(totalNum, commonState.assetBaseInfoObj[asset].decimals)
        totalAssetValue = Number(totalAsset) * commonState.assetBaseInfoObj[asset].swapPrice
        assetValueInfo.push(totalAssetValue)
        setAssetValueArray(assetValueInfo)
      })
    }
    const assetNumInfo: any = []
    const config = await getAssetList()
    if (config.longFarmingInfo.length > 0) {
      let tvl: any
      config.longFarmingInfo.forEach(async (pool: any) => {
        const swapPriceObj = await getSwapPrice(
          commonState.assetBaseInfoObj[pool.cAssetName]?.address,
          commonState.assetBaseInfoObj[pool.name]?.address)
        if (swapPriceObj) {
          const token0Name = commonState.assetsNameInfo[swapPriceObj.token0]
          const token1Name = commonState.assetsNameInfo[swapPriceObj.token1]
          const reserves0 = Number(
            formatUnits(swapPriceObj.reserves[0], commonState.assetBaseInfoObj[token0Name]?.decimals),
          )
          const reserves1 = Number(
            formatUnits(swapPriceObj.reserves[1], commonState.assetBaseInfoObj[token1Name]?.decimals),
          )
          if (commonState.assetBaseInfoObj[token0Name].type == 'cAsset') {
            tvl = reserves0 * commonState.assetBaseInfoObj[token0Name]?.unitPrice +
              reserves1 * commonState.assetBaseInfoObj[token1Name]?.swapPrice

          } else {
            tvl = reserves0 * commonState.assetBaseInfoObj[token0Name]?.swapPrice +
              reserves1 * commonState.assetBaseInfoObj[token1Name]?.unitPrice
          }
        }
        assetNumInfo.push(tvl)
        setAssetNumArray(assetNumInfo)
      })
    }
  }
  async function getTotalValue(assetValueArray: any, assetNumArray: any) {
    const config = await getAssetList()
    if (assetNumArray.length == config.longFarmingInfo.length && assetValueArray.length == commonState.assetsListInfo.length) {
      const arr = assetNumArray.concat(assetValueArray)
      const sum = arr.reduce(function (a: any, b: any) {
        return a + b
      })
      const NSDXContract = new ethers.Contract(NSDXTestToken, Erc20Abi, library)
      const totalNadx = formatUnits(await NSDXContract.balanceOf(MasterChefTestAddress), commonState.assetBaseInfoObj['NSDX'].decimals)
      const NSDXtotalValue = Number(totalNadx) * props.priceList.NSDX
      const totalValue = sum + NSDXtotalValue
      setTotalNum(totalValue)
    }
  }
  useEffect(() => {
    getTotalValue(assetValueArray, assetNumArray)
  }, [assetValueArray, assetNumArray])
  return (
    <div className="card-list">
      <div className="priceTit">
        <p>{t('TVL')}: </p>
        <span className='symbol'>$</span>
        <span className='tvlNum'> {thousands(fixD(totalTvl, 2))}</span>
      </div>
      <div className="priceTit-nadx">
        <p>NSDX {t('Price')}:</p>
        <span className='symbol'>$</span>
        <span> {fixD(props.priceList.NSDX, 2)}</span>
      </div>
    </div>
  )
}
export default ProfileCard
