/** @format */

'use strict'
/** @format */
exports.__esModule = true
exports.getLibrary = void 0
var ethers_1 = require('ethers')
// export default function getLibrary(provider: any): Web3Provider {
//   const library = new Web3Provider(provider)
//   library.pollingInterval = 15000
//   return library
// }
exports.getLibrary = function (provider) {
  var library
  if (provider) {
    library = new ethers_1.ethers.providers.Web3Provider(provider)
    library.pollingInterval = 1500
  }
  return library
}
