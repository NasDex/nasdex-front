/** @format */

'use strict'
/** @format */
exports.__esModule = true
var antd_1 = require('antd')
var success_2x_png_1 = require('../img/common/success@2x.png')
var error_2x_png_1 = require('../img/common/error@2x.png')
var waring_2x_png_1 = require('../img/common/waring@2x.png')
var getIcon = function (type) {
  switch (type) {
    case 'success':
      return React.createElement('img', {className: 'notification-icon', src: success_2x_png_1['default']})
    case 'error':
      return React.createElement('img', {className: 'notification-icon', src: error_2x_png_1['default']})
    case 'info':
    case 'warning':
    default:
      return React.createElement('img', {className: 'notification-icon', src: waring_2x_png_1['default']})
  }
}
var Notification = function (props) {
  var type = props.type,
    message = props.message,
    description = props.description
  antd_1.notification[type]({
    message: message,
    description: description,
    icon: getIcon(type),
    closeIcon: React.createElement(
      'svg',
      {className: 'icon close-notification-icon', 'aria-hidden': 'true'},
      React.createElement('use', {xlinkHref: '#icon-close'}),
    ),
    duration: 3,
  })
}
exports['default'] = Notification
