/** @format */

'use strict'
/** @format */

var __awaiter =
  (void 0 && (void 0).__awaiter) ||
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
  (void 0 && (void 0).__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function sent() {
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
  return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2),
      }),
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

      while (_) {
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
              return {
                value: op[1],
                done: false,
              }

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
      }

      if (op[0] & 5) throw op[1]
      return {
        value: op[0] ? op[1] : void 0,
        done: true,
      }
    }
  }

exports.__esModule = true

var antd_1 = require('antd')

var tencent_png_1 = require('../../img/coin/tencent.png')

var react_router_dom_1 = require('react-router-dom')

var hooks_1 = require('hooks')

var dataSource = [
  {
    key: '1',
    name: 'nTENCT',
    coin: 'USDC',
    logo: tencent_png_1['default'],
    oraclePrice: '172122.1223',
    oraclePriceUsd: '172122.1223',
    mintAmount: '172122.1223',
    mintAmountUsd: '172122.1223',
    collateral: '172122.1223',
    collateralUsd: '172122.1223',
    collateralRatio: '150',
    riskLevel: 'SAFE',
  },
]
var columns = [
  {
    title: 'Ticker',
    // dataIndex: 'name',
    // key: 'name',
    render: function render(text, record) {
      return React.createElement(
        'div',
        {
          className: 'table-cell',
        },
        React.createElement('img', {
          src: record.logo,
          alt: '',
        }),
        record.name,
      )
    },
  },
  {
    title: 'Oracle Price',
    dataIndex: 'age',
    key: 'age',
    render: function render(text, record) {
      return React.createElement(
        'div',
        {
          className: 'table-cell',
        },
        React.createElement(
          'p',
          {
            className: 'balance',
          },
          record.oraclePrice,
          ' ',
          record.name,
        ),
        React.createElement(
          'p',
          {
            className: 'balance-usd',
          },
          '$ ',
          record.oraclePriceUsd,
        ),
      )
    },
  },
  {
    title: 'Mint Amount',
    dataIndex: 'address',
    key: 'address',
    render: function render(text, record) {
      return React.createElement(
        'div',
        {
          className: 'table-cell',
        },
        React.createElement(
          'p',
          {
            className: 'balance',
          },
          record.mintAmount,
          ' ',
          record.name,
        ),
        React.createElement(
          'p',
          {
            className: 'balance-usd',
          },
          '$ ',
          record.mintAmountUsd,
        ),
      )
    },
  },
  {
    title: 'Collateral',
    dataIndex: 'address',
    key: 'address',
    render: function render(text, record) {
      return React.createElement(
        'div',
        {
          className: 'table-cell',
        },
        React.createElement(
          'p',
          {
            className: 'balance',
          },
          record.collateral,
          ' ',
          record.name,
        ),
        React.createElement(
          'p',
          {
            className: 'balance-usd',
          },
          '$ ',
          record.collateralUsd,
        ),
      )
    },
  },
  {
    title: 'Collateral Ratio',
    dataIndex: 'address',
    key: 'address',
    align: 'right',
    render: function render(text, record) {
      return React.createElement(
        'div',
        {
          className: 'table-cell',
        },
        React.createElement(
          'div',
          {
            className: 'slider-text',
          },
          React.createElement(
            'p',
            null,
            record.collateralRatio,
            '% ',
            React.createElement(
              'span',
              {
                className: 'balance-usd',
              },
              'Min:',
              record.collateralRatio,
              '%',
            ),
          ),
          Number(record.collateralRatio) < 165
            ? React.createElement(
                'div',
                {
                  className: 'input-btn-min',
                },
                'Higher Risk',
              )
            : Number(record.collateralRatio) < 200
            ? React.createElement(
                'div',
                {
                  className: 'input-btn-middle',
                },
                'Medium Risk',
              )
            : React.createElement(
                'div',
                {
                  className: 'input-btn-max',
                },
                'SAFE',
              ),
        ),
        React.createElement(
          'p',
          null,
          React.createElement(antd_1.Slider, {
            disabled: true,
            className: [
              'collateral-slider',
              Number(record.collateralRatio) < 165
                ? 'collateral-slider-min'
                : Number(record.collateralRatio) < 200
                ? 'collateral-slider-middle'
                : 'collateral-slider-max',
            ].join(' '),
            value: record.collateralRatio,
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
    render: function render(text, record) {
      return React.createElement(
        'div',
        {
          className: 'table-cell',
        },
        React.createElement(
          antd_1.Button,
          {
            className: 'action-btn',
          },
          React.createElement(
            react_router_dom_1.NavLink,
            {
              to: '/manage?' + record.key,
              activeClassName: 'active',
            },
            'Manage',
          ),
        ),
      )
    },
  },
]

var PositionTable = function PositionTable(props) {
  var pagination = {
    pageSize: 5,
  } 
  // const MintContract = useMintContract()

  var MintContract = {
    getPositions: function getPositions(args1, args2, args3) {
      return null
    }
  } 

  var account = hooks_1.useActiveWeb3React().account

  function getPositions() {
    return __awaiter(this, void 0, void 0, function () {
      var startAt, limit, positionList
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            startAt = 0
            limit = 10
            return [
              4,
              /*yield*/
              MintContract.getPositions(account, startAt, limit),
            ]

          case 1:
            positionList = _a.sent()
            return [
              2,
              /*return*/
            ]
        }
      })
    })
  }

  return React.createElement(antd_1.Table, {
    dataSource: dataSource,
    columns: columns,
    pagination: pagination,
  })
};

exports['default'] = PositionTable
