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
require('../../../style/Mint/orderConfirm.less')
var tencent_png_1 = require('../../../img/coin/tencent.png')
var waring_2x_png_1 = require('../../../img/common/waring@2x.png')
var hooks_1 = require('state/manage/hooks')
var index_1 = require('../Notification/index')
var useModal_1 = require('../../../hooks/useModal')
var useContract_1 = require('constants/hooks/useContract')
var utils_1 = require('ethers/lib/utils')
var defaultOnDismiss = function () {
  return null
}
var defaultOpenNotificationWithIcon = function () {
  return null
}
var OrderConfirm = function (_a) {
  var _b = _a.onDismiss,
    onDismiss = _b === void 0 ? defaultOnDismiss : _b,
    _c = _a.openNotificationWithIcon,
    openNotificationWithIcon = _c === void 0 ? defaultOpenNotificationWithIcon : _c,
    _d = _a.confirmType,
    confirmType = _d === void 0 ? '' : _d
  var manageState = hooks_1.useManageState()
  var openNoifcation = useModal_1['default'](
    React.createElement(index_1['default'], {type: 'success', title: 'Mint nTENCT'}),
  )[0]
  // 创建mint合约
  var MintContract = useContract_1.useMintContract()
  var positionInfo = manageState.positionInfo
  function submitOrder() {
    return __awaiter(this, void 0, void 0, function () {
      var currentRatio,
        nowRatio,
        positionId,
        positionAssetAmount,
        manageAssetAmount,
        positioncAssetAmount,
        managecAssetAmount,
        assetAmount,
        txhash,
        receipt,
        assetAmount,
        txhash,
        receipt,
        cAssetAmount,
        cAssetAmount
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            currentRatio = positionInfo.cRatio
            nowRatio = manageState.manageCollateralRatio
            positionId = positionInfo.positionId
            positionAssetAmount = positionInfo.assetAmount
            manageAssetAmount = Number(manageState.manageAssetAmount)
            positioncAssetAmount = positionInfo.cAssetAmount
            managecAssetAmount = Number(manageState.cAssetAmount)
            console.log(currentRatio, 'currentRatio##')
            console.log(nowRatio, 'nowRatio##')
            if (!(confirmType === 'editNasset')) return [3 /*break*/, 7]
            if (!(currentRatio > nowRatio)) return [3 /*break*/, 3]
            console.log(manageAssetAmount, '操作后mint数量##')
            console.log(positionAssetAmount, '当前仓位n资产数量##')
            console.log(manageAssetAmount - positionAssetAmount, '111')
            assetAmount = utils_1.parseUnits((manageAssetAmount - positionAssetAmount).toString(), 18)
            return [4 /*yield*/, MintContract.mint(positionId, assetAmount)]
          case 1:
            txhash = _a.sent()
            console.log(txhash, 'txhash##')
            return [4 /*yield*/, txhash.wait()]
          case 2:
            receipt = _a.sent()
            return [2 /*return*/, receipt.status]
          case 3:
            assetAmount = positionAssetAmount - manageAssetAmount
            return [4 /*yield*/, MintContract.burn(positionId, assetAmount)]
          case 4:
            txhash = _a.sent()
            console.log(txhash, 'txhash##')
            return [4 /*yield*/, txhash.wait()]
          case 5:
            receipt = _a.sent()
            return [
              2 /*return*/,
              receipt.status,
              // const txhash = await MintContract.burn(positionId, assetAmount)
            ]
          case 6:
            return [3 /*break*/, 8]
          case 7:
            if (currentRatio > nowRatio) {
              cAssetAmount = positioncAssetAmount - managecAssetAmount
              // const txhash = await MintContract.withdraw(positionId, cAssetAmount)
            } else {
              cAssetAmount = managecAssetAmount - positioncAssetAmount
              // const txhash = await MintContract.burn(positionId, cAssetAmount)
            }
            _a.label = 8
          case 8:
            return [2 /*return*/]
        }
      })
    })
  }
  return React.createElement(
    antd_1.Modal,
    {title: 'Order Confirm', width: 420, footer: null, visible: true, onOk: onDismiss, onCancel: onDismiss},
    React.createElement(
      'div',
      {className: 'order-confirm-conntent'},
      React.createElement(
        'div',
        {className: 'price'},
        React.createElement(
          'div',
          null,
          React.createElement('img', {src: tencent_png_1['default'], alt: ''}),
          React.createElement('span', null, 'Mint Assets'),
        ),
        React.createElement(
          'div',
          {className: 'mint-assets'},
          positionInfo.assetAmount,
          ' ',
          React.createElement('span', null, positionInfo.manageCoinStock),
        ),
      ),
      React.createElement(
        'div',
        {className: 'detail'},
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Collateral Ratio'),
          React.createElement('div', {className: 'text'}, manageState.manageCollateralRatio, '%'),
        ),
        React.createElement(
          'div',
          {className: 'detail-item'},
          React.createElement('div', {className: 'leabl'}, 'Collateral'),
          React.createElement(
            'div',
            {className: 'text'},
            manageState.manageTradeCollateral,
            ' ',
            manageState.manageCoinSelect,
          ),
        ),
      ),
      React.createElement(
        'div',
        {className: 'warning'},
        React.createElement('img', {src: waring_2x_png_1['default'], alt: ''}),
        React.createElement(
          'span',
          null,
          'A 1.5% fee of the minted value will be levied when the borrow position is closed',
        ),
      ),
      React.createElement(
        antd_1.Button,
        {className: 'confirm-btn', onClick: openNoifcation},
        React.createElement(
          'span',
          {
            className: 'mintSpan',
            onClick: function () {
              return submitOrder()
            },
          },
          'Mint',
        ),
      ),
    ),
  )
}
exports['default'] = OrderConfirm
