/** @format */

import react, { useState, useEffect } from 'react'
import '../../../style/Farm/farmRight.less'
import Long from './long'
import Short from './short'
import { Tabs } from 'antd'
import useModal from 'hooks/useModal'
import FarmSetting from '../../common/Setting'
import { useActiveWeb3React } from 'hooks'
import { getLibrary } from 'utils/getLibrary'
import { useCommonState } from 'state/common/hooks'
import { ethers } from 'ethers'
import { LongStakingAddress, mintAddress, SwapRouterAddress } from 'constants/index'
import { formatUnits } from 'ethers/lib/utils'
import Erc20Abi from 'constants/abis/erc20.json'
import { upDateAssetBaseInfoObj } from 'state/common/actions'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { simpleRpcProvider } from 'utils/providers'
const { TabPane } = Tabs
type props = {
  poolType: any
  assetName: any
  cAssetName: any
  setLongOrShort: any
}

const FarmRight = ({
  poolType,
  assetName,
  cAssetName,
  setLongOrShort
}: props) => {
  const { account } = useActiveWeb3React()
  const { t, i18n } = useTranslation()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  const provider = window.ethereum
  const [pageName, setPageName] = useState(
    poolType.toString() == `${t('Short')}` ? 1 : 0)
  const library = getLibrary(provider) ?? simpleRpcProvider
  const assetBaseInfo: any = []
  const { assetBaseInfoObj } = commonState
  async function getMintAssetBalance() {
    const assetBalanceInfo = JSON.parse(JSON.stringify(assetBaseInfoObj))
    Object.keys(assetBalanceInfo).forEach(function (assetName) {
      assetBaseInfo.push(assetBalanceInfo[assetName])
    })
    for (let i = 0; i < assetBaseInfo.length; i++) {
      const asset = assetBaseInfo[i].name
      const contract = new ethers.Contract(assetBalanceInfo[asset].address, Erc20Abi, library)
      const balance = formatUnits(await contract.balanceOf(account), assetBaseInfoObj[asset].decimals)
      if (assetBalanceInfo[asset] && account) {
        assetBalanceInfo[asset].balance = balance
      }
    }
    dispatch(upDateAssetBaseInfoObj({ assetBaseInfoObj: assetBalanceInfo }))
  }
  const tablieNav = [
    {
      label: `${t('Long')}`,
    },
    {
      label: poolType.toString() == 'long' ? '' : `${t('Short')}`,
    },
  ]
  const [headerActive, setHeaderActive] = useState(
    poolType.toString() == 'long' ? `${t('Long')}` : poolType.toString(),
  )
  useEffect(() => {
    setHeaderActive(tablieNav[pageName].label)
    setLongOrShort(tablieNav[pageName].label)
  }, [i18n.language])

  function HeaderActive(label: any, key: any) {
    setHeaderActive(label)
    setLongOrShort(label)
    setPageName(key)
  }
  useEffect(() => {
    setLongOrShort(headerActive)
  }, [])
  const [openFarmSetting] = useModal(<FarmSetting from="farm"></FarmSetting>)

  function callback(key: string) {
    console.log(key)
  }
  function showTable(type: string) {
    switch (type) {
      case `${t('Long')}`:
        return <Long cAssetName={cAssetName} assetName={assetName}></Long>
      case `${t('Short')}`:
        return <Short cAssetName={cAssetName} assetName={assetName}></Short>
      default:
        break
    }
  }
  return (
    <div className="farmRight-table-content">
      <ul className="table-header-tab">
        {tablieNav.map((ele, key) => (
          <li
            className={['header-tab-item', ele.label === headerActive ? 'header-tab-item-active' : null].join(' ')}
            key={key}
            onClick={() => HeaderActive(ele.label, key)}>
            {ele.label}
          </li>
        ))}
        <svg className="icon" aria-hidden="true" fill="#999999" onClick={openFarmSetting}>
          <use xlinkHref="#Icon-Set-Active"></use>
        </svg>
      </ul>
      <div className="table-container">{showTable(headerActive)}</div>
    </div>
  )
}
export default FarmRight
