/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
require('../../../style/Trade/tradeRight.less')
var addCollateral_1 = require('./addCollateral')
var antd_1 = require('antd')
var useModal_1 = require('hooks/useModal')
var tradeSetting_1 = require('../../../components/Trade/tradeSetting')
var TabPane = antd_1.Tabs.TabPane
var tablieNav = [
  {
    label: 'Buy',
  },
  {
    label: 'Sell',
  },
]
var ProfileList = function (props) {
  var _a = react_1.useState('Buy'),
    headerActive = _a[0],
    setHeaderActive = _a[1]
  var openTradeSetting = useModal_1['default'](React.createElement(tradeSetting_1['default'], null))[0]
  function callback(key) {
    console.log(key)
  }
  function showTable(type) {
    switch (type) {
      case 'Buy':
        return React.createElement(addCollateral_1['default'], null)
      case 'Sell':
        return React.createElement(addCollateral_1['default'], null)
      default:
        break
    }
  }
  return React.createElement(
    'div',
    {className: 'tradeRight-table-content'},
    React.createElement(
      'ul',
      {className: 'table-header-tab'},
      tablieNav.map(function (ele, key) {
        return React.createElement(
          'li',
          {
            className: ['header-tab-item', ele.label === headerActive ? 'header-tab-item-active' : null].join(' '),
            key: key,
            onClick: function () {
              return setHeaderActive(ele.label)
            },
          },
          ele.label,
        )
      }),
      React.createElement(
        'svg',
        {className: 'icon', 'aria-hidden': 'true', fill: '#999999', onClick: openTradeSetting},
        React.createElement('use', {xlinkHref: '#Icon-Set-Active'}),
      ),
    ),
    React.createElement('div', {className: 'table-container'}, showTable(headerActive)),
  )
}
exports['default'] = ProfileList
