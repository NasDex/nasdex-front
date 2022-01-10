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
var USDT_2x_png_1 = require('../../img/coin/USDT@2x.png')
var logo_png_1 = require('../../img/stake/logo.png')
require('../../style/Profile/coinList.less')
var hooks_1 = require('hooks')
var erc20_json_1 = require('../../constants/abis/erc20.json')
var useContract_1 = require('constants/hooks/useContract')
var utils_1 = require('ethers/lib/utils')
var utils_2 = require('utils')
var coinArr = [
  {
    id: '0',
    logo: logo_png_1['default'],
    name: 'NSDX',
    balance: '0',
    abi: erc20_json_1['default'],
    decimals: 18,
    address: '0x0bfA4C9309419E98dB3607856611D470bCaf8B9e',
    unitPrice: 0.64,
  },
  // {
  //   logo: USDCLogo,
  //   name: 'USDC',
  //   balance: '0',
  //   address:'0x0bfA4C9309419E98dB3607856611D470bCaf8B9e',
  //   balancePrice: '$1000.0123',
  // },
  {
    id: '1',
    logo: USDT_2x_png_1['default'],
    name: 'USDT',
    balance: '0',
    abi: erc20_json_1['default'],
    decimals: 18,
    address: '0x519130DA1C46CF79F39A0339016c07c77f938fCB',
    unitPrice: 1,
  },
]
var CoinList = function (props) {
  return React.createElement(
    'div',
    {className: 'coin-list'},
    coinArr.map(function (ele, key) {
      return React.createElement(CoinlistItem, {coinItem: ele, key: ele.id})
    }),
  )
}
var CoinlistItem = function (props) {
  var account = hooks_1.useActiveWeb3React().account
  var _a = props.coinItem,
    name = _a.name,
    logo = _a.logo,
    address = _a.address,
    abi = _a.abi,
    decimals = _a.decimals,
    unitPrice = _a.unitPrice
  var contract = useContract_1.useErc20Contract(address)
  var _b = react_1.useState(0),
    tokenBalance = _b[0],
    setTokenBalance = _b[1]
  function getCoinBalance() {
    return __awaiter(this, void 0, void 0, function () {
      var balance, _a, _b
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _a = Number
            _b = utils_1.formatUnits
            return [4 /*yield*/, contract.balanceOf(account)]
          case 1:
            balance = _a.apply(void 0, [_b.apply(void 0, [_c.sent(), decimals])])
            setTokenBalance(balance)
            return [2 /*return*/]
        }
      })
    })
  }
  react_1.useEffect(
    function () {
      if (account) {
        getCoinBalance()
      }
    },
    [account],
  )
  return React.createElement(
    'div',
    {className: 'coin-item'},
    React.createElement(
      'div',
      {className: 'coin-item-left'},
      React.createElement('img', {className: 'coin-logo', src: logo, alt: ''}),
      name,
    ),
    React.createElement(
      'div',
      {className: 'coin-item-right'},
      React.createElement(
        'div',
        {className: 'coin-balance'},
        React.createElement('p', {className: 'balance-num'}, utils_2.fixD(tokenBalance, 6)),
        React.createElement('p', {className: 'balance-price'}, '$', utils_2.fixD(tokenBalance * unitPrice, 6)),
      ),
    ),
  )
}
exports['default'] = CoinList
