/** @format */

'use strict'
/** @format */
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
exports.__esModule = true
var react_1 = require('react')
require('../../../style/Mint/symbolTrade.less')
var antd_1 = require('antd')
var index_1 = require('../OrderConfirm/index')
var index_2 = require('../Notification/index')
var react_redux_1 = require('react-redux')
var actions_1 = require('../../../state/mint/actions')
var useModal_1 = require('../../../hooks/useModal')
var tips_2x_png_1 = require('../../../img/common/tips@2x.png')
var USDT_2x_png_1 = require('../../../img/coin/USDT@2x.png')
var tencent_png_1 = require('../../../img/coin/tencent.png')
var USDC_2x_png_1 = require('../../../img/coin/USDC@2x.png')
var warning_png_1 = require('../../../img/mint/warning.png')
var notification_1 = require('../../../utils/notification')
var react_2 = require('react')
var utils_1 = require('utils')
var hooks_1 = require('state/mint/hooks')
var Option = antd_1.Select.Option
var marks = {
  150: {
    style: {
      color: '#909DB4',
      marginRight: '20px',
    },
    label: react_2['default'].createElement(
      'strong',
      null,
      'Min 150% ',
      react_2['default'].createElement('img', {className: 'tips-img', src: tips_2x_png_1['default'], alt: ''}),
      ' ',
      react_2['default'].createElement(
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
    label: react_2['default'].createElement('strong', null, 'Safe 200%'),
  },
}
var SymbolTrade = function () {
  var openNotificationWithIcon = function (type) {
    notification_1['default']({
      type: type,
      message: 'Mint - Mint ' + tradeAmount + ' nTENCT',
    })
    // notification[type]({
    //   message: 'Notification Title',
    //   description:
    //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    //   // duration: null,
    // })
  }
  var openConfirmOrder = useModal_1['default'](
    react_2['default'].createElement(index_1['default'], {openNotificationWithIcon: openNotificationWithIcon}),
  )[0]
  var openNoifcation = useModal_1['default'](
    react_2['default'].createElement(index_2['default'], {type: '1', title: 'Mint nTENCT'}),
  )[0]
  var dispatch = react_redux_1.useDispatch()
  var _a = react_1.useState(''),
    tradeAmount = _a[0],
    setAmount = _a[1]
  var _b = react_1.useState(''),
    tradeCollateral = _b[0],
    setTradeCollateral = _b[1]
  var _c = react_1.useState('200'),
    sliderValue = _c[0],
    setSliderValue = _c[1]
  function changeSlider(value) {
    setSliderValue(value)
  }
  var inputRef = react_2['default'].useRef(null)
  var _d = react_2['default'].useState(true),
    input = _d[0],
    setInput = _d[1]
  var sharedProps = {
    style: {width: '100%'},
    defaultValue: 'Ant Design love you!',
    ref: inputRef,
  }
  var inputReftwo = react_2['default'].useRef(null)
  var sharedPropstwo = {
    style: {width: '100%'},
    defaultValue: 'Ant Design love you!',
    ref: inputReftwo,
  }
  // console.log(inputRef,'inputRef#')
  var _e = react_1.useState(false),
    amountInputFocus = _e[0],
    setamountInputFocus = _e[1]
  var _f = react_1.useState(false),
    collateralInputFocus = _f[0],
    setCollateralInputFocus = _f[1]
  var _g = react_1.useState(false),
    sliderInputFocus = _g[0],
    setSliderInputFocus = _g[1]
  var _h = react_1.useState(false),
    amountActive = _h[0],
    setAmountActive = _h[1]
  var _j = react_1.useState(false),
    collateralActive = _j[0],
    setCollateralActive = _j[1]
  var _k = react_1.useState(''),
    data = _k[0],
    setData = _k[1]
  var myDate = new Date()
  function getweekday(date) {
    var weekArray = ['七', '一', '二', '三', '四', '五', '六']
    var week = weekArray[new Date(date).getDay()]
    return week
  }
  react_1.useEffect(
    function () {
      var newData = getweekday(new Date(myDate.toLocaleDateString()))
      setData(newData)
    },
    [data],
  )
  var mintState = hooks_1.useMintState()
  react_1.useEffect(
    function () {
      if (amountInputFocus) {
        var result = ((Number(tradeAmount) * mintState.mintNowPrice * Number(sliderValue)) / 100).toString()
        if (Number(result) > 0) {
          setTradeCollateral(utils_1.fixD(result, 2))
          dispatch(actions_1.upDateMintTradeCollateral({mintTradeCollateral: utils_1.fixD(result, 2)}))
        } else {
          setTradeCollateral('')
          dispatch(actions_1.upDateMintTradeCollateral({mintTradeCollateral: ''}))
        }
      }
      if (collateralInputFocus) {
        if (Number(sliderValue) > 0) {
          var amount = ((Number(tradeCollateral) / mintState.mintNowPrice / Number(sliderValue)) * 100).toString()
          if (Number(amount) > 0) {
            dispatch(actions_1.upDateMintTradeAmount({mintTradeAmount: utils_1.fixD(amount, 6)}))
            setAmount(utils_1.fixD(amount, 6))
          } else {
            dispatch(actions_1.upDateMintTradeAmount({mintTradeAmount: ''}))
            setAmount('')
          }
        }
      }
    },
    [tradeAmount, tradeCollateral, sliderValue, mintState],
  )
  var _l = react_1.useState(mintState.mintCoinSelect),
    selectCoin = _l[0],
    setSelectCoin = _l[1]
  react_1.useEffect(
    function () {
      setSelectCoin(mintState.mintCoinSelect)
    },
    [mintState.mintCoinSelect],
  )
  function discText() {
    var newDate = new Date()
    var geDays = newDate.getDay()
    var dtext = true // 判断日期是否处于周末
    if (geDays > 0 && geDays < 6) {
      var dates = newDate.toLocaleDateString()
      var nowtime = newDate.getTime()
      var time930 = new Date(dates).getTime() + 9 * 60 * 60 * 1000 + 30 * 60 * 1000
      var time1130 = new Date(dates).getTime() + 11 * 60 * 60 * 1000 + 30 * 60 * 1000
      var time1300 = new Date(dates).getTime() + 13 * 60 * 60 * 1000
      var time1500 = new Date(dates).getTime() + 15 * 60 * 60 * 1000
      if ((nowtime >= time930 && nowtime <= time1130) || (nowtime >= time1300 && nowtime <= time1500)) {
        dtext = false
      }
    }
    return dtext
  }
  return react_2['default'].createElement(
    'div',
    {className: 'trade'},
    react_2['default'].createElement('div', {className: 'trade-title'}, 'Mint nTENCT'),
    react_2['default'].createElement(
      'div',
      {className: amountActive ? 'amount-active amount' : 'amount'},
      react_2['default'].createElement(
        'div',
        {className: 'amount-header'},
        react_2['default'].createElement('p', {className: 'amount-text'}, 'Amount'),
        react_2['default'].createElement('p', {className: 'balance'}, 'Balance 0.0'),
      ),
      react_2['default'].createElement(
        'div',
        {className: 'trade-price'},
        input
          ? react_2['default'].createElement(
              antd_1.Input,
              __assign({}, sharedProps, {
                placeholder: '0.0',
                value: tradeAmount,
                defaultValue: '',
                bordered: false,
                onChange: function (e) {
                  e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
                  setAmount(e.target.value)
                  dispatch(actions_1.upDateMintTradeAmount({mintTradeAmount: e.target.value}))
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
            )
          : react_2['default'].createElement(antd_1.Input.TextArea, __assign({}, sharedProps)),
        react_2['default'].createElement(
          'div',
          {className: 'select-box'},
          react_2['default'].createElement(
            antd_1.Select,
            {
              defaultValue: 'nTENCT',
              // style={{width: 98}}
              bordered: false,
              suffixIcon: react_2['default'].createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                react_2['default'].createElement('use', {xlinkHref: '#icon-Under'}),
              ),
            },
            react_2['default'].createElement(
              Option,
              {value: 'nTENCT'},
              react_2['default'].createElement(
                'div',
                {className: 'customize-option-label-item'},
                react_2['default'].createElement('img', {src: tencent_png_1['default'], alt: ''}),
                react_2['default'].createElement('span', null, 'nTENCT'),
              ),
            ),
          ),
        ),
      ),
    ),
    react_2['default'].createElement(
      'div',
      {className: 'collateral'},
      react_2['default'].createElement(
        'div',
        {className: 'collateral-ratio-header'},
        react_2['default'].createElement('div', {className: 'collateral-title-'}, 'Collateral Ratio'),
        react_2['default'].createElement(
          'div',
          {
            className:
              Number(sliderValue) < 165
                ? 'input-box-slide-active input-box'
                : sliderInputFocus
                ? 'input-box-active input-box'
                : 'input-box',
          },
          react_2['default'].createElement(antd_1.Input, {
            placeholder: '280',
            maxLength: 3,
            defaultValue: sliderValue,
            onChange: function (e) {
              e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
              dispatch(actions_1.upDateMintCollateralRatio({mintCollateralRatio: e.target.value.toString()}))
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
            ? react_2['default'].createElement('div', {className: 'input-btn-min'}, 'Higher Risk')
            : Number(sliderValue) < 200
            ? react_2['default'].createElement('div', {className: 'input-btn-middle'}, 'Medium Risk')
            : react_2['default'].createElement('div', {className: 'input-btn-max'}, 'SAFE'),
        ),
      ),
      react_2['default'].createElement(
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
        react_2['default'].createElement(antd_1.Slider, {
          max: 300,
          marks: marks,
          value: Number(sliderValue),
          onChange: function (value) {
            changeSlider(value.toString())
            setamountInputFocus(true)
            dispatch(actions_1.upDateMintCollateralRatio({mintCollateralRatio: value.toString()}))
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
    react_2['default'].createElement(
      'div',
      {className: collateralActive ? 'amount-active amount' : 'amount'},
      react_2['default'].createElement(
        'div',
        {className: 'amount-header'},
        react_2['default'].createElement('p', null, 'Collateral'),
        react_2['default'].createElement(
          'p',
          {className: 'balance'},
          'Balance 0.0',
          react_2['default'].createElement(antd_1.Button, {disabled: true}, 'MAX'),
        ),
      ),
      react_2['default'].createElement(
        'div',
        {className: 'trade-price'},
        input
          ? react_2['default'].createElement(
              antd_1.Input,
              __assign({}, sharedPropstwo, {
                placeholder: '0.0',
                value: tradeCollateral,
                bordered: false,
                onChange: function (e) {
                  e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
                  setTradeCollateral(e.target.value)
                  dispatch(actions_1.upDateMintTradeCollateral({mintTradeCollateral: e.target.value}))
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
            )
          : react_2['default'].createElement(antd_1.Input.TextArea, __assign({}, sharedProps)),
        react_2['default'].createElement(
          'div',
          {className: 'select-box'},
          react_2['default'].createElement(
            antd_1.Select,
            {
              defaultValue: 'USDC',
              // style={{width: 98}}
              value: selectCoin,
              bordered: false,
              onSelect: function (LabeledValue) {
                setSelectCoin(LabeledValue)
                dispatch(actions_1.upDateCoinSelect({mintCoinSelect: LabeledValue}))
              },
              suffixIcon: react_2['default'].createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                react_2['default'].createElement('use', {xlinkHref: '#icon-Under'}),
              ),
            },
            react_2['default'].createElement(
              Option,
              {value: 'USDC', className: 'customize-option-label-item'},
              react_2['default'].createElement(
                'div',
                {className: 'customize-option-label-item'},
                react_2['default'].createElement('img', {src: USDC_2x_png_1['default'], alt: ''}),
                react_2['default'].createElement('span', null, 'USDC'),
              ),
            ),
            react_2['default'].createElement(
              Option,
              {value: 'USDT', className: 'customize-option-label-item'},
              react_2['default'].createElement(
                'div',
                {className: 'customize-option-label-item'},
                react_2['default'].createElement('img', {src: USDT_2x_png_1['default'], alt: ''}),
                react_2['default'].createElement('span', null, 'USDT'),
              ),
            ),
          ),
        ),
      ),
    ),
    data == '七' || data == '六' || discText()
      ? react_2['default'].createElement(
          'div',
          {className: 'available'},
          react_2['default'].createElement(
            'a',
            {
              href: 'https://www.hkex.com.hk/Services/Trading-hours-and-Severe-Weather-Arrangements/Trading-Hours/Securities-Market?',
              target: '_blank',
              className: 'content',
            },
            react_2['default'].createElement('img', {src: warning_png_1['default'], alt: ''}),
            react_2['default'].createElement('span', null, 'Only available during\u00A0'),
            react_2['default'].createElement('u', null, 'market hours'),
            react_2['default'].createElement(
              'svg',
              {className: 'icon', 'aria-hidden': 'true'},
              react_2['default'].createElement('use', {xlinkHref: '#icon-link'}),
            ),
          ),
        )
      : null,
    react_2['default'].createElement(
      antd_1.Button,
      {
        className: 'confirm-order',
        disabled: !tradeAmount || !tradeCollateral || Number(sliderValue) <= 0 || discText(),
        onClick: openConfirmOrder,
      },
      react_2['default'].createElement('span', null, 'Confirm Order'),
    ),
  )
}
exports['default'] = SymbolTrade
