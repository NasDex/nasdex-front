/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
require('../../../style/Mint/symbolList.less')
var SymbolList = function (props) {
  var SymbolListArray = props.SymbolListArray
  return React.createElement(
    'div',
    {className: 'symbol-list'},
    SymbolListArray.map(function (items, index) {
      return React.createElement(SymbolListItem, {SymbolItem: items, key: index})
    }),
    React.createElement(
      'div',
      {className: 'symbol-list-menu'},
      React.createElement(
        'svg',
        {className: 'icon', 'aria-hidden': 'true'},
        React.createElement('use', {xlinkHref: '#icon_more'}),
      ),
    ),
  )
}
var SymbolListItem = function (props) {
  var _a = props.SymbolItem,
    iconUrl = _a.iconUrl,
    name = _a.name,
    convertUsd = _a.convertUsd,
    isRise = _a.isRise,
    priceIncrease = _a.priceIncrease,
    changeRate = _a.changeRate,
    id = _a.id
  var _b = react_1.useState('1'),
    defaultActiveKey = _b[0],
    setDefaultActiveKey = _b[1]
  return React.createElement(
    'div',
    {className: 'symbol-item'},
    React.createElement(
      'div',
      {className: 'symbol'},
      React.createElement('img', {src: iconUrl, alt: ''}),
      React.createElement('div', {className: 'name'}, name),
    ),
    React.createElement('div', {className: 'convert-usd'}, React.createElement('span', null, '$'), convertUsd),
    isRise
      ? React.createElement(
          'div',
          {className: 'rise'},
          priceIncrease,
          '(',
          changeRate,
          ')',
          React.createElement(
            'svg',
            {className: 'icon', 'aria-hidden': 'true'},
            React.createElement('use', {xlinkHref: '#icon-growth'}),
          ),
        )
      : React.createElement(
          'div',
          {className: 'fall'},
          priceIncrease,
          '(',
          changeRate,
          ')',
          React.createElement(
            'svg',
            {className: 'icon', 'aria-hidden': 'true'},
            React.createElement('use', {xlinkHref: '#icon-fall'}),
          ),
        ),
  )
}
exports['default'] = SymbolList
