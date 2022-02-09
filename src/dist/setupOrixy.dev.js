/** @format */

'use strict'

var _httpProxyMiddleware = _interopRequireDefault(require('http-proxy-middleware'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}
}

/** @format */
module.exports = function (app) {
  app.use(
    _httpProxyMiddleware['default'].createProxyMiddleware('/api', {
      target: 'http://data.gtimg.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  )
} 
