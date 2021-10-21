/** @format */

import React from 'react'
import {Button, Typography, Modal} from 'antd'
import CopyToClipboard from './CopyToClipboard'
import {connectorLocalStorageKey} from './config'
import 'style/wallet.less'
import {useWalletModal} from 'components/WalletModal'
import useAuth from 'hooks/useAuth'

const {Text, Link} = Typography

interface Props {
  account: string
  logout: () => void
  onDismiss?: () => void
}

const ConnectorNames: any = {
  injected: 'MetaMask',
  walletconnect: 'WalletConnect',
  bsc: 'BSC',
}

const AccountModal: React.FC<Props> = ({account, logout, onDismiss = () => null}) => {
  const currentPlatformKey: any = localStorage.getItem('currentPlatform') || 'injected'
  const currentPlatform = ConnectorNames[currentPlatformKey]
  const {login} = useAuth()
  const {onPresentConnectModal} = useWalletModal(login, logout, account || undefined)
  return (
    <Modal
      title="Account"
      visible={true}
      onOk={onDismiss}
      onCancel={onDismiss}
      width="420px"
      footer={
        <div className="account-footer">
          <Button
            onClick={() => {
              logout()
              window.localStorage.removeItem(connectorLocalStorageKey)
              onDismiss()
            }}>
            Disconnect
          </Button>
          <a className="view" href={`https://mumbai.polygonscan.com/address/${account}`} target="_blank">
            View on Explorer
          </a>
        </div>
      }>
      <div className="wallet-account-box">
        <div className="platform">
          <p>Connected with {currentPlatform}</p>
          <Button onClick={() => onPresentConnectModal()}>Change</Button>
        </div>
        <div className="account">
          <p>{account}</p>
          <CopyToClipboard toCopy={account}>
            <a>Copy</a>
          </CopyToClipboard>
        </div>
      </div>
    </Modal>
  )
}

export default AccountModal
