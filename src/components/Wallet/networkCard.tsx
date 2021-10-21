/** @format */

import react from 'react'
import {Modal, Button} from 'antd'
import '../../style/Wallet/networkCard.less'

const defaultOnDismiss = () => null

type NetworkProps = {
  onDismiss?: () => void
}

const Network = ({onDismiss = defaultOnDismiss}: NetworkProps) => {
  return (
    <Modal title="" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="network-container">
        <div className="text"> Please check your wallet Swicthed to Polygon.</div>
        <Button className="btn">OK</Button>
      </div>
    </Modal>
  )
}

export default Network
