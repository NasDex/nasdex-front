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
require('../../style/Manage/manage.less')
var SymbolChart_1 = require('../../components/common/SymbolChart')
var index_1 = require('../../components/Manage/ManageRight/index')
var react_router_dom_1 = require('react-router-dom')
var index_2 = require('../../components/Title/index')
var hooks_1 = require('state/mint/hooks')
var hooks_2 = require('hooks')
var index_3 = require('../../constants/index')
var actions_1 = require('state/mint/actions')
var react_redux_1 = require('react-redux')
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
var SymoblChart = {
  symbolName: '',
  symbolLogo: '',
  premium: '--',
  volume: '43,123.09',
  liquidity: '25,93M',
}
var Manage = function (props) {
  var positionId = props.match.params.positionId
  var mintState = hooks_1.useMintState()
  // localStorage.clear()
  var dispatch = react_redux_1.useDispatch()
  var account = hooks_2.useActiveWeb3React().account
  // const contract = useErc20Contract('0x519130DA1C46CF79F39A0339016c07c77f938fCB')
  var assetInfo = {
    nSE: {
      name: 'nSE',
      address: '0x2B5162B17cE9034685561Ff1248A86bb1eEA385c',
      balance: '',
      allowance: false,
    },
  }
  function initData() {
    return __awaiter(this, void 0, void 0, function () {
      var i, asset, provider, library, contract, result, allowance
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            i = 0
            _a.label = 1
          case 1:
            if (!(i < index_3.assetBaseArray.length)) return [3 /*break*/, 4]
            asset = index_3.assetBaseArray[i]
            provider = window.ethereum
            library = getLibrary_1.getLibrary(provider)
            contract = new ethers_1.ethers.Contract(assetInfo[asset].address, erc20_json_1['default'], library)
            return [4 /*yield*/, contract.allowance(account, index_3.mintAddress)]
          case 2:
            result = _a.sent()
            allowance = Number(utils_1.formatUnits(result.toString(), 18))
            if (account && allowance <= 0 && assetInfo[asset]) {
              assetInfo[asset].allowance = false
            } else {
              assetInfo[asset].allowance = true
            }
            // console.log(1111)
            // console.log(coinBaseInfo,'coinBaseInfo##')
            dispatch(actions_1.upDateStockBalance({mintStockInfo: assetInfo}))
            _a.label = 3
          case 3:
            i++
            return [3 /*break*/, 1]
          case 4:
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
    {className: 'manage-container'},
    react_1['default'].createElement(
      'div',
      {className: 'container-center'},
      react_1['default'].createElement(
        react_router_dom_1.NavLink,
        {to: '/profile', activeClassName: 'active'},
        react_1['default'].createElement(index_2['default'], {title: 'manage', hasOpen: true}),
      ),
      react_1['default'].createElement(
        'div',
        {className: 'manage-symbol-trade'},
        react_1['default'].createElement(SymbolChart_1['default'], {SymoblChart: SymoblChart}),
        react_1['default'].createElement(index_1['default'], {positionId: positionId}),
      ),
    ),
  )
}
exports['default'] = Manage
