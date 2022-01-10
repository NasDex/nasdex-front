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
var antd_1 = require('antd')
require('../../../style/Farm/shortOrderConfirm.less')
var tencent_png_1 = require('../../../img/coin/tencent.png')
var waring_2x_png_1 = require('../../../img/common/waring@2x.png')
var react_redux_1 = require('react-redux')
var hooks_1 = require('state/farm/hooks')
var index_1 = require('../Notification/index')
var useModal_1 = require('../../../hooks/useModal')
var useContract_1 = require('constants/hooks/useContract')
var index_2 = require('../../../constants/index')
var utils_1 = require('ethers/lib/utils')
var actions_1 = require('state/farm/actions')
var defaultOnDismiss = function () {
  return null
}
var defaultOpenNotificationWithIcon = function () {
  return null
}
var ShortOrderConfirm = function (_a) {
  var _b = _a.onDismiss,
    onDismiss = _b === void 0 ? defaultOnDismiss : _b,
    _c = _a.openNotificationWithIcon,
    openNotificationWithIcon = _c === void 0 ? defaultOpenNotificationWithIcon : _c
  var farmState = hooks_1.useFarmState()
  var dispatch = react_redux_1.useDispatch()
  var openNoifcation = useModal_1['default'](
    React.createElement(index_1['default'], {type: 'success', title: 'Farm nSE'}),
  )[0]
  // 创建mint合约
  var MintContract = useContract_1.useMintContract()
  // console.log(MintContract, 'MintContract##')
  var openWaringNoifcation = useModal_1['default'](
    React.createElement(index_1['default'], {type: 'warning', title: 'Farm nSE'}),
  )[0]
  var openWaiting = useModal_1['default'](
    React.createElement(index_1['default'], {
      type: 'waitings',
      title: 'Farm nSE',
      message:
        'Collateral ' +
        farmState.farmTradeCollateral +
        ' \n      ' +
        farmState.farmCoinSelect +
        ' to farm ' +
        farmState.farmTradeAmount +
        ' \n      ' +
        farmState.farmCoinStock,
    }),
  )[0]
  function openPosition() {
    return __awaiter(this, void 0, void 0, function () {
      var nAssetsInfo,
        cAssetInfo,
        assetToken,
        cAssetToken,
        cAssetAmount,
        cRatio,
        swapAmountMin,
        swapDeadline,
        tx,
        receipt,
        error_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            nAssetsInfo = index_2.mintCoinStock[farmState.farmCoinStock]
            cAssetInfo = index_2.mintCoinObject[farmState.farmCoinSelect]
            assetToken = nAssetsInfo.address
            cAssetToken = cAssetInfo.address
            cAssetAmount = utils_1.parseUnits(farmState.farmTradeCollateral, cAssetInfo.decimals)
            cRatio = Number(farmState.farmCollateralRatio) * 10
            swapAmountMin = Number(farmState.farmReturned)
            swapDeadline = Number(farmState.deadline) * 60
            // console.log(farmState.swapAmountMin,swapDeadline,124564)
            dispatch(actions_1.upDateTxHash({hash: ''}))
            _a.label = 1
          case 1:
            _a.trys.push([1, 4, , 5])
            openWaiting()
            return [
              4 /*yield*/,
              MintContract.openShortPosition(
                assetToken,
                cAssetToken,
                cAssetAmount,
                cRatio,
                swapAmountMin,
                swapDeadline,
              ),
              // const tx = await MintContract.openShortPosition(assetToken, cAssetToken, cAssetAmount, cRatio)
            ]
          case 2:
            tx = _a.sent()
            // const tx = await MintContract.openShortPosition(assetToken, cAssetToken, cAssetAmount, cRatio)
            console.log(tx, tx.hash, 'txHash##')
            return [4 /*yield*/, tx.wait()]
          case 3:
            receipt = _a.sent()
            console.log(receipt, 'receipt##')
            dispatch(actions_1.upDateTxHash({hash: tx.hash}))
            if (receipt.status) {
              openNoifcation()
              openNotificationWithIcon('success')
            } else {
              openWaringNoifcation()
              openNotificationWithIcon('error')
            }
            return [3 /*break*/, 5]
          case 4:
            error_1 = _a.sent()
            openWaringNoifcation()
            openNotificationWithIcon('error')
            return [2 /*return*/]
          case 5:
            return [2 /*return*/]
        }
      })
    })
  }
  return React.createElement(
    antd_1.Modal,
    {title: 'Short Farm', width: 420, footer: null, visible: true, onOk: onDismiss, onCancel: onDismiss},
    React.createElement(
      'div',
      {className: 'short-order-confirm-conntent'},
      React.createElement(
        'div',
        {className: 'price'},
        React.createElement(
          'div',
          null,
          React.createElement('img', {src: tencent_png_1['default'], alt: ''}),
          React.createElement('span', null, 'Farm Assets'),
        ),
        React.createElement(
          'div',
          {className: 'mint-assets'},
          farmState.farmTradeAmount,
          ' ',
          React.createElement('span', null, 'nSE'),
        ),
      ),
      React.createElement(
        'div',
        {className: 'detail'},
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Collateral Ratio'),
          React.createElement('div', {className: 'text'}, farmState.farmCollateralRatio, '%'),
        ),
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Collateral'),
          React.createElement('div', {className: 'text'}, farmState.farmTradeCollateral, ' ', farmState.farmCoinSelect),
        ),
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Returned'),
          React.createElement('div', {className: 'text'}, farmState.farmReturned, ' ', farmState.farmCoinSelect),
        ),
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Slippage Tolerance'),
          React.createElement('div', {className: 'text'}, farmState.slippageTolerance, '%'),
        ),
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Minimum Received'),
          React.createElement('div', {className: 'text'}, farmState.farmMinimumReceived, ' ', farmState.farmCoinSelect),
        ),
      ),
      React.createElement(
        'div',
        {className: 'warning'},
        React.createElement('img', {src: waring_2x_png_1['default'], alt: ''}),
        React.createElement(
          'span',
          null,
          'A 1% fee of the minted value will be levied when the borrow position is closed',
        ),
      ),
      React.createElement(
        antd_1.Button,
        {className: 'confirm-btn'},
        React.createElement(
          'span',
          {
            className: 'mintSpan',
            onClick: function () {
              return openPosition()
            },
          },
          'Confirm',
        ),
      ),
    ),
  )
}
exports['default'] = ShortOrderConfirm
