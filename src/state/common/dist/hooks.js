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
};
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
exports.getOneAssetInfo = exports.getCommonAssetInfo = exports.useCommonState = void 0
var react_redux_1 = require('react-redux')
var hooks_1 = require('hooks')
var getLibrary_1 = require('utils/getLibrary')
var ethers_1 = require('ethers')
var erc20_json_1 = require('../../constants/abis/erc20.json')
var ETHOracle_json_1 = require('../../constants/abis/ETHOracle.json')
var STAOracle_json_1 = require('../../constants/abis/STAOracle.json')
var index_1 = require('../../constants/index')
var utils_1 = require('ethers/lib/utils')
var actions_1 = require('./actions')
var utils_2 = require('utils')
function useCommonState() {
  return react_redux_1.useSelector(function (state) {
    return state.common
  })
}
exports.useCommonState = useCommonState
function getCommonAssetInfo() {
  return __awaiter(this, void 0, void 0, function () {
    var dispatch,
      account,
      provider,
      library,
      assetBaseInfoArr,
      assetBaseInfoObj,
      assetsName,
      assetsListInfo,
      allAssetsListInfo,
      cAssetsListInfo,
      i,
      asset,
      contract,
      balance,
      _a,
      result,
      allowance,
      swapResult,
      swapContractAllowance,
      ETHOracleContract,
      STAOracleContract,
      ETHOraclePrice,
      STAOraclePrice
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          dispatch = react_redux_1.useDispatch()
          account = hooks_1.useActiveWeb3React().account
          provider = window.ethereum
          library = getLibrary_1.getLibrary(provider)
          assetBaseInfoArr = [
            {
              name: 'nSTA',
              address: '0x2B5162B17cE9034685561Ff1248A86bb1eEA385c',
              decimals: 18,
              mintcontractallowance: false,
              type: 'asset',
              fixDPrecise: 6,
            },
            {
              name: 'nETH',
              address: '0xcb3aaB57800624411a5AA5ACEFA8FA5BF8dF888C',
              decimals: 18,
              mintcontractallowance: false,
              type: 'asset',
              fixDPrecise: 6,
            },
            {
              name: 'USDT',
              address: '0x519130DA1C46CF79F39A0339016c07c77f938fCB',
              decimals: 18,
              mintcontractallowance: false,
              type: 'cAsset',
              fixDPrecise: 4,
            },
            {
              name: 'WMATIC',
              address: '0x22104669DA1a0a1B3631EdDee6b1B4d41c521F83',
              decimals: 18,
              mintcontractallowance: false,
              type: 'cAsset',
              fixDPrecise: 4,
            },
          ]
          assetBaseInfoObj = {
            nSTA: {
              id: '0',
              name: 'nSTA',
              address: '0x2B5162B17cE9034685561Ff1248A86bb1eEA385c',
              decimals: 18,
              type: 'asset',
              unitPrice: 35,
              fixDPrecise: 6,
              oraclePrice: '',
            },
            nETH: {
              id: '1',
              name: 'nETH',
              address: '0xcb3aaB57800624411a5AA5ACEFA8FA5BF8dF888C',
              decimals: 18,
              type: 'asset',
              unitPrice: 35,
              fixDPrecise: 6,
              oraclePrice: '',
            },
            USDT: {
              id: '2',
              name: 'USDT',
              address: '0x519130DA1C46CF79F39A0339016c07c77f938fCB',
              decimals: 18,
              type: 'cAsset',
              unitPrice: 1,
              fixDPrecise: 4,
            },
            WMATIC: {
              id: '3',
              name: 'WMATIC',
              address: '0x22104669DA1a0a1B3631EdDee6b1B4d41c521F83',
              decimals: 18,
              type: 'cAsset',
              unitPrice: 1,
              fixDPrecise: 4,
            },
          }
          assetsName = {}
          assetsListInfo = []
          allAssetsListInfo = []
          cAssetsListInfo = []
          i = 0
          _b.label = 1
        case 1:
          if (!(i < assetBaseInfoArr.length)) return [3 /*break*/, 7]
          assetsName[assetBaseInfoArr[i].address] = assetBaseInfoArr[i].name
          asset = assetBaseInfoArr[i].name
          if (!account) return [3 /*break*/, 5]
          contract = new ethers_1.ethers.Contract(assetBaseInfoObj[asset].address, erc20_json_1['default'], library)
          _a = utils_1.formatUnits
          return [4 /*yield*/, contract.balanceOf(account)]
        case 2:
          balance = _a.apply(void 0, [_b.sent(), 18])
          //   console.log(balance,'balance##')
          if (assetBaseInfoObj[asset] && account) {
            assetBaseInfoObj[asset].balance = balance
          }
          return [4 /*yield*/, contract.allowance(account, index_1.mintAddress)]
        case 3:
          result = _b.sent()
          allowance = Number(utils_1.formatUnits(result.toString(), 18))
          if (allowance <= 0 && assetBaseInfoObj[asset]) {
            assetBaseInfoObj[asset].mintContractAllowance = false
          } else {
            assetBaseInfoObj[asset].mintContractAllowance = true
          }
          return [4 /*yield*/, contract.allowance(account, index_1.SwapRouterAddress)]
        case 4:
          swapResult = _b.sent()
          swapContractAllowance = Number(utils_1.formatUnits(swapResult.toString(), 18))
          if (swapContractAllowance <= 0 && assetBaseInfoObj[asset]) {
            assetBaseInfoObj[asset].swapContractAllowance = false
          } else {
            assetBaseInfoObj[asset].swapContractAllowance = true
          }
          _b.label = 5
        case 5:
          if (assetBaseInfoObj[asset].type == 'asset') {
            assetsListInfo.push(assetBaseInfoObj[asset])
          } else {
            cAssetsListInfo.push(assetBaseInfoObj[asset])
          }
          allAssetsListInfo.push(assetBaseInfoObj[asset])
          _b.label = 6
        case 6:
          i++
          return [3 /*break*/, 1]
        case 7:
          ETHOracleContract = new ethers_1.ethers.Contract(
            index_1.ETHOracleAddress,
            ETHOracle_json_1['default'],
            library,
          )
          STAOracleContract = new ethers_1.ethers.Contract(
            index_1.STAOracleAddress,
            STAOracle_json_1['default'],
            library,
          )
          return [4 /*yield*/, ETHOracleContract.latestRoundData()]
        case 8:
          ETHOraclePrice = _b.sent()
          return [4 /*yield*/, STAOracleContract.latestRoundData()]
        case 9:
          STAOraclePrice = _b.sent()
          assetBaseInfoObj['nETH'].oraclePrice = utils_2.fixD(utils_1.formatUnits(ETHOraclePrice.answer, 8), 4)
          assetBaseInfoObj['nSTA'].oraclePrice = utils_2.fixD(utils_1.formatUnits(STAOraclePrice.answer, 8), 4)
          dispatch(actions_1.upDateAssetsNameInfo({assetsNameInfo: assetsName}))
          dispatch(actions_1.upDateAssetBaseInfoObj({assetBaseInfoObj: assetBaseInfoObj}))
          dispatch(actions_1.upDateAssetsListInfo({assetsListInfo: assetsListInfo}))
          dispatch(actions_1.upDateCAssetsListInfo({cAssetsListInfo: cAssetsListInfo}))
          dispatch(actions_1.upDateAllAssetsListInfo({allAssetsListInfo: allAssetsListInfo}))
          return [2 /*return*/]
      }
    })
  })
}
exports.getCommonAssetInfo = getCommonAssetInfo
function getOneAssetInfo(asset, address, account) {
  return __awaiter(this, void 0, void 0, function () {
    var provider,
      library,
      contract,
      balance,
      _a,
      result,
      allowance,
      mintContractAllowance,
      swapResult,
      swapAllowanceNum,
      swapContractAllowance
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (!account) {
            return [2 /*return*/, false]
          }
          provider = window.ethereum
          library = getLibrary_1.getLibrary(provider)
          contract = new ethers_1.ethers.Contract(address, erc20_json_1['default'], library)
          _a = utils_1.formatUnits
          return [4 /*yield*/, contract.balanceOf(account)]
        case 1:
          balance = _a.apply(void 0, [_b.sent(), 18])
          return [4 /*yield*/, contract.allowance(account, index_1.mintAddress)]
        case 2:
          result = _b.sent()
          allowance = Number(utils_1.formatUnits(result.toString(), 18))
          if (allowance <= 0) {
            mintContractAllowance = false
          } else {
            mintContractAllowance = true
          }
          return [4 /*yield*/, contract.allowance(account, index_1.SwapRouterAddress)]
        case 3:
          swapResult = _b.sent()
          swapAllowanceNum = Number(utils_1.formatUnits(swapResult.toString(), 18))
          if (swapAllowanceNum <= 0) {
            swapContractAllowance = false
          } else {
            swapContractAllowance = true
          }
          return [
            2 /*return*/,
            {
              balance: balance,
              mintContractAllowance: mintContractAllowance,
              swapContractAllowance: swapContractAllowance,
            },
          ]
      }
    })
}
exports.getOneAssetInfo = getOneAssetInfo
