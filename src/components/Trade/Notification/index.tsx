/** @format */

import react from 'react'
import {Modal, Button} from 'antd'
import tradesubmittedImg from '../../../img/common/tradesubmitted@2x.png'
import waitingsImg from '../../../img/common/waitings.gif'
import rejectedImg from '../../../img/common/waring@2x.png'
import '../../../style/Mint/notification.less'
import Notification from '../../../utils/notification'
interface NotificationProps {
  type: string
  title: string
  onDismiss?: () => void
}
type IconType = 'success' | 'info' | 'error' | 'warning'
const defaultOnDismiss = () => null

const renderWaitings = () => {
  return (
    <div className="waitings-modal">
      <img src={waitingsImg} alt="" />
      <p>Please confirm in your wallet</p>
      <p>
        Collateral <span>10.001</span> USDC to mint <span>0.0001</span> nAPPL
      </p>
    </div>
  )
}

const RenderSuccess: React.FC<any> = props => {
  const {onDismiss} = props
  return (
    <div className="success-modal">
      <img src={tradesubmittedImg} alt="" />
      <p> Transaction Submitted</p>
      {/* <a href="">View on Explorer</a> */}
      <div>
        <Button className="modal-btn" onClick={onDismiss}>
          OK
        </Button>
      </div>
    </div>
  )
}

const renderRejected = () => {
  return (
    <div className="rejected-modal">
      <img src={rejectedImg} alt="" />
      <p>Transaction Rejected</p>
      <div>
        <Button className="modal-btn">Dismiss</Button>
      </div>
    </div>
  )
}

const openNotificationWithIcon = (type: IconType) => {
  Notification({
    type,
    message: 'Mint - Mint 10.01 nTENCT',
    // description: (
    //   <div className="description-text">
    //     View on Explorer
    //     <svg className="icon" aria-hidden="true">
    //       <use xlinkHref="#icon-link"></use>
    //     </svg>
    //   </div>
    // ),
  })
}
const OrderNoifcation = ({onDismiss = defaultOnDismiss, type, title}: NotificationProps) => {
  return (
    <Modal title={title} width={400} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      {type === 'success' ? (
        <RenderSuccess onDismiss={onDismiss} />
      ) : type === 'waitings' ? (
        renderWaitings()
      ) : (
        renderRejected()
      )}
    </Modal>
  )
}

export default OrderNoifcation
