/** @format */
/** @format */

import react from 'react'
import {Table, Slider, Button} from 'antd'
import Column from 'antd/lib/table/Column'
import tencentLogo from '../../img/coin/tencent.png'
const dataSource = [
  {
    key: '1',
    name: 'nTENCT - USDT LP',
    coin: 'USDC',
    logo: tencentLogo,
    staked: '1,012.666',
    rewards: '385,08189 UST',
    date: '2021.01.12 03:45:56',
    description: 'Add Collateral',
    amount: '+1000 USDT',
  },
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

const HistoryTable: React.FC<any> = props => {
  return <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
}
export default HistoryTable
