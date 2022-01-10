/** @format */

import warning from '../img/mint/warning.png'
import waringPng from '../img/common/waring@2x.png'
export function TradingTimer(t: any) {
  return (
    <div className="tips-available">
      <div className="content">
        <img src={waringPng} alt="" />
        <span>
          {t('tradingTimer')}
        </span>
      </div>
    </div>
  )
}
export function LowerRatio(t: any) {
  return (
    <div className="available">
      <div className="content">
        <img src={warning} alt="" />
        <span>{t('minimumCollateralRatio')}</span>
      </div>
    </div>
  )
}
