/** @format */

'use strict'
/** @format */
exports.__esModule = true
var antd_1 = require('antd')
var tradesubmitted_2x_png_1 = require('../../img/common/tradesubmitted@2x.png')
var waitings_gif_1 = require('../../img/common/waitings.gif')
var waring_2x_png_1 = require('../../img/common/waring@2x.png')
require('../../style/Mint/notification.less')
var hooks_1 = require('state/mint/hooks')
var actions_1 = require('../../state/mint/actions')
var actions_2 = require('../../state/farm/actions')
var actions_3 = require('../../state/manage/actions')
var react_redux_1 = require('react-redux')
var defaultOnDismiss = function () {
  return null
}
var RenderWaitings = function (props) {
  var message = props.message
  function createMarkup() {
    return {__html: message}
  }
  return React.createElement(
    'div',
    {className: 'waitings-modal'},
    React.createElement('img', {src: waitings_gif_1['default'], alt: ''}),
    React.createElement('p', null, 'Please confirm in your wallet'),
    React.createElement('p', {dangerouslySetInnerHTML: createMarkup()}),
  )
}
var RenderNoMessageWaitings = function (props) {
  var message = props.message
  function createMarkup() {
    return {__html: message}
  }
  return React.createElement(
    'div',
    {className: 'waitings-modal'},
    React.createElement('img', {src: waitings_gif_1['default'], alt: ''}),
    React.createElement('p', {dangerouslySetInnerHTML: createMarkup()}),
  )
}
var RenderSuccess = function (props) {
  var mintState = hooks_1.useMintState()
  var onDismiss = props.onDismiss,
    from = props.from
  var hash = mintState.hash
  var dispatch = react_redux_1.useDispatch()
  function handle() {
    onDismiss()
    location.href = '/profile'
  }
  function dispatchHandle() {
    onDismiss()
    dispatch(actions_3.upDateNewPositionInfo({newPositionInfo: hash}))
    dispatch(actions_1.upDateMintInitInfo({mintInitInfo: hash}))
    dispatch(actions_2.upDateFarmInitInfo({farmInitInfo: hash}))
  }
  return React.createElement(
    'div',
    {className: 'success-modal'},
    React.createElement('img', {src: tradesubmitted_2x_png_1['default'], alt: ''}),
    React.createElement('p', null, ' Transaction Submitted'),
    hash
      ? React.createElement(
          'a',
          {href: 'https://mumbai.polygonscan.com/tx/' + hash, target: '_blank'},
          'View on Explorer',
        )
      : null,
    React.createElement(
      'div',
      null,
      React.createElement(
        antd_1.Button,
        {
          className: 'modal-btn',
          onClick:
            from == 'close'
              ? function () {
                  return handle()
                }
              : function () {
                  return dispatchHandle()
                },
        },
        'OK',
      ),
    ),
  )
}
var RenderRejected = function (props) {
  var mintState = hooks_1.useMintState()
  var onDismiss = props.onDismiss
  var hash = mintState.hash
  function handle() {
    onDismiss()
  }
  return React.createElement(
    'div',
    {className: 'rejected-modal'},
    React.createElement('img', {src: waring_2x_png_1['default'], alt: ''}),
    React.createElement('p', null, 'Transaction Rejected'),
    hash
      ? React.createElement(
          'a',
          {href: 'https://mumbai.polygonscan.com/tx/' + hash, target: '_blank'},
          'View on Explorer',
        )
      : null,
    React.createElement(
      'div',
      null,
      React.createElement(
        antd_1.Button,
        {
          className: 'modal-btn',
          onClick: function () {
            return handle()
          },
        },
        'Dismiss',
      ),
    ),
  )
}
var OrderNoifcation = function (_a) {
  var _b = _a.onDismiss,
    onDismiss = _b === void 0 ? defaultOnDismiss : _b,
    type = _a.type,
    title = _a.title,
    message = _a.message,
    from = _a.from
  var dispatch = react_redux_1.useDispatch()
  var mintState = hooks_1.useMintState()
  var hash = mintState.hash
  // dispatch(upDateNewPositionInfo({newPositionInfo: false}))
  function handle() {
    onDismiss()
    // getPositonInfo(id)
    location.href = '/profile'
    // dispatch(upDateNewPositionInfo({newPositionInfo: true}))
  }
  function disPatchHandle() {
    // console.log(909203082342)
    onDismiss()
    dispatch(actions_3.upDateNewPositionInfo({newPositionInfo: hash}))
    dispatch(actions_1.upDateMintInitInfo({mintInitInfo: hash}))
    dispatch(actions_2.upDateFarmInitInfo({farmInitInfo: hash}))
  }
  return React.createElement(
    antd_1.Modal,
    {
      title: title,
      width: 400,
      footer: null,
      visible: true,
      onOk: onDismiss,
      from: from,
      onCancel: type !== 'success' ? onDismiss : from == 'close' ? handle : disPatchHandle,
      message: message,
    },
    type === 'success'
      ? React.createElement(RenderSuccess, {onDismiss: onDismiss, from: from})
      : type === 'waitings'
      ? React.createElement(RenderWaitings, {message: message})
      : type === 'noMessageWaitings'
      ? React.createElement(RenderNoMessageWaitings, {onDismiss: onDismiss, from: from, message: message})
      : React.createElement(RenderRejected, {onDismiss: onDismiss}),
  )
}
exports['default'] = OrderNoifcation
