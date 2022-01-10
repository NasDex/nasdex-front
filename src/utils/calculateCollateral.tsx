/** @format */
import precision from './precision'
export default function CalculateRate(assetAmount: any, cAssetAmount: any, oraclePrice: any) {
  const rate = (precision.divide(precision.divide(Number(cAssetAmount), Number(assetAmount)), oraclePrice) * 100).toString()
  return Number(rate).toFixed(0)
}
