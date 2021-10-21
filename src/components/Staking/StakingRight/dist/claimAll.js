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
var antd_1 = require('antd')
var logo_png_1 = require('../../../img/stake/logo.png')
require('../../../style/Staking/claimAll.less')
var useHarvestFarm_1 = require('hooks/deaufltPool/useHarvestFarm')
var utils_1 = require('utils')
var defaultOnDismiss = function () {
  return null
}
var ClaimAll = function (_a) {
  var _b = _a.onDismiss,
    onDismiss = _b === void 0 ? defaultOnDismiss : _b,
    _c = _a.poolInfo,
    poolInfo = _c === void 0 ? {} : _c
  var onMasterReward = useHarvestFarm_1['default'](poolInfo.pid).onMasterReward
  var _d = react_1.useState(false),
    requestedLoding = _d[0],
    setRequestedLoding = _d[1]
  var handleHarvest = function (amount) {
    return __awaiter(void 0, void 0, void 0, function () {
      var e_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setRequestedLoding(true)
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, 4, 5])
            return [4 /*yield*/, onMasterReward()]
          case 2:
            _a.sent()
            return [3 /*break*/, 5]
          case 3:
            e_1 = _a.sent()
            console.error(e_1)
            return [3 /*break*/, 5]
          case 4:
            onDismiss()
            setRequestedLoding(false)
            return [7 /*endfinally*/]
          case 5:
            return [2 /*return*/]
        }
      })
    })
  }
  return React.createElement(
    antd_1.Modal,
    {title: 'Claim', width: 420, footer: null, visible: true, onOk: onDismiss, onCancel: onDismiss},
    React.createElement(
      'div',
      {className: 'claim-container'},
      React.createElement('img', {className: 'logo-img', src: logo_png_1['default'], alt: ''}),
      React.createElement(
        'div',
        {className: 'text'},
        React.createElement('p', {className: 'textp'}, 'Rewards'),
        React.createElement('span', null, utils_1.fixD(poolInfo.harvestBalance, 4)),
        '\u2248$',
        utils_1.fixD(poolInfo.harvestBalance * poolInfo.usdPrice, 4),
      ),
      React.createElement(
        antd_1.Button,
        {
          className: 'claim-btn',
          loading: requestedLoding,
          onClick: function () {
            return handleHarvest(poolInfo.harvestBalance)
          },
        },
        'Claim',
      ),
    ),
  )
}
exports['default'] = ClaimAll
