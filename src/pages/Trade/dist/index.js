/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
require('../../style/Trade/trade.less')
var SymbolChart_1 = require('../../components/common/SymbolChart')
var index_1 = require('../../components/Trade/TradeRight/index')
var Title_1 = require('../../components/Title')
var symbolMock = [
  {
    id: '0',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nGOOGL',
    convertUsd: '2808.01',
    isRise: true,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '1',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nAPPL',
    convertUsd: '149.96',
    isRise: true,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '2',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nMSFT',
    convertUsd: '708.15',
    isRise: false,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '3',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nMSFT',
    convertUsd: '708.15',
    isRise: false,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '4',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nMSFT',
    convertUsd: '708.15',
    isRise: false,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
]
var SymoblChart = {
  symbolName: '',
  symbolLogo: '',
  premium: '--',
  volume: '43,123.09',
  liquidity: '25,93M',
  from: 'trade',
}
var Trade = function (props) {
  var params = props.match.params.assetName
  return react_1['default'].createElement(
    'div',
    {className: 'trade-container'},
    react_1['default'].createElement(
      'div',
      {className: 'container-center'},
      react_1['default'].createElement(Title_1['default'], {title: 'Swap', hasOpen: true}),
      react_1['default'].createElement(
        'div',
        {className: 'manage-symbol-trade'},
        react_1['default'].createElement(SymbolChart_1['default'], {SymoblChart: SymoblChart}),
        react_1['default'].createElement(index_1['default'], {assetName: params}),
      ),
    ),
  )
}
exports['default'] = Trade
