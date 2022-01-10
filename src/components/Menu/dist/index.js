/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
var react_router_dom_1 = require('react-router-dom')
var selectWallet_1 = require('../Wallet/selectWallet')
var accountCard_1 = require('../Wallet/accountCard')
var networkCard_1 = require('../Wallet/networkCard')
var logo_2x_png_1 = require('../../img/common/logo@2x.png')
var preview_png_1 = require('../../img/menu/preview.png')
require('../../style/menu.less')
var useModal_1 = require('../../hooks/useModal')
var core_1 = require('@web3-react/core')
var WalletModal_1 = require('components/WalletModal')
var useAuth_1 = require('hooks/useAuth')
var Menu = function (props) {
  var children = props.children
  var _a = react_1.useState(false),
    showListMenu = _a[0],
    setShowListMenu = _a[1]
  var pathname = react_router_dom_1.useLocation().pathname
  react_1.useEffect(
    function () {
      setShowListMenu(false)
    },
    [pathname],
  )
  var openWalletCard = useModal_1['default'](react_1['default'].createElement(selectWallet_1['default'], null))[0]
  var openAccountCard = useModal_1['default'](react_1['default'].createElement(accountCard_1['default'], null))[0]
  var openNetwork = useModal_1['default'](react_1['default'].createElement(networkCard_1['default'], null))[0]
  var account = core_1.useWeb3React().account
  var _b = useAuth_1['default'](),
    login = _b.login,
    logout = _b.logout
  var _c = WalletModal_1.useWalletModal(login, logout, account || undefined),
    onPresentConnectModal = _c.onPresentConnectModal,
    onPresentAccountModal = _c.onPresentAccountModal
  var accountEllipsis = account ? account.substring(0, 4) + '...' + account.substring(account.length - 4) : null
  return react_1['default'].createElement(
    'div',
    {className: 'container'},
    react_1['default'].createElement(
      'div',
      {className: 'sidebar'},
      react_1['default'].createElement(
        'div',
        {className: 'h5-nav'},
        react_1['default'].createElement('img', {src: logo_2x_png_1['default']}),
        react_1['default'].createElement(
          'svg',
          {
            className: 'icon',
            'aria-hidden': 'true',
            onClick: function () {
              setShowListMenu(!showListMenu)
            },
          },
          react_1['default'].createElement('use', {xlinkHref: '#icon-menu-open'}),
        ),
      ),
      react_1['default'].createElement(
        'div',
        {className: showListMenu ? 'menu-list-block show' : 'menu-list-block'},
        react_1['default'].createElement(
          'div',
          {className: 'logo'},
          react_1['default'].createElement('img', {src: logo_2x_png_1['default']}),
          react_1['default'].createElement(
            'span',
            {className: 'toggle-btn'},
            react_1['default'].createElement(
              'svg',
              {className: 'icon', 'aria-hidden': 'true'},
              react_1['default'].createElement('use', {xlinkHref: '#icon-left'}),
            ),
          ),
        ),
        !account
          ? react_1['default'].createElement(
              'div',
              {
                className: 'wallet-btn connect-wallet-btn',
                onClick: function () {
                  return onPresentConnectModal()
                },
              },
              react_1['default'].createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                react_1['default'].createElement('use', {xlinkHref: '#icon-Connect-Wallet'}),
              ),
              react_1['default'].createElement('span', null, 'Connect Wallet'),
            )
          : react_1['default'].createElement(
              'div',
              {
                className: 'wallet-btn wallet-account',
                onClick: function () {
                  return onPresentAccountModal()
                },
              },
              react_1['default'].createElement(
                'div',
                {className: 'network', onClick: openNetwork},
                react_1['default'].createElement('i', null),
                react_1['default'].createElement('span', null, 'Polygon'),
              ),
              react_1['default'].createElement(
                'div',
                {className: 'address', onClick: openAccountCard},
                accountEllipsis,
              ),
            ),
        react_1['default'].createElement(
          'div',
          {className: 'menu-container'},
          react_1['default'].createElement(
            'div',
            {className: 'menu-list'},
            react_1['default'].createElement(
              react_router_dom_1.NavLink,
              {to: '/profile', activeClassName: 'active', className: pathname == '/manage' ? 'active' : ''},
              react_1['default'].createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                react_1['default'].createElement('use', {xlinkHref: '#Icon-Mint-Active'}),
              ),
              react_1['default'].createElement('span', null, 'Profile'),
            ),
            react_1['default'].createElement(
              react_router_dom_1.NavLink,
              {to: '/Trade', activeClassName: 'active'},
              react_1['default'].createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                react_1['default'].createElement('use', {xlinkHref: '#Icon-Trade-Active'}),
              ),
              react_1['default'].createElement('span', null, 'Trade'),
            ),
            react_1['default'].createElement(
              react_router_dom_1.NavLink,
              {to: '/mint', activeClassName: 'active'},
              react_1['default'].createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                react_1['default'].createElement('use', {xlinkHref: '#Icon-Mint-Active'}),
              ),
              react_1['default'].createElement('span', {style: {width: '38px'}}, 'Mint'),
              react_1['default'].createElement('img', {src: preview_png_1['default'], alt: ''}),
            ),
            react_1['default'].createElement(
              react_router_dom_1.NavLink,
              {to: '/staking', activeClassName: 'active'},
              react_1['default'].createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                react_1['default'].createElement('use', {xlinkHref: '#Icon-Stake-Active'}),
              ),
              react_1['default'].createElement('span', null, 'Stake'),
            ),
            react_1['default'].createElement(
              react_router_dom_1.NavLink,
              {
                to: '/Farm',
                activeClassName: 'active',
                className:
                  pathname == '/farming/long' || pathname == '/farming/Long' || pathname == '/farming/Short'
                    ? 'active'
                    : '',
              },
              react_1['default'].createElement(
                'svg',
                {className: 'icon', 'aria-hidden': 'true'},
                react_1['default'].createElement('use', {xlinkHref: '#Icon-Farm-Active'}),
              ),
              react_1['default'].createElement('span', null, 'Farm'),
            ),
          ),
          react_1['default'].createElement(
            'div',
            {className: 'menu-bottom'},
            react_1['default'].createElement(
              'a',
              {className: 'docs', href: 'https://nasdexofficial.gitbook.io/nasdex/', target: '_blank'},
              'NASDEX Docs',
            ),
            react_1['default'].createElement(
              'div',
              {className: 'link-list'},
              react_1['default'].createElement(
                'a',
                {href: 'https://twitter.com/nasdex_xyz', target: '_blank'},
                react_1['default'].createElement(
                  'svg',
                  {className: 'icon', 'aria-hidden': 'true'},
                  react_1['default'].createElement('use', {xlinkHref: '#icon_twitter'}),
                ),
              ),
              react_1['default'].createElement(
                'a',
                {href: 'https://t.me/nasdex_xyz', target: '_blank'},
                react_1['default'].createElement(
                  'svg',
                  {className: 'icon', 'aria-hidden': 'true'},
                  react_1['default'].createElement('use', {xlinkHref: '#icon_Telegram-Group'}),
                ),
              ),
              react_1['default'].createElement(
                'a',
                {href: 'https://medium.com/@nasdex', target: '_blank'},
                react_1['default'].createElement(
                  'svg',
                  {className: 'icon', 'aria-hidden': 'true'},
                  react_1['default'].createElement('use', {xlinkHref: '#icon_Medium'}),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
    react_1['default'].createElement('div', {className: 'main'}, children),
  )
}
exports['default'] = Menu
