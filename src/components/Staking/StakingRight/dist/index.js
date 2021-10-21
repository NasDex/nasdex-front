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
require('../../../style/Staking/stakingRight.less')
var useContract_1 = require('constants/hooks/useContract')
var hooks_1 = require('hooks')
var index_1 = require('../../../constants/index')
var utils_1 = require('ethers/lib/utils')
var react_2 = require('react')
var defaultPool_1 = require('./pool/defaultPool')
var lpPool_1 = require('./pool/lpPool')
var utils_2 = require('utils')
var lpContract_json_1 = require('../../../constants/abis/lpContract.json')
var hooks_2 = require('state/stake/hooks')
var poolBaseInfo = [
  {
    pid: '0',
    symbol: 'Auto NSDX',
    poolType: 'vault',
    decimals: 18,
    address: '0xf495C59dF44a9784FEcaC65307C2848a99a59D00',
    allocPoint: 0,
    totalAllocPoint: 0,
    nsdxPerBlock: 0,
    vaultStakedBalance: 0,
    stakedBalance: 0,
    balance: 0,
    usdPrice: '',
  },
  {
    pid: '0',
    symbol: 'NSDX',
    poolType: 'PreIDO',
    decimals: 18,
    address: '0xf495C59dF44a9784FEcaC65307C2848a99a59D00',
    allocPoint: 1000,
    totalAllocPoint: 3000,
    nsdxPerBlock: 0.35,
    vaultStakedBalance: 0,
    stakedBalance: 0,
    balance: 0,
    usdPrice: '',
  },
  {
    pid: '1',
    symbol: 'NSDX - USDC LP',
    poolType: 'Lpfarming',
    decimals: 18,
    address: '0x56B8936a96cD5EE5C5837F385a19B4c2999fD74a',
    allocPoint: 2000,
    totalAllocPoint: 3000,
    nsdxPerBlock: 0.35,
    vaultStakedBalance: 0,
    stakedBalance: 0,
    balance: 0,
    usdPrice: '',
    abi: lpContract_json_1['default'],
    currencyA: 'NSDX',
    currencyB: 'USDC',
  },
]
var StakingRight = function () {
  var account = hooks_1.useActiveWeb3React().account
  // 获取质押代币余额
  var NSDXContract = useContract_1.useNSDX()
  // const NSDXVaultContract = useNSDXVault()
  var MasterChefContract = useContract_1.useMasterchef()
  // const provider = window.ethereum
  // const library = getLibrary(provider)
  // 普通创建合约未链接钱包获取数据
  // const MasterChefContract = new ethers.Contract(MasterChefAddress, masterChefAbi, library)
  // const NSDXVaultContract = new ethers.Contract(NSDXVaultAddress, nadxVaultAbi, library)
  // const NSDXContract = new ethers.Contract(NSDXToken, nadxTokenAbi, library)
  var stakeState = hooks_2.useStakeState()
  var priceList = stakeState.priceList
  react_2.useEffect(
    function () {
      var timer
      var getBaseData = function () {
        initData()
        return getBaseData
      }
      if (NSDXContract) {
        timer = setInterval(getBaseData(), 300000)
      }
      return function () {
        clearInterval(timer)
      }
    },
    [account, NSDXContract],
  )
  var _a = react_1.useState(poolBaseInfo),
    poolInfoArray = _a[0],
    setPoolInfoArray = _a[1]
  var _b = react_1.useState(0),
    totalLiquidity = _b[0],
    setTotalLiquidity = _b[1]
  var _c = react_1.useState(0),
    lpTotalPrice = _c[0],
    setLpTotalPrice = _c[1]
  // const NADXContract = useNSDX()
  // 获取基础数据
  function initData() {
    return __awaiter(this, void 0, void 0, function () {
      var totalNadx, _a, i
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!(MasterChefContract && NSDXContract)) return [3 /*break*/, 2]
            _a = utils_1.formatUnits
            return [4 /*yield*/, NSDXContract.balanceOf(index_1.MasterChefAddress)]
          case 1:
            totalNadx = _a.apply(void 0, [_b.sent(), 18])
            // 复投池所有已质押代币
            // const autoTotalNadx = Number(formatUnits(await NSDXVaultContract.balanceOf(), 18))
            // setTotalLiquidity(Number(totalNadx) + Number(autoTotalNadx))
            setTotalLiquidity(Number(totalNadx))
            for (i = 0; i < poolBaseInfo.length; i++) {
              // poolBaseInfo[i].totalAllocPoint = Number(totalAllocPoints)
              // poolBaseInfo[i].nsdxPerBlock = Number(nsdxPerBlock)
              poolBaseInfo[i].usdPrice = priceList.NSDX
            }
            setPoolInfoArray(poolBaseInfo)
            _b.label = 2
          case 2:
            return [2 /*return*/]
        }
      })
    })
  }
  var AutoPoolListArray = poolBaseInfo.filter(function (ele) {
    return ele.poolType === 'vault'
  })
  var DefaultPoolListArray = poolBaseInfo.filter(function (ele) {
    return ele.poolType === 'PreIDO'
  })
  var LpPoolListArray = poolBaseInfo.filter(function (ele) {
    return ele.poolType === 'Lpfarming'
  })
  return React.createElement(
    'div',
    {className: 'staking-right'},
    React.createElement(
      'div',
      {className: 'liquidity'},
      React.createElement(
        'div',
        {className: 'liquidity-banner'},
        React.createElement(
          'div',
          {className: 'total-liquidity'},
          React.createElement(
            'div',
            {className: 'total-liquidity-title'},
            '$ ',
            utils_2.fixD(Number(totalLiquidity) * Number(priceList.NSDX) + lpTotalPrice, 4),
          ),
          React.createElement('div', {className: 'total-liquidity-text'}, 'Total Value Locked'),
        ),
      ),
      React.createElement(
        'div',
        {className: 'liquidity-content'},
        React.createElement(defaultPool_1['default'], {DefaultPoolListArray: DefaultPoolListArray}),
        React.createElement(lpPool_1['default'], {LpPoolListArray: LpPoolListArray, setLpTotalPrice: setLpTotalPrice}),
      ),
    ),
  )
}
exports['default'] = StakingRight
