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
require('../../../style/Staking/stakingLeft.less')
var useModal_1 = require('../../../hooks/useModal')
var utils_1 = require('ethers/lib/utils')
var useContract_1 = require('constants/hooks/useContract')
var hooks_1 = require('hooks')
var utils_2 = require('utils')
var claimBounty_1 = require('../StakingRight/claimBounty')
var WalletModal_1 = require('components/WalletModal')
var useAuth_1 = require('hooks/useAuth')
var hooks_2 = require('state/stake/hooks')
var StakingLeft = function () {
  var NSDXVaultContract = useContract_1.useNSDXVault()
  var account = hooks_1.useActiveWeb3React().account
  var _a = react_1.useState('0.0'),
    harvestBalance = _a[0],
    setHarvestBalance = _a[1]
  var _b = react_1.useState('0.0'),
    taotalHarvestBalance = _b[0],
    setTotalarvestBalance = _b[1]
  var _c = react_1.useState('0.0'),
    balance = _c[0],
    setBalance = _c[1]
  var _d = react_1.useState({}),
    usdPrice = _d[0],
    setUsdPrice = _d[1]
  var _e = useAuth_1['default'](),
    login = _e.login,
    logout = _e.logout
  var stakeState = hooks_2.useStakeState()
  var priceList = stakeState.priceList
  var _f = WalletModal_1.useWalletModal(login, logout, account || undefined),
    onPresentConnectModal = _f.onPresentConnectModal,
    onPresentAccountModal = _f.onPresentAccountModal
  var NADXContract = useContract_1.useNSDX()
  var openClaimCard = useModal_1['default'](
    React.createElement(claimBounty_1['default'], {
      poolInfo: {
        harvestBalance: harvestBalance,
        taotalHarvestBalance: taotalHarvestBalance,
      },
    }),
  )[0]
  function getNadxBalance() {
    return __awaiter(this, void 0, void 0, function () {
      var balance, _a
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = utils_1.formatUnits
            return [4 /*yield*/, NADXContract.balanceOf(account)]
          case 1:
            balance = _a.apply(void 0, [_b.sent(), 18])
            setBalance(utils_2.fixD(balance, 4))
            return [2 /*return*/]
        }
      })
    })
  }
  react_1.useEffect(
    function () {
      var timer
      var getBaseData = function () {
        if (account) {
          getNadxBalance()
        }
        // getAccountNadxBalance()
        return getBaseData
      }
      if (NADXContract && NSDXVaultContract) {
        timer = setInterval(getBaseData(), 30000)
      }
      return function () {
        clearInterval(timer)
      }
    },
    [account, NADXContract, NSDXVaultContract],
  )
  return React.createElement(
    'div',
    {className: 'staking-left'},
    React.createElement(
      'div',
      {className: 'nsdx-balance'},
      React.createElement('div', {className: 'staking-left-title'}, 'NSDX Balance'),
      React.createElement(
        'div',
        {className: 'nsdx-usd'},
        React.createElement('div', {className: 'nsdx-num'}, balance),
        React.createElement(
          'div',
          {className: 'nsdx-num-usd'},
          '\u2248$',
          utils_2.fixD(Number(balance) * Number(priceList.NSDX), 4),
        ),
      ),
      React.createElement(
        'div',
        {className: 'nsdx-price'},
        React.createElement('div', {className: 'nsdx-text'}, 'NSDX Price'),
        React.createElement(
          'div',
          null,
          '$ ',
          React.createElement('span', {className: 'nsdx-usd'}, utils_2.fixD(priceList.NSDX, 2)),
        ),
      ),
    ),
  )
}
exports['default'] = StakingLeft
