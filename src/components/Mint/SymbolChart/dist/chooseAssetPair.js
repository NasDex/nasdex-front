/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
var antd_1 = require('antd')
var tencent_png_1 = require('../../../img/coin/tencent.png')
var USDT_2x_png_1 = require('../../../img/coin/USDT@2x.png')
var USDC_2x_png_1 = require('../../../img/coin/USDC@2x.png')
require('../../../style/Mint/chooseAssetPair.less')
var hooks_1 = require('state/mint/hooks')
var actions_1 = require('state/mint/actions')
var react_redux_1 = require('react-redux')
var defaultOnDismiss = function () {
  return null
}
var AssetPair = function (_a) {
  var _b = _a.onDismiss,
    onDismiss = _b === void 0 ? defaultOnDismiss : _b
  var mintState = hooks_1.useMintState()
  var _c = react_1.useState(mintState.mintCoinSelect),
    basePool = _c[0],
    setBasePool = _c[1]
  var dispatch = react_redux_1.useDispatch()
  return React.createElement(
    antd_1.Modal,
    {title: 'Select a Pool', width: 420, footer: null, visible: true, onOk: onDismiss, onCancel: onDismiss},
    React.createElement(
      'div',
      {className: 'chooseAssetPair-container'},
      React.createElement('div', {className: 'base'}, React.createElement('p', null, 'Common bases')),
      React.createElement(
        'div',
        {className: 'asset'},
        React.createElement(
          'div',
          {
            className: 'asset-item',
            style:
              basePool === 'USDC'
                ? {
                    borderColor: '#005aff',
                  }
                : {},
            onClick: function () {
              setBasePool('USDC')
              dispatch(actions_1.upDateCoinSelect({mintCoinSelect: 'USDC'}))
              onDismiss()
            },
          },
          React.createElement('img', {src: USDC_2x_png_1['default'], alt: ''}),
          React.createElement('span', null, 'USDC'),
        ),
        React.createElement(
          'div',
          {
            className: 'asset-item',
            style:
              basePool === 'USDT'
                ? {
                    borderColor: '#005aff',
                  }
                : {},
            onClick: function () {
              setBasePool('USDT')
              dispatch(actions_1.upDateCoinSelect({mintCoinSelect: 'USDT'}))
              onDismiss()
            },
          },
          React.createElement('img', {src: USDT_2x_png_1['default'], alt: ''}),
          React.createElement('span', null, 'USDT'),
        ),
      ),
      React.createElement(
        'div',
        {className: 'card'},
        React.createElement(
          'div',
          {className: 'item'},
          React.createElement(
            'div',
            {className: 'left'},
            React.createElement('img', {className: 'logo', src: tencent_png_1['default'], alt: ''}),
            React.createElement(
              'div',
              {className: 'tit'},
              React.createElement('p', null, 'nTENCT'),
              React.createElement('span', null, 'Tencent Holdings Ltd'),
            ),
          ),
          React.createElement(
            'div',
            {className: 'right'},
            React.createElement('p', null, '$', mintState.mintNowPrice),
            React.createElement(
              'span',
              null,
              React.createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                React.createElement('use', {xlinkHref: '#icon-Connect-Wallet'}),
              ),
              '0.0',
            ),
          ),
        ),
      ),
    ),
  )
}
exports['default'] = AssetPair
