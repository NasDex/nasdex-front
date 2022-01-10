/** @format */

import react from 'react'
import {Modal, Button} from 'antd'
import waringPng from '../../img/common/waring@2x.png'
import '../../style/Wallet/connectionFailed.less'

const defaultOnDismiss = () => null

type ConnectionFailedProps = {
  onDismiss?: () => void
}

const ConnectiongFailed = ({onDismiss = defaultOnDismiss}: ConnectionFailedProps) => {
  return (
    <Modal title="Connect with MetaMask" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <img className="waring-img" src={waringPng} alt="" />
      <div className="error-text"> Unfortunately,we did not receive the confirmation.Please,try again.</div>
      <Button className="reconnect-btn">Reconnect</Button>
    </Modal>
  )
}

export default ConnectiongFailed
