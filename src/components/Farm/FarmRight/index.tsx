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
const { TabPane } = Tabs

const FarmRight: React.FC<any> = props => {
  const { account } = useActiveWeb3React()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  const provider = window.ethereum
  const library = getLibrary(provider)
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
  // useEffect(() => {
  //   let timer: any
  //   const getBaseData = () => {
  //     getMintAssetBalance()
  //     return getBaseData
  //   }
  //   if (account) {
  //     timer = setInterval(getBaseData(), 5000)
  //   }
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [account])
  const tablieNav = [
    {
      label: 'Long',
    },
    {
      label: props.poolType.toString() === 'long' ? '' : 'Short',
    },
  ]
  const [headerActive, setHeaderActive] = useState(
    props.poolType.toString() === 'long' ? 'Long' : props.poolType.toString(),
  )
  const [openFarmSetting] = useModal(<FarmSetting from="farm"></FarmSetting>)

  function callback(key: string) {
    console.log(key)
  }
  function showTable(type: string) {
    switch (type) {
      case 'Long':
        return <Long cAssetName={props.cAssetName} assetName={props.assetName}></Long>
      case 'Short':
        return <Short cAssetName={props.cAssetName} assetName={props.assetName}></Short>
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
            onClick={() => setHeaderActive(ele.label)}>
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
