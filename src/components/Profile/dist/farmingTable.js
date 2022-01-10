/** @format */

'use strict'
/** @format */
/** @format */
exports.__esModule = true
var antd_1 = require('antd')
var tencent_png_1 = require('../../img/coin/tencent.png')
var dataSource = [
  {
    key: '1',
    name: 'nTENCT - USDT LP',
    coin: 'USDC',
    logo: tencent_png_1['default'],
    lpNum: '1,290.118301 mAAPL + 192,540.94 UST',
    lpPrice: '385,08189 UST',
    collateralRatio: '49.941255 MIR',
  },
]
var columns = [
  {
    title: 'Pool Name APR',
    // dataIndex: 'name',
    // key: 'name',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement('img', {src: record.logo, alt: ''}),
        record.name,
      )
    },
  },
  {
    title: 'Withdrawable Asset',
    dataIndex: 'age',
    key: 'age',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement('p', {className: 'balance'}, record.lpNum),
        React.createElement('p', {className: 'balance-usd'}, '$ ', record.lpPrice),
      )
    },
  },
  {
    title: 'Collateral Ratio',
    dataIndex: 'address',
    key: 'address',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement('p', {className: 'balance'}, record.collateralRatio),
      )
    },
  },
  {
    title: 'Action',
    dataIndex: 'address',
    key: 'address',
    align: 'right',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement(antd_1.Button, {className: 'action-btn'}, 'unstake'),
      )
    },
  },
]
var FarmingTable = function (props) {
  return React.createElement(antd_1.Table, {dataSource: dataSource, columns: columns, pagination: false})
}
exports['default'] = FarmingTable
