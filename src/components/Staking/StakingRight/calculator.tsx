/** @format */

import react from 'react'
import {Modal, Button} from 'antd'
import logo from '../../../img/coin/tencent.png'
import '../../../style/Staking/calculator.less'
import {fixD} from 'utils'

const defaultOnDismiss = () => null

type TikerInfoProps = {
  onDismiss?: () => void
  apr: string
}

const TikerInfo = ({onDismiss = defaultOnDismiss, apr = ''}: TikerInfoProps) => {
  // 1d ROI= APR/365
  const d1 = Number(apr) ? Number(apr) / 365 : 0
  // 7d ROI= [ (1+APR/365)^7 ] -1
  const str = Number(apr) ? Number(apr) / 365 / 100 : 0
  const d7 = ((1 + Number(str)) ** 7 - 1) * 100
  // 30d ROI=[ (1+APR/365)^30 ] -1
  const d30 = ((1 + Number(str)) ** 30 - 1) * 100
  // 365 ROI, 即APY= [ (1+APR/365)^365 ] -1
  const d365 = ((1 + Number(str)) ** 365 - 1) * 100

  function num(val: number) {
    if (Number(val.toString()) > 100000000) {
      return 'Infinity'
    }
    return fixD(val, 2)
  }
  return (
    <Modal title="ROI" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="calculator-container">
        <div className="calculator-card">
          <div className="item">
            <p className="itemp">TIMEFRAME</p>
            <span>ROI</span>
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
            <p className="itemp">365d(APY)</p>
            <span>{num(d365)}%</span>
          </div>
        </div>
        <div className="calculator-describe">
          Calculated based on current rates. Compounding 1x daily.Rates are estimates provided for your convenience
          only,and by no means represent guaranteed returns.
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
