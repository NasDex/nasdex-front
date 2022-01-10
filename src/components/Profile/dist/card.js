/** @format */

'use strict'
/** @format */
exports.__esModule = true
require('../../style/Profile/card.less')
var profile_total_value_png_1 = require('../../img/profile/profile-total-value.png')
var profile_price_png_1 = require('../../img/profile/profile-price.png')
var profile_staked_png_1 = require('../../img/profile/profile-staked.png')
var ProfileCard = function (props) {
  var text = props.text,
    value = props.value,
    icon = props.icon,
    bgImg = props.bgImg
  return React.createElement(
    'div',
    {className: 'card-list'},
    React.createElement(
      'div',
      {className: 'card-list-item'},
      React.createElement(
        'div',
        {className: 'card-content  card-content-total'},
        React.createElement(
          'div',
          {className: 'card-header'},
          React.createElement('img', {src: profile_total_value_png_1['default'], alt: ''}),
          'Total Value',
        ),
        React.createElement(
          'div',
          {className: 'card-footer'},
          React.createElement('span', null, '$'),
          '12578113.3189521',
        ),
      ),
      React.createElement(
        'div',
        {className: 'card-content  card-content-total card-content-price'},
        React.createElement(
          'div',
          {className: 'card-header'},
          React.createElement('img', {src: profile_price_png_1['default'], alt: ''}),
          'NSDX Price',
        ),
        React.createElement('div', {className: 'card-footer'}, React.createElement('span', null, '$'), '0.1234'),
      ),
    ),
    React.createElement(
      'div',
      {className: 'card-content  card-content-total card-content-staked'},
      React.createElement(
        'div',
        {className: 'card-header'},
        React.createElement('img', {src: profile_staked_png_1['default'], alt: ''}),
        'Staked',
      ),
      React.createElement(
        'div',
        {className: 'card-footer'},
        React.createElement('span', null, '$'),
        '12578113.3189521',
      ),
    ),
  )
}
exports['default'] = ProfileCard
