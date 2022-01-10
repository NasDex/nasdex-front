/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
// import react, { useEffect, useState } from 'react'
import { Modal, Button } from 'antd'
import '../../../style/Mint/orderConfirm.less'
import zhanweifu from '../../../img/common/zhanweifu.png'
import { useDispatch } from 'react-redux'
import { upDateTxHash } from 'state/mint/actions'
import { useManageState } from 'state/manage/hooks'
import { useFarmState } from 'state/farm/hooks'
import OrderNoifcation from '../../common/Notification'
import useModal from '../../../hooks/useModal'
import { useMintContract } from 'constants/hooks/useContract'
import { getOneAssetInfo } from 'utils/getList'
import { parseUnits } from 'ethers/lib/utils'
import { useCommonState } from 'state/common/hooks'
import { upDateOneAssetBaseInfo, upDateManageOpenConfirm } from '../../../state/common/actions'
import { useActiveWeb3React } from 'hooks'
import precision from 'utils/precision'
import { fixD, numToWei } from 'utils'
import FeeWarning from 'utils/feeWarning'
type IconType = 'success' | 'info' | 'error' | 'warning'
import Notification from '../../../utils/notification'
import { useTranslation } from 'react-i18next'
const defaultOnDismiss = () => null
const defaultOpenNotificationWithIcon = () => null
const defaultSetEditConfirm = () => null
const defaultSetEditConfirmBtn = () => null
const defaultSetCollateralConfirm = () => null
const defaultSetCollateralConfirmBtn = () => null
const txhash = () => null

type OrderConfirmModalProps = {
  onDismiss?: () => void
  openNotificationWithIcon?: (IconType: any) => void
  setEditConfirm?: (editConfirm: any) => void
  setEditConfirmBtn?: (editConfirmBtn: any) => void
  setCollateralConfirm?: (editConfirmBtn: any) => void
  setCollateralConfirmBtn?: (editConfirmBtn: any) => void
  confirmType?: string
}

const OrderConfirm = ({
  onDismiss = defaultOnDismiss,
  setEditConfirm = defaultSetEditConfirm,
  setEditConfirmBtn = defaultSetEditConfirmBtn,
  setCollateralConfirm = defaultSetCollateralConfirm,
  setCollateralConfirmBtn = defaultSetCollateralConfirmBtn,
  // openNotificationWithIcon = defaultOpenNotificationWithIcon,
  confirmType = '',
}: OrderConfirmModalProps) => {
  const { t, i18n } = useTranslation()
  const manageState = useManageState()
  const farmState = useFarmState()
  const { positionInfo } = manageState
  const commonState = useCommonState()
  const { assetBaseInfoObj } = commonState
  const { assetTokenName, cAssetTokenName, assetAmountSub, cAssetAmountSub } = positionInfo
  const assetTokenNameFixDPrecise = commonState.assetBaseInfoObj[assetTokenName].fixDPrecise
  const cAssetTokenNameFixDPrecise = commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise
  const openNotificationWithIcon = (type: IconType) => {
    Notification({
      type,
      message:
        confirmType === 'editNasset'
          ? Number(manageState.manageAssetAmount) -
            Number(fixD(assetAmountSub, assetTokenNameFixDPrecise)) >
            0
            ? positionInfo.isShort
              ? `${t('ManagePosition')} - ${t('Shorted')} ${fixD(
                Number(manageState.manageAssetAmount) -
                Number(fixD(assetAmountSub, assetTokenNameFixDPrecise)),
                assetTokenNameFixDPrecise,
              )} ${positionInfo.assetTokenName}`
              : `${t('ManagePosition')} - ${t('Mint')} ${fixD(
                Number(manageState.manageAssetAmount) -
                Number(fixD(assetAmountSub, assetTokenNameFixDPrecise)),
                assetTokenNameFixDPrecise,
              )} ${positionInfo.assetTokenName}`
            : `${t('ManagePosition')} - ${t('Burn')} ${fixD(
              fixD(Number(assetAmountSub), assetTokenNameFixDPrecise) -
              Number(manageState.manageAssetAmount),
              assetTokenNameFixDPrecise,
            )} ${positionInfo.assetTokenName}`
          : Number(manageState.manageTradeCollateral) -
            Number(fixD(cAssetAmountSub, cAssetTokenNameFixDPrecise)) >
            0
            ? `${t('ManagePosition')} - ${t('Increasecollateral')} ${fixD(
              Number(manageState.manageTradeCollateral) -
              Number(fixD(cAssetAmountSub, cAssetTokenNameFixDPrecise)),
              cAssetTokenNameFixDPrecise,
            )} ${positionInfo.cAssetTokenName} `
            : `${t('ManagePosition')} - ${t('Withdrawcollateral')} ${fixD(
              fixD(Number(cAssetAmountSub), cAssetTokenNameFixDPrecise) -
              Number(manageState.manageTradeCollateral),
              cAssetTokenNameFixDPrecise,
            )} ${positionInfo.cAssetTokenName}`,
    })
  }
  const [openWaringNoifcation] = useModal(
    <OrderNoifcation type="waring" title={t('MintAssets')} from="manage"></OrderNoifcation>,
  )
  const [openWaiting] = useModal(
    <OrderNoifcation
      type="waitings"
      title={`${t('ManagePosition')}`}
      from="manage"
      message={
        Number(manageState.manageAssetAmount) - Number(fixD(assetAmountSub, assetTokenNameFixDPrecise)) > 0
          ? positionInfo.isShort
            ? `${t('Shorted')} <span>${fixD(
              Number(manageState.manageAssetAmount) -
              Number(fixD(assetAmountSub, assetTokenNameFixDPrecise)),
              assetTokenNameFixDPrecise,
            )} ${positionInfo.assetTokenName}`
            : `${t('Mint')} <span>${fixD(
              Number(manageState.manageAssetAmount) -
              Number(fixD(assetAmountSub, assetTokenNameFixDPrecise)),
              assetTokenNameFixDPrecise,
            )} ${positionInfo.assetTokenName}`
          : `${t('Burn')} <span>${fixD(
            fixD(Number(assetAmountSub), assetTokenNameFixDPrecise) -
            Number(manageState.manageAssetAmount),
            assetTokenNameFixDPrecise,
          )} ${positionInfo.assetTokenName}`
      }></OrderNoifcation>,
  )
  const [openCollateralWaiting] = useModal(
    <OrderNoifcation
      type="waitings"
      title={`${t('ManagePosition')}`}
      from="manage"
      message={
        Number(manageState.manageTradeCollateral) -
          Number(fixD(cAssetAmountSub, cAssetTokenNameFixDPrecise)) >
          0
          ? `${t('Increasecollateral')} <span>${fixD(
            Number(manageState.manageTradeCollateral) -
            Number(fixD(cAssetAmountSub, cAssetTokenNameFixDPrecise)),
            cAssetTokenNameFixDPrecise,
          )} ${positionInfo.cAssetTokenName}</span>`
          : `${t('Withdrawcollateral')} <span> ${fixD(
            fixD(Number(cAssetAmountSub), cAssetTokenNameFixDPrecise) -
            Number(manageState.manageTradeCollateral),
            cAssetTokenNameFixDPrecise,
          )}  ${positionInfo.cAssetTokenName}</span>`
      }></OrderNoifcation>,
  )
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch()
  const [openNoifcation] = useModal(
    <OrderNoifcation type="success" title={`${t('ManagePosition')}`} from="manage"></OrderNoifcation>,
  )
  const MintContract = useMintContract()
  async function submitOrder() {
    if (confirmType === 'editNasset') {
      setEditConfirm(true)
      setEditConfirmBtn(true)
    } else {
      setCollateralConfirm(true)
      setCollateralConfirmBtn(true)
    }
    const cAssetInfo = commonState.assetBaseInfoObj[cAssetTokenName]
    const currentRatio = positionInfo.cRatio
    const nowRatio = manageState.manageCollateralRatio
    const positionId = positionInfo.positionId
    const positionAssetAmount = positionInfo.assetAmount
    const manageAssetAmount = Number(manageState.manageAssetAmount)
    const positioncAssetAmount = positionInfo.cAssetAmount
    const managecAssetAmount = Number(manageState.manageTradeCollateral)
    const newDate = new Date()
    const nowtime = newDate.getTime()
    let swapAmountMin
    let swapDeadline
    if (positionInfo.isShort) {
      swapAmountMin = parseUnits(fixD(farmState.farmMinimumReceived, cAssetInfo.decimals).toString(), cAssetInfo.decimals)
      swapDeadline = Number(nowtime) + Number(farmState.deadline) * 60
    } else {
      swapAmountMin = parseUnits(
        fixD(manageState.manageTradeCollateral, assetBaseInfoObj[cAssetTokenName].decimals).toString(), cAssetInfo.decimals)
      swapDeadline = Number(nowtime) + Number(20) * 60
    }
    dispatch(upDateTxHash({ hash: '' }))
    let asset
    try {
      let txhash
      if (confirmType === 'editNasset') {
        asset = positionInfo.assetTokenName
        if (currentRatio > nowRatio) {
          const assetAmount = parseUnits(
            precision.minus(manageAssetAmount, positionAssetAmount).toString(),
            assetBaseInfoObj[assetTokenName].decimals,
          )
          openWaiting()
          txhash = await MintContract.mint(positionId, assetAmount, swapAmountMin, swapDeadline)
        } else {
          const assetAmount = parseUnits(
            precision.minus(positionAssetAmount, manageAssetAmount).toString(),
            assetBaseInfoObj[assetTokenName].decimals,
          )
          openWaiting()
          txhash = await MintContract.burn(positionId, assetAmount)
        }
      } else {
        asset = positionInfo.cAssetTokenName
        if (currentRatio > nowRatio) {
          const cAssetAmount = parseUnits(
            precision.minus(positioncAssetAmount, managecAssetAmount).toString(),
            assetBaseInfoObj[cAssetTokenName].decimals,
          )
          openCollateralWaiting()
          txhash = await MintContract.withdraw(positionId, cAssetAmount)
        } else {
          const cAssetAmount = parseUnits(
            precision.minus(managecAssetAmount, positioncAssetAmount).toString(),
            assetBaseInfoObj[cAssetTokenName].decimals,
          )
          openCollateralWaiting()
          txhash = await MintContract.deposit(positionId, cAssetAmount)
        }
      }
      dispatch(upDateTxHash({ hash: txhash.hash }))
      openNoifcation()
      if (confirmType === 'editNasset') {
        setEditConfirmBtn(false)
      } else {
        setCollateralConfirmBtn(false)
      }
      const receipt = await txhash.wait()
      if (receipt.status) {
        dispatch(upDateManageOpenConfirm({ manageOpenConfirm: true }))
        const newInfo = await getOneAssetInfo(
          asset,
          commonState.assetBaseInfoObj[asset].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const oneAssetInfo = { ...commonState.assetBaseInfoObj[asset], ...newInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: oneAssetInfo }))
        if (confirmType === 'editNasset') {
          setEditConfirm(false)
        } else {
          setCollateralConfirm(false)
        }
        openNotificationWithIcon('success')
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error')
      }
    } catch (error: any) {
      if (error.message.includes('transaction was replaced')) {
        const newInfo = await getOneAssetInfo(
          asset,
          commonState.assetBaseInfoObj[asset].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const oneAssetInfo = { ...commonState.assetBaseInfoObj[asset], ...newInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: oneAssetInfo }))
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error')
      }
      if (confirmType === 'editNasset') {
        setEditConfirm(false)
        setEditConfirmBtn(false)
      } else {
        setCollateralConfirm(false)
        setCollateralConfirmBtn(false)
      }
      return
    }
  }

  return (
    <Modal title={t('OrderConfirm')} width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="order-confirm-conntent">
        <div className="price">
          <div>
            <img
              src={
                confirmType === 'editNasset'
                  ? assetTokenName
                    ? require(`../../../img/coin/${positionInfo.assetTokenName}.png`).default
                    : { zhanweifu }
                  : cAssetTokenName
                    ? require(`../../../img/coin/${positionInfo.cAssetTokenName}.png`).default
                    : { zhanweifu }
              }
              alt=""
            />
            <span>
              {confirmType === 'editNasset'
                ? positionInfo.isShort
                  ? `${t('Shorted')}`
                  : Number(manageState.manageAssetAmount) -
                    Number(fixD(assetAmountSub, assetTokenNameFixDPrecise)) >
                    0
                    ? `${t('MintAssets')}`
                    : `${t('MintAssets')}`
                : `${t('Collateral')}`}
            </span>
          </div>
          <div className="mint-assets">
            {confirmType === 'editNasset'
              ? Number(manageState.manageAssetAmount) - Number(fixD(assetAmountSub, assetTokenNameFixDPrecise)) > 0
                ? `+ ${fixD(
                  Number(manageState.manageAssetAmount) - Number(fixD(assetAmountSub, assetTokenNameFixDPrecise)),
                  assetTokenNameFixDPrecise,
                )} ${positionInfo.assetTokenName}`
                : `- ${fixD(
                  Number(fixD(assetAmountSub, assetTokenNameFixDPrecise) -
                    Number(manageState.manageAssetAmount)),
                  assetTokenNameFixDPrecise,
                )} ${positionInfo.assetTokenName}`
              : Number(manageState.manageTradeCollateral) -
                Number(fixD(cAssetAmountSub, assetTokenNameFixDPrecise)) >
                0
                ? `+ ${fixD(
                  Number(manageState.manageTradeCollateral) -
                  Number(fixD(cAssetAmountSub, cAssetTokenNameFixDPrecise)),
                  cAssetTokenNameFixDPrecise,
                )} ${positionInfo.cAssetTokenName}`
                : `- ${fixD(
                  Number(fixD(cAssetAmountSub, cAssetTokenNameFixDPrecise) -
                    Number(manageState.manageTradeCollateral)),
                  cAssetTokenNameFixDPrecise,
                )}  ${positionInfo.cAssetTokenName}`}
          </div>
        </div>
        <div className="detail">
          <div className="detail-item">
            <div className="leabl">{t('CollateralRatio')}</div>
            <div className="text">{manageState.manageCollateralRatio}%</div>
          </div>
          <div className="detail-item">
            <div className="leabl">
              {confirmType === 'editNasset' ? t('Collateral') : positionInfo.isShort ? t('Shorted') : t('MintAssets')}
            </div>
            <div className="text">
              {confirmType === 'editNasset'
                ? `${fixD(cAssetAmountSub, cAssetTokenNameFixDPrecise)} ${positionInfo.cAssetTokenName}`
                : `${fixD(assetAmountSub, assetTokenNameFixDPrecise)} ${positionInfo.assetTokenName}`}
            </div>
          </div>
        </div>
        {/* <FeeWarning feeRate={commonState.feeRate}></FeeWarning> */}
        <Button className="confirm-btn">
          <span className="mintSpan" onClick={() => submitOrder()}>
            {t('Confirm')}
          </span>
        </Button>
      </div>
    </Modal>
  )
}

export default OrderConfirm
