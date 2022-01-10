/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
require('../../style/Profile/profileList.less')
var positionTable_1 = require('../Profile/positionTable')
var farmingTable_1 = require('../Profile/farmingTable')
var stakingTable_1 = require('../Profile/stakingTable')
var historyTable_1 = require('../Profile/historyTable')
var antd_1 = require('antd')
var TabPane = antd_1.Tabs.TabPane
var tablieNav = [
  {
    label: 'Positions',
    icon: '#Positions',
  },
  // {
  //   label: 'Farming',
  //   icon: '#profile-farming',
  // },
  // {
  //   label: 'Staking',
  //   icon: '#profile-staking',
  // },
  {
    label: 'History',
    icon: '#profile-history',
  },
]
var ProfileList = function (props) {
  var _a = react_1.useState('Positions'),
    headerActive = _a[0],
    setHeaderActive = _a[1]
  function callback(key) {
    console.log(key)
  }
  function showTable(type) {
    switch (type) {
      case 'Positions':
        return React.createElement(positionTable_1['default'], null)
      case 'Farming':
        return React.createElement(farmingTable_1['default'], null)
      case 'Staking':
        return React.createElement(stakingTable_1['default'], null)
      case 'History':
        return React.createElement(historyTable_1['default'], null)
      default:
        break
    }
  }
  return React.createElement(
    'div',
    {className: 'table-content'},
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
            {className: 'icon', 'aria-hidden': 'true', fill: ele.label === headerActive ? '#005AFF' : '#1C1C1C'},
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
