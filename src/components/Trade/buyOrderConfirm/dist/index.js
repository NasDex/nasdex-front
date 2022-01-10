/** @format */

'use strict'
/* eslint-disable @typescript-eslint/no-var-requires */
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
var antd_1 = require('antd')
require('../../../style/Trade/buyOrderConfirm.less')
var hooks_1 = require('state/trade/hooks')
var Notification_1 = require('../../common/Notification')
var useModal_1 = require('../../../hooks/useModal')
var utils_1 = require('ethers/lib/utils')
var useContract_1 = require('constants/hooks/useContract')
var hooks_2 = require('hooks')
var utils_2 = require('utils')
var actions_1 = require('state/mint/actions')
var react_redux_1 = require('react-redux')
var hooks_3 = require('state/common/hooks')
var actions_2 = require('state/common/actions')
var actions_3 = require('state/common/actions')
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
    openNotificationWithIcon = _c === void 0 ? defaultOpenNotificationWithIcon : _c,
    tradeInfo = _a.tradeInfo
  var tokenA = tradeInfo.tokenA,
    tokenB = tradeInfo.tokenB,
    tokenAamount = tradeInfo.tokenAamount,
    tokenBamount = tradeInfo.tokenBamount,
    tokenAaddress = tradeInfo.tokenAaddress,
    tokenBaddress = tradeInfo.tokenBaddress,
    fixDPreciseA = tradeInfo.fixDPreciseA,
    fixDPreciseB = tradeInfo.fixDPreciseB,
    priceForm = tradeInfo.priceForm,
    priceTo = tradeInfo.priceTo,
    isTab = tradeInfo.isTab,
    tokenFeeAamount = tradeInfo.tokenFeeAamount,
    tokenFeeBamount = tradeInfo.tokenFeeBamount
  var tradeState = hooks_1.useTradeState()
  var _d = react_1.useState(false),
    isLoading = _d[0],
    setIsLoading = _d[1]
  var openNoifcation = useModal_1['default'](
    React.createElement(Notification_1['default'], {type: 'success', title: 'Swap', from: 'trade'}),
  )[0]
  var swapRouterContract = useContract_1.useSwapRouterContract()
  var _e = react_1.useState(isTab),
    isChildTab = _e[0],
    setChildTab = _e[1]
  var account = hooks_2.useActiveWeb3React().account
  var openWaiting = useModal_1['default'](
    React.createElement(Notification_1['default'], {
      type: 'waitings',
      title: 'Swap',
      from: 'trade',
      message:
        'Pay <span>' +
        tokenAamount +
        '</span> ' +
        tokenA +
        ' to receive <span>' +
        utils_2.fixD(tokenBamount, 4) +
        '</span> ' +
        tokenB,
    }),
  )[0]
  var openWaringNoifcation = useModal_1['default'](
    React.createElement(Notification_1['default'], {type: 'waring', title: 'Swap', from: 'mint'}),
  )[0]
  var dispatch = react_redux_1.useDispatch()
  function confirmSwap() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (tokenA == 'WMATIC') {
          swapETHForExactTokens()
        } else if (tokenB == 'WMATIC') {
          swapExactETHForTokens()
        } else {
          swapExactTokensForTokens()
        }
        return [2 /*return*/]
      })
    })
  }
  var commonState = hooks_3.useCommonState()
  function swapExactTokensForTokens() {
    return __awaiter(this, void 0, void 0, function () {
      var amountIn, amountOutMin, timestamp, txHash, assetNewInfo, oneAssetInfo, receipt, error_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            dispatch(actions_3.upDateOpenConfirm({openConfirm: true}))
            dispatch(actions_3.upDateBtnOpenConfirm({btnOpenConfirm: true}))
            setIsLoading(true)
            amountIn = utils_1.parseUnits(tokenAamount, 18)
            amountOutMin = utils_1.parseUnits('0', 18)
            timestamp = Math.ceil(new Date().valueOf() / 1000) + 60
            openWaiting()
            _a.label = 1
          case 1:
            _a.trys.push([1, 5, , 6])
            return [
              4 /*yield*/,
              swapRouterContract.swapExactTokensForTokens(
                amountIn,
                amountOutMin,
                [tokenAaddress, tokenBaddress],
                account,
                timestamp,
              ),
            ]
          case 2:
            txHash = _a.sent()
            dispatch(actions_1.upDateTxHash({hash: txHash.hash}))
            dispatch(actions_3.upDateBtnOpenConfirm({btnOpenConfirm: false}))
            openNoifcation()
            return [4 /*yield*/, hooks_3.getOneAssetInfo(tokenB, tokenBaddress, account)]
          case 3:
            assetNewInfo = _a.sent()
            oneAssetInfo = __assign(__assign({}, commonState.assetBaseInfoObj[tokenB]), assetNewInfo)
            dispatch(actions_2.upDateOneAssetBaseInfo({oneAssetBaseInfo: oneAssetInfo}))
            return [4 /*yield*/, txHash.wait()]
          case 4:
            receipt = _a.sent()
            dispatch(actions_3.upDateOpenConfirm({openConfirm: false}))
            if (receipt.status) {
              openNotificationWithIcon('success')
            } else {
              setIsLoading(false)
              openWaringNoifcation()
              openNotificationWithIcon('error')
            }
            return [3 /*break*/, 6]
          case 5:
            error_1 = _a.sent()
            dispatch(actions_3.upDateBtnOpenConfirm({btnOpenConfirm: false}))
            dispatch(actions_3.upDateOpenConfirm({openConfirm: false}))
            openWaringNoifcation()
            setIsLoading(false)
            openNotificationWithIcon('error')
            return [3 /*break*/, 6]
          case 6:
            return [2 /*return*/]
        }
      })
    })
  }
  function swapETHForExactTokens() {
    return __awaiter(this, void 0, void 0, function () {
      var amountIn, amountOut, timestamp, txHash, receipt, error_2
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsLoading(true)
            amountIn = utils_1.parseUnits(tokenAamount, 18)
            amountOut = utils_1.parseUnits(Math.floor(tokenBamount).toString(), 18)
            timestamp = Math.ceil(new Date().valueOf() / 1000) + 60
            openWaiting()
            _a.label = 1
          case 1:
            _a.trys.push([1, 4, , 5])
            return [
              4 /*yield*/,
              swapRouterContract.swapETHForExactTokens(
                // amountIn,
                amountOut,
                [tokenAaddress, tokenBaddress],
                account,
                timestamp,
                {
                  value: amountIn,
                },
              ),
            ]
          case 2:
            txHash = _a.sent()
            dispatch(actions_1.upDateTxHash({hash: txHash.hash}))
            dispatch(actions_3.upDateBtnOpenConfirm({btnOpenConfirm: false}))
            openNoifcation()
            return [4 /*yield*/, txHash.wait()]
          case 3:
            receipt = _a.sent()
            dispatch(actions_3.upDateOpenConfirm({openConfirm: false}))
            openNotificationWithIcon('success')
            setIsLoading(false)
            return [3 /*break*/, 5]
          case 4:
            error_2 = _a.sent()
            dispatch(actions_3.upDateBtnOpenConfirm({btnOpenConfirm: false}))
            dispatch(actions_3.upDateOpenConfirm({openConfirm: false}))
            openWaringNoifcation()
            setIsLoading(false)
            openNotificationWithIcon('error')
            return [3 /*break*/, 5]
          case 5:
            return [2 /*return*/]
        }
      })
    })
  }
  function swapExactETHForTokens() {
    return __awaiter(this, void 0, void 0, function () {
      var amountIn, amountOutMin, timestamp, txHash, assetNewInfo, oneAssetInfo, receipt, error_3
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsLoading(true)
            amountIn = utils_1.parseUnits('0', 18)
            amountOutMin = utils_1.parseUnits(tokenBamount, 18)
            timestamp = Math.ceil(new Date().valueOf() / 1000) + 60
            // console.log(timestamp,'timestamp##')
            openWaiting()
            _a.label = 1
          case 1:
            _a.trys.push([1, 5, , 6])
            return [
              4 /*yield*/,
              swapRouterContract.swapExactETHForTokens(
                amountIn,
                // amountOutMin,
                [tokenBaddress, tokenAaddress],
                account,
                timestamp,
                {
                  value: amountOutMin,
                },
              ),
            ]
          case 2:
            txHash = _a.sent()
            dispatch(actions_1.upDateTxHash({hash: txHash.hash}))
            dispatch(actions_3.upDateBtnOpenConfirm({btnOpenConfirm: false}))
            openNoifcation()
            return [4 /*yield*/, hooks_3.getOneAssetInfo(tokenB, tokenBaddress, account)]
          case 3:
            assetNewInfo = _a.sent()
            oneAssetInfo = __assign(__assign({}, commonState.assetBaseInfoObj[tokenB]), assetNewInfo)
            console.log(oneAssetInfo, 'oneAssetInfo')
            dispatch(actions_2.upDateOneAssetBaseInfo({oneAssetBaseInfo: oneAssetInfo}))
            return [4 /*yield*/, txHash.wait()]
          case 4:
            receipt = _a.sent()
            dispatch(actions_3.upDateOpenConfirm({openConfirm: false}))
            if (receipt.status) {
              openNotificationWithIcon('success')
            } else {
              openWaringNoifcation()
              setIsLoading(false)
              openNotificationWithIcon('error')
            }
            setIsLoading(false)
            return [3 /*break*/, 6]
          case 5:
            error_3 = _a.sent()
            dispatch(actions_3.upDateBtnOpenConfirm({btnOpenConfirm: false}))
            dispatch(actions_3.upDateOpenConfirm({openConfirm: false}))
            openWaringNoifcation()
            setIsLoading(false)
            openNotificationWithIcon('error')
            return [3 /*break*/, 6]
          case 6:
            return [2 /*return*/]
        }
      })
    })
  }
  return React.createElement(
    antd_1.Modal,
    {title: 'Swap', width: 420, footer: null, visible: true, onOk: onDismiss, onCancel: onDismiss},
    React.createElement(
      'div',
      {className: 'buy-order-confirm-conntent'},
      React.createElement(
        'div',
        {className: 'price'},
        React.createElement(
          'div',
          null,
          React.createElement('img', {src: require('../../../img/coin/' + tokenA + '.png')['default'], alt: ''}),
          React.createElement('span', null, 'Pay'),
        ),
        React.createElement(
          'div',
          {className: 'mint-assets'},
          tokenAamount,
          ' ',
          React.createElement('span', null, tokenA),
        ),
      ),
      React.createElement(
        'div',
        {className: 'longAdd'},
        React.createElement(
          'svg',
          {className: 'icon', 'aria-hidden': 'true'},
          React.createElement('use', {xlinkHref: '#icon-arrow-trade'}),
        ),
      ),
      React.createElement(
        'div',
        {className: 'price'},
        React.createElement(
          'div',
          null,
          React.createElement('img', {src: require('../../../img/coin/' + tokenB + '.png')['default'], alt: ''}),
          React.createElement('span', null, 'Receive'),
        ),
        React.createElement(
          'div',
          {className: 'mint-assets'},
          tokenBamount,
          ' ',
          React.createElement('span', null, tokenB),
        ),
      ),
      React.createElement(
        'div',
        {className: 'detail'},
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Price'),
          React.createElement(
            'div',
            {className: 'text'},
            isChildTab ? '1 ' + tokenA : '1 ' + tokenB,
            ' = ',
            isChildTab ? utils_2.fixD(priceTo, 4) + ' ' + tokenB : utils_2.fixD(priceForm, 4) + ' ' + tokenB,
            React.createElement(
              'svg',
              {
                className: 'icon',
                'aria-hidden': 'true',
                onClick: function () {
                  setChildTab(!isChildTab)
                },
              },
              React.createElement('use', {xlinkHref: '#Icon-Trade-Active'}),
            ),
          ),
        ),
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Slippage Tolerance'),
          React.createElement('div', {className: 'text'}, tradeState.slippageTolerance, '%'),
        ),
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Minimum received'),
          React.createElement(
            'div',
            {className: 'text'},
            utils_2.fixD(
              Number(tokenBamount) - (Number(tokenBamount) * Number(tradeState.slippageTolerance)) / 100,
              fixDPreciseB,
            ),
            ' ',
            tokenB,
          ),
        ),
      ),
      React.createElement(
        antd_1.Button,
        {
          className: 'confirm-btn',
          onClick: function () {
            return confirmSwap()
          },
          loading: isLoading,
        },
        'Confirm',
      ),
    ),
  )
}
exports['default'] = LongOrderConfirm
