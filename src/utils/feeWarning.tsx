/** @format */

import warning from '../img/mint/warning.png'
import waringPng from '../img/common/waring@2x.png'
import '../style/Farm/shortOrderConfirm.less'
import { useTranslation } from 'react-i18next'
const FeeWarning: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  return (
    <div className="warning">
      <img src={waringPng} alt="" />
      <span>{t('A')} {props.feeRate}% {t('feeTips')}</span>
    </div>
  )
}
export default FeeWarning
