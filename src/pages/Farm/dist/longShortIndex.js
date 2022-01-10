/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
require('../../style/Farm/farm.less')
var SymbolChart_1 = require('../../components/common/SymbolChart')
var FarmRight_1 = require('../../components/Farm/FarmRight')
var Title_1 = require('../../components/Title')
var react_router_dom_1 = require('react-router-dom')
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
}
var Farm = function (props) {
  var params = props.match.params.poolType
  return react_1['default'].createElement(
    'div',
    {className: 'farm-container'},
    react_1['default'].createElement(
      'div',
      {className: 'container-center'},
      react_1['default'].createElement(
        react_router_dom_1.NavLink,
        {to: '/farm', activeClassName: 'active'},
        react_1['default'].createElement(Title_1['default'], {title: 'farm', hasOpen: true}),
      ),
      react_1['default'].createElement(
        'div',
        {className: 'farm-symbol-trade'},
        react_1['default'].createElement(SymbolChart_1['default'], {SymoblChart: SymoblChart}),
        react_1['default'].createElement(FarmRight_1['default'], {poolType: params}),
      ),
    ),
  )
}
exports['default'] = Farm
