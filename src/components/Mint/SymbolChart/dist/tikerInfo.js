/** @format */

'use strict'
/** @format */
exports.__esModule = true
var antd_1 = require('antd')
var tencent_png_1 = require('../../../img/coin/tencent.png')
require('../../../style/Mint/tikerInfo.less')
var defaultOnDismiss = function () {
  return null
}
var TikerInfo = function (_a) {
  var _b = _a.onDismiss,
    onDismiss = _b === void 0 ? defaultOnDismiss : _b,
    _c = _a.nowPrice,
    nowPrice = _c === void 0 ? 0 : _c
  return React.createElement(
    antd_1.Modal,
    {title: 'Ticker Info', width: 420, footer: null, visible: true, onOk: onDismiss, onCancel: onDismiss},
    React.createElement(
      'div',
      {className: 'tikerInfo-container'},
      React.createElement(
        'div',
        {className: 'top'},
        React.createElement(
          'div',
          {className: 'left'},
          React.createElement('img', {className: 'logo', src: tencent_png_1['default'], alt: ''}),
          React.createElement(
            'div',
            {className: 'tit'},
            React.createElement('p', {className: 'titp'}, 'nTENCT'),
            React.createElement('span', null, 'Tencent Holdings Ltd'),
          ),
        ),
        React.createElement('h5', null, nowPrice, ' USD'),
      ),
      React.createElement(
        'div',
        {className: 'card'},
        React.createElement(
          'div',
          {className: 'item'},
          React.createElement('p', {className: 'itemp'}, 'Min. Col. Ratio'),
          React.createElement('span', null, '150%'),
        ),
      ),
      React.createElement(
        'div',
        {className: 'describe'},
        "Tencent is a multinational corporate holding company in China. Tencent's business has expanded to social, finance, information, tools, platforms and other fields. Its subsidiaries specialize in various global Internet-related services and products, entertainment, artificial intelligence and technology. At present, Tencent owns Tencent QQ and WeChat, the most used social software in mainland China, and Tencent Games, the largest online game community. In the field of e-books, it owns the Reading Group, which operates QQ Reading and WeChat Reading.",
      ),
    ),
  )
}
exports['default'] = TikerInfo
