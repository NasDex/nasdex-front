/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
require('../../../style/Farm/short.less')
var antd_1 = require('antd')
var tips_2x_png_1 = require('../../../img/common/tips@2x.png')
var tencent_png_1 = require('../../../img/coin/tencent.png')
var waring_2x_png_1 = require('../../../img/common/waring@2x.png')
var USDC_2x_png_1 = require('../../../img/coin/USDC@2x.png')
var USDT_2x_png_1 = require('../../../img/coin/USDT@2x.png')
var index_1 = require('../shortOrderConfirm/index')
var notification_1 = require('../../../utils/notification')
var useModal_1 = require('../../../hooks/useModal')
var hooks_1 = require('state/trade/hooks')
var utils_1 = require('utils')
var actions_1 = require('../../../state/farm/actions')
var hooks_2 = require('state/farm/hooks')
var react_redux_1 = require('react-redux')
var hooks_3 = require('hooks')
var WalletModal_1 = require('components/WalletModal')
var useAuth_1 = require('hooks/useAuth')
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
var Short = function () {
  var tradeState = hooks_1.useTradeState()
  var dispatch = react_redux_1.useDispatch()
  var farmState = hooks_2.useFarmState()
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
  var _j = useAuth_1['default'](),
    login = _j.login,
    logout = _j.logout
  var account = hooks_3.useActiveWeb3React().account
  var _k = WalletModal_1.useWalletModal(login, logout, account || undefined),
    onPresentConnectModal = _k.onPresentConnectModal,
    onPresentAccountModal = _k.onPresentAccountModal
  var openNotificationWithIcon = function (type) {
    notification_1['default']({
      type: type,
      message: 'Farm - Farm ' + tradeAmount + ' nTENCT',
    })
  }
  var openConfirmOrder = useModal_1['default'](
    React.createElement(index_1['default'], {openNotificationWithIcon: openNotificationWithIcon}),
  )[0]
  function changeSlider(value) {
    setSliderValue(value)
  }
  var _l = react_1.useState(farmState.farmCoinSelect),
    selectCoin = _l[0],
    setSelectCoin = _l[1]
  react_1.useEffect(
    function () {
      setSelectCoin(farmState.farmCoinSelect)
    },
    [farmState.farmCoinSelect],
  )
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
    {className: 'short-container'},
    React.createElement(
      'div',
      {className: 'short-desc'},
      'Provide collateral to create short positions and earn NSDX token rewards',
    ),
    React.createElement(
      'div',
      {className: amountActive ? 'amount-active amount' : 'amount'},
      React.createElement(
        'div',
        {className: 'amount-header'},
        React.createElement('p', {className: 'amount-text'}, 'Amount'),
        React.createElement('p', {className: 'balance'}, 'Balance 0.0'),
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
              defaultValue: 'USDC',
              // style={{width: 98}}
              value: selectCoin,
              bordered: false,
              onSelect: function (LabeledValue) {
                setSelectCoin(LabeledValue)
                dispatch(actions_1.upDateCoinSelect({farmCoinSelect: LabeledValue}))
              },
              suffixIcon: React.createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                React.createElement('use', {xlinkHref: '#icon-Under'}),
              ),
            },
            React.createElement(
              Option,
              {value: 'USDC', className: 'customize-option-label-item'},
              React.createElement(
                'div',
                {className: 'customize-option-label-item'},
                React.createElement('img', {src: USDC_2x_png_1['default'], alt: ''}),
                React.createElement('span', null, 'USDC'),
              ),
            ),
            React.createElement(
              Option,
              {value: 'USDT', className: 'customize-option-label-item'},
              React.createElement(
                'div',
                {className: 'customize-option-label-item'},
                React.createElement('img', {src: USDT_2x_png_1['default'], alt: ''}),
                React.createElement('span', null, 'USDT'),
              ),
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      'div',
      {className: 'collateral'},
      React.createElement(
        'div',
        {className: 'collateral-ratio-header'},
        React.createElement('div', {className: 'collateral-title-'}, 'Collateral Ratio'),
        React.createElement(
          'div',
          {
            className:
              Number(sliderValue) < 165
                ? 'input-box-slide-active input-box'
                : sliderInputFocus
                ? 'input-box-active input-box'
                : 'input-box',
          },
          React.createElement(antd_1.Input, {
            placeholder: '280',
            maxLength: 3,
            defaultValue: sliderValue,
            onChange: function (e) {
              e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
              setSliderValue(e.target.value)
            },
            onClick: function () {
              setSliderInputFocus(true)
            },
            onBlur: function () {
              setSliderInputFocus(false)
            },
            value: sliderValue,
            suffix: '%',
            bordered: false,
          }),
          Number(sliderValue) < 165
            ? React.createElement('div', {className: 'input-btn-min'}, 'Higher Risk')
            : Number(sliderValue) < 200
            ? React.createElement('div', {className: 'input-btn-middle'}, 'Medium Risk')
            : React.createElement('div', {className: 'input-btn-max'}, 'SAFE'),
        ),
      ),
      React.createElement(
        'div',
        {
          className: [
            'collateral-slider',
            Number(sliderValue) < 165
              ? 'collateral-slider-min'
              : Number(sliderValue) < 200
              ? 'collateral-slider-middle'
              : 'collateral-slider-max',
          ].join(' '),
        },
        React.createElement(antd_1.Slider, {
          max: 300,
          marks: marks,
          value: Number(sliderValue),
          onChange: function (value) {
            changeSlider(value.toString())
            setamountInputFocus(true)
            // setSliderInputFocus(true)
            setCollateralInputFocus(false)
          },
          // onAfterChange={(value: number) => {
          //   Number(sliderValue) > 150?setSliderInputFocus(false):null
          // }}
          defaultValue: 200,
        }),
      ),
    ),
    React.createElement(
      'div',
      {className: collateralActive ? 'amount-active amount' : 'amount'},
      React.createElement(
        'div',
        {className: 'amount-header'},
        React.createElement('p', null, 'Collateral'),
        React.createElement(
          'p',
          {className: 'balance'},
          'Balance 0.0',
          React.createElement(antd_1.Button, {disabled: true}, 'MAX'),
        ),
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
        React.createElement('div', {className: 'tx-fee-text'}, 'Returned'),
        React.createElement('div', {className: 'tx-fee-price'}, '10.002 USDC'),
      ),
      React.createElement(
        'div',
        {className: 'item'},
        React.createElement('div', {className: 'tx-fee-text'}, 'Slippage Tolerance'),
        React.createElement('div', {className: 'tx-fee-price'}, tradeState.TradeSetting, '%'),
      ),
    ),
    React.createElement(
      'div',
      {className: 'farm-available'},
      React.createElement(
        'a',
        {href: '', target: '_blank', className: 'content'},
        React.createElement('img', {src: waring_2x_png_1['default'], alt: ''}),
        React.createElement('span', null, 'USDC returned from shorting will be locked for 2 weeks.'),
      ),
    ),
    !account
      ? React.createElement(
          antd_1.Button,
          {
            className: 'short-farm',
            onClick: function () {
              return onPresentConnectModal()
            },
          },
          'Connect',
        )
      : React.createElement(antd_1.Button, {className: 'short-farm', onClick: openConfirmOrder}, 'Farm'),
  )
}
exports['default'] = Short
