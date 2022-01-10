/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
require('../../../style/Manage/addCollateral.less')
var antd_1 = require('antd')
var tips_2x_png_1 = require('../../../img/common/tips@2x.png')
var tencent_png_1 = require('../../../img/coin/tencent.png')
var utils_1 = require('utils')
// import coinImg from '../../img/coin/USDC@2x.png'
var Option = antd_1.Select.Option
var marks = {
  150: {
    style: {
      color: '#909DB4',
      marginRight: '20px',
    },
    label: React.createElement(
      'strong',
      null,
      'Min 150% ',
      React.createElement('img', {className: 'tips-img', src: tips_2x_png_1['default'], alt: ''}),
      ' ',
      React.createElement(
        'div',
        {className: 'tips-texts'},
        'Minimal collateral ratio. When your position drops below it, any users may liquidate the position. In case that the volatility is high, we suggest you to choose a higher ratio.',
      ),
      ' ',
    ),
  },
  200: {
    style: {
      color: '#909DB4',
    },
    label: React.createElement('strong', null, 'Safe 200%'),
  },
}
var AddCollateral = function () {
  var _a = react_1.useState(''),
    tradeAmount = _a[0],
    setAmount = _a[1]
  var _b = react_1.useState(''),
    tradeCollateral = _b[0],
    setTradeCollateral = _b[1]
  var _c = react_1.useState('200'),
    sliderValue = _c[0],
    setSliderValue = _c[1]
  var _d = react_1.useState(false),
    amountInputFocus = _d[0],
    setamountInputFocus = _d[1]
  var _e = react_1.useState(false),
    collateralInputFocus = _e[0],
    setCollateralInputFocus = _e[1]
  var _f = react_1.useState(false),
    sliderInputFocus = _f[0],
    setSliderInputFocus = _f[1]
  var _g = react_1.useState(false),
    amountActive = _g[0],
    setAmountActive = _g[1]
  var _h = react_1.useState(false),
    collateralActive = _h[0],
    setCollateralActive = _h[1]
  function changeSlider(value) {
    setSliderValue(value)
  }
  react_1.useEffect(
    function () {
      if (amountInputFocus) {
        var result = ((Number(tradeAmount) * Number(sliderValue)) / 100).toString()
        setTradeCollateral(utils_1.fixD(result, 6))
      }
      if (collateralInputFocus) {
        if (Number(sliderValue) > 0) {
          var amount = ((Number(tradeCollateral) / Number(sliderValue)) * 100).toString()
          setAmount(utils_1.fixD(amount, 6))
        }
      }
    },
    [tradeAmount, tradeCollateral, sliderValue],
  )
  return React.createElement(
    'div',
    {className: 'manageRight-addCollateral-container'},
    React.createElement(
      'div',
      {className: amountActive ? 'amount-active amount' : 'amount'},
      React.createElement(
        'div',
        {className: 'amount-header'},
        React.createElement('p', {className: 'amount-text'}, 'Pay'),
      ),
      React.createElement(
        'div',
        {className: 'trade-price'},
        React.createElement(antd_1.Input, {
          placeholder: '0.0',
          value: tradeAmount,
          defaultValue: '',
          bordered: false,
          onChange: function (e) {
            e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
            setAmount(e.target.value)
          },
          onClick: function () {
            setamountInputFocus(true)
            setAmountActive(true)
            setCollateralInputFocus(false)
          },
          onBlur: function () {
            setAmountActive(false)
          },
        }),
        React.createElement(
          'div',
          {className: 'select-box'},
          React.createElement(
            antd_1.Select,
            {
              defaultValue: 'nTENCT',
              // style={{width: 98}}
              bordered: false,
              suffixIcon: React.createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                React.createElement('use', {xlinkHref: '#icon-Under'}),
              ),
            },
            React.createElement(
              Option,
              {value: 'nTENCT'},
              React.createElement(
                'div',
                {className: 'customize-option-label-item'},
                React.createElement('img', {src: tencent_png_1['default'], alt: ''}),
                React.createElement('span', null, 'nTENCT'),
              ),
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      'div',
      {className: collateralActive ? 'amount-active amount' : 'amount'},
      React.createElement('div', {className: 'amount-header'}, React.createElement('p', null, 'Receove (Estimated)')),
      React.createElement(
        'div',
        {className: 'trade-price'},
        React.createElement(antd_1.Input, {
          placeholder: '0.0',
          value: tradeAmount,
          defaultValue: '',
          bordered: false,
          onChange: function (e) {
            e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
            setAmount(e.target.value)
          },
          onClick: function () {
            setCollateralInputFocus(true)
            setCollateralActive(true)
            setamountInputFocus(false)
          },
          onBlur: function () {
            setCollateralActive(false)
          },
        }),
        React.createElement(
          'div',
          {className: 'select-box'},
          React.createElement(
            antd_1.Select,
            {
              defaultValue: 'nTENCT',
              // style={{width: 98}}
              bordered: false,
              suffixIcon: React.createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                React.createElement('use', {xlinkHref: '#icon-Under'}),
              ),
            },
            React.createElement(
              Option,
              {value: 'nTENCT'},
              React.createElement(
                'div',
                {className: 'customize-option-label-item'},
                React.createElement('img', {src: tencent_png_1['default'], alt: ''}),
                React.createElement('span', null, 'nTENCT'),
              ),
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      'div',
      {className: 'tx-fee'},
      React.createElement(
        'div',
        {className: 'item'},
        React.createElement('div', {className: 'tx-fee-text'}, 'Expected Price'),
        React.createElement('div', {className: 'tx-fee-price'}, '3,225.80 USDC'),
      ),
      React.createElement(
        'div',
        {className: 'item'},
        React.createElement('div', {className: 'tx-fee-text'}, 'Minimum Received'),
        React.createElement('div', {className: 'tx-fee-price'}, '0.123456 NSDX'),
      ),
      React.createElement(
        'div',
        {className: 'item'},
        React.createElement('div', {className: 'tx-fee-text'}, 'Tx Fee'),
        React.createElement('div', {className: 'tx-fee-price'}, '0.001 USDC'),
      ),
    ),
    React.createElement(antd_1.Button, {className: 'addCollateral'}, 'Confirm Order'),
  )
}
exports['default'] = AddCollateral
