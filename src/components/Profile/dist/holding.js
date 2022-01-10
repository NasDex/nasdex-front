/** @format */

'use strict'
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
/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
var react_1 = require('react')
var antd_1 = require('antd')
var react_router_dom_1 = require('react-router-dom')
var hooks_1 = require('hooks')
var useContract_1 = require('constants/hooks/useContract')
var utils_1 = require('utils')
var WalletModal_1 = require('components/WalletModal')
var wallet_png_1 = require('../../img/common/wallet.png')
var useAuth_1 = require('hooks/useAuth')
var hooks_2 = require('state/manage/hooks')
var PositionTable = function (props) {
  var columns = [
    {
      title: 'Ticker',
      dataIndex: 'name',
      key: 'name',
      render: function (text, record) {
        return React.createElement(
          'div',
          {className: 'table-cell'},
          React.createElement('img', {
            src: require('../../img/coin/' + record.assetTokenName + '.png')['default'],
            alt: record.assetTokenName,
          }),
          record.assetTokenName,
        )
      },
    },
    {
      title: 'Swap Price',
      dataIndex: 'oraclePrice',
      key: 'oraclePrice',
      render: function (text, record) {
        return React.createElement(
          'div',
          {className: 'table-cell'},
          React.createElement(
            'p',
            {className: 'balance'},
            utils_1.fixD(record.oraclePrice, 2),
            ' ',
            record.cAssetTokenName,
          ),
        )
      },
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: function (text, record) {
        return React.createElement(
          'div',
          {className: 'table-cell'},
          React.createElement(
            'p',
            {className: 'balance'},
            utils_1.fixD(record.assetAmount, 6),
            ' ',
            record.assetTokenName,
          ),
        )
      },
    },
    {
      title: 'Value',
      dataIndex: 'cAssetAmount',
      key: 'cAssetAmount',
      render: function (text, record) {
        return React.createElement(
          'div',
          {className: 'table-cell'},
          React.createElement('p', {className: 'balance'}, '$ ', utils_1.fixD(value, 4)),
        )
      },
    },
    {
      title: 'Action',
      dataIndex: 'address',
      key: 'address',
      align: 'right',
      render: function (text, record) {
        return React.createElement(
          'div',
          {className: 'table-cell'},
          React.createElement(
            antd_1.Button,
            {className: 'action-btn'},
            React.createElement(react_router_dom_1.NavLink, {to: '/trade', activeClassName: 'active'}, 'Trade'),
          ),
        )
      },
    },
  ]
  var manageState = hooks_2.useManageState()
  var pagination = {
    pageSize: 5,
  }
  // 创建mint合约
  var MintContract = useContract_1.useMintContract()
  // const MintContract = {
  //   getPositions: (args1: any, args2: any, args3: any) => null,
  // }
  /// @param ownerAddr 用户地址
  var account = hooks_1.useActiveWeb3React().account
  var _a = react_1.useState([]),
    dataSource = _a[0],
    setDataSource = _a[1]
  var _b = react_1.useState(''),
    value = _b[0],
    setValue = _b[1]
  function getPositions() {
    return __awaiter(this, void 0, void 0, function () {
      var startAt, limit, positionList, result, value_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            startAt = 0
            limit = 10
            return [
              4 /*yield*/,
              MintContract.getPositions(account, startAt, limit),
              // console.log(positionList,'positionList##')
            ]
          case 1:
            positionList = _a.sent()
            result = []
            // positionList.forEach((position: any) => {
            result.push({
              key: '1',
              assetAmount: Number(manageState.manageWalletAssetAmount),
              // assetAmount: Number(formatUnits(position.assetAmount, 18)),
              // assetToken: position.assetToken,
              // cAssetAmount: Number(formatUnits(position.cAssetAmount, 18)),
              // cAssetToken: position.cAssetToken,
              // owner: position.owner,
              oraclePrice: 35,
              assetTokenName: 'nSE',
              cAssetTokenName: 'USDT',
            })
            // })
            if (result && result.length > 0) {
              setDataSource(result)
              value_1 = (Number(35) * Number(manageState.manageWalletAssetAmount) * 2).toString()
              setValue(value_1)
            }
            return [2 /*return*/]
        }
      })
    })
  }
  // useEffect(() => {
  //   if (account) {
  //     getPositions()
  //   }
  // }, [account])
  var _c = useAuth_1['default'](),
    login = _c.login,
    logout = _c.logout
  var _d = WalletModal_1.useWalletModal(login, logout, account || undefined),
    onPresentConnectModal = _d.onPresentConnectModal,
    onPresentAccountModal = _d.onPresentAccountModal
  var connectWallet = [
    {
      render: function (text, record) {
        return React.createElement(
          'div',
          {className: 'walletZhanWei'},
          React.createElement('img', {src: wallet_png_1['default'], alt: ''}),
          React.createElement(
            antd_1.Button,
            {
              onClick: function () {
                return onPresentConnectModal()
              },
            },
            'Connect Wallet',
          ),
        )
      },
    },
  ]
  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      {className: account ? 'pc-table-wallet' : 'h5-table-wallet'},
      account
        ? React.createElement(antd_1.Table, {dataSource: dataSource, columns: columns, pagination: pagination})
        : React.createElement(antd_1.Table, {
            dataSource: [{key: '1'}],
            columns: connectWallet,
            pagination: false,
            loading: false,
            showHeader: false,
          }),
    ),
    React.createElement(
      'div',
      {className: account ? 'h5-table' : 'h5-noAccount-table'},
      dataSource.map(function (ele, index) {
        return React.createElement(TableList, {TableItem: ele, key: index})
      }),
    ),
  )
}
var TableList = function (props) {
  var record = props.TableItem
  return React.createElement(
    'div',
    {className: 'tx-fee'},
    React.createElement(
      'div',
      {className: 'item'},
      React.createElement('div', {className: 'tx-fee-text'}, 'Ticker'),
      React.createElement(
        'div',
        {className: 'tx-fee-showPrice'},
        React.createElement('img', {
          src: record.assetTokenName
            ? require('../../img/coin/' + record.assetTokenName + '.png')['default']
            : {zhanweifu: zhanweifu},
          alt: record.assetTokenName,
        }),
        React.createElement('span', null, record.assetTokenName),
      ),
    ),
    React.createElement(
      'div',
      {className: 'item'},
      React.createElement('div', {className: 'tx-fee-text'}, 'Swap Price'),
      React.createElement(
        'div',
        {className: 'tx-fee-showPrice'},
        React.createElement('p', null, utils_1.fixD(record.oraclePrice, 2), ' ', record.cAssetTokenName),
      ),
    ),
    React.createElement(
      'div',
      {className: 'item'},
      React.createElement('div', {className: 'tx-fee-text'}, 'Balance'),
      React.createElement(
        'div',
        {className: 'tx-fee-showPrice'},
        React.createElement('p', null, utils_1.fixD(record.assetAmount, 6), ' ', record.assetTokenName),
      ),
    ),
    React.createElement(
      'div',
      {className: 'item'},
      React.createElement('div', {className: 'tx-fee-text'}, 'Value'),
      React.createElement('div', {className: 'tx-fee-showPrice'}, React.createElement('p', null, '$ ', 1212.69)),
    ),
    React.createElement(
      'div',
      {className: 'item'},
      React.createElement('div', {className: 'tx-fee-text'}, 'Action'),
      React.createElement(react_router_dom_1.NavLink, {to: '/trade', activeClassName: 'active'}, 'Trade'),
    ),
  )
}
exports['default'] = PositionTable
