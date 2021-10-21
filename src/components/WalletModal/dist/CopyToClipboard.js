/** @format */

'use strict'
/** @format */
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]]
      }
    return t
  }
exports.__esModule = true
var react_1 = require('react')
var notification_1 = require('../../utils/notification')
var CopyToClipboard = function (_a) {
  var toCopy = _a.toCopy,
    children = _a.children,
    props = __rest(_a, ['toCopy', 'children'])
  var openNotificationWithIcon = function (type) {
    notification_1['default']({
      type: type,
      message: 'Success',
      description: 'Copy Success',
    })
    // notification[type]({
    //   message: 'Notification Title',
    //   description:
    //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    //   // duration: null,
    // })
  }
  function copy(value) {
    var aux = document.createElement('input')
    // aux.setAttribute("value", toCopy);
    aux.setAttribute('value', value)
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux)
    openNotificationWithIcon('success')
    // setIsTooltipDisplayed(true)
    // setTimeout(() => {
    //   setIsTooltipDisplayed(false)
    // }, 1000)
  }
  return react_1['default'].createElement(
    'div',
    __assign(
      {
        style: {
          display: 'flex',
          alignItems: 'center',
        },
        onClick: function () {
          return copy(toCopy)
        },
      },
      props,
    ),
    children,
  )
}
exports['default'] = CopyToClipboard
