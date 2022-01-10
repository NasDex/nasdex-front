/** @format */
/** @format */

import react from 'react'
import {Table, Slider, Button} from 'antd'
import {useWeb3React} from '@web3-react/core'
import {useWalletModal} from 'components/WalletModal'
import wallet from '../../img/common/wallet.png'
import useAuth from 'hooks/useAuth'

const HistoryTable: React.FC<any> = props => {
  const dataSource = [
    // {
    //   key: '1',
    //   name: 'nSTA - USDT LP',
    //   coin: 'USDC',
    //   logo: nSTA,
    //   staked: '1,012.666',
    //   rewards: '385,08189 UST',
    //   date: '2021.01.12 03:45:56',
    //   description: 'Add Collateral',
    //   amount: '+1000 USDT',
    // },
  ]
  const columns = [
    {
      title: 'Date',
      // dataIndex: 'name',
      // key: 'name',
      render: (text: any, record: any) => <div className="table-cell">{record.date}</div>,
      // render: (text:any, record:any, index:any) => {
      // }
    },
    {
      title: 'Description',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">{record.staked}</p>
        </div>
      ),
    },
    {
      title: 'Amount',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <p className="balance">{record.amount}</p>
        </div>
      ),
    },

    {
      title: 'Action',
      dataIndex: 'address',
      key: 'address',
      align: 'right',
      render: (text: any, record: any) => (
        <div className="table-cell">
          <Button className="action-btn">View on Explorer</Button>
        </div>
      ),
    },
  ]
  const {account} = useWeb3React()
  const {login, logout} = useAuth()
  const {onPresentConnectModal, onPresentAccountModal} = useWalletModal(login, logout, account || undefined)
  const connectWallet = [
    {
      render: (text: any, record: any) => (
        <div className="walletZhanWei">
          <img src={wallet} alt="" />
          <Button onClick={() => onPresentConnectModal()}>Connect Wallet</Button>
        </div>
      ),
    },
  ]
  const pagination = {
    pageSize: 5,
  }
  return (
    <div>
      <div className={account ? 'pc-table-wallet' : 'h5-table-wallet'}>
        {account ? (
          <Table dataSource={dataSource} columns={columns} pagination={pagination}></Table>
        ) : (
          <Table
            dataSource={[{key: '1'}]}
            columns={connectWallet}
            pagination={false}
            loading={false}
            showHeader={false}></Table>
        )}
      </div>
      <div className={account ? 'h5-table' : 'h5-noAccount-table'}>
        {dataSource.map((ele, index) => (
          <TableList TableItem={ele} key={index}></TableList>
        ))}
      </div>
    </div>
  )
}
const TableList: React.FC<any> = props => {
  // console.log(props,'propse##')
  const record = props.TableItem
  return (
    <div className="tx-fee">
      <div className="item">
        <div className="tx-fee-text">Date</div>
        <div className="tx-fee-showPrice">
          <p>{record.date}</p>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">Description</div>
        <div className="tx-fee-showPrice">
          <p>{record.staked}</p>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">Amount</div>
        <div className="tx-fee-showPrice">
          <p>{record.amount}</p>
        </div>
      </div>
      <div className="item">
        <div className="tx-fee-text">Action</div>
        <Button className="action-btn">View on Explorer</Button>
      </div>
    </div>
  )
}
export default HistoryTable
