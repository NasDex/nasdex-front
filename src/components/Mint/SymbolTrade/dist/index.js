/** @format */

'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = {next: verb(0), throw: verb(1), return: verb(2)}),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return {value: op[1], done: false}
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return {value: op[0] ? op[1] : void 0, done: true}
    }
  }
exports.__esModule = true
/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
var react_1 = require('react')
require('../../../style/Mint/symbolTrade.less')
var antd_1 = require('antd')
var index_1 = require('../OrderConfirm/index')
var react_redux_1 = require('react-redux')
var actions_1 = require('../../../state/mint/actions')
var useModal_1 = require('../../../hooks/useModal')
var tips_2x_png_1 = require('../../../img/common/tips@2x.png')
var warning_png_1 = require('../../../img/mint/warning.png')
var notification_1 = require('../../../utils/notification')
var react_2 = require('react')
var utils_1 = require('utils')
var hooks_1 = require('state/mint/hooks')
var hooks_2 = require('state/common/hooks')
var hooks_3 = require('state/manage/hooks')
var index_2 = require('../../common/approve/index')
var index_3 = require('../../../constants/index')
var useContract_1 = require('constants/hooks/useContract')
var hooks_4 = require('hooks')
var WalletModal_1 = require('components/WalletModal')
var useAuth_1 = require('hooks/useAuth')
var commonComponents_1 = require('utils/commonComponents')
var Setting_1 = require('../../common/Setting')
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
  var _a, _b
  var openNotificationWithIcon = function (type) {
    notification_1['default']({
      type: type,
      message: 'Mint - Mint ' + tradeAmount + ' ' + selectStock,
    })
  }
  var openSetting = useModal_1['default'](react_2['default'].createElement(Setting_1['default'], {from: 'mint'}))[0]
  var _c = useAuth_1['default'](),
    login = _c.login,
    logout = _c.logout
  var account = hooks_4.useActiveWeb3React().account
  var _d = WalletModal_1.useWalletModal(login, logout, account || undefined),
    onPresentConnectModal = _d.onPresentConnectModal,
    onPresentAccountModal = _d.onPresentAccountModal
  var mintState = hooks_1.useMintState()
  var manageState = hooks_3.useManageState()
  var commonState = hooks_2.useCommonState()
  var openConfirmOrder = useModal_1['default'](
    react_2['default'].createElement(index_1['default'], {openNotificationWithIcon: openNotificationWithIcon}),
  )[0]
  var dispatch = react_redux_1.useDispatch()
  var _e = react_1.useState(''),
    tradeAmount = _e[0],
    setAmount = _e[1]
  var _f = react_1.useState(''),
    tradeCollateral = _f[0],
    setTradeCollateral = _f[1]
  var _g = react_1.useState('200'),
    sliderValue = _g[0],
    setSliderValue = _g[1]
  var inputRef = react_2['default'].useRef(null)
  var _h = react_2['default'].useState(true),
    input = _h[0],
    setInput = _h[1]
  var _j = react_1.useState(false),
    amountInputFocus = _j[0],
    setamountInputFocus = _j[1]
  var _k = react_1.useState(false),
    collateralInputFocus = _k[0],
    setCollateralInputFocus = _k[1]
  var _l = react_1.useState(false),
    sliderInputFocus = _l[0],
    setSliderInputFocus = _l[1]
  var _m = react_1.useState(false),
    amountActive = _m[0],
    setAmountActive = _m[1]
  var _o = react_1.useState(false),
    collateralActive = _o[0],
    setCollateralActive = _o[1]
  var _p = react_1.useState(false),
    openConfirm = _p[0],
    setOpenConfirm = _p[1]
  var _q = react_1.useState('USDT'),
    selectCoin = _q[0],
    setSelectCoin = _q[1]
  var _r = react_1.useState('nSTA'),
    selectStock = _r[0],
    setSelectStock = _r[1]
  var _s = react_1.useState(''),
    data = _s[0],
    setData = _s[1]
  var myDate = new Date()
  var inputReftwo = react_2['default'].useRef(null)
  var contract = useContract_1.useErc20Contract(commonState.assetBaseInfoObj[selectCoin].address)
  // const account = useActiveWeb3React()
  var _t = react_1.useState('0'),
    assetsBalance = _t[0],
    setAssetsBalance = _t[1]
  var onApprove = index_2['default'](selectCoin, contract, index_3.mintAddress, 'mint').onApprove
  var _u = react_1.useState(false),
    requestedApproval = _u[0],
    setRequestedApproval = _u[1]
  var handleApprove = react_1.useCallback(
    function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var e_1
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3])
              setRequestedApproval(true)
              return [4 /*yield*/, onApprove()]
            case 1:
              _a.sent()
              setRequestedApproval(false)
              return [3 /*break*/, 3]
            case 2:
              e_1 = _a.sent()
              console.error(e_1)
              return [3 /*break*/, 3]
            case 3:
              return [2 /*return*/]
          }
        })
      })
    },
    [onApprove, account],
  )
  function changeSlider(value) {
    setSliderValue(value)
  }
  function getweekday(date) {
    var weekArray = ['七', '一', '二', '三', '四', '五', '六']
    var week = weekArray[new Date(date).getDay()]
    return week
  }
  function discText() {
    var newDate = new Date()
    var geDays = newDate.getDay()
    var dtext = true 
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
  function handleConfirm() {
    dispatch(actions_1.upDateMintTradeAmount({mintTradeAmount: tradeAmount}))
    dispatch(actions_1.upDateMintCollateralRatio({mintCollateralRatio: sliderValue}))
    dispatch(actions_1.upDateMintTradeCollateral({mintTradeCollateral: tradeCollateral}))
    dispatch(actions_1.upDateCoinStock({mintCoinStock: selectStock}))
    dispatch(actions_1.upDateCoinSelect({mintCoinSelect: selectCoin}))
    var swapAmountMin = Number(tradeAmount) - Number(mintState.slippageTolerance) * 0.01 * Number(tradeAmount)
    dispatch(actions_1.upDateSwapAmountMin({swapAmountMin: swapAmountMin.toString()}))
    openConfirmOrder()
  }
  react_1.useEffect(
    function () {
      var newData = getweekday(new Date(myDate.toLocaleDateString()))
      setData(newData)
      // console.log(commonState.openConfirm, 789789)
      if (commonState.openConfirm) {
        setOpenConfirm(true)
      }
      if (!commonState.openConfirm) {
        setOpenConfirm(false)
      }
    },
    [data, commonState.openConfirm],
  )
  react_1.useEffect(
    function () {
      if (amountInputFocus) {
        var result = (
          (Number(tradeAmount) * commonState.assetBaseInfoObj[selectStock].oraclePrice * Number(sliderValue)) /
          100
        ).toString()
        if (Number(result) > 0) {
          setTradeCollateral(utils_1.fixD(result, 4))
        } else {
          setTradeCollateral('')
        }
      }
      if (collateralInputFocus) {
        if (Number(sliderValue) > 0) {
          var amount = (
            (Number(tradeCollateral) / commonState.assetBaseInfoObj[selectStock].oraclePrice / Number(sliderValue)) *
            100
          ).toString()
          if (Number(amount) > 0) {
            setAmount(utils_1.fixD(amount, 6))
          } else {
            setAmount('')
          }
        }
      }
    },
    [tradeAmount, tradeCollateral, sliderValue, mintState, commonState.assetBaseInfoObj],
  )
  react_1.useEffect(
    function () {
      if (commonState.assetBaseInfoObj[selectCoin].balance) {
        setAssetsBalance(commonState.assetBaseInfoObj[selectCoin].balance)
      }
      if (mintState.mintCoinSelect) {
        setSelectCoin(mintState.mintCoinSelect)
      }
      if (mintState.mintCoinStock) {
        setSelectStock(mintState.mintCoinStock)
      }
      setTradeCollateral('')
      setAmount('')
      setSliderValue('200')
    },
    [
      mintState.mintInitInfo,
      mintState.mintCoinStock,
      mintState.mintCoinSelect,
      commonState.assetBaseInfoObj[selectCoin].balance,
    ],
  )
  return react_2['default'].createElement(
    'div',
    {className: 'trade'},
    react_2['default'].createElement(
      'div',
      {className: 'trade-title'},
      react_2['default'].createElement('span', {className: 'title'}, 'Mint ', selectStock),
    ),
    react_2['default'].createElement(
      'div',
      {className: amountActive ? 'amount-active amount' : 'amount'},
      react_2['default'].createElement(
        'div',
        {className: 'amount-header'},
        react_2['default'].createElement('p', {className: 'amount-text'}, 'Amount'),
        react_2['default'].createElement(
          'p',
          {className: 'balance'},
          'Balance',
          ' ',
          account
            ? openConfirm
              ? react_2['default'].createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
              : utils_1.fixD(
                  (_a = commonState.assetBaseInfoObj[selectStock]) === null || _a === void 0 ? void 0 : _a.balance,
                  6,
                )
            : '0.0',
        ),
      ),
      react_2['default'].createElement(
        'div',
        {className: 'trade-price'},
        openConfirm
          ? react_2['default'].createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
          : react_2['default'].createElement(antd_1.Input, {
              placeholder: '0.0',
              value: tradeAmount,
              defaultValue: '',
              bordered: false,
              onChange: function (e) {
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,6})?.*$/, '$1')
                setAmount(e.target.value)
              },
              onClick: function () {
                setamountInputFocus(true)
                setAmountActive(true)
                setCollateralInputFocus(false)
              },
              onBlur: function () {
                setAmountActive(false)
                setamountInputFocus(false)
              },
            }),
        react_2['default'].createElement(
          'div',
          {className: 'select-box'},
          react_2['default'].createElement(
            antd_1.Select,
            {
              defaultValue: 'nSTA',
              value: selectStock,
              // style={{width: 98}}
              onSelect: function (LabeledValue) {
                setSelectStock(LabeledValue)
                dispatch(actions_1.upDateCoinStock({mintCoinStock: LabeledValue}))
              },
              bordered: false,
              suffixIcon: react_2['default'].createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                react_2['default'].createElement('use', {xlinkHref: '#icon-Under'}),
              ),
            },
            commonState.assetsListInfo.map(function (ele, index) {
              return react_2['default'].createElement(
                Option,
                {value: ele.name, className: 'customize-option-label-item', key: index},
                react_2['default'].createElement(
                  'div',
                  {className: 'customize-option-label-item'},
                  react_2['default'].createElement('img', {
                    src: require('../../../img/coin/' + ele.name + '.png')['default'],
                    alt: '',
                  }),
                  react_2['default'].createElement('span', null, ele.name),
                ),
              )
            }),
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
          openConfirm
            ? react_2['default'].createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
            : react_2['default'].createElement(antd_1.Input, {
                placeholder: '200',
                maxLength: 3,
                defaultValue: sliderValue,
                onChange: function (e) {
                  e.target.value = e.target.value.replace(/[^\d]/g, '')
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
            setCollateralInputFocus(false)
          },
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
          'Balance',
          ' ',
          account
            ? openConfirm
              ? react_2['default'].createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
              : utils_1.fixD(assetsBalance, 4)
            : '0.0',
          react_2['default'].createElement(
            antd_1.Button,
            {
              disabled: Number(assetsBalance) > 0 && account ? false : true,
              onClick: function () {
                setCollateralInputFocus(true)
                setamountInputFocus(false)
                setTradeCollateral(assetsBalance)
              },
            },
            'MAX',
          ),
        ),
      ),
      react_2['default'].createElement(
        'div',
        {className: 'trade-price'},
        openConfirm
          ? react_2['default'].createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
          : react_2['default'].createElement(antd_1.Input, {
              placeholder: '0.0',
              value: tradeCollateral,
              bordered: false,
              onChange: function (e) {
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,4})?.*$/, '$1')
                setTradeCollateral(e.target.value)
              },
              onClick: function () {
                setCollateralInputFocus(true)
                setCollateralActive(true)
                setamountInputFocus(false)
              },
              onBlur: function () {
                setCollateralActive(false)
                setCollateralInputFocus(false)
              },
            }),
        react_2['default'].createElement(
          'div',
          {className: 'select-box'},
          react_2['default'].createElement(
            antd_1.Select,
            {
              defaultValue: 'USDT',
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
            commonState.cAssetsListInfo.map(function (ele, index) {
              return react_2['default'].createElement(
                Option,
                {value: ele.name, className: 'customize-option-label-item', key: index},
                react_2['default'].createElement(
                  'div',
                  {className: 'customize-option-label-item'},
                  react_2['default'].createElement('img', {
                    src: require('../../../img/coin/' + ele.name + '.png')['default'],
                    alt: '',
                  }),
                  react_2['default'].createElement('span', null, ele.name),
                ),
              )
            }),
          ),
        ),
      ),
    ),
    Number(tradeCollateral) && Number(tradeCollateral) < 50
      ? react_2['default'].createElement(
          'div',
          {className: 'available'},
          react_2['default'].createElement(
            'a',
            {className: 'content'},
            react_2['default'].createElement('img', {src: warning_png_1['default'], alt: ''}),
            react_2['default'].createElement('span', null, 'The collateral amount cannot be lower than $50.'),
          ),
        )
      : null,
    selectStock !== 'nETH'
      ? data == '七' || data == '六' || discText()
        ? commonComponents_1.TradingTimer()
        : Number(sliderValue) < 165
        ? commonComponents_1.LowerRatio()
        : null
      : Number(sliderValue) < 165
      ? commonComponents_1.LowerRatio()
      : null,
    !account
      ? react_2['default'].createElement(
          antd_1.Button,
          {
            className: 'confirm-order',
            onClick: function () {
              return onPresentConnectModal()
            },
          },
          'Connect',
        )
      : Number(tradeCollateral) > Number(assetsBalance)
      ? react_2['default'].createElement(
          antd_1.Button,
          {disabled: true, className: 'confirm-order'},
          'Insufficient balance',
        )
      : ((_b = commonState.assetBaseInfoObj[selectCoin]) === null || _b === void 0 ? void 0 : _b.mintContractAllowance)
      ? react_2['default'].createElement(
          antd_1.Button,
          {
            disabled:
              // data == '七' || data == '六' || discText() ||
              !Number(tradeAmount) ||
              !Number(tradeCollateral) ||
              Number(sliderValue) < 150 ||
              openConfirm ||
              Number(tradeCollateral) < 50 ||
              Number(tradeCollateral) > Number(assetsBalance)
                ? true
                : false,
            className: 'confirm-order',
            // disabled={!tradeAmount || !tradeCollateral || Number(sliderValue) <= 0 || discText()}
            onClick: function () {
              return handleConfirm()
            },
          },
          react_2['default'].createElement('span', null, 'Confirm Order'),
        )
      : react_2['default'].createElement(
          antd_1.Button,
          {
            className: 'confirm-order',
            loading: requestedApproval,
            // disabled={!tradeAmount || !tradeCollateral || Number(sliderValue) <= 0 || discText()}
            onClick: function () {
              return handleApprove()
            },
          },
          react_2['default'].createElement('span', null, 'Approve'),
        ),
  )
}
exports['default'] = SymbolTrade
