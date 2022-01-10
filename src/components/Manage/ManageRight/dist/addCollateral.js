/** @format */

'use strict'
/** @format */
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
var react_1 = require('react')
require('../../../style/Manage/addCollateral.less')
var antd_1 = require('antd')
var tips_2x_png_1 = require('../../../img/common/tips@2x.png')
var nSE_png_1 = require('../../../img/coin/nSE.png')
var utils_1 = require('utils')
var hooks_1 = require('hooks')
var WalletModal_1 = require('components/WalletModal')
var useAuth_1 = require('hooks/useAuth')
var actions_1 = require('../../../state/manage/actions')
var hooks_2 = require('state/manage/hooks')
var hooks_3 = require('state/common/hooks')
var react_redux_1 = require('react-redux')
var useModal_1 = require('hooks/useModal')
var index_1 = require('../hooks/index')
var useContract_1 = require('constants/hooks/useContract')
var index_2 = require('../../../constants/index')
var index_3 = require('../OrderConfirm/index')
var notification_1 = require('../../../utils/notification')
var commonComponents_1 = require('utils/commonComponents')
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
var AddCollateral = function (props) {
  // 获取仓位详情信息
  var manageState = hooks_2.useManageState()
  var commonState = hooks_3.useCommonState()
  // const {positionInfo} = props
  var positionInfo = manageState.positionInfo
  console.log(positionInfo, 'positionInfo##')
  var dispatch = react_redux_1.useDispatch()
  // 默认mint资产
  var _a = react_1.useState(''),
    tradeAmount = _a[0],
    setAmount = _a[1]
  // 默认抵押物数量
  var _b = react_1.useState(''),
    tradeCollateral = _b[0],
    setTradeCollateral = _b[1]
  // 默认抵押率
  var _c = react_1.useState('200'),
    sliderValue = _c[0],
    setSliderValue = _c[1]
  //n资产输入框
  var _d = react_1.useState(true),
    amountInputFocus = _d[0],
    setamountInputFocus = _d[1]
  //质押资产输入框
  var _e = react_1.useState(false),
    collateralInputFocus = _e[0],
    setCollateralInputFocus = _e[1]
  //抵押率输入框
  // N资产名称
  var assetTokenName = positionInfo.assetTokenName
  // const mintState = useMintState()
  // const [selectStock, setSelectStock] = useState()
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
  var account = hooks_1.useActiveWeb3React().account
  var _k = WalletModal_1.useWalletModal(login, logout, account || undefined),
    onPresentConnectModal = _k.onPresentConnectModal,
    onPresentAccountModal = _k.onPresentAccountModal
  var _l = react_1.useState(manageState.manageCoinSelect),
    selectCoin = _l[0],
    setSelectCoin = _l[1]
  var _m = react_1.useState(''),
    data = _m[0],
    setData = _m[1]
  var _o = react_1.useState(false),
    openConfirm = _o[0],
    setOpenConfirm = _o[1]
  var myDate = new Date()
  var openNotificationWithIcon = function (type) {
    notification_1['default']({
      type: type,
      message: 'Mint - Mint ' + tradeAmount + ' nSE',
    })
  }
  function getweekday(date) {
    var weekArray = ['七', '一', '二', '三', '四', '五', '六']
    var week = weekArray[new Date(date).getDay()]
    return week
  }
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
  // 创建合约
  var contract = useContract_1.useErc20Contract(index_2.nAssetAddress)
  var onApprove = index_1['default'](contract, index_2.mintAddress).onApprove
  var _p = react_1.useState(false),
    requestedApproval = _p[0],
    setRequestedApproval = _p[1]
  // 授权
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
  var openConfirmOrder = useModal_1['default'](
    React.createElement(index_3['default'], {
      openNotificationWithIcon: openNotificationWithIcon,
      confirmType: 'editNasset',
    }),
  )[0]
  function changeSlider(value) {
    setSliderValue(value)
  }
  function handleConfirm() {
    dispatch(actions_1.upDateManageTradeAmount({manageTradeAmount: tradeAmount}))
    dispatch(actions_1.upDateAssetAmount({manageAssetAmount: tradeAmount}))
    dispatch(actions_1.upDateManageCollateralRatio({manageCollateralRatio: sliderValue}))
    dispatch(actions_1.upDateManageTradeCollateral({manageTradeCollateral: tradeCollateral}))
    // console.log(commonState,'commonState555555')
    openConfirmOrder()
  }
  react_1.useEffect(
    function () {
      setSelectCoin(manageState.manageCoinSelect)
      if (commonState.openConfirm) {
        setOpenConfirm(true)
      }
      if (!commonState.openConfirm) {
        setOpenConfirm(false)
      }
    },
    [manageState.manageCoinSelect, commonState.openConfirm],
  )
  react_1.useEffect(
    function () {
      var newData = getweekday(new Date(myDate.toLocaleDateString()))
      setData(newData)
    },
    [data],
  )
  react_1.useEffect(
    function () {
      if (amountInputFocus) {
        if (Number(tradeAmount) > 0) {
          var result = ((Number(tradeCollateral) / Number(tradeAmount) / manageState.manageNowPrice) * 100).toString()
          console.log(result, 'result##')
          if (Number(result) > 0) {
            setSliderValue(parseInt(result).toString())
          } else {
            setSliderValue('')
          }
        }
      } else {
        // console.log(sliderValue,'sliderValue*******')
        var result = ((Number(tradeCollateral) / Number(sliderValue) / manageState.manageNowPrice) * 100).toString()
        if (Number(result) > 0) {
          setAmount(utils_1.fixD(result, 6))
        } else {
          setAmount('')
        }
      }
    },
    [tradeAmount, sliderValue],
  )
  react_1.useEffect(
    function () {
      // console.log(positionInfo,'positionInfo###')
      setTradeCollateral(utils_1.fixD(positionInfo.cAssetAmountSub, 4))
      setAmount(utils_1.fixD(positionInfo.assetAmountSub, 6))
      setSliderValue(positionInfo.cRatio)
    },
    [positionInfo],
  )
  return React.createElement(
    'div',
    {className: 'manageRight-addCollateral-container'},
    React.createElement(
      'div',
      {className: collateralActive ? 'amount-active amount amountDisabled' : 'amount amountDisabled'},
      React.createElement(
        'div',
        {className: 'amount-header'},
        React.createElement('p', {className: 'amount-text'}, 'Collateral'),
        React.createElement(
          'p',
          {className: 'balance'},
          'Balance',
          ' ',
          account
            ? openConfirm
              ? React.createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
              : utils_1.fixD(manageState.manageWalletcAssetAmount, 4)
            : '0.0',
        ),
      ),
      React.createElement(
        'div',
        {className: 'trade-price'},
        openConfirm
          ? React.createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
          : React.createElement(antd_1.Input, {
              disabled: true,
              placeholder: '0.0',
              value: tradeCollateral,
              bordered: false,
              onClick: function () {
                setCollateralInputFocus(true)
                setCollateralActive(true)
                setamountInputFocus(false)
              },
              onBlur: function () {
                setCollateralActive(false)
              },
            }),
        positionInfo.cAssetTokenName
          ? React.createElement(
              'div',
              {className: 'asset-box'},
              React.createElement('img', {
                alt: positionInfo.cAssetTokenName,
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                src: require('../../../img/coin/' + positionInfo.cAssetTokenName + '.png')['default'],
              }),
              React.createElement('span', null, positionInfo.cAssetTokenName),
            )
          : null,
      ),
    ),
    React.createElement(
      'div',
      {className: 'collateral'},
      React.createElement(
        'div',
        {className: 'collateral-ratio-header'},
        React.createElement(
          'div',
          {className: 'collateral-title-'},
          'Collateral Ratio (Current ',
          positionInfo.cRatio,
          '%)',
        ),
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
          openConfirm
            ? React.createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
            : React.createElement(antd_1.Input, {
                placeholder: '200',
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
            setamountInputFocus(false)
            // setSliderInputFocus(true)
            setCollateralInputFocus(false)
          },
        }),
      ),
    ),
    React.createElement(
      'div',
      {className: 'edit-title'},
      React.createElement('span', null, 'Mint'),
      React.createElement('p', null, utils_1.fixD(positionInfo.assetAmountSub, 6), ' ', positionInfo.assetTokenName),
    ),
    React.createElement(
      'div',
      {className: 'arrow'},
      React.createElement(
        'svg',
        {className: 'icon', 'aria-hidden': 'true'},
        React.createElement('use', {xlinkHref: '#icon-arrow-trade'}),
      ),
    ),
    React.createElement(
      'div',
      {className: amountActive ? 'amount-active amount' : 'amount'},
      React.createElement(
        'div',
        {className: 'amount-header'},
        React.createElement('p', null, 'Edit'),
        React.createElement(
          'p',
          {className: 'balance'},
          'Balance',
          ' ',
          account
            ? openConfirm
              ? React.createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
              : utils_1.fixD(manageState.manageWalletAssetAmount, 6)
            : '0.0',
        ),
      ),
      React.createElement(
        'div',
        {className: 'trade-price'},
        openConfirm
          ? React.createElement(antd_1.Skeleton.Input, {style: {width: 100, height: 20}, active: true})
          : React.createElement(antd_1.Input, {
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
          {className: 'asset-box'},
          React.createElement('img', {src: nSE_png_1['default'], alt: ''}),
          React.createElement('span', null, assetTokenName),
        ),
      ),
    ),
    data == '七' || data == '六' || discText()
      ? commonComponents_1.TradingTimer()
      : Number(sliderValue) < 165
      ? commonComponents_1.LowerRatio()
      : null,
    !account
      ? React.createElement(
          antd_1.Button,
          {
            className: 'addCollateral',
            onClick: function () {
              return onPresentConnectModal()
            },
          },
          'Connect',
        )
      : commonState.assetBaseInfoObj[assetTokenName].mintContractAllowance
      ? React.createElement(
          antd_1.Button,
          {
            disabled:
              // data == '七' || data == '六' || discText() ||
              Number(sliderValue) < 150 || openConfirm ? true : false,
            className: 'addCollateral',
            onClick: function () {
              return handleConfirm()
            },
          },
          'Confirm',
        )
      : React.createElement(
          antd_1.Button,
          {
            className: 'close',
            loading: requestedApproval,
            // disabled={!tradeAmount || !tradeCollateral || Number(sliderValue) <= 0 || discText()}
            onClick: function () {
              return handleApprove()
            },
          },
          React.createElement('span', null, 'Approve'),
        ),
    React.createElement(
      'div',
      {className: 'tx-fee'},
      React.createElement(
        'div',
        {className: 'item'},
        React.createElement('div', {className: 'tx-fee-text'}, 'Total ', positionInfo.assetTokenName),
        React.createElement('div', {className: 'tx-fee-price'}, tradeAmount ? tradeAmount : '--'),
      ),
      React.createElement(
        'div',
        {className: 'item'},
        React.createElement('div', {className: 'tx-fee-text'}, 'Total Collateral (', positionInfo.cAssetTokenName, ')'),
        React.createElement('div', {className: 'tx-fee-price'}, utils_1.fixD(positionInfo.cAssetAmountSub, 4)),
      ),
      React.createElement(
        'div',
        {className: 'item'},
        React.createElement('div', {className: 'tx-fee-text'}, 'New Collateral Ratio (CR)'),
        React.createElement('div', {className: 'tx-fee-price'}, sliderValue ? sliderValue : '--', '%'),
      ),
    ),
  )
}
exports['default'] = AddCollateral
