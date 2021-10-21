/** @format */

import react from 'react'
import {Table, Slider, Button} from 'antd'
import Column from 'antd/lib/table/Column'
import tencentLogo from '../../img/coin/tencent.png'
import {NavLink, useLocation} from 'react-router-dom'

const dataSource = [
  {
    key: '1',
    name: 'nTENCT',
    coin: 'USDC',
    logo: tencentLogo,
    oraclePrice: '172122.1223',
    oraclePriceUsd: '172122.1223',
    mintAmount: '172122.1223',
    mintAmountUsd: '172122.1223',
    collateral: '172122.1223',
    collateralUsd: '172122.1223',
    collateralRatio: '150',
    riskLevel: 'SAFE',
  },
]
const columns = [
  {
    title: 'Ticker',
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
    title: 'Oracle Price',
    dataIndex: 'age',
    key: 'age',
    render: (text: any, record: any) => (
      <div className="table-cell">
        <p className="balance">
          {record.oraclePrice} {record.name}
        </p>
        <p className="balance-usd">$ {record.oraclePriceUsd}</p>
      </div>
    ),
  },
  {
    title: 'Mint Amount',
    dataIndex: 'address',
    key: 'address',
    render: (text: any, record: any) => (
      <div className="table-cell">
        <p className="balance">
          {record.mintAmount} {record.name}
        </p>
        <p className="balance-usd">$ {record.mintAmountUsd}</p>
      </div>
    ),
  },
  {
    title: 'Collateral',
    dataIndex: 'address',
    key: 'address',
    render: (text: any, record: any) => (
      <div className="table-cell">
        <p className="balance">
          {record.collateral} {record.name}
        </p>
        <p className="balance-usd">$ {record.collateralUsd}</p>
      </div>
    ),
  },
  {
    title: 'Collateral Ratio',
    dataIndex: 'address',
    key: 'address',
    align: 'right',
    render: (text: any, record: any) => (
      <div className="table-cell">
        <div className="slider-text">
          <p>
            {record.collateralRatio}% <span className="balance-usd">Min:{record.collateralRatio}%</span>
          </p>
          {/* <p className="risk-level">{record.riskLevel}</p> */}
          {Number(record.collateralRatio) < 165 ? (
              <div className="input-btn-min">Higher Risk</div>
            ) : Number(record.collateralRatio) < 200 ? (
              <div className="input-btn-middle">Medium Risk</div>
            ) : (
              <div className="input-btn-max">SAFE</div>
            )}
        </div>
        <p>
          <Slider
            disabled
            className={[
              'collateral-slider',
              Number(record.collateralRatio) < 165
                ? 'collateral-slider-min'
                : Number(record.collateralRatio) < 200
                ? 'collateral-slider-middle'
                : 'collateral-slider-max',
            ].join(' ')}
            value={record.collateralRatio}
            max={300}
          />
        </p>
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
        <Button className="action-btn" ><NavLink to={`/manage`} activeClassName="active">Manage</NavLink></Button>
      </div>
    ),
  },
]

const PositionTable: React.FC<any> = props => {
  return <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
}
export default PositionTable
