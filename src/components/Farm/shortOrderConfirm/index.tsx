/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */

// import react, { useEffect } from 'react'
import { Modal, Button } from 'antd'
import '../../../style/Farm/shortOrderConfirm.less'
import waringPng from '../../../img/common/waring@2x.png'
import { useDispatch } from 'react-redux'
import { useFarmState } from 'state/farm/hooks'
import OrderNoifcation from '../../common/Notification'
import useModal from '../../../hooks/useModal'
import { useMintContract } from 'constants/hooks/useContract'
import { parseUnits } from 'ethers/lib/utils'
import { upDateTxHash } from 'state/farm/actions'
import { useCommonState } from 'state/common/hooks'
import { upDateOneAssetBaseInfo } from '../../../state/common/actions'
import { getOneAssetInfo } from 'utils/getList'
import { useActiveWeb3React } from 'hooks'
import { fixD, numToWei } from 'utils'
import FeeWarning from 'utils/feeWarning'
import { TradingTimer } from 'utils/commonComponents'
import { useTranslation } from 'react-i18next'
const defaultOnDismiss = () => null
const defaultOpenNotificationWithIcon = () => null
const defaultSetShortConfirm = () => null
const defaultSetShortConfirmBtn = () => null

type OrderConfirmModalProps = {
  onDismiss?: () => void
  openNotificationWithIcon?: (IconType: any) => void
  setShortConfirm?: (shortConfirm: any) => void
  setShortConfirmBtn?: (shortConfirmBtn: any) => void
}

const ShortOrderConfirm = ({
  onDismiss = defaultOnDismiss,
  openNotificationWithIcon = defaultOpenNotificationWithIcon,
  setShortConfirm = defaultSetShortConfirm,
  setShortConfirmBtn = defaultSetShortConfirmBtn,
}: OrderConfirmModalProps) => {
  const { t, i18n } = useTranslation()
  const farmState = useFarmState()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  const { account } = useActiveWeb3React()
  const [openNoifcation] = useModal(<OrderNoifcation type="success" title={t('ShortFarm')} from="farm"></OrderNoifcation>)
  const MintContract = useMintContract()
  const [openWaringNoifcation] = useModal(
    <OrderNoifcation type="warning" title={t('ShortFarm')} from="farm"></OrderNoifcation>,
  )
  const [openWaiting] = useModal(
    <OrderNoifcation type="waitings" title={t('ShortFarm')} from="farm" message={``}></OrderNoifcation>,
  )
  async function openPosition() {
    setShortConfirm(true)
    setShortConfirmBtn(true)
    const nAssetsInfo = commonState.assetBaseInfoObj[farmState.farmCoinStock]
    const cAssetInfo = commonState.assetBaseInfoObj[farmState.farmCoinSelect]

    const assetToken = nAssetsInfo.address
    const cAssetToken = cAssetInfo.address

    const cAssetAmount = parseUnits(farmState.farmTradeCollateral, cAssetInfo.decimals)
    const cRatio = Number(farmState.farmCollateralRatio) * 10

    const swapAmountMin = parseUnits(fixD(farmState.farmMinimumReceived, cAssetInfo.decimals).toString(), cAssetInfo.decimals)
    const newDate = new Date()
    const nowtime = newDate.getTime()
    const swapDeadline = Number(nowtime) + Number(farmState.deadline) * 60
    dispatch(upDateTxHash({ hash: '' }))
    try {
      openWaiting()
      const tx = await MintContract.openShortPosition(
        assetToken,
        cAssetToken,
        cAssetAmount,
        cRatio,
        swapAmountMin,
        swapDeadline,
      )
      dispatch(upDateTxHash({ hash: tx.hash }))
      setShortConfirmBtn(false)
      openNoifcation()
      const receipt = await tx.wait()
      if (receipt.status) {
        const assetNewInfo = await getOneAssetInfo(nAssetsInfo.name, assetToken, account, commonState.assetBaseInfoObj)
        const oneAssetInfo = { ...commonState.assetBaseInfoObj[nAssetsInfo.name], ...assetNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: oneAssetInfo }))
        const newInfo = await getOneAssetInfo(cAssetInfo.name, cAssetToken, account, commonState.assetBaseInfoObj)
        const onecAssetInfo = { ...commonState.assetBaseInfoObj[cAssetInfo.name], ...newInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: onecAssetInfo }))
        setShortConfirm(false)
        openNotificationWithIcon('success')
      } else {
        setShortConfirm(false)
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
      setShortConfirm(false)
      setShortConfirmBtn(false)
      return
    }
  }
  return (
    <Modal title={t('ShortFarm')} width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="short-order-confirm-conntent">
        <div className="price">
          <div>
            <img src={require(`../../../img/coin/${farmState.farmCoinStock}.png`).default} alt="" />
            <span>Short Assets</span>
          </div>
          <div className="mint-assets">
            {farmState.farmTradeAmount} <span>{farmState.farmCoinStock}</span>
          </div>
        </div>
        <div className="detail">
          <div className="detail-item">
            <div className="leabl">{t('CollateralRatio')}</div>
            <div className="text">{farmState.farmCollateralRatio}%</div>
          </div>
          <div className="detail-item">
            <div className="leabl">{t('Collateral')}</div>
            <div className="text">
              {farmState.farmTradeCollateral} {farmState.farmCoinSelect}
            </div>
          </div>
          <div className="detail-item">
            <div className="leabl">{t('Returned')}</div>
            <div className="text">
              {fixD(farmState.farmReturned, commonState.assetBaseInfoObj[farmState.farmCoinSelect].fixDPrecise)}{' '}
              {farmState.farmCoinSelect}
            </div>
          </div>
          {/* <div className="detail-item">
            <div className="leabl">Slippage Tolerance</div>
            <div className="text">{farmState.slippageTolerance}%</div>
          </div> */}
          <div className="detail-item">
            <div className="leabl">{t('MinimumReceived')}</div>
            <div className="text">
              {fixD(farmState.farmMinimumReceived, commonState.assetBaseInfoObj[farmState.farmCoinSelect].fixDPrecise)}{' '}
              {farmState.farmCoinSelect}
            </div>
          </div>
        </div>
        {commonState.feeRate == 0 ? null : <FeeWarning feeRate={commonState.feeRate}></FeeWarning>}
        {farmState.farmCoinStock == 'nETH' ? null : TradingTimer(t)}
        <Button className="confirm-btn">
          <span className="mintSpan" onClick={() => openPosition()}>
            {t('Confirm')}
          </span>
        </Button>
      </div>
    </Modal>
  )
}

export default ShortOrderConfirm
