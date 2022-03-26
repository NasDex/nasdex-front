/** @format */

import react, {useState, useEffect} from 'react'
import '../../style/Profile/profileList.less'
import {upDateFarmingPositionInfo} from 'state/common/actions'
import ProfileTable from '../Profile/positionTable'
import FarmingTable from '../Profile/farmingTable'
import StakingTable from '../Profile/stakingTable'
import HistoryTable from '../Profile/historyTable'
import Holding from '../Profile/holding'
import {Tabs} from 'antd'
import {usePositionsContract} from 'constants/hooks/useContract'
import {formatUnits} from 'ethers/lib/utils'
import {useCommonState} from 'state/common/hooks'
import {useDispatch} from 'react-redux'
import CalculateRate from '../../utils/calculateCollateral'
import {useWeb3React} from '@web3-react/core'
import {fixD} from 'utils'
import {useTranslation} from 'react-i18next'
const {TabPane} = Tabs
const ProfileList: React.FC<any> = props => {
  const {t, i18n} = useTranslation()
  const tablieNav = [
    {
      label: t('Positions'),
      icon: '#Positions',
    },
    {
      label: t('Holding'),
      icon: '#icon-Holding',
    },
    {
      label: t('Farming'),
      icon: '#profile-farming',
    },
  ]
  const [headerActive, setHeaderActive] = useState(`${t('Positions')}`)
  const [clickHeaderActive, setClickHeaderActive] = useState(false)
  const [pageName, setPageName] = useState(0)
  function callback(key: string) {
    console.log(key)
  }
  function showTable(type: string) {
    switch (type) {
      case `${t('Positions')}`:
        return <ProfileTable dataSource={dataSource} load={load}></ProfileTable>
      case `${t('Holding')}`:
        return <Holding></Holding>
      case `${t('Farming')}`:
        return <FarmingTable priceList={props.priceList}></FarmingTable>
      case 'Staking':
        return <StakingTable></StakingTable>
      case 'History':
        return <HistoryTable></HistoryTable>
      default:
        break
    }
  }
  const {account} = useWeb3React()
  const dispatch = useDispatch()
  const commonState = useCommonState()
  const {assetsNameInfo, assetBaseInfoObj} = commonState
  const PositionsContract = usePositionsContract()
  const [dataSource, setDataSource] = useState([])
  const [load, setLoad] = useState(true)
  async function getPositions(newaccount: any) {
    const startAt = 0
    const limit = 100
    const positionList = await PositionsContract.getPositions(newaccount, startAt, limit)
    const result: any = []
    const farmingPositionInfo: any = []
    positionList.forEach((position: any) => {
      if (position && position.id.toString() !== '0') {
        const assetsTokenName = assetsNameInfo[position.assetToken]
        const cAssetsTokenName = assetsNameInfo[position.cAssetToken]
        const assetAmountSub = Number(
          formatUnits(position.assetAmount, assetBaseInfoObj[assetsTokenName].decimals).substring(
            0,
            formatUnits(position.assetAmount, assetBaseInfoObj[assetsTokenName].decimals).indexOf('.') + 8,
          ),
        )
        const cAssetAmountSub = Number(
          formatUnits(position.cAssetAmount, assetBaseInfoObj[cAssetsTokenName].decimals).substring(
            0,
            formatUnits(position.cAssetAmount, assetBaseInfoObj[cAssetsTokenName].decimals).indexOf('.') + 8,
          ),
        )
        const cAssetAmountValue =
          commonState.assetBaseInfoObj[cAssetsTokenName].isNoNStableCoin == 0
            ? Number(formatUnits(position.cAssetAmount, assetBaseInfoObj[cAssetsTokenName].decimals)) *
              commonState.assetBaseInfoObj[cAssetsTokenName].unitPrice
            : Number(formatUnits(position.cAssetAmount, assetBaseInfoObj[cAssetsTokenName].decimals)) *
              commonState.assetBaseInfoObj[cAssetsTokenName].oraclePrice
        const value =
          Number(formatUnits(position.assetAmount, assetBaseInfoObj[assetsTokenName].decimals)) *
          commonState.assetBaseInfoObj[assetsTokenName].swapPrice

        result.push({
          key: position.id.toString(),
          assetAmount: formatUnits(position.assetAmount, assetBaseInfoObj[assetsTokenName].decimals),
          assetAmountSub: assetAmountSub,
          assetToken: position.assetToken,
          cAssetAmount: formatUnits(position.cAssetAmount, assetBaseInfoObj[cAssetsTokenName].decimals),
          cAssetAmountValue: cAssetAmountValue,
          cAssetAmountSub: cAssetAmountSub,
          cAssetToken: position.cAssetToken,
          owner: position.owner,
          oraclePrice:
            commonState.assetBaseInfoObj[cAssetsTokenName].isNoNStableCoin == 0
              ? commonState.assetBaseInfoObj[assetsTokenName].oraclePrice
              : fixD(
                  Number(commonState.assetBaseInfoObj[assetsTokenName].oraclePrice) /
                    Number(commonState.assetBaseInfoObj[cAssetsTokenName].oraclePrice),
                  2,
                ),
          minCollateral: commonState.assetBaseInfoObj[assetsTokenName].minCollateral,
          minCollateralWarning: Number(commonState.assetBaseInfoObj[assetsTokenName].minCollateral) + 5,
          assetValue: value,
          assetTokenName: assetsTokenName,
          cAssetTokenName: cAssetsTokenName,
          isShort: position.isShort,
          cRatio: CalculateRate(
            fixD(assetAmountSub, 6),
            fixD(cAssetAmountSub, 6),
            commonState.assetBaseInfoObj[assetsTokenName].oraclePrice,
          ),
        })
      }
      if (position.isShort) {
        farmingPositionInfo.push({
          positionId: position.id.toString(),
          isShort: position.isShort,
        })
      }
    })
    if (result && result.length > 0) {
      result.sort(function (a: any, b: any) {
        if (parseInt(a.cRatio) == parseInt(b.cRatio)) {
          return b.cAssetAmountSub - a.cAssetAmountSub
        } else {
          return a.cRatio - b.cRatio
        }
      })
      if (JSON.stringify(farmingPositionInfo) !== JSON.stringify(commonState.farmingPositionInfo)) {
        dispatch(upDateFarmingPositionInfo({farmingPositionInfo: farmingPositionInfo}))
      }
      setLoad(false)
      setDataSource(result)
    } else {
      setDataSource([])
      dispatch(upDateFarmingPositionInfo({farmingPositionInfo: []}))
      setLoad(false)
    }
  }
  useEffect(() => {
    let timer: any
    const getBaseData = () => {
      getPositions(account)
      return getBaseData
    }
    if (account) {
      timer = setInterval(getBaseData(), 5000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [account, commonState.farmingPositionInfo])
  useEffect(() => {
    if (!clickHeaderActive) {
      if (props.pageName) {
        setHeaderActive(props.pageName)
      }
    }
  }, [props])
  useEffect(() => {
    setHeaderActive(tablieNav[pageName].label)
  }, [i18n.language])
  function resetHeaderActive(pageName: any, key: any) {
    setClickHeaderActive(true)
    setHeaderActive(pageName)
    setPageName(key)
  }
  return (
    <div className="table-content">
      <ul className="table-header-tab">
        {tablieNav.map((ele, key) => (
          <li
            className={['header-tab-item', ele.label === headerActive ? 'header-tab-item-active' : null].join(' ')}
            key={key}
            onClick={() => resetHeaderActive(ele.label, key)}>
            <svg className="icon" aria-hidden="true" fill={ele.label === headerActive ? '#005AFF' : '#1C1C1C'}>
              <use xlinkHref={ele.icon}></use>
            </svg>
            {ele.label}
          </li>
        ))}
        <div className="farm"></div>
      </ul>
      <div className="table-container">{showTable(headerActive)}</div>
    </div>
  )
}
export default ProfileList
