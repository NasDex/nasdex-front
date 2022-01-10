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
    staked: '1,012.666',
    rewards: '385,08189 UST',
    date: '2021.01.12 03:45:56',
    description: 'Add Collateral',
    amount: '+1000 USDT',
  },
]
var columns = [
  {
    title: 'Date',
    // dataIndex: 'name',
    // key: 'name',
    render: function (text, record) {
      return React.createElement('div', {className: 'table-cell'}, record.date)
    },
  },
  {
    title: 'Description',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement('p', {className: 'balance'}, record.staked),
      )
    },
  },
  {
    title: 'Amount',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement('p', {className: 'balance'}, record.amount),
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
        React.createElement(antd_1.Button, {className: 'action-btn'}, 'View on Explorer'),
      )
    },
  },
]
var HistoryTable = function (props) {
  return React.createElement(antd_1.Table, {dataSource: dataSource, columns: columns, pagination: false})
}
exports['default'] = HistoryTable
