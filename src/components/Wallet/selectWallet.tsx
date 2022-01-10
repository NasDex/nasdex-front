/** @format */

import react from 'react'

import {Modal} from 'antd'
import connectors from './index'
import '../../style/Wallet/selectWallet.less'
import useModal from '../../hooks/useModal'
import FailedCard from './connectionFailed'

const defaultOnDismiss = () => null

type WalletModalProps = {
  onDismiss?: () => void
}

const SelectWallet = ({onDismiss = defaultOnDismiss}: WalletModalProps) => {
  const [openFailedCard] = useModal(<FailedCard></FailedCard>)

  return (
    <Modal title="Select a Wallet" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="wallet-list">
        {connectors.map((ele, key) => (
          <div className="wallet-item" onClick={openFailedCard} key={key} tabIndex={key}>
            <img src={ele.icon} alt="" className="wallet-logo" />
            <div className="wallet-name">{ele.title}</div>
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default SelectWallet
