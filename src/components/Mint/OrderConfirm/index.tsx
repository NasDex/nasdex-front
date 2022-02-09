/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
// import react, { useEffect, useState } from 'react'
import { Modal, Button } from 'antd'
import '../../../style/Mint/orderConfirm.less'
import { useDispatch } from 'react-redux'
import { useMintState } from 'state/mint/hooks'
import { upDateTxHash } from 'state/mint/actions'
import OrderNoifcation from '../../common/Notification'
import useModal from '../../../hooks/useModal'
import { useMintContract } from 'constants/hooks/useContract'
import { parseUnits } from 'ethers/lib/utils'
import { useCommonState } from 'state/common/hooks'
import { upDateOneAssetBaseInfo } from '../../../state/common/actions'
import { getOneAssetInfo } from 'utils/getList'
import { useActiveWeb3React } from 'hooks'
import FeeWarning from 'utils/feeWarning'
import { TradingTimer } from 'utils/commonComponents'
import { useTranslation } from 'react-i18next'
const defaultOnDismiss = () => null
const defaultOpenNotificationWithIcon = () => null
const defaultSetMintConfirm = () => null
const defaultSetMintConfirmBtn = () => null
const defaultSetAmount = () => null
const defaultSetSliderValue = () => null
const defaultSetTradeCollateral = () => null

type OrderConfirmModalProps = {
  onDismiss?: () => void
  openNotificationWithIcon?: (IconType: any) => void
  setMintConfirm?: (mintConfirm: any) => void
  setMintConfirmBtn?: (mintConfirmBtn: any) => void
  mintCoinStock?: (mintCoinStock: any) => void
  mintCoinSelect?: (mintCoinSelect: any) => void
  mintTradeCollateral?: (mintTradeCollateral: any) => void
  mintTradeAmount?: (mintTradeAmount: any) => void
  mintCollateralRatio?: (mintCollateralRatio: any) => void
  setTradeCollateral?: (setTradeCollateral: any) => void
  setAmount?: (setAmount: any) => void
  setSliderValue?: (setSliderValue: any) => void
  safe?: string
}

const OrderConfirm = ({
  onDismiss = defaultOnDismiss,
  openNotificationWithIcon = defaultOpenNotificationWithIcon,
  setMintConfirm = defaultSetMintConfirm,
  setMintConfirmBtn = defaultSetMintConfirmBtn,
  setAmount = defaultSetAmount,
  setSliderValue = defaultSetSliderValue,
  setTradeCollateral = defaultSetTradeCollateral,
  safe

}: OrderConfirmModalProps) => {
  const { t, i18n } = useTranslation()
  const mintState = useMintState()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  const { account } = useActiveWeb3React()
  const [openWaringNoifcation] = useModal(
    <OrderNoifcation type="waring" title={t('MintAssets')} from="mint"></OrderNoifcation>,
  )
  const [openNoifcation] = useModal(<OrderNoifcation type="success" title={t('MintAssets')} from="mint"></OrderNoifcation>)
  const [openWaiting] = useModal(
    <OrderNoifcation
      type="waitings"
      title={t('MintAssets')}
      from="mint"
      message={`${t('Collateral')} <span>${mintState.mintTradeCollateral}</span> ${mintState.mintCoinSelect} ${t('tomint')} <span>${mintState.mintTradeAmount}</span> ${mintState.mintCoinStock}`}></OrderNoifcation>,
  )

  const MintContract = useMintContract()
  async function openPosition() {
    setMintConfirm(true)
    setMintConfirmBtn(true)
    const nAssetsInfo = commonState.assetBaseInfoObj[mintState.mintCoinStock]
    const cAssetInfo = commonState.assetBaseInfoObj[mintState.mintCoinSelect]
    const assetToken = nAssetsInfo.address
    const cAssetToken = cAssetInfo.address
    const cAssetAmount = parseUnits(mintState.mintTradeCollateral, cAssetInfo.decimals)
    const cRatio = Number(mintState.mintCollateralRatio) * 10
    dispatch(upDateTxHash({ hash: '' }))
    try {
      openWaiting()
      const tx = await MintContract.openPosition(assetToken, cAssetToken, cAssetAmount, cRatio)
      dispatch(upDateTxHash({ hash: tx.hash }))
      setMintConfirmBtn(false)
      openNoifcation()
      const receipt = await tx.wait()
      if (receipt.status) {
        const assetNewInfo = await getOneAssetInfo(nAssetsInfo.name, assetToken, account, commonState.assetBaseInfoObj)
        const oneAssetInfo = { ...commonState.assetBaseInfoObj[nAssetsInfo.name], ...assetNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: oneAssetInfo }))
        const newInfo = await getOneAssetInfo(cAssetInfo.name, cAssetToken, account, commonState.assetBaseInfoObj)
        const onecAssetInfo = { ...commonState.assetBaseInfoObj[cAssetInfo.name], ...newInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: onecAssetInfo }))
        setMintConfirm(false)
        openNotificationWithIcon('success')
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error')
      }
    } catch (error: any) {
      if (error.message.includes('transaction was replaced')) {
        const assetNewInfo = await getOneAssetInfo(nAssetsInfo.name, assetToken, account, commonState.assetBaseInfoObj)
        const oneAssetInfo = { ...commonState.assetBaseInfoObj[nAssetsInfo.name], ...assetNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: oneAssetInfo }))
        const newInfo = await getOneAssetInfo(cAssetInfo.name, cAssetToken, account, commonState.assetBaseInfoObj)
        const onecAssetInfo = { ...commonState.assetBaseInfoObj[cAssetInfo.name], ...newInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: onecAssetInfo }))
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error')
      }
      setMintConfirm(false)
      setMintConfirmBtn(false)
      return
    }
  }

  return (
    <Modal title={t('OrderConfirm')} width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="order-confirm-conntent">
        <div className="price">
          <div>
            <img src={require(`../../../img/coin/${mintState.mintCoinStock}.png`).default} alt="" />
            <span>{t('MintAssets')}</span>
          </div>
          <div className="mint-assets">
            {mintState.mintTradeAmount} <span>{mintState.mintCoinStock}</span>
          </div>
        </div>
        <div className="detail">
          <div className="detail-item">
            <div className="leabl">{t('CollateralRatio')}</div>
            <div className="text">{mintState.mintCollateralRatio}%</div>
          </div>
          <div className="detail-item">
            <div className="leabl">{t('Collateral')}</div>
            <div className="text">
              {mintState.mintTradeCollateral} {mintState.mintCoinSelect}
            </div>
          </div>
        </div>
        {commonState.feeRate == 0 ? null : <FeeWarning feeRate={commonState.feeRate}></FeeWarning>}
        {mintState.mintCoinStock == 'nETH' ? null : TradingTimer(t)}
        <Button className="confirm-btn">
          <span className="mintSpan" onClick={() => openPosition()}>
            {t('Mint')}
          </span>
        </Button>
      </div>
    </Modal>
  )
}

export default OrderConfirm
