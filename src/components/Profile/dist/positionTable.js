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
var antd_1 = require('antd')
var react_router_dom_1 = require('react-router-dom')
var hooks_1 = require('hooks')
var useContract_1 = require('constants/hooks/useContract')
var utils_1 = require('ethers/lib/utils')
var index_1 = require('../../constants/index')
var calculateCollateral_1 = require('../../utils/calculateCollateral')
// const dataSource = [
//   {
//     key: '1',
//     name: 'nTENCT',
//     coin: 'USDC',
//     logo: tencentLogo,
//     oraclePrice: '172122.1223',
//     oraclePriceUsd: '172122.1223',
//     mintAmount: '172122.1223',
//     mintAmountUsd: '172122.1223',
//     collateral: '172122.1223',
//     collateralUsd: '172122.1223',
//     collateralRatio: '150',
//     riskLevel: 'SAFE',
//   },
// ]
var columns = [
  {
    title: 'Ticker',
    // dataIndex: 'name',
    // key: 'name',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement('img', {src: record.logo, alt: ''}),
        record.assetTokenName,
      )
    },
  },
  {
    title: 'Oracle Price',
    dataIndex: 'oraclePrice',
    key: 'oraclePrice',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement('p', {className: 'balance'}, record.oraclePrice, ' ', record.cAssetTokenName),
        React.createElement('p', {className: 'balance-usd'}, '$ ', record.oraclePriceUsd),
      )
    },
  },
  {
    title: 'Mint Amount',
    dataIndex: 'cAssetAmount',
    key: 'cAssetAmount',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement('p', {className: 'balance'}, record.cAssetAmount, ' ', record.cAssetTokenName),
        React.createElement('p', {className: 'balance-usd'}, '$ ', record.mintAmountUsd),
      )
    },
  },
  {
    title: 'Collateral',
    dataIndex: 'address',
    key: 'address',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement('p', {className: 'balance'}, record.collateral, '%'),
      )
    },
  },
  {
    title: 'Collateral Ratio',
    dataIndex: 'address',
    key: 'address',
    align: 'right',
    render: function (text, record) {
      return React.createElement(
        'div',
        {className: 'table-cell'},
        React.createElement(
          'div',
          {className: 'slider-text'},
          React.createElement(
            'p',
            null,
            record.collateral,
            '% ',
            React.createElement('span', {className: 'balance-usd'}, 'Min:', record.collateralRatio, '%'),
          ),
          Number(record.collateralRatio) < 165
            ? React.createElement('div', {className: 'input-btn-min'}, 'Higher Risk')
            : Number(record.collateralRatio) < 200
            ? React.createElement('div', {className: 'input-btn-middle'}, 'Medium Risk')
            : React.createElement('div', {className: 'input-btn-max'}, 'SAFE'),
        ),
        React.createElement(
          'p',
          null,
          React.createElement(antd_1.Slider, {
            disabled: true,
            className: [
              'collateral-slider',
              Number(record.collateral) < 165
                ? 'collateral-slider-min'
                : Number(record.collateral) < 200
                ? 'collateral-slider-middle'
                : 'collateral-slider-max',
            ].join(' '),
            value: record.collateral,
            max: 300,
          }),
        ),
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
          React.createElement(
            react_router_dom_1.NavLink,
            {to: '/manage/' + record.key, activeClassName: 'active'},
            'Manage',
          ),
        ),
      )
    },
  },
]
var PositionTable = function (props) {
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
  function getPositions() {
    return __awaiter(this, void 0, void 0, function () {
      var startAt, limit, positionList, result
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
            positionList.forEach(function (position) {
              result.push({
                key: position.id.toString(),
                assetAmount: utils_1.formatUnits(position.assetAmount, 18),
                assetToken: position.assetToken,
                cAssetAmount: utils_1.formatUnits(position.cAssetAmount, 18),
                cAssetToken: position.cAssetToken,
                owner: position.owner,
                oraclePrice: 35,
                assetTokenName: index_1.assetsName[position.assetToken],
                cAssetTokenName: index_1.assetsName[position.cAssetToken],
                collateral: calculateCollateral_1['default'](
                  utils_1.formatUnits(position.assetAmount, 18),
                  utils_1.formatUnits(position.cAssetAmount, 18),
                  35,
                ),
              })
            })
            if (result && result.length > 0) {
              // console.log(result,'result##')
              setDataSource(result)
            }
            return [2 /*return*/]
        }
      })
    })
  }
  react_1.useEffect(
    function () {
      if (account) {
        getPositions()
      }
    },
    [account],
  )
  return React.createElement(antd_1.Table, {dataSource: dataSource, columns: columns, pagination: pagination})
}
exports['default'] = PositionTable
