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
    lpNum: '1,290.118301 mAAPL + 192,540.94 UST',
    lpPrice: '385,08189 UST',
    collateralRatio: '49.941255 MIR',
  },
]
const columns = [
  {
    title: 'Pool Name APR',
    // dataIndex: 'name',
    // key: 'name',
    render: (text: any, record: any) => (
      <div className="table-cell">
        <img src={record.logo} alt="" />
        {record.name}
      </div>
    ),
    // render: (text:any, record:any, index:any) => {
    // }
  },
  {
    title: 'Withdrawable Asset',
    dataIndex: 'age',
    key: 'age',
    render: (text: any, record: any) => (
      <div className="table-cell">
        <p className="balance">{record.lpNum}</p>
        <p className="balance-usd">$ {record.lpPrice}</p>
      </div>
    ),
  },
  {
    title: 'Collateral Ratio',
    dataIndex: 'address',
    key: 'address',
    render: (text: any, record: any) => (
      <div className="table-cell">
        <p className="balance">{record.collateralRatio}</p>
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
        <Button className="action-btn">unstake</Button>
      </div>
    ),
  },
]

const FarmingTable: React.FC<any> = props => {
  return <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
}
export default FarmingTable
