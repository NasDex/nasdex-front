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
      //`api`是需要转发的请求
      target: 'http://data.gtimg.cn',
      // 这里是接口服务器地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  )
} // export default function(app) {
//     app.use(
//       proxy('/api', {  //`api`是需要转发的请求
//         target: 'http://data.gtimg.cn',  // 这里是接口服务器地址
//         changeOrigin: true,
//         pathRewrite: {'^/api': ''}
//       })
//     )
//   }
// export default function (app) {
//   app.use(
//     createProxyMiddleware('/api', {
//       target: 'http://data.gtimg.cn',
//       changeOrigin: true,
//       pathRewrite:{
//         '^/api': '/',
//       },
//     }),
//   )
// }
