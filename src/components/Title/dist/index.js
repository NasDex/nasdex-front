/** @format */

'use strict'
/** @format */
exports.__esModule = true
var core_1 = require('@web3-react/core')
var CopyToClipboard_1 = require('components/WalletModal/CopyToClipboard')
var react_1 = require('react')
require('../../style/title.less')
var Title = function (_a) {
  var title = _a.title,
    hasOpen = _a.hasOpen,
    hasAddress = _a.hasAddress
  var account = core_1.useWeb3React().account
  return react_1['default'].createElement(
    'div',
    {className: 'title'},
    title,
    hasAddress && account
      ? react_1['default'].createElement(
          'div',
          {className: 'address'},
          react_1['default'].createElement(
            CopyToClipboard_1['default'],
            {toCopy: account},
            account,
            react_1['default'].createElement(
              'svg',
              {className: 'icon', 'aria-hidden': 'true'},
              react_1['default'].createElement('use', {xlinkHref: '#copy'}),
            ),
          ),
        )
      : null,
  )
}
exports['default'] = Title
