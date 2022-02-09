/** @format */

'use strict'
/** @format */
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
var useModal_1 = require('hooks/useModal')
var react_1 = require('react')
var coin_2x_png_1 = require('../../../../img/stake/coin@2x.png')
var stake_1 = require('../stake')
var unstake_1 = require('../unstake')
var claimAll_1 = require('../claimAll')
var antd_1 = require('antd')
var source_2x_png_1 = require('../../../../img/stake/source@2x.png')
var useContract_1 = require('constants/hooks/useContract')
var deaufltCalculator_1 = require('../deaufltCalculator')
var useAuth_1 = require('hooks/useAuth')
var hooks_1 = require('hooks')
var WalletModal_1 = require('components/WalletModal')
var index_1 = require('../../../../constants/index')
var utils_1 = require('ethers/lib/utils')
var utils_2 = require('utils')
var useApproveFarm_1 = require('hooks/deaufltPool/useApproveFarm')
var hooks_2 = require('state/stake/hooks')
var antd_2 = require('antd')
var react_redux_1 = require('react-redux')
var actions_1 = require('state/stake/actions')
var LPPool = function (props) {
  var LpPoolListArray = props.LpPoolListArray,
    setLpTotalPrice = props.setLpTotalPrice
  return react_1['default'].createElement(
    'div',
    null,
    LpPoolListArray.map(function (ele, key) {
      return react_1['default'].createElement(LpPoolItem, {key: key, setLpTotalPrice: setLpTotalPrice, lpPoolItem: ele})
    }),
  )
}
var LpPoolItem = function (props) {
  var _a = react_1.useState(''),
    amount = _a[0],
    setAmount = _a[1]
  var _b = react_1.useState(''),
    balance = _b[0],
    setBalance = _b[1]
  var _c = react_1.useState(false),
    isApproved = _c[0],
    setIsApproved = _c[1]
  var _d = react_1.useState('0'),
    totalLiquidity = _d[0],
    setTotalLiquidity = _d[1]
  var _e = react_1.useState(''),
    harvestBalance = _e[0],
    setHarvestBalance = _e[1]
  var _f = react_1.useState(0),
    accountLpPrice = _f[0],
    setAccountLpPrice = _f[1]
  var stakeState = hooks_2.useStakeState()
  var priceList = stakeState.priceList
  var lpPoolItem = props.lpPoolItem,
    setLpTotalPrice = props.setLpTotalPrice
  var MasterChefContract = useContract_1.useMasterchef()
  var NADXContract = useContract_1.useNSDX()
  // const NSDXVaultContract = useNSDXVault()
  var _g = useAuth_1['default'](),
    login = _g.login,
    logout = _g.logout
  var account = hooks_1.useActiveWeb3React().account
  var _h = WalletModal_1.useWalletModal(login, logout, account || undefined),
    onPresentConnectModal = _h.onPresentConnectModal,
    onPresentAccountModal = _h.onPresentAccountModal
  var _j = react_1.useState({
      allocPoint: 0,
      lastRewardBlock: '',
    }),
    poolInfo = _j[0],
    setPoolInfo = _j[1]
  function getPoolInfo() {
    return __awaiter(this, void 0, void 0, function () {
      var info, poolInfoItem, totalNadx, _a
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            info = {}
            return [4 /*yield*/, MasterChefContract.poolInfo(lpPoolItem.pid)]
          case 1:
            poolInfoItem = _b.sent()
            info.lastRewardBlock = poolInfoItem.lastRewardBlock.toString()
            info.allocPoint = poolInfoItem.allocPoint.toString()
            setPoolInfo(info)
            _a = utils_1.formatUnits
            return [4 /*yield*/, LPContract.balanceOf(index_1.MasterChefAddress)]
          case 2:
            totalNadx = _a.apply(void 0, [_b.sent(), lpPoolItem.decimals])
            setTotalLiquidity(totalNadx)
            return [2 /*return*/]
        }
      })
    })
  }
  function getUserInfo() {
    return __awaiter(this, void 0, void 0, function () {
      var balance, _a, stakedBalance, amountValue, pendingNsdxValue, pendingNsdx
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = utils_1.formatUnits
            return [4 /*yield*/, LPContract.balanceOf(account)]
          case 1:
            balance = _a.apply(void 0, [_b.sent(), lpPoolItem.decimals])
            setBalance(utils_2.fixD(balance, 8))
            return [4 /*yield*/, MasterChefContract.userInfo(lpPoolItem.pid, account)]
          case 2:
            stakedBalance = _b.sent()
            amountValue = utils_1.formatUnits(stakedBalance.amount.toString(), lpPoolItem.decimals)
            setAmount(utils_2.fixD(amountValue, 8))
            return [4 /*yield*/, MasterChefContract.pendingNSDX(lpPoolItem.pid, account)]
          case 3:
            pendingNsdxValue = _b.sent()
            pendingNsdx = utils_1.formatUnits(pendingNsdxValue.toString(), lpPoolItem.decimals)
            setHarvestBalance(pendingNsdx)
            return [2 /*return*/]
        }
      })
    })
  }
  var LPContract = useContract_1.useLpContract()
  function getAllowance() {
    return __awaiter(this, void 0, void 0, function () {
      var result, allowance
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, LPContract.allowance(account, index_1.MasterChefAddress)]
          case 1:
            result = _a.sent()
            allowance = Number(utils_1.formatUnits(result.toString(), lpPoolItem.decimals))
            if (account && allowance <= 0) {
              setIsApproved(true)
            } else {
              setIsApproved(false)
            }
            return [2 /*return*/]
        }
      })
    })
  }
  var onApprove = useApproveFarm_1['default'](LPContract).onApprove
  var _k = react_1.useState(false),
    requestedApproval = _k[0],
    setRequestedApproval = _k[1]
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
  var _l = react_1.useState(''),
    apr = _l[0],
    setApr = _l[1]
  var openCalculatorCard = useModal_1['default'](
    react_1['default'].createElement(deaufltCalculator_1['default'], {apr: apr}),
  )[0]
  var _m = react_1.useState([]),
    reserves = _m[0],
    setReserves = _m[1]
  var _o = react_1.useState(0),
    totalSupply = _o[0],
    setTotalSupply = _o[1]
  var dispatch = react_redux_1.useDispatch()
  var _p = react_1.useState('0'),
    totalSupplyPrice = _p[0],
    setTotalSupplyPrice = _p[1]
  function getReservesAndTotalSupply() {
    return __awaiter(this, void 0, void 0, function () {
      var totalSupplyValue, _a, _b, reservesValue
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _a = Number
            _b = utils_1.formatUnits
            return [4 /*yield*/, LPContract.totalSupply()]
          case 1:
            totalSupplyValue = _a.apply(void 0, [_b.apply(void 0, [_c.sent(), lpPoolItem.decimals])])
            setTotalSupply(totalSupplyValue)
            return [4 /*yield*/, LPContract.getReserves()]
          case 2:
            reservesValue = _c.sent()
            setReserves(reservesValue)
            return [2 /*return*/]
        }
      })
    })
  }
  react_1.useEffect(
    function () {
      var tvlF = totalLiquidity
      var currencyANum = 0
      var currencyBNum = 0
      if (reserves && reserves[0]) {
        currencyANum = Number(utils_1.formatUnits(reserves[0], 6))
      }
      if (reserves && reserves[1]) {
        currencyBNum = Number(utils_1.formatUnits(reserves[1], lpPoolItem.decimals))
      }
      // console.log(totalSupply,'totalSupply##')
      var num = (Number(tvlF) / Number(totalSupply)) * Number(currencyANum) * 2
      var accountNum = (Number(amount) / Number(totalSupply)) * Number(currencyANum) * 2
      dispatch(
        actions_1.setPriceList({
          priceList: {
            NSDX: utils_2.fixD(currencyANum / currencyBNum, 2),
          },
        }),
      )
      setAccountLpPrice(accountNum)
      setTotalSupplyPrice(utils_2.fixD(num, 2))
      setLpTotalPrice(num)
    },
    [totalSupplyPrice, totalLiquidity, reserves],
  )
  react_1.useEffect(
    function () {
      function calculateApr() {
        return __awaiter(this, void 0, void 0, function () {
          var aprP, tvlF, price, day, result
          return __generator(this, function (_a) {
            aprP = 0
            tvlF = totalLiquidity
            price = priceList.NSDX
            day = lpPoolItem.nsdxPerBlock * 43200
            if (lpPoolItem.nsdxPerBlock && Number(tvlF)) {
              aprP =
                ((day * (poolInfo.allocPoint / lpPoolItem.totalAllocPoint) * price * 365) / Number(totalSupplyPrice)) *
                100
            } else {
              aprP = ''
            }
            if (aprP < 100000000) {
              result = utils_2.fixD(aprP, 2)
              setApr(result)
            } else {
              setApr('Infinity')
            }
            return [2 /*return*/]
          })
        })
      }
      if (totalLiquidity && totalSupply && totalSupplyPrice) {
        calculateApr()
      }
    },
    [totalLiquidity, totalSupply, totalSupplyPrice],
  )
  react_1.useEffect(
    function () {
      var timer
      var getBaseData = function () {
        getPoolInfo()
        getReservesAndTotalSupply()
        if (account) {
          getUserInfo()
          getAllowance()
        }
        return getBaseData
      }
      if (MasterChefContract && NADXContract) {
        timer = setInterval(getBaseData(), 30000)
      }
      return function () {
        clearInterval(timer)
      }
    },
    [account, MasterChefContract, NADXContract],
  )
  var openStakeCard = useModal_1['default'](
    react_1['default'].createElement(stake_1['default'], {
      poolInfo: __assign(__assign({}, lpPoolItem), {balance: balance, poolType: 'PreIDO'}),
    }),
  )[0]
  var openUntakeCard = useModal_1['default'](
    react_1['default'].createElement(unstake_1['default'], {
      poolInfo: __assign(__assign({}, lpPoolItem), {amount: amount}),
    }),
  )[0]
  var openClaimCard = useModal_1['default'](
    react_1['default'].createElement(claimAll_1['default'], {
      poolInfo: __assign(__assign({}, lpPoolItem), {harvestBalance: harvestBalance}),
    }),
  )[0]
  return react_1['default'].createElement(
    'div',
    {className: 'liquidity-item liquidity-item-lp'},
    react_1['default'].createElement(
      'div',
      {className: 'liquidity-header'},
      react_1['default'].createElement(
        'div',
        {className: 'liquidity-logo'},
        react_1['default'].createElement('img', {src: coin_2x_png_1['default'], alt: ''}),
        react_1['default'].createElement('div', {className: 'liquidity-name'}, 'NSDX - USDC LP'),
      ),
      react_1['default'].createElement(
        'div',
        {className: 'liquidity-source'},
        react_1['default'].createElement(
          'a',
          {
            href: 'https://quickswap.exchange/#/add/0x3813e82e6f7098b9583FC0F33a962D02018B6803/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
            target: '_blank',
          },
          'From',
          react_1['default'].createElement('img', {src: source_2x_png_1['default'], alt: ''}),
          'Get NSDX-USDC LPT',
          react_1['default'].createElement(
            'svg',
            {className: 'icon', 'aria-hidden': 'true'},
            react_1['default'].createElement('use', {xlinkHref: '#icon-link'}),
          ),
        ),
      ),
    ),
    react_1['default'].createElement(
      'div',
      {className: 'liquidity-bottom'},
      react_1['default'].createElement(
        'div',
        {className: 'total-liquidity'},
        react_1['default'].createElement('div', {className: 'title'}, '$ ', utils_2.fixD(totalSupplyPrice, 4), ' '),
        react_1['default'].createElement('div', {className: 'text'}, 'Total Liquidity'),
      ),
      react_1['default'].createElement(
        'div',
        {className: 'apr'},
        react_1['default'].createElement(
          'div',
          {className: 'title'},
          !apr ? react_1['default'].createElement(antd_2.Skeleton, {active: true, paragraph: {rows: 0}}) : apr + '%',
          react_1['default'].createElement(
            'svg',
            {className: 'icon', 'aria-hidden': 'true', onClick: openCalculatorCard},
            react_1['default'].createElement('use', {xlinkHref: '#icon-calculator'}),
          ),
        ),
        react_1['default'].createElement('div', {className: 'text'}, 'APR'),
      ),
      !account
        ? react_1['default'].createElement(
            antd_1.Button,
            {
              className: 'pc-stake-btn',
              onClick: function () {
                return onPresentConnectModal()
              },
            },
            'Connect',
          )
        : !isApproved
        ? react_1['default'].createElement(antd_1.Button, {className: 'pc-stake-btn', onClick: openStakeCard}, 'Stake')
        : react_1['default'].createElement(
            antd_1.Button,
            {
              className: 'pc-stake-btn',
              onClick: function () {
                return handleApprove()
              },
              loading: requestedApproval,
            },
            'Approve',
          ),
    ),
    !account
      ? react_1['default'].createElement(
          antd_1.Button,
          {
            className: 'h5-stake-btn',
            onClick: function () {
              return onPresentConnectModal()
            },
          },
          'Connect',
        )
      : !isApproved
      ? react_1['default'].createElement(antd_1.Button, {className: 'h5-stake-btn', onClick: openStakeCard}, 'Stake')
      : react_1['default'].createElement(
          antd_1.Button,
          {
            className: 'h5-stake-btn',
            onClick: function () {
              return handleApprove()
            },
            loading: requestedApproval,
          },
          'Approve',
        ),
    Number(harvestBalance) > 0
      ? Number(amount) > 0
        ? react_1['default'].createElement('span', {className: 'line'})
        : null
      : Number(amount) > 0
      ? react_1['default'].createElement('span', {className: 'line'})
      : null,
    react_1['default'].createElement(
      'div',
      {className: 'claim-unstake'},
      Number(harvestBalance) > 0
        ? react_1['default'].createElement(
            'div',
            {className: 'claim'},
            react_1['default'].createElement(
              'div',
              {className: 'left'},
              react_1['default'].createElement('span', null, 'Rewards (NSDX)'),
              react_1['default'].createElement('p', null, utils_2.fixD(harvestBalance, 4)),
              react_1['default'].createElement(
                'p',
                null,
                '\u2248$',
                utils_2.fixD(Number(harvestBalance) * priceList.NSDX, 4),
              ),
            ),
            !account
              ? react_1['default'].createElement(
                  antd_1.Button,
                  {
                    className: 'pc-stake-btn',
                    onClick: function () {
                      return onPresentConnectModal()
                    },
                  },
                  'Connect',
                )
              : react_1['default'].createElement(
                  antd_1.Button,
                  {
                    onClick: function () {
                      return openClaimCard()
                    },
                  },
                  'Claim',
                ),
          )
        : null,
      Number(amount) > 0
        ? react_1['default'].createElement(
            'div',
            {className: 'claim'},
            react_1['default'].createElement(
              'div',
              {className: 'left'},
              react_1['default'].createElement('span', null, 'Staked'),
              react_1['default'].createElement('p', null, utils_2.fixD(amount, 4)),
              react_1['default'].createElement('p', null, '\u2248$', utils_2.fixD(accountLpPrice, 4)),
            ),
            !account
              ? react_1['default'].createElement(
                  antd_1.Button,
                  {
                    className: 'pc-stake-btn',
                    onClick: function () {
                      return onPresentConnectModal()
                    },
                  },
                  'Connect',
                )
              : !isApproved
              ? react_1['default'].createElement(
                  antd_1.Button,
                  {className: 'pc-stake-btn', onClick: openUntakeCard},
                  'Unstake',
                )
              : react_1['default'].createElement(
                  antd_1.Button,
                  {
                    className: 'pc-stake-btn',
                    onClick: function () {
                      return handleApprove()
                    },
                    loading: requestedApproval,
                  },
                  'Approve',
                ),
          )
        : null,
    ),
  )
}
exports['default'] = LPPool
