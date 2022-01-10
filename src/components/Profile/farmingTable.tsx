/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */

import react, { useEffect, useState } from 'react'
import { Table, Button, Skeleton } from 'antd'
import wallet from '../../img/common/wallet.png'
import { useWeb3React } from '@web3-react/core'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import LongFarming from './longFarming'
import ShortFarming from './shortFarming'
import { useTranslation } from 'react-i18next'
const FarmingTable: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const connectWallet = [
    {
      render: (text: any, record: any) => (
        <div className="walletZhanWei">
          <img src={wallet} alt="" />
          <Button onClick={() => onPresentConnectModal()}>{t('ConnectWallet')}</Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      {account ? (
        <div>
          <LongFarming priceList={props.priceList} />
          <ShortFarming priceList={props.priceList} />
        </div>
      ) : (
        <Table
          dataSource={[{ key: '1' }]}
          columns={connectWallet}
          pagination={false}
          loading={false}
          showHeader={false}></Table>
      )}
    </div>
  )
}
export default FarmingTable
