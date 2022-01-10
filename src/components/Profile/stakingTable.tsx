/** @format */
/** @format */

import react from 'react'
import { Table, Slider, Button } from 'antd'
import Column from 'antd/lib/table/Column'
import nSTA from '../../img/coin/nSTA.png'
const dataSource = [
  {
    key: '1',
    name: 'nSTA - USDT LP',
    coin: 'USDC',
    logo: nSTA,
    staked: '1,012.666',
    rewards: '385,08189 UST',
  },
]
const columns = [
  {
    title: 'Pool',
    render: (text: any, record: any) => (
      <div className="table-cell">
        <img src={record.logo} alt="" />
        {record.name}
      </div>
    ),
  },
  {
    title: 'Staked',
    dataIndex: 'age',
    key: 'age',
    render: (text: any, record: any) => (
      <div className="table-cell">
        <p className="balance">{record.staked}</p>
      </div>
    ),
  },
  {
    title: 'Rewards',
    dataIndex: 'address',
    key: 'address',
    render: (text: any, record: any) => (
      <div className="table-cell">
        <p className="balance">{record.rewards}</p>
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
        <Button className="action-btn">Claim</Button>
        <Button className="action-btn">unstake</Button>
      </div>
    ),
  },
]

const StakingTable: React.FC<any> = props => {
  const pagination = {
    pageSize: 5,
  }
  return <Table dataSource={dataSource} columns={columns} pagination={pagination}></Table>
}
export default StakingTable
