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
  // proxy第一个参数为要代理的路由
  app.use(
    (0, _httpProxyMiddleware['default'])('/data', {
      target: 'http://localhost',
      //配置你要请求的服务器地址，代理后的请求网址
      pathRewrite: {
        '^/data': '',
      },
      //路径重写
      changeOrigin: true, // 是否改变请求头
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
