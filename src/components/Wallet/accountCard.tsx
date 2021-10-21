/** @format */

import react from 'react'
import {Modal, Button, Input} from 'antd'
import '../../style/Wallet/accountCard.less'

const defaultOnDismiss = () => null

type ConnectionFailedProps = {
  onDismiss?: () => void
}

const ConnectiongTikerInfo = ({onDismiss = defaultOnDismiss}: ConnectionFailedProps) => {
  return (
    <Modal title="Account" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="accountCard-container">
        <div className="base">
          <p>Connected with MetaMask</p>
          <div className="change">Change</div>
        </div>
        <Input placeholder="0x8912df134234432344332f1A9" bordered={false} />
        <div className="btn">
          <Button>Disconnect</Button>
          <Button>View on Explorer</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConnectiongTikerInfo
