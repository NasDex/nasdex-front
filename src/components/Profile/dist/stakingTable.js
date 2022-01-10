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
  },
]
var columns = [
  {
    title: 'Pool',
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
    title: 'Staked',
    dataIndex: 'age',
    key: 'age',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement('p', {className: 'balance'}, record.staked),
      )
    },
  },
  {
    title: 'Rewards',
    dataIndex: 'address',
    key: 'address',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement('p', {className: 'balance'}, record.rewards),
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
        React.createElement(antd_1.Button, {className: 'action-btn'}, 'Claim'),
        React.createElement(antd_1.Button, {className: 'action-btn'}, 'unstake'),
      )
    },
  },
]
var StakingTable = function (props) {
  return React.createElement(antd_1.Table, {dataSource: dataSource, columns: columns, pagination: false})
}
exports['default'] = StakingTable
