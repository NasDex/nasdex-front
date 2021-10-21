/** @format */

import react, {useEffect} from 'react'
import {Modal, Button} from 'antd'
import '../../../style/Trade/sellOrderConfirm.less'
import notification from '../../../utils/notification'
import napplPng from '../../../img/coin/tencent.png'
import USDC from '../../../img/coin/USDC@2x.png'
import {useSelector} from 'react-redux'
import {AppState} from 'state'
import {SmartTVView} from 'react-device-detect'
import {useTradeState} from 'state/trade/hooks'
import OrderNoifcation from '../Notification/index'
import useModal from '../../../hooks/useModal'
import waringPng from '../../../img/common/waring@2x.png'

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
  const tradeState = useTradeState()
  const [openNoifcation] = useModal(<OrderNoifcation type="success" title="Mint nTENCT"></OrderNoifcation>)
  useEffect(() => {
    // console.log(tradeState, 'tradeState##')
  }, [tradeState])
  return (
    <Modal title="Trade" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="sell-order-confirm-conntent">
        <div className="price">
          <div>
            <img src={napplPng} alt="" />
            <span>Sell</span>
          </div>
          <div className="mint-assets">
            {/* {mintState.mintTradeAmount} <span>nTENCT</span> */}
            0.1 <span>nTENCT</span>
          </div>
        </div>
        <div className="longAdd">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-arrow-trade"></use>
          </svg>
        </div>
        <div className="price">
          <div>
            <img src={USDC} alt="" />
            <span>Receive</span>
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
            <div className="leabl">Slippage Tolerance</div>
            <div className="text">
              {tradeState.TradeSetting}%
            </div>
          </div>
          <div className="detail-item">
            <div className="leabl">Minimum received</div>
            <div className="text">56.6503 USDC</div>
          </div>
        </div>
        <div className="warning">
          <div>
            <img src={waringPng} alt="" />
            <span>
              Price Updated
            </span>
          </div>
          <button className="Accept">Accept</button>
        </div>
        <Button className="confirm-btn" onClick={openNoifcation} disabled>
          <span className="mintSpan" onClick={() => openNotificationWithIcon('success')}>
            Confirm
          </span>
        </Button>
      </div>
    </Modal>
  )
}

export default LongOrderConfirm
