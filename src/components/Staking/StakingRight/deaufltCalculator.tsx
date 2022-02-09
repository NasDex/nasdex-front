/** @format */

import react from 'react'
import { Modal, Button } from 'antd'
import '../../../style/Staking/calculator.less'
import { fixD } from 'utils'
import { useTranslation } from 'react-i18next'
const defaultOnDismiss = () => null

type TikerInfoProps = {
  onDismiss?: () => void
  apr: string
}

const TikerInfo = ({ onDismiss = defaultOnDismiss, apr = '' }: TikerInfoProps) => {
  const { t, i18n } = useTranslation()
  const d1 = Number(apr) ? Number(apr) / 365 : 0
  const str = Number(apr) ? Number(apr) / 365 / 100 : 0
  const d7 = Number(str) * 7 * 100
  const d30 = Number(str) * 30 * 100
  const d365 = Number(str) * 365 * 100

  function num(val: number) {
    if (Number(val.toString()) > 100000000) {
      return 'Infinity'
    }
    return fixD(val, 2)
  }
  return (
    <Modal title={t('ROI')} width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="calculator-container">
        <div className="calculator-card">
          <div className="item">
            <p className="itemp">{t('timeframe')}</p>
            <span>{t('ROI')}</span>
          </div>
          <div className="item">
            <p className="itemp">1d</p>
            <span>{num(d1)}%</span>
          </div>
          <div className="item">
            <p className="itemp">7d</p>
            <span>{num(d7)}%</span>
          </div>
          <div className="item">
            <p className="itemp">30d</p>
            <span>{num(d30)}%</span>
          </div>
          <div className="item">
            <p className="itemp">365d(APR)</p>
            <span>{num(d365)}%</span>
          </div>
        </div>
        <div className="calculator-describe">
          {t('Calculated')}
        </div>
        {/* <Button className="calculator-btn">
          <span>Get NSDX</span>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-link"></use>
          </svg>
        </Button> */}
      </div>
    </Modal>
  )
}

export default TikerInfo
