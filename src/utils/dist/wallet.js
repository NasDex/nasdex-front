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
exports.registerToken = exports.setupNetwork = void 0
// Set of helper functions to facilitate wallet setup
// import { BASE_BSC_SCAN_URL, BASE_URL } from '../config/index'
// import { nodes } from './getRpcUrl'
/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
exports.setupNetwork = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var provider, chainId, error_1
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          provider = window.ethereum
          if (!provider) return [3 /*break*/, 5]
          chainId = parseInt('137', 10)
          _a.label = 1
        case 1:
          _a.trys.push([1, 3, , 4])
          return [
            4 /*yield*/,
            provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                // {
                //   chainId: `0x${chainId.toString(16)}`,
                //   chainName: 'MAINTIC Mainnet',
                //   nativeCurrency: {
                //     name: 'MATIC',
                //     symbol: 'matic',
                //     decimals: 18,
                //   },
                //   rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
                //   blockExplorerUrls: ['https://explorer.matic.network/'],
                // },
                {
                  chainId: '0x' + chainId.toString(16),
                  chainName: 'Mumbai Testnet',
                  nativeCurrency: {
                    name: 'MATIC',
                    symbol: 'matic',
                    decimals: 18,
                  },
                  rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
                  blockExplorerUrls: ['https://polygonscan.com/'],
                },
              ],
            }),
          ]
        case 2:
          _a.sent()
          return [2 /*return*/, true]
        case 3:
          error_1 = _a.sent()
          console.error('Failed to setup the network in MetaMask:', error_1)
          return [2 /*return*/, false]
        case 4:
          return [3 /*break*/, 6]
        case 5:
          console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
          return [2 /*return*/, false]
        case 6:
          return [2 /*return*/]
      }
    })
  })
}
/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
exports.registerToken = function (tokenAddress, tokenSymbol, tokenDecimals) {
  return __awaiter(void 0, void 0, void 0, function () {
    var provider, tokenAdded
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          provider = window.ethereum
          if (!provider) return [3 /*break*/, 2]
          return [
            4 /*yield*/,
            provider.request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC20',
                options: {
                  address: tokenAddress,
                  symbol: tokenSymbol,
                  decimals: tokenDecimals,
                  image: 'https://www.cdztest.site/images/coins/' + tokenAddress + '.png',
                },
              },
            }),
          ]
        case 1:
          tokenAdded = _a.sent()
          _a.label = 2
        case 2:
          return [2 /*return*/, tokenAdded]
      }
    })
  })
}
