/** @format */

'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports['default'] = _default

var _httpProxyMiddleware = _interopRequireDefault(require('http-proxy-middleware'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

/** @format */
function _default(app) {
  app.use(
    (0, _httpProxyMiddleware['default'])('/data', {
      target: 'http://localhost',
      pathRewrite: {
        '^/data': '',
      },
      changeOrigin: true, 
    }),
  )
  app.use(
    (0, _httpProxyMiddleware['default'])('/rest', {
      target: 'http://localhost/rest',
      pathRewrite: {
        '^/data': '',
      },
      changeOrigin: true,
    }),
  )
}
