/** @format */

import react from 'react'
import '../../../style/Manage/close.less'
import {Input, Select, Button, Slider} from 'antd'
// import coinImg from '../../img/coin/USDC@2x.png'
const {Option} = Select

const Close = () => {
  return (
    <div className="manageRight-close-container">
      <div className="tx-fee">
        <div className="item">
          <div className="tx-fee-text">Burn Amount</div>
          <div className="tx-fee-price">100 nAssets</div>
        </div>
        <div className="item">
          <div className="tx-fee-text">Withdraw Amount</div>
          <div className="tx-fee-price">174 12.12918 USDC</div>
        </div>
        <div className="item">
          <div className="tx-fee-text">Protoccol fee</div>
          <div className="tx-fee-price">9.82 UST</div>
        </div>
        {/* <div className="item">
          <div className="tx-fee-text">Tx Fee</div>
          <div className="tx-fee-price">0.21412UST</div>
        </div> */}
      </div>
      <Button className="close">Close</Button>
    </div>
  )
}
export default Close
