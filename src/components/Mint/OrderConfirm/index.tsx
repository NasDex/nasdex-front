/** @format */

import react, {useEffect} from 'react'
import {Modal, Button} from 'antd'
import '../../../style/Mint/orderConfirm.less'
import notification from '../../../utils/notification'
import napplPng from '../../../img/coin/tencent.png'
import waringPng from '../../../img/common/waring@2x.png'
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

const OrderConfirm = ({
  onDismiss = defaultOnDismiss,
  openNotificationWithIcon = defaultOpenNotificationWithIcon,
}: OrderConfirmModalProps) => {
  const mintState = useMintState()
  const [openNoifcation] = useModal(<OrderNoifcation type="success" title="Mint nTENCT"></OrderNoifcation>)
  useEffect(() => {
    console.log(mintState, 'mintState##')
  }, [mintState])
  return (
    <Modal title="Order Confirm" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="order-confirm-conntent">
        <div className="price">
          <div>
            <img src={napplPng} alt="" />
            <span>Mint Assets</span>
          </div>
          <div className="mint-assets">
            {mintState.mintTradeAmount} <span>nTENCT</span>
          </div>
        </div>
        <div className="detail">
          <div className="detail-item">
            <div className="leabl">Collateral Ratio</div>
            <div className="text">{mintState.mintCollateralRatio}%</div>
          </div>
          <div className="detail-item">
            <div className="leabl">Collateral</div>
            <div className="text">
              {mintState.mintTradeCollateral} {mintState.mintCoinSelect}
            </div>
          </div>
          {/* <div className="detail-item">
            <div className="leabl">Tx Fee</div>
            <div className="text">--</div>
          </div> */}
        </div>
        <div className="warning">
          <img src={waringPng} alt="" />
          <span>A 1.5% fee of the minted value will be levied when the borrow position is closed</span>
        </div>
        <Button className="confirm-btn" onClick={openNoifcation}>
          <span className="mintSpan" onClick={() => openNotificationWithIcon('success')}>
            Mint
          </span>
        </Button>
      </div>
    </Modal>
  )
}

export default OrderConfirm
