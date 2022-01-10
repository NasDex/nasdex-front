/** @format */

'use strict'
/** @format */
exports.__esModule = true
require('../../../style/Trade/tradeRight.less')
var buy_1 = require('./buy')
var antd_1 = require('antd')
var useModal_1 = require('hooks/useModal')
var Setting_1 = require('../../../components/common/Setting')
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
  // const [headerActive, setHeaderActive] = useState('Buy')
  var openTradeSetting = useModal_1['default'](React.createElement(Setting_1['default'], {from: 'trade'}))[0]
  // function showTable(type: string) {
  //   switch (type) {
  //     case 'Buy':
  //       return <Buy></Buy>
  //     case 'Sell':
  //       return <Sell></Sell>
  //     default:
  //       break
  //   }
  // }
  return React.createElement(
    'div',
    {className: 'tradeRight-table-content'},
    React.createElement(
      'ul',
      {className: 'table-header-tab'},
      React.createElement('li', {className: 'header-tab-item'}, 'Swap'),
      React.createElement(
        'svg',
        {className: 'icon', 'aria-hidden': 'true', fill: '#999999', onClick: openTradeSetting},
        React.createElement('use', {xlinkHref: '#Icon-Set-Active'}),
      ),
    ),
    React.createElement(
      'div',
      {className: 'table-container'},
      React.createElement(buy_1['default'], {assetName: props.assetName}),
    ),
  )
}
exports['default'] = ProfileList
