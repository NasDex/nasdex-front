/** @format */

'use strict'
/** @format */
exports.__esModule = true
var antd_1 = require('antd')
require('../../../style/Farm/longOrderConfirm.less')
var tencent_png_1 = require('../../../img/coin/tencent.png')
var USDC_2x_png_1 = require('../../../img/coin/USDC@2x.png')
var hooks_1 = require('state/mint/hooks')
var Notification_1 = require('../../common/Notification')
var useModal_1 = require('../../../hooks/useModal')
var defaultOnDismiss = function () {
  return null
}
var defaultOpenNotificationWithIcon = function () {
  return null
}
var LongOrderConfirm = function (_a) {
  var _b = _a.onDismiss,
    onDismiss = _b === void 0 ? defaultOnDismiss : _b,
    _c = _a.openNotificationWithIcon,
    openNotificationWithIcon = _c === void 0 ? defaultOpenNotificationWithIcon : _c
  var mintState = hooks_1.useMintState()
  var openNoifcation = useModal_1['default'](
    React.createElement(Notification_1['default'], {type: 'success', title: 'Mint nSE'}),
  )[0]
  return React.createElement(
    antd_1.Modal,
    {title: 'Long Farm', width: 420, footer: null, visible: true, onOk: onDismiss, onCancel: onDismiss},
    React.createElement(
      'div',
      {className: 'long-order-confirm-conntent'},
      React.createElement(
        'div',
        {className: 'price'},
        React.createElement(
          'div',
          null,
          React.createElement('img', {src: tencent_png_1['default'], alt: ''}),
          React.createElement('span', null, 'Deposit'),
        ),
        React.createElement('div', {className: 'mint-assets'}, '0.1 ', React.createElement('span', null, 'nSE')),
      ),
      React.createElement(
        'div',
        {className: 'longAdd'},
        React.createElement(
          'svg',
          {className: 'icon', 'aria-hidden': 'true'},
          React.createElement('use', {xlinkHref: '#icon-add'}),
        ),
      ),
      React.createElement(
        'div',
        {className: 'price'},
        React.createElement(
          'div',
          null,
          React.createElement('img', {src: USDC_2x_png_1['default'], alt: ''}),
          React.createElement('span', null, 'Deposit'),
        ),
        React.createElement('div', {className: 'mint-assets'}, '56.6503 ', React.createElement('span', null, 'USDC')),
      ),
      React.createElement(
        'div',
        {className: 'detail'},
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Price'),
          React.createElement('div', {className: 'text'}, ' 1 nSE = 10 USDC '),
        ),
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Receive (Estimated)'),
          React.createElement('div', {className: 'text'}, '0.123456 LP'),
        ),
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Share of Pool'),
          React.createElement('div', {className: 'text'}, '1%'),
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
          'Confirm',
        ),
      ),
    ),
  )
}
exports['default'] = LongOrderConfirm
