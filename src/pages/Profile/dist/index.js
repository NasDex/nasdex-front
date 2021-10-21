/** @format */

'use strict'
/** @format */
exports.__esModule = true
var card_1 = require('../../components/Profile/card')
var coinList_1 = require('../../components/Profile/coinList')
var Title_1 = require('../../components/Title')
var profileList_1 = require('../../components/Profile/profileList')
require('../../style/Profile/index.less')
function Profile() {
  return React.createElement(
    'div',
    {className: 'profile-container'},
    React.createElement(
      'div',
      {className: 'container-center'},
      React.createElement(Title_1['default'], {title: 'Mint', hasOpen: true, hasAddress: true}),
      React.createElement(
        'div',
        {className: 'profile-content'},
        React.createElement(
          'div',
          {className: 'profile-data'},
          React.createElement(card_1['default'], null),
          React.createElement(coinList_1['default'], null),
        ),
        React.createElement('div', {className: 'profile-list'}, React.createElement(profileList_1['default'], null)),
      ),
    ),
  )
}
exports['default'] = Profile
