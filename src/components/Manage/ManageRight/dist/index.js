/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
require('../../../style/Manage/manageRight.less')
var addCollateral_1 = require('../ManageRight/addCollateral')
var withdraw_1 = require('../ManageRight/withdraw')
var close_1 = require('../ManageRight/close')
var antd_1 = require('antd')
var TabPane = antd_1.Tabs.TabPane
var tablieNav = [
  {
    label: 'Edit nAsset',
    icon: '#edit',
  },
  {
    label: 'Collateral',
    icon: '#withdraw',
  },
  {
    label: 'Close',
    icon: '#redeem',
  },
]
var ProfileList = function (props) {
  var positionId = props.positionId
  var _a = react_1.useState('Edit nAsset'),
    headerActive = _a[0],
    setHeaderActive = _a[1]
  function callback(key) {
    console.log(key)
  }
  function showTable(type) {
    switch (type) {
      case 'Edit nAsset':
        return React.createElement(addCollateral_1['default'], {positionId: positionId})
      case 'Collateral':
        return React.createElement(withdraw_1['default'], null)
      case 'Close':
        return React.createElement(close_1['default'], null)
      default:
        break
    }
  }
  return React.createElement(
    'div',
    {className: 'manageRight-table-content'},
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
          React.createElement(
            'svg',
            {className: 'icon', 'aria-hidden': 'true'},
            React.createElement('use', {xlinkHref: ele.icon}),
          ),
          ele.label,
        )
      }),
    ),
    React.createElement('div', {className: 'table-container'}, showTable(headerActive)),
  )
}
exports['default'] = ProfileList
