/** @format */

import react from 'react'
import { Modal, Button, Input } from 'antd'
import '../../style/Wallet/accountCard.less'
import { useTranslation } from 'react-i18next'
const defaultOnDismiss = () => null

type ConnectionFailedProps = {
  onDismiss?: () => void
}

const ConnectiongTikerInfo = ({ onDismiss = defaultOnDismiss }: ConnectionFailedProps) => {
  const { t, i18n } = useTranslation()
  return (
    <Modal title={t('Account')} width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="accountCard-container">
        <div className="base">
          <p>{t('ConnectedMetaMask')}</p>
          <div className="change">{t('Change')}</div>
        </div>
        <Input placeholder="0x8912df134234432344332f1A9" bordered={false} />
        <div className="btn">
          <Button>{t('Disconnect')}</Button>
          <Button>{t('ViewExplorer')}</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConnectiongTikerInfo
