/** @format */

'use strict'
exports.__esModule = true
/** @format */
function CalculateRate(assetAmount, cAssetAmount, oraclePrice) {
  var rate = ((Number(cAssetAmount) / Number(assetAmount) / oraclePrice) * 100).toString()
  return parseInt(rate)
}
exports['default'] = CalculateRate
