/** @format */

import react, {useEffect} from 'react'
import {Modal, Button} from 'antd'
import '../../../style/Farm/longOrderConfirm.less'
import notification from '../../../utils/notification'
import napplPng from '../../../img/coin/tencent.png'
import USDC from '../../../img/coin/USDC@2x.png'
import {useSelector} from 'react-redux'
import {AppState} from 'state'
import {SmartTVView} from 'react-device-detect'
import {useMintState} from 'state/mint/hooks'
import OrderNoifcation from '../Notification/index'
import useModal from '../../../hooks/useModal'

const defaultOnDismiss = () => null
const defaultOpenNotificationWithIcon = () => null

type OrderConfirmModalProps = {
  onDismiss?: () => void
  openNotificationWithIcon?: (IconType: any) => void
}

const LongOrderConfirm = ({
  onDismiss = defaultOnDismiss,
  openNotificationWithIcon = defaultOpenNotificationWithIcon,
}: OrderConfirmModalProps) => {
  const mintState = useMintState()
  const [openNoifcation] = useModal(<OrderNoifcation type="success" title="Mint nTENCT"></OrderNoifcation>)
  useEffect(() => {
    console.log(mintState, 'mintState##')
  }, [mintState])
  return (
    <Modal title="Long Farm" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="long-order-confirm-conntent">
        <div className="price">
          <div>
            <img src={napplPng} alt="" />
            <span>Deposit</span>
          </div>
          <div className="mint-assets">
            {/* {mintState.mintTradeAmount} <span>nTENCT</span> */}
            0.1 <span>nTENCT</span>
          </div>
        </div>
        <div className="longAdd">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-add"></use>
          </svg>
        </div>
        <div className="price">
          <div>
            <img src={USDC} alt="" />
            <span>Deposit</span>
          </div>
          <div className="mint-assets">
            {/* {mintState.mintTradeAmount} <span>nTENCT</span> */}
            56.6503 <span>USDC</span>
          </div>
        </div>
        <div className="detail">
          <div className="detail-item">
            <div className="leabl">Price</div>
            {/* <div className="text">{mintState.mintCollateralRatio}%</div> */}
            <div className="text"> 1 nTENCT = 10 USDC </div>
          </div>
          <div className="detail-item">
            <div className="leabl">Receive (Estimated)</div>
            <div className="text">
              {/* {mintState.mintTradeCollateral} {mintState.mintCoinSelect} */}0.123456 LP
            </div>
          </div>
          <div className="detail-item">
            <div className="leabl">Share of Pool</div>
            <div className="text">1%</div>
          </div>
        </div>
        <Button className="confirm-btn" onClick={openNoifcation}>
          <span className="mintSpan" onClick={() => openNotificationWithIcon('success')}>
            Confirm
          </span>
        </Button>
      </div>
    </Modal>
  )
}

export default LongOrderConfirm
