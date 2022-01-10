/** @format */

'use strict'
/** @format */

var __assign =
  (void 0 && (void 0).__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
          }
        }

        return t
      }

    return __assign.apply(this, arguments)
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

var poolBaseInfo = [
  {
    pid: '1',
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
  },
]

var LPPool = function LPPool(props) {
  var LpPoolListArray = props.LpPoolListArray
  return react_1['default'].createElement(
    'div',
    null,
    LpPoolListArray.map(function (ele, key) {
      return react_1['default'].createElement(LpPoolItem, {
        key: key,
        lpPoolItem: ele,
      })
    }),
  )
}

var LpPoolItem = function LpPoolItem(props) {
  var lpPoolItem = props.lpPoolItem
  var openStakeCard = useModal_1['default'](
    react_1['default'].createElement(stake_1['default'], {
      poolInfo: __assign({}, lpPoolItem),
    }),
  )[0]
  var openUntakeCard = useModal_1['default'](
    react_1['default'].createElement(unstake_1['default'], {
      poolInfo: __assign({}, lpPoolItem),
    }),
  )[0]
  var openClaimCard = useModal_1['default'](react_1['default'].createElement(claimAll_1['default'], null))[0]
  return react_1['default'].createElement(
    'div',
    {
      className: 'liquidity-item',
    },
    react_1['default'].createElement(
      'div',
      {
        className: 'liquidity-header',
      },
      react_1['default'].createElement(
        'div',
        {
          className: 'liquidity-logo',
        },
        react_1['default'].createElement('img', {
          src: coin_2x_png_1['default'],
          alt: '',
        }),
        react_1['default'].createElement(
          'div',
          {
            className: 'liquidity-name',
          },
          'NSDX - USDC LP',
        ),
      ),
      react_1['default'].createElement(
        'div',
        {
          className: 'liquidity-source',
        },
        react_1['default'].createElement(
          'a',
          {
            href: 'https://quickswap.exchange/#/pool',
            target: '_blank',
          },
          'From',
          react_1['default'].createElement('img', {
            src: source_2x_png_1['default'],
            alt: '',
          }),
          'Get NSDX-USDC LPT',
          react_1['default'].createElement(
            'svg',
            {
              className: 'icon',
              'aria-hidden': 'true',
            },
            react_1['default'].createElement('use', {
              xlinkHref: '#icon-link',
            }),
          ),
        ),
      ),
    ),
    react_1['default'].createElement(
      'div',
      {
        className: 'liquidity-bottom',
      },
      react_1['default'].createElement(
        'div',
        {
          className: 'total-liquidity',
        },
        react_1['default'].createElement(
          'div',
          {
            className: 'title',
          },
          '$ 1,012.666 ',
        ),
        react_1['default'].createElement(
          'div',
          {
            className: 'text',
          },
          'Total Liquidity',
        ),
      ),
      react_1['default'].createElement(
        'div',
        {
          className: 'apr',
        },
        react_1['default'].createElement(
          'div',
          {
            className: 'title',
          },
          '107.16%',
        ),
        react_1['default'].createElement(
          'div',
          {
            className: 'text',
          },
          'APR',
        ),
      ),
      react_1['default'].createElement(
        antd_1.Button,
        {
          className: 'pc-stake-btn',
          onClick: openStakeCard,
        },
        react_1['default'].createElement(
          'span',
          {
            style: {
              fontSize: '14px',
            },
          },
          'Stake',
        ),
      ),
    ),
    react_1['default'].createElement(
      antd_1.Button,
      {
        className: 'h5-stake-btn',
        onClick: openStakeCard,
      },
      'Stake',
    ),
    react_1['default'].createElement('span', {
      className: 'line',
    }),
    react_1['default'].createElement(
      'div',
      {
        className: 'claim-unstake',
      },
      react_1['default'].createElement(
        'div',
        {
          className: 'claim',
        },
        react_1['default'].createElement(
          'div',
          {
            className: 'left',
          },
          react_1['default'].createElement('span', null, 'Rewards (NSDX\uFF09'),
          react_1['default'].createElement('p', null, '1000.1234'),
        ),
        react_1['default'].createElement(
          antd_1.Button,
          {
            onClick: openClaimCard,
          },
          'Claim',
        ),
      ),
      react_1['default'].createElement(
        'div',
        {
          className: 'claim',
        },
        react_1['default'].createElement(
          'div',
          {
            className: 'left',
          },
          react_1['default'].createElement('span', null, 'Staked'),
          react_1['default'].createElement('p', null, '123456789120.1234\u2026'),
        ),
        react_1['default'].createElement(
          antd_1.Button,
          {
            onClick: openUntakeCard,
          },
          'Unstake',
        ),
      ),
    ),
  )
}

exports['default'] = LPPool
