/** @format */

import React from 'react'
import { Modal } from 'antd'
import WalletCard from './WalletCard'
import config from './config'
import { Login } from './types'
import 'style/wallet.less'
import { useTranslation } from 'react-i18next'
const defaultOnDismiss = () => null

type ConnectModalProps = {
  login: Login
  onDismiss?: () => void
}

const ConnectModal = ({ login, onDismiss = defaultOnDismiss }: ConnectModalProps) => {
  const { t, i18n } = useTranslation()
  return (
    <Modal title={t('ConnectAwallet')} visible={true} onOk={onDismiss} onCancel={onDismiss} width="432px" footer={null}>
      <div className="wallet-list">
        {config.map((entry, index) => (
          <WalletCard
            key={entry.title}
            login={login}
            walletConfig={entry}
            onDismiss={onDismiss}
            mb={index < config.length - 1 ? '8px' : '0'}
          />
        ))}
      </div>
    </Modal>
  )
}

export default ConnectModal
