/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
var antd_1 = require('antd')
require('../../../style/Mint/orderConfirm.less')
var tencent_png_1 = require('../../../img/coin/tencent.png')
var waring_2x_png_1 = require('../../../img/common/waring@2x.png')
var hooks_1 = require('state/mint/hooks')
var index_1 = require('../Notification/index')
var useModal_1 = require('../../../hooks/useModal')
var defaultOnDismiss = function () {
  return null
}
var defaultOpenNotificationWithIcon = function () {
  return null
}
var OrderConfirm = function (_a) {
  var _b = _a.onDismiss,
    onDismiss = _b === void 0 ? defaultOnDismiss : _b,
    _c = _a.openNotificationWithIcon,
    openNotificationWithIcon = _c === void 0 ? defaultOpenNotificationWithIcon : _c
  var mintState = hooks_1.useMintState()
  var openNoifcation = useModal_1['default'](
    React.createElement(index_1['default'], {type: 'success', title: 'Mint nTENCT'}),
  )[0]
  react_1.useEffect(
    function () {
      console.log(mintState, 'mintState##')
    },
    [mintState],
  )
  return React.createElement(
    antd_1.Modal,
    {title: 'Order Confirm', width: 420, footer: null, visible: true, onOk: onDismiss, onCancel: onDismiss},
    React.createElement(
      'div',
      {className: 'order-confirm-conntent'},
      React.createElement(
        'div',
        {className: 'price'},
        React.createElement(
          'div',
          null,
          React.createElement('img', {src: tencent_png_1['default'], alt: ''}),
          React.createElement('span', null, 'Mint Assets'),
        ),
        React.createElement(
          'div',
          {className: 'mint-assets'},
          mintState.mintTradeAmount,
          ' ',
          React.createElement('span', null, 'nTENCT'),
        ),
      ),
      React.createElement(
        'div',
        {className: 'detail'},
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Collateral Ratio'),
          React.createElement('div', {className: 'text'}, mintState.mintCollateralRatio, '%'),
        ),
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Collateral'),
          React.createElement('div', {className: 'text'}, mintState.mintTradeCollateral, ' ', mintState.mintCoinSelect),
        ),
      ),
      React.createElement(
        'div',
        {className: 'warning'},
        React.createElement('img', {src: waring_2x_png_1['default'], alt: ''}),
        React.createElement(
          'span',
          null,
          'A 1.5% fee of the minted value will be levied when the borrow position is closed',
        ),
      ),
      React.createElement(
        antd_1.Button,
        {className: 'confirm-btn', onClick: openNoifcation},
        React.createElement(
          'span',
          {
            className: 'mintSpan',
            onClick: function () {
              return openNotificationWithIcon('success')
            },
          },
          'Mint',
        ),
      ),
    ),
  )
}
exports['default'] = OrderConfirm
