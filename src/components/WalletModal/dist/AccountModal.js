/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
var antd_1 = require('antd')
var CopyToClipboard_1 = require('./CopyToClipboard')
var config_1 = require('./config')
require('style/wallet.less')
var WalletModal_1 = require('components/WalletModal')
var useAuth_1 = require('hooks/useAuth')
var Text = antd_1.Typography.Text,
  Link = antd_1.Typography.Link
var ConnectorNames = {
  injected: 'MetaMask',
  walletconnect: 'WalletConnect',
  bsc: 'BSC',
}
var AccountModal = function (_a) {
  var account = _a.account,
    logout = _a.logout,
    _b = _a.onDismiss,
    onDismiss =
      _b === void 0
        ? function () {
            return null
          }
        : _b
  var currentPlatformKey = localStorage.getItem('currentPlatform') || 'injected'
  var currentPlatform = ConnectorNames[currentPlatformKey]
  var login = useAuth_1['default']().login
  var onPresentConnectModal = WalletModal_1.useWalletModal(login, logout, account || undefined).onPresentConnectModal
  return react_1['default'].createElement(
    antd_1.Modal,
    {
      title: 'Account',
      visible: true,
      onOk: onDismiss,
      onCancel: onDismiss,
      width: '420px',
      footer: react_1['default'].createElement(
        'div',
        {className: 'account-footer'},
        react_1['default'].createElement(
          antd_1.Button,
          {
            onClick: function () {
              logout()
              window.localStorage.removeItem(config_1.connectorLocalStorageKey)
              onDismiss()
            },
          },
          'Disconnect',
        ),
        react_1['default'].createElement(
          'a',
          {className: 'view', href: 'https://mumbai.polygonscan.com/address/' + account, target: '_blank'},
          'View on Explorer',
        ),
      ),
    },
    react_1['default'].createElement(
      'div',
      {className: 'wallet-account-box'},
      react_1['default'].createElement(
        'div',
        {className: 'platform'},
        react_1['default'].createElement('p', null, 'Connected with ', currentPlatform),
        react_1['default'].createElement(
          antd_1.Button,
          {
            onClick: function () {
              return onPresentConnectModal()
            },
          },
          'Change',
        ),
      ),
      react_1['default'].createElement(
        'div',
        {className: 'account'},
        react_1['default'].createElement('p', null, account),
        react_1['default'].createElement(
          CopyToClipboard_1['default'],
          {toCopy: account},
          react_1['default'].createElement('a', null, 'Copy'),
        ),
      ),
    ),
  )
}
exports['default'] = AccountModal
