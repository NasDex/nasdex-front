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
var core_1 = require('@web3-react/core')
var injected_connector_1 = require('@web3-react/injected-connector')
var walletconnect_connector_1 = require('@web3-react/walletconnect-connector')
var WalletModal_1 = require('components/WalletModal')
// import useToast from 'hooks/useToast'
var notification_1 = require('../utils/notification')
var connectors_1 = require('connectors')
var wallet_1 = require('utils/wallet')
var useAuth = function () {
  var _a = core_1.useWeb3React(),
    activate = _a.activate,
    deactivate = _a.deactivate,
    chainId = _a.chainId
  // const { toastError } = useToast()
  var login = react_1.useCallback(
    function (connectorID) {
      // console.log('connectorID####', connectorID)
      window.localStorage.setItem('currentPlatform', connectorID)
      var connector = connectors_1.connectorsByName[connectorID]
      // console.log('connector#####', connector)
      if (connector) {
        activate(connector, function (error) {
          return __awaiter(void 0, void 0, void 0, function () {
            var hasSetup, walletConnector
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  if (!(error instanceof core_1.UnsupportedChainIdError)) return [3 /*break*/, 2]
                  return [4 /*yield*/, wallet_1.setupNetwork()]
                case 1:
                  hasSetup = _a.sent()
                  if (hasSetup) {
                    activate(connector)
                  }
                  return [3 /*break*/, 3]
                case 2:
                  window.localStorage.removeItem(WalletModal_1.connectorLocalStorageKey)
                  if (error instanceof injected_connector_1.NoEthereumProviderError) {
                    notification_1['default']({
                      type: 'error',
                      message: 'Provider Error',
                      description: 'No provider was found',
                    })
                  } else if (
                    error instanceof injected_connector_1.UserRejectedRequestError ||
                    error instanceof walletconnect_connector_1.UserRejectedRequestError
                  ) {
                    if (connector instanceof walletconnect_connector_1.WalletConnectConnector) {
                      walletConnector = connector
                      walletConnector.walletConnectProvider = null
                    }
                    notification_1['default']({
                      type: 'error',
                      message: 'Authorization Error',
                      description: 'Please authorize to access your account',
                    })
                  } else {
                    notification_1['default']({
                      type: 'error',
                      // message: error.name,
                      message: 'ERROR',
                      description: error.message,
                    })
                  }
                  _a.label = 3
                case 3:
                  return [2 /*return*/]
              }
            })
          })
        })
      } else {
        notification_1['default']({
          type: 'error',
          message: 'Unable to find connector',
          description: 'The connector config is wrong',
        })
      }
    },
    [activate, notification_1['default']],
  )
  var logout = react_1.useCallback(
    function () {
      deactivate()
      // This localStorage key is set by @web3-react/walletconnect-connector
      if (window.localStorage.getItem('walletconnect')) {
        connectors_1.connectorsByName.walletconnect.close()
        connectors_1.connectorsByName.walletconnect.walletConnectProvider = null
      }
    },
    [deactivate],
  )
  return {login: login, logout: logout}
}
exports['default'] = useAuth
