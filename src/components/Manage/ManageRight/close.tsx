/** @format */

import react, { useState, useEffect, useCallback } from 'react'
import '../../../style/Manage/close.less'
import { Select, Button, Skeleton } from 'antd'
import warning from '../../../img/mint/warning.png'
import { useActiveWeb3React } from 'hooks'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import { fixD } from 'utils'
import { useManageState } from 'state/manage/hooks'
import OrderNoifcation from '../../common/Notification'
import Notification from '../../../utils/notification'
import { useCommonState } from 'state/common/hooks'
import useModal from '../../../hooks/useModal'
import { useMintContract } from 'constants/hooks/useContract'
import { parseUnits } from 'ethers/lib/utils'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { upDateTxHash } from 'state/mint/actions'
type IconType = 'success' | 'info' | 'error' | 'warning'
import useApproveFarm from '../../common/approve/index'
import { mintAddress } from '../../../constants/index'
import { useTranslation } from 'react-i18next'

const { Option } = Select
const Close: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const manageState = useManageState()
  const commonState = useCommonState()
  const positionInfo = manageState.positionInfo
  const { assetTokenName, cAssetTokenName } = positionInfo
  const { login, logout } = useAuth()
  const { account } = useActiveWeb3React()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const MintContract = useMintContract()
  const [protoccolFee, setProtoccolFee] = useState('--')
  const [amountFee, setAmonutFee] = useState('--')
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openNoifcation] = useModal(
    <OrderNoifcation type="success" title={t('ClosePosition')} from="close"></OrderNoifcation>,
  )
  const [openWaringNoifcation] = useModal(
    <OrderNoifcation type="waring" title={t('ClosePosition')} from="close"></OrderNoifcation>,
  )
  const [openWaiting] = useModal(
    <OrderNoifcation
      type="waitings"
      title={t('ClosePosition')}
      from="close"
      message={`${t('Burn')} <span>${fixD(
        positionInfo.assetAmount,
        commonState.assetBaseInfoObj[assetTokenName].fixDPrecise,
      )}</span> ${positionInfo.assetTokenName} ${t('towithdraw')} <span>${fixD(
        positionInfo.cAssetAmount,
        commonState.assetBaseInfoObj[assetTokenName].fixDPrecise,
      )}</span> ${positionInfo.cAssetTokenName}`}></OrderNoifcation>,
  )
  const openNotificationWithIcon = (type: IconType, message: any) => {
    Notification({
      type,
      message,
    })
  }
  const { onApprove } = useApproveFarm(assetTokenName, mintAddress, 'mint')
  const [requestedApproval, setRequestedApproval] = useState(false)
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, account])

  async function burn() {
    setOpenConfirm(true)
    dispatch(upDateTxHash({ hash: '' }))
    try {
      const assetAmount = parseUnits(
        positionInfo.assetAmount.toString(),
        commonState.assetBaseInfoObj[assetTokenName].decimals,
      )
      openWaiting()
      const txhash = await MintContract.burn(positionInfo.positionId, assetAmount)
      dispatch(upDateTxHash({ hash: txhash.hash }))
      openNoifcation()
      const receipt = await txhash.wait()
      console.log(receipt, 'receipt##')
      if (receipt.status) {
        setOpenConfirm(false)
        openNotificationWithIcon('success', t('ClosePositionSuccessfully'))
      }
    } catch (error: any) {
      setOpenConfirm(false)
      if (!error.message.includes('transaction was replaced')) {
        openWaringNoifcation()
        openNotificationWithIcon('error', t('ClosePositionFailed'))
      }
      return
    }
  }

  useEffect(() => {
    const result = positionInfo.assetAmount * positionInfo.feerate * positionInfo.oraclePrice
    const amountFee = positionInfo.cAssetAmount - result
    setProtoccolFee(result.toString())
    setAmonutFee(amountFee.toString())
  }, [positionInfo.cAssetAmount])

  return (
    <div className="manageRight-close-container">
      <div className="tx-fee">
        <div className="item">
          <div className="tx-fee-text">{t('BurnAmount')}</div>
          <div className="tx-fee-price">
            {openConfirm ? (
              <Skeleton.Input style={{ width: 100, height: 20 }} active />
            ) : (
              fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise)
            )}{' '}
            {positionInfo.assetTokenName}
          </div>
        </div>
        <div className="item">
          <div className="tx-fee-text">{t('WithdrawAmount')}</div>
          <div className="tx-fee-price">
            {openConfirm ? (
              <Skeleton.Input style={{ width: 100, height: 20 }} active />
            ) : (
              fixD(amountFee, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise)
            )}{' '}
            {cAssetTokenName}
          </div>
        </div>
        {protoccolFee == '0' ? null : (
          <div className="item">
            <div className="tx-fee-text">{t('ProtoccolFee')}</div>
            <div className="tx-fee-price">
              {openConfirm ? (
                <Skeleton.Input style={{ width: 100, height: 20 }} active />
              ) : (
                fixD(protoccolFee, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise)
              )}{' '}
              {positionInfo.cAssetTokenName}
            </div>
          </div>
        )}
      </div>
      {Number(positionInfo.assetAmount) > Number(commonState.assetBaseInfoObj[assetTokenName]?.balance) ? (
        <div className="available">
          <NavLink
            to={`/trade/${positionInfo.cAssetTokenName}/${assetTokenName}`}
            activeClassName="active"
            className="content">
            <img src={warning} alt="" />
            <span>{t('Buy')} {positionInfo.assetTokenName} {t('toClosePosition')}</span>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#arrow"></use>
            </svg>
          </NavLink>
        </div>
      ) : null}

      {!account ? (
        <Button className="close" onClick={() => onPresentConnectModal()}>
          {t('Connect')}
        </Button>
      ) : Number(positionInfo.assetAmount) > Number(commonState.assetBaseInfoObj[assetTokenName]?.balance) ? (
        <Button disabled className="close">
          {t('Insufficient')}
        </Button>
      ) : commonState.assetBaseInfoObj[assetTokenName]?.mintContractAllowance ? (
        <Button
          className="close"
          onClick={() => burn()}
          disabled={
            positionInfo.assetAmount > commonState.assetBaseInfoObj[assetTokenName]?.balance || openConfirm
              ? true
              : false
          }>
          {t('Close')}
        </Button>
      ) : (
        <Button className="close" loading={requestedApproval} onClick={() => handleApprove()}>
          <span>{t('Approve')}</span>
        </Button>
      )}
    </div>
  )
}
export default Close
