/** @format */

'use strict'
exports.__esModule = true
var USDT_2x_png_1 = require('../../img/coin/USDT@2x.png')
var USDC_2x_png_1 = require('../../img/coin/USDC@2x.png')
require('../../style/Profile/coinList.less')
var coinArr = [
  {
    logo: USDT_2x_png_1['default'],
    name: 'NSDX',
    balance: '8129.419',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDT_2x_png_1['default'],
    name: 'USDC',
    balance: '481205.0123',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDC_2x_png_1['default'],
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDC_2x_png_1['default'],
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDC_2x_png_1['default'],
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDC_2x_png_1['default'],
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDC_2x_png_1['default'],
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDC_2x_png_1['default'],
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDC_2x_png_1['default'],
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDC_2x_png_1['default'],
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
]
var CoinList = function (props) {
  return React.createElement(
    'div',
    {className: 'coin-list'},
    coinArr.map(function (ele, key) {
      return React.createElement(CoinlistItem, {coinItem: ele, key: key})
    }),
  )
}
var CoinlistItem = function (props) {
  var _a = props.coinItem,
    name = _a.name,
    logo = _a.logo,
    balance = _a.balance,
    balancePrice = _a.balancePrice
  return React.createElement(
    'div',
    {className: 'coin-item'},
    React.createElement(
      'div',
      {className: 'coin-item-left'},
      React.createElement('img', {className: 'coin-logo', src: logo, alt: ''}),
      name,
    ),
    React.createElement(
      'div',
      {className: 'coin-item-right'},
      React.createElement(
        'div',
        {className: 'coin-balance'},
        React.createElement('p', {className: 'balance-num'}, balance),
        React.createElement('p', {className: 'balance-price'}, balancePrice),
      ),
    ),
  )
}
exports['default'] = CoinList
