/** @format */

import react , {useState, useEffect} from 'react'
import '../../../style/Manage/withdraw.less'
import { Input, Select, Button, Slider } from 'antd'
import TipsImg from '../../../img/common/tips@2x.png'
import tencent from '../../../img/coin/tencent.png'
import {fixD} from 'utils'
// import coinImg from '../../img/coin/USDC@2x.png'
const {Option} = Select
const marks = {
  150: {
    style: {
      color: '#909DB4',
      marginRight: '20px',
    },
    label: (
      <strong>
        Min 150% <img className="tips-img" src={TipsImg} alt="" />{' '}
        <div className="tips-texts">
          Minimal collateral ratio. When your position drops below it, any users may liquidate the position. In case
          that the volatility is high, we suggest you to choose a higher ratio.
        </div>{' '}
      </strong>
    ),
  },
  200: {
    style: {
      color: '#909DB4',
    },
    label: <strong>Safe 200%</strong>,
  },
}
const Withdraw = () => {
  const [tradeAmount, setAmount] = useState('')
  const [tradeCollateral, setTradeCollateral] = useState('')
  const [sliderValue, setSliderValue] = useState('200')
  const [amountInputFocus, setamountInputFocus] = useState(false)
  const [collateralInputFocus, setCollateralInputFocus] = useState(false)
  const [amountActive, setAmountActive] = useState(false)
  useEffect(() => {
    if (amountInputFocus) {
      const result = ((Number(tradeAmount) * Number(sliderValue)) / 100).toString()
      setTradeCollateral(fixD(result, 6))
    }
    if (collateralInputFocus) {
      if (Number(sliderValue) > 0) {
        const amount = ((Number(tradeCollateral) / Number(sliderValue)) * 100).toString()
        setAmount(fixD(amount, 6))
      }
    }
  }, [tradeAmount, tradeCollateral, sliderValue])
  return (
    <div className="manageRight-withdraw-container">
      {/* <div className="trade-title">Mint nAPPL</div> */}
      <div className={amountActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p className="amount-text">Withdraw</p>
          <p className="balance">
            Available 500
            <Button disabled>MAX</Button>
          </p>
        </div>
        <div className="trade-price">
          <Input
            placeholder="0.0"
            value={tradeAmount}
            defaultValue=""
            bordered={false}
            onChange={e => {
              e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
              setAmount(e.target.value)
            }}
            onClick={() => {
                setamountInputFocus(true)
                setAmountActive(true)
                setCollateralInputFocus(false)
              }}
              onBlur={() => {
                setAmountActive(false)
              }}
          />
          <div className="select-box">
            <Select
              defaultValue="nTENCT"
              // style={{width: 98}}
              bordered={false}
              suffixIcon={
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-Under"></use>
                </svg>
              }>
              <Option value="nTENCT">
                <div className="customize-option-label-item">
                  <img src={tencent} alt="" />
                  <span>nTENCT</span>
                </div>
              </Option>
            </Select>
          </div>
        </div>
      </div>
      <Button className="withdraw">Withdraw</Button>
      <div className="tx-fee">
        <div className="item">
          <div className="tx-fee-text">Total nTENCT</div>
          <div className="tx-fee-price">100</div>
        </div>
        <div className="item">
          <div className="tx-fee-text">Total Collateral (USDT)</div>
          <div className="tx-fee-price">17412.1234</div>
        </div>
        <div className="item">
          <div className="tx-fee-text">New Collateral Ratio (CR)</div>
          <div className="tx-fee-price">150%</div>
        </div>
      </div>
    </div>
  )
}
export default Withdraw
