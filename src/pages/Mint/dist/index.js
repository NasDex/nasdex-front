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
require('../../style/Mint/mint.less')
var Title_1 = require('../../components/Title')
var SymbolChart_1 = require('../../components/common/SymbolChart')
var SymbolTrade_1 = require('../../components/Mint/SymbolTrade')
var index_1 = require('../../constants/index')
var actions_1 = require('state/mint/actions')
var react_redux_1 = require('react-redux')
var hooks_1 = require('hooks')
var utils_1 = require('ethers/lib/utils')
var ethers_1 = require('ethers')
var erc20_json_1 = require('../../constants/abis/erc20.json')
var getLibrary_1 = require('utils/getLibrary')
var symbolMock = [
  {
    id: '0',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nGOOGL',
    convertUsd: '2808.01',
    isRise: true,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '1',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nAPPL',
    convertUsd: '149.96',
    isRise: true,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '2',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nMSFT',
    convertUsd: '708.15',
    isRise: false,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '3',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nMSFT',
    convertUsd: '708.15',
    isRise: false,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '4',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nMSFT',
    convertUsd: '708.15',
    isRise: false,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
]
var symoblChart = {
  symbolName: '',
  symbolLogo: '',
  premium: '--',
  volume: '43,123.09',
  liquidity: '25,93M',
}
function Staking() {
  // localStorage.clear()
  var dispatch = react_redux_1.useDispatch()
  var account = hooks_1.useActiveWeb3React().account
  // const contract = useErc20Contract('0x519130DA1C46CF79F39A0339016c07c77f938fCB')
  function initData() {
    return __awaiter(this, void 0, void 0, function () {
      var coinBaseInfo, i, coin, provider, library, contract, balance, _a, result, allowance
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            coinBaseInfo = {
              USDT: {
                name: 'USDT',
                address: '0x519130DA1C46CF79F39A0339016c07c77f938fCB',
                balance: '',
                decimals: 18,
                allowance: false,
              },
            }
            i = 0
            _b.label = 1
          case 1:
            if (!(i < index_1.coinBaseArray.length)) return [3 /*break*/, 5]
            coin = index_1.coinBaseArray[i]
            provider = window.ethereum
            library = getLibrary_1.getLibrary(provider)
            contract = new ethers_1.ethers.Contract(coinBaseInfo[coin].address, erc20_json_1['default'], library)
            _a = utils_1.formatUnits
            return [4 /*yield*/, contract.balanceOf(account)]
          case 2:
            balance = _a.apply(void 0, [_b.sent(), 18])
            // console.log(balance,'balance##')
            if (coinBaseInfo[coin]) {
              coinBaseInfo[coin].balance = balance
            }
            return [4 /*yield*/, contract.allowance(account, index_1.mintAddress)]
          case 3:
            result = _b.sent()
            allowance = Number(utils_1.formatUnits(result.toString(), 18))
            if (allowance <= 0 && coinBaseInfo[coin]) {
              coinBaseInfo[coin].allowance = false
            } else {
              coinBaseInfo[coin].allowance = true
            }
            // console.log(1111)
            // console.log(coinBaseInfo,'coinBaseInfo##')
            dispatch(actions_1.getCoinBalance({coinBaseInfo: coinBaseInfo}))
            _b.label = 4
          case 4:
            i++
            return [3 /*break*/, 1]
          case 5:
            return [2 /*return*/]
        }
      })
    })
  }
  react_1.useEffect(
    function () {
      var timer
      var getBaseData = function () {
        initData()
        return getBaseData
      }
      if (account) {
        timer = setInterval(getBaseData(), 300000)
      }
      return function () {
        clearInterval(timer)
      }
    },
    [account],
  )
  return react_1['default'].createElement(
    'div',
    {className: 'mint-container'},
    react_1['default'].createElement(
      'div',
      {className: 'container-center'},
      react_1['default'].createElement(Title_1['default'], {title: 'Mint', hasOpen: true}),
      react_1['default'].createElement(
        'div',
        {className: 'symbol-trade'},
        react_1['default'].createElement(SymbolChart_1['default'], {SymoblChart: symoblChart}),
        react_1['default'].createElement(SymbolTrade_1['default'], null),
      ),
    ),
  )
}
exports['default'] = Staking
