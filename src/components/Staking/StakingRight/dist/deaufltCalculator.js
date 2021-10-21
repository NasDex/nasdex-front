/** @format */

'use strict'
/** @format */
exports.__esModule = true
var antd_1 = require('antd')
require('../../../style/Staking/calculator.less')
var utils_1 = require('utils')
var defaultOnDismiss = function () {
  return null
}
var TikerInfo = function (_a) {
  var _b = _a.onDismiss,
    onDismiss = _b === void 0 ? defaultOnDismiss : _b,
    _c = _a.apr,
    apr = _c === void 0 ? '' : _c
  // 1d ROI= APR/365
  var d1 = Number(apr) ? Number(apr) / 365 : 0
  // 7d ROI= [ (1+APR/365)^7 ] -1
  var str = Number(apr) ? Number(apr) / 365 / 100 : 0
  var d7 = Number(str) * 7 * 100
  // 30d ROI=[ (1+APR/365)^30 ] -1
  var d30 = Number(str) * 30 * 100
  // 365 ROI, 即APY= [ (1+APR/365)^365 ] -1
  var d365 = Number(str) * 365 * 100
  function num(val) {
    if (Number(val.toString()) > 100000000) {
      return 'Infinity'
    }
    return utils_1.fixD(val, 2)
  }
  return React.createElement(
    antd_1.Modal,
    {title: 'ROI', width: 420, footer: null, visible: true, onOk: onDismiss, onCancel: onDismiss},
    React.createElement(
      'div',
      {className: 'calculator-container'},
      React.createElement(
        'div',
        {className: 'calculator-card'},
        React.createElement(
          'div',
          {className: 'item'},
          React.createElement('p', {className: 'itemp'}, 'TIMEFRAME'),
          React.createElement('span', null, 'ROI'),
        ),
        React.createElement(
          'div',
          {className: 'item'},
          React.createElement('p', {className: 'itemp'}, '1d'),
          React.createElement('span', null, num(d1), '%'),
        ),
        React.createElement(
          'div',
          {className: 'item'},
          React.createElement('p', {className: 'itemp'}, '7d'),
          React.createElement('span', null, num(d7), '%'),
        ),
        React.createElement(
          'div',
          {className: 'item'},
          React.createElement('p', {className: 'itemp'}, '30d'),
          React.createElement('span', null, num(d30), '%'),
        ),
        React.createElement(
          'div',
          {className: 'item'},
          React.createElement('p', {className: 'itemp'}, '365d(APR)'),
          React.createElement('span', null, num(d365), '%'),
        ),
      ),
      React.createElement(
        'div',
        {className: 'calculator-describe'},
        'Calculated based on current rates. Rates are estimates provided for your convenience only,and by no means represent guaranteed returns.',
      ),
    ),
  )
}
exports['default'] = TikerInfo
