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
require('../../../style/Trade/sell.less')
var antd_1 = require('antd')
var tips_2x_png_1 = require('../../../img/common/tips@2x.png')
var nSE_png_1 = require('../../../img/coin/nSE.png')
var USDT_2x_png_1 = require('../../../img/coin/USDT@2x.png')
var useModal_1 = require('../../../hooks/useModal')
var index_1 = require('../buyOrderConfirm/index')
var notification_1 = require('../../../utils/notification')
var hooks_1 = require('hooks')
var WalletModal_1 = require('components/WalletModal')
var useAuth_1 = require('hooks/useAuth')
var utils_1 = require('utils')
var utils_2 = require('ethers/lib/utils')
var useContract_1 = require('constants/hooks/useContract')
var index_2 = require('constants/index')
var approve_1 = require('components/common/approve')
var hooks_2 = require('state/common/hooks')
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
var Sell = function () {
  var openNotificationWithIcon = function (type) {
    notification_1['default']({
      type: type,
      message: 'Trade - Trade ' + tradeAmount + ' nSE',
    })
  }
  var _a = react_1.useState(false),
    amountActive = _a[0],
    setAmountActive = _a[1]
  var _b = react_1.useState(false),
    collateralActive = _b[0],
    setCollateralActive = _b[1]
  var _c = useAuth_1['default'](),
    login = _c.login,
    logout = _c.logout
  var account = hooks_1.useActiveWeb3React().account
  var _d = WalletModal_1.useWalletModal(login, logout, account || undefined),
    onPresentConnectModal = _d.onPresentConnectModal,
    onPresentAccountModal = _d.onPresentAccountModal
  var _e = react_1.useState('USDT'),
    tokenA = _e[0],
    setTokenA = _e[1]
  var _f = react_1.useState('nSE'),
    tokenB = _f[0],
    setTokenB = _f[1]
  var _g = react_1.useState(''),
    tokenAamount = _g[0],
    setTokenAamount = _g[1]
  var _h = react_1.useState(''),
    tokenBamount = _h[0],
    setTokenBamount = _h[1]
  var _j = react_1.useState(''),
    tokenABalance = _j[0],
    setTokenABalance = _j[1]
  var _k = react_1.useState(false),
    tokenApprove = _k[0],
    setTokenApprove = _k[1]
  var _l = react_1.useState(false),
    isChangeTokenA = _l[0],
    setIsChangeTokenA = _l[1]
  var _m = react_1.useState(false),
    isChangeTokenB = _m[0],
    setIsChangeTokenB = _m[1]
  var commonState = hooks_2.useCommonState()
  react_1.useEffect(
    function () {
      if (commonState.assetBaseInfoObj[tokenA].balance) {
        setTokenABalance(commonState.assetBaseInfoObj[tokenA].balance)
      }
      if (commonState.assetBaseInfoObj[tokenA].swapAllowance) {
        setTokenApprove(commonState.assetBaseInfoObj[tokenA].swapAllowance)
      }
    },
    [commonState.assetBaseInfoObj[tokenA].balance],
  )
  var tokenAaddress = commonState.assetBaseInfoObj[tokenA].address
  var tokenBaddress = commonState.assetBaseInfoObj[tokenB].address
  var tokenAContract = useContract_1.useErc20Contract(tokenAaddress)
  var onApprove = approve_1['default'](tokenA, tokenAContract, index_2.SwapRouterAddress, 'swap').onApprove
  var _o = react_1.useState(false),
    requestedApproval = _o[0],
    setRequestedApproval = _o[1]
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
  // useEffect(() => {
  //   setSelectCoin(tradeState.tradeCoinSelect)
  // }, [tradeState.tradeCoinSelect])
  var swapRouterContract = useContract_1.useSwapRouterContract()
  react_1.useEffect(
    function () {
      if (tokenAamount && isChangeTokenA) {
        getAmountsOut()
      }
      if (tokenBamount && isChangeTokenB) {
        getAmountsIn()
      }
    },
    [tokenAamount, tokenBamount],
  )
  function getAmountsOut() {
    return __awaiter(this, void 0, void 0, function () {
      var parseAmount, amountsOut, tokenBAmount
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            parseAmount = utils_2.parseUnits(tokenAamount, 18)
            return [4 /*yield*/, swapRouterContract.getAmountsOut(parseAmount, [tokenAaddress, tokenBaddress])]
          case 1:
            amountsOut = _a.sent()
            tokenBAmount = utils_2.formatUnits(amountsOut[1], 18)
            setTokenBamount(tokenBAmount)
            return [2 /*return*/]
        }
      })
    })
  }
  function getAmountsIn() {
    return __awaiter(this, void 0, void 0, function () {
      var parseAmount, amountsIn, tokenBAmount
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            parseAmount = utils_2.parseUnits(tokenBamount, 18)
            return [
              4 /*yield*/,
              swapRouterContract.getAmountsIn(parseAmount, [tokenAaddress, tokenBaddress]),
              // console.log(amountsIn.toString(),'amountsIn##')
            ]
          case 1:
            amountsIn = _a.sent()
            tokenBAmount = utils_2.formatUnits(amountsIn[0], 18)
            setTokenAamount(tokenBAmount)
            return [2 /*return*/]
        }
      })
    })
  }
  var openConfirmOrder = useModal_1['default'](
    React.createElement(index_1['default'], {
      openNotificationWithIcon: openNotificationWithIcon,
      tradeInfo: {
        tokenA: tokenA,
        tokenB: tokenB,
        tokenAamount: tokenAamount,
        tokenBamount: tokenBamount,
        tokenAaddress: tokenAaddress,
        tokenBaddress: tokenBaddress,
      },
    }),
  )[0]
  console.log(commonState.assetBaseInfoObj[tokenB], 'commonState.assetBaseInfoObj[tokenB]##')
  return React.createElement(
    'div',
    {className: 'sell-container'},
    React.createElement(
      'div',
      {className: amountActive ? 'amount-active amount' : 'amount'},
      React.createElement(
        'div',
        {className: 'amount-header'},
        React.createElement('p', {className: 'amount-text'}, 'Pay'),
        React.createElement(
          'p',
          {className: 'balance'},
          'Balance ',
          tokenA ? utils_1.fixD(tokenABalance, 4) : '0',
          React.createElement(
            antd_1.Button,
            {
              disabled: Number(tokenABalance) > 0 && account ? false : true,
              onClick: function () {
                setTokenAamount(tokenABalance)
              },
            },
            'MAX',
          ),
        ),
      ),
      React.createElement(
        'div',
        {className: 'trade-price'},
        React.createElement(antd_1.Input, {
          placeholder: '0.0',
          value: tokenAamount,
          defaultValue: '',
          bordered: false,
          onChange: function (e) {
            e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,4})?.*$/, '$1')
            setTokenAamount(e.target.value)
            setIsChangeTokenA(true)
            setIsChangeTokenB(false)
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
            // style={{width: 98}}
            {
              // style={{width: 98}}
              defaultValue: 'USDT',
              value: tokenA,
              bordered: false,
              onSelect: function (labeledValue) {
                setTokenA(labeledValue)
              },
              suffixIcon: React.createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                React.createElement('use', {xlinkHref: '#icon-Under'}),
              ),
            },
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
      {className: collateralActive ? 'amount-active amount' : 'amount'},
      React.createElement(
        'div',
        {className: 'amount-header'},
        React.createElement('p', null, 'Receive (Estimated)'),
        React.createElement(
          'p',
          {className: 'balance'},
          'Balance ',
          tokenB ? utils_1.fixD(commonState.assetBaseInfoObj[tokenB].balance, 4) : '0',
        ),
      ),
      React.createElement(
        'div',
        {className: 'trade-price'},
        React.createElement(antd_1.Input, {
          placeholder: '0.0',
          value: tokenBamount,
          defaultValue: '',
          bordered: false,
          onChange: function (e) {
            e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,6})?.*$/, '$1')
            setTokenBamount(e.target.value)
            setIsChangeTokenA(false)
            setIsChangeTokenB(true)
          },
          onClick: function () {
            setCollateralActive(true)
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
              defaultValue: 'WMATIC',
              value: tokenB,
              bordered: false,
              onSelect: function (labeledValue) {
                setTokenB(labeledValue)
              },
              suffixIcon: React.createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                React.createElement('use', {xlinkHref: '#icon-Under'}),
              ),
            },
            React.createElement(
              Option,
              {value: 'WMATIC'},
              React.createElement(
                'div',
                {className: 'customize-option-label-item'},
                React.createElement('img', {src: nSE_png_1['default'], alt: ''}),
                React.createElement('span', null, 'nSE'),
              ),
            ),
          ),
        ),
      ),
    ),
    !account
      ? React.createElement(
          antd_1.Button,
          {
            className: 'Confirm',
            onClick: function () {
              return onPresentConnectModal()
            },
          },
          'Connect',
        )
      : React.createElement(antd_1.Button, {className: 'Confirm', onClick: openConfirmOrder}, 'Confirm Order'),
  )
}
exports['default'] = Sell
