/** @format */

import react , {useState, useEffect} from 'react'
import '../../../style/Trade/buy.less'
import { Input, Select, Button, Slider } from 'antd'
import TipsImg from '../../../img/common/tips@2x.png'
import tencent from '../../../img/coin/tencent.png'
import USDC from '../../../img/coin/USDC@2x.png'
import USDT from '../../../img/coin/USDT@2x.png'
import { fixD } from 'utils'
import useModal from '../../../hooks/useModal'
import ConfirmOrder from '../buyOrderConfirm/index'
import Notification from '../../../utils/notification'
type IconType = 'success' | 'info' | 'error' | 'warning'
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
const Buy = () => {
  const openNotificationWithIcon = (type: IconType) => {
    Notification({
      type,
      message: `Trade - Trade ${tradeAmount} nTENCT`,
    })
  }
  const [openConfirmOrder] = useModal(<ConfirmOrder openNotificationWithIcon={openNotificationWithIcon}></ConfirmOrder>)
  const [tradeAmount, setAmount] = useState('')
  const [tradeCollateral, setTradeCollateral] = useState('')
  const [sliderValue, setSliderValue] = useState('200')
  const [amountInputFocus, setamountInputFocus] = useState(false)
  const [collateralInputFocus, setCollateralInputFocus] = useState(false)
  const [sliderInputFocus, setSliderInputFocus] = useState(false)
  const [amountActive, setAmountActive] = useState(false)
  const [collateralActive, setCollateralActive] = useState(false)
  function changeSlider(value: string) {
    setSliderValue(value)
  }
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
    <div className="buy-container">
      {/* <div className="trade-title">Mint nAPPL</div> */}
      <div className={amountActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p className="amount-text">Pay</p>
          <p className="balance">
            Balance 0.0
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
              defaultValue="USDC"
              // style={{width: 98}}
              bordered={false}
              suffixIcon={
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-Under"></use>
                </svg>
              }>
              <Option value="USDC">
                <div className="customize-option-label-item">
                  <img src={USDC} alt="" />
                  <span>USDC</span>
                </div>
              </Option>
              <Option value="USDT">
                <div className="customize-option-label-item">
                  <img src={USDT} alt="" />
                  <span>USDT</span>
                </div>
              </Option>
            </Select>
          </div>
        </div>
      </div>
      {/* <div className="collateral">
        <div className="collateral-ratio-header">
          <div className="collateral-title-">Collateral Ratio</div>
          <div
            className={
              Number(sliderValue) < 165
                ? 'input-box-slide-active input-box'
                : sliderInputFocus
                ? 'input-box-active input-box'
                : 'input-box'
            }>
            <Input
              placeholder="280"
              maxLength={3}
              defaultValue={sliderValue}
              onChange={e => {
                e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
                setSliderValue(e.target.value)
              }}
              onClick={() => {
                setSliderInputFocus(true)
              }}
              onBlur={() => {
                setSliderInputFocus(false)
              }}
              value={sliderValue}
              suffix="%"
              bordered={false}
            />

            {Number(sliderValue) < 165 ? (
              <div className="input-btn-min">Higher Risk</div>
            ) : Number(sliderValue) < 200 ? (
              <div className="input-btn-middle">Medium Risk</div>
            ) : (
              <div className="input-btn-max">SAFE</div>
            )}
          </div>
        </div>
        <div
          className={[
            'collateral-slider',
            Number(sliderValue) < 165
              ? 'collateral-slider-min'
              : Number(sliderValue) < 200
              ? 'collateral-slider-middle'
              : 'collateral-slider-max',
          ].join(' ')}>
          <Slider
            max={300}
            marks={marks}
            value={Number(sliderValue)}
            onChange={(value: number) => {
              changeSlider(value.toString())
              setamountInputFocus(true)
              // setSliderInputFocus(true)
              setCollateralInputFocus(false)
            }}
            // onAfterChange={(value: number) => {
            //   Number(sliderValue) > 150?setSliderInputFocus(false):null
            // }}
            defaultValue={200}></Slider>
        </div>
      </div> */}
      <div className={collateralActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p>Receive (Estimated)</p>
          <p className="balance">
            Balance 11.012
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
                setCollateralInputFocus(true)
                setCollateralActive(true)
                setamountInputFocus(false)
              }}
              onBlur={() => {
                setCollateralActive(false)
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
      <div className="tx-fee">
        <div className="item">
          <div className="tx-fee-text">Expected Price</div>
          <div className="tx-fee-price">3,225.80 USDC</div>
        </div>
        <div className="item">
          <div className="tx-fee-text">Minimum Received</div>
          <div className="tx-fee-price">0.123456 NSDX</div>
        </div>
        {/* <div className="item">
          <div className="tx-fee-text">Tx Fee</div>
          <div className="tx-fee-price">0.001 USDC</div>
        </div> */}
      </div>
      <Button className="confirmOrder" onClick={openConfirmOrder}>Confirm Order</Button>
      
    </div>
  )
}
export default Buy
