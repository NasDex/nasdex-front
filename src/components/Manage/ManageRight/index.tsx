/** @format */

import react, { useState, useEffect } from 'react'
import '../../../style/Manage/manageRight.less'
import AddCollateral from '../ManageRight/addCollateral'
import Withdraw from '../ManageRight/withdraw'
import Close from '../ManageRight/close'
import { Tabs } from 'antd'
import { fixD } from 'utils'
import { upDatePositionInfo } from '../../../state/manage/actions'
import { upDateManageOpenConfirm } from '../../../state/common/actions'
import { useDispatch } from 'react-redux'
import { usePositionsContract, useMintContract, useMultiCallContract } from 'constants/hooks/useContract'
import { formatUnits } from 'ethers/lib/utils'
import CalculateRate from 'utils/calculateCollateral'
import { useActiveWeb3React } from 'hooks'
import { useManageState } from 'state/manage/hooks'
import { useCommonState } from 'state/common/hooks'
import useModal from 'hooks/useModal'
import Setting from '../../common/Setting'
import { useTranslation } from 'react-i18next'
import { getOraclePrice } from 'utils/getList'
const ProfileList: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const tablieNav = [
    {
      label: t('EditnAsset'),
      icon: '#edit',
    },
    {
      label: t('Collateral'),
      icon: '#withdraw',
    },
    {
      label: t('Close'),
      icon: '#redeem',
    },
  ]
  const dispatch = useDispatch()
  const { positionId } = props
  const manageState = useManageState()
  const commonState = useCommonState()
  const { assetBaseInfoObj } = commonState
  const assetsName = commonState.assetsNameInfo
  const [headerActive, setHeaderActive] = useState(`${t('EditnAsset')}`)
  const [pageName, setPageName] = useState(0)
  const [openFarmSetting] = useModal(<Setting from="farm"></Setting>)
  const { account } = useActiveWeb3React()
  const PositionsContract = usePositionsContract()
  const MintContract = useMintContract()
  const MultiCallContract = useMultiCallContract()
  const [positionInfo, setPositionInfo] = useState({
    assetTokenName: 'nSE',
    assetToken: '',
    cAssetToken: '',
    cAssetTokenName: 'USDC',
    assetAmount: '',
    cAssetAmount: '',
    cRatio: '',
    isShort: '',
  })

  async function getPosition() {
    if (positionId && account&&assetsName) {
      const position = await PositionsContract.getPosition(positionId)
      const feerate = (await MintContract.feeRate()) / 1000
      const assetsTokenName = assetsName[position.assetToken]
      const cAssetsTokenName = assetsName[position.cAssetToken]
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

      // oracle price
      const assetOraclePrice = await getOraclePrice(assetsTokenName)

      const result = {
        positionId: position.id.toString(),
        feerate: feerate,
        assetAmount: formatUnits(position.assetAmount, assetBaseInfoObj[assetsTokenName].decimals),
        assetAmountSub: assetAmountSub,
        assetToken: position.assetToken,
        cAssetAmount: formatUnits(position.cAssetAmount, assetBaseInfoObj[cAssetsTokenName].decimals),
        cAssetAmountSub: cAssetAmountSub,
        cAssetToken: position.cAssetToken,
        owner: position.owner,
        oraclePrice: assetOraclePrice,
        minCollateral: commonState.assetBaseInfoObj[assetsTokenName].minCollateral,
        minCollateralWarning: commonState.assetBaseInfoObj[assetsTokenName].minCollateral + 5,
        assetTokenName: assetsTokenName,
        cAssetTokenName: cAssetsTokenName,
        isShort: position.isShort,
        cRatio: CalculateRate(
          fixD(assetAmountSub, 6),
          fixD(cAssetAmountSub, 6),
          assetOraclePrice
        ),
      }
      if (result) {
        setPositionInfo(result)
        dispatch(upDatePositionInfo({ positionInfo: result }))
      }
      dispatch(upDateManageOpenConfirm({ manageOpenConfirm: false }))
    }
  }
  useEffect(() => {
    if (account) {
      getPosition()
    }
    if (commonState.manageOpenConfirm) {
      getPosition()
    }
  }, [account, commonState.manageOpenConfirm])
  useEffect(() => {
    setHeaderActive(tablieNav[pageName].label)
  }, [i18n.language])
  function showTable(type: string) {
    switch (type) {
      case `${t('EditnAsset')}`:
        return <AddCollateral positionInfo={positionInfo}></AddCollateral>
      case `${t('Collateral')}`:
        return <Withdraw positionInfo={positionInfo}></Withdraw>
      case `${t('Close')}`:
        return <Close positionInfo={positionInfo}></Close>
      default:
        break
    }
  }
  function HeaderActive(label: any, key: any) {
    setHeaderActive(label)
    setPageName(key)
  }
  return (
    <div className="manageRight-table-content">
      <ul className="table-header-tab">
        {tablieNav.map((ele, key) => (
          <li
            className={['header-tab-item', ele.label === headerActive ? 'header-tab-item-active' : null].join(' ')}
            key={key}
            onClick={() => HeaderActive(ele.label, key)}>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={ele.icon}></use>
            </svg>
            {ele.label}
          </li>
        ))}
        {positionInfo.isShort ? (
          <svg className="icon" aria-hidden="true" fill="#999999" onClick={openFarmSetting}>
            <use xlinkHref="#Icon-Set-Active"></use>
          </svg>
        ) : null}
      </ul>
      <div className="table-container">{showTable(headerActive)}</div>
    </div>
  )
}
export default ProfileList
