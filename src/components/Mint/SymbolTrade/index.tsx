/** @format */

import react, {useState, useEffect} from 'react'
import '../../../style/Mint/symbolTrade.less'
import {Input, Select, Button, Slider} from 'antd'
import ConfirmOrder from '../OrderConfirm/index'
import OrderNoifcation from '../Notification/index'
import {useDispatch} from 'react-redux'
import {
  upDateCoinSelect,
  upDateMintCollateralRatio,
  upDateMintTradeAmount,
  upDateMintTradeCollateral,
} from '../../../state/mint/actions'
import useModal from '../../../hooks/useModal'
import TipsImg from '../../../img/common/tips@2x.png'
import coinImg from '../../../img/coin/USDT@2x.png'
import tencent from '../../../img/coin/tencent.png'
import USDC from '../../../img/coin/USDC@2x.png'
import warning from '../../../img/mint/warning.png'
import Notification from '../../../utils/notification'
import {useMemo} from 'react'
import React from 'react'
import {fixD} from 'utils'
import {useMintState} from 'state/mint/hooks'
type IconType = 'success' | 'info' | 'error' | 'warning'

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
const SymbolTrade = () => {
  const openNotificationWithIcon = (type: IconType) => {
    Notification({
      type,
      message: `Mint - Mint ${tradeAmount} nTENCT`,
      // description: (
      //   <div className="description-text">
      //     View on Explorer
      //     <svg className="icon" aria-hidden="true">
      //       <use xlinkHref="#icon-link"></use>
      //     </svg>
      //   </div>
      // ),
    })
    // notification[type]({
    //   message: 'Notification Title',
    //   description:
    //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    //   // duration: null,
    // })
  }

  const [openConfirmOrder] = useModal(<ConfirmOrder openNotificationWithIcon={openNotificationWithIcon}></ConfirmOrder>)
  const [openNoifcation] = useModal(<OrderNoifcation type="1" title="Mint nTENCT"></OrderNoifcation>)
  const dispatch = useDispatch()

  const [tradeAmount, setAmount] = useState('')
  const [tradeCollateral, setTradeCollateral] = useState('')
  const [sliderValue, setSliderValue] = useState('200')
  function changeSlider(value: string) {
    setSliderValue(value)
  }

  const inputRef = React.useRef<any>(null)
  const [input, setInput] = React.useState(true)

  const sharedProps = {
    style: {width: '100%'},
    defaultValue: 'Ant Design love you!',
    ref: inputRef,
  }
  const inputReftwo = React.useRef<any>(null)

  const sharedPropstwo = {
    style: {width: '100%'},
    defaultValue: 'Ant Design love you!',
    ref: inputReftwo,
  }
  // console.log(inputRef,'inputRef#')
  const [amountInputFocus, setamountInputFocus] = useState(false)
  const [collateralInputFocus, setCollateralInputFocus] = useState(false)
  const [sliderInputFocus, setSliderInputFocus] = useState(false)
  const [amountActive, setAmountActive] = useState(false)
  const [collateralActive, setCollateralActive] = useState(false)
  const [data, setData] = useState('')
  const myDate = new Date()
  function getweekday(date: any) {
    const weekArray = ['七', '一', '二', '三', '四', '五', '六']
    const week = weekArray[new Date(date).getDay()]
    return week
  }
  useEffect(() => {
    const newData = getweekday(new Date(myDate.toLocaleDateString()))
    setData(newData)
  }, [data])
  const mintState = useMintState()
  useEffect(() => {
    if (amountInputFocus) {
      const result = ((Number(tradeAmount) * mintState.mintNowPrice * Number(sliderValue)) / 100).toString()
      if (Number(result) > 0) {
        setTradeCollateral(fixD(result, 2))
        dispatch(upDateMintTradeCollateral({mintTradeCollateral: fixD(result, 2)}))
      } else {
        setTradeCollateral('')
        dispatch(upDateMintTradeCollateral({mintTradeCollateral: ''}))
      }
    }
    if (collateralInputFocus) {
      if (Number(sliderValue) > 0) {
        const amount = ((Number(tradeCollateral) / mintState.mintNowPrice / Number(sliderValue)) * 100).toString()
        if (Number(amount) > 0) {
          dispatch(upDateMintTradeAmount({mintTradeAmount: fixD(amount, 6)}))
          setAmount(fixD(amount, 6))
        } else {
          dispatch(upDateMintTradeAmount({mintTradeAmount: ''}))
          setAmount('')
        }
      }
    }
  }, [tradeAmount, tradeCollateral, sliderValue, mintState])

  const [selectCoin, setSelectCoin] = useState(mintState.mintCoinSelect)
  useEffect(() => {
    setSelectCoin(mintState.mintCoinSelect)
  }, [mintState.mintCoinSelect])

  function discText() {
    const newDate = new Date()
    const geDays = newDate.getDay()
    let dtext = true // 判断日期是否处于周末
    if (geDays > 0 && geDays < 6) {
      const dates = newDate.toLocaleDateString()
      const nowtime = newDate.getTime()
      const time930 = new Date(dates).getTime() + 9 * 60 * 60 * 1000 + 30 * 60 * 1000
      const time1130 = new Date(dates).getTime() + 11 * 60 * 60 * 1000 + 30 * 60 * 1000
      const time1300 = new Date(dates).getTime() + 13 * 60 * 60 * 1000
      const time1500 = new Date(dates).getTime() + 15 * 60 * 60 * 1000
      if ((nowtime >= time930 && nowtime <= time1130) || (nowtime >= time1300 && nowtime <= time1500)) {
        dtext = false
      }
    }
    return dtext
  }

  return (
    <div className="trade">
      <div className="trade-title">Mint nTENCT</div>
      <div className={amountActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p className="amount-text">Amount</p>
          <p className="balance">Balance 0.0</p>
        </div>
        <div className="trade-price">
          {/* <Input
            placeholder="0.0"
            value={tradeAmount}
            defaultValue=""
            bordered={false}
            onChange={e => {
              e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
              setAmount(e.target.value)
              dispatch(upDateMintTradeAmount({mintTradeAmount: e.target.value}))
              
            }}
          /> */}
          {input ? (
            <Input
              {...sharedProps}
              placeholder="0.0"
              value={tradeAmount}
              defaultValue=""
              bordered={false}
              onChange={e => {
                e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
                setAmount(e.target.value)
                dispatch(upDateMintTradeAmount({mintTradeAmount: e.target.value}))
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
          ) : (
            <Input.TextArea {...sharedProps} />
          )}
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
      <div className="collateral">
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
                dispatch(upDateMintCollateralRatio({mintCollateralRatio: e.target.value.toString()}))
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
              dispatch(upDateMintCollateralRatio({mintCollateralRatio: value.toString()}))
              // setSliderInputFocus(true)
              setCollateralInputFocus(false)
            }}
            // onAfterChange={(value: number) => {
            //   Number(sliderValue) > 150?setSliderInputFocus(false):null
            // }}
            defaultValue={200}></Slider>
        </div>
      </div>
      <div className={collateralActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p>Collateral</p>
          <p className="balance">
            Balance 0.0
            <Button disabled>MAX</Button>
          </p>
        </div>
        <div className="trade-price">
          {/* <Input
            placeholder="0.0"
            value={tradeCollateral}
            bordered={false}
            onChange={e => {
              e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
              setTradeCollateral(Number(e.target.value))
              dispatch(upDateMintTradeCollateral({mintTradeCollateral: e.target.value}))
            }}
          /> */}
          {input ? (
            <Input
              {...sharedPropstwo}
              placeholder="0.0"
              value={tradeCollateral}
              bordered={false}
              onChange={e => {
                e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
                setTradeCollateral(e.target.value)
                dispatch(upDateMintTradeCollateral({mintTradeCollateral: e.target.value}))
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
          ) : (
            <Input.TextArea {...sharedProps} />
          )}
          <div className="select-box">
            <Select
              defaultValue="USDC"
              // style={{width: 98}}
              value={selectCoin}
              bordered={false}
              onSelect={LabeledValue => {
                setSelectCoin(LabeledValue)
                dispatch(upDateCoinSelect({mintCoinSelect: LabeledValue}))
              }}
              suffixIcon={
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-Under"></use>
                </svg>
              }>
              <Option value="USDC" className="customize-option-label-item">
                <div className="customize-option-label-item">
                  <img src={USDC} alt="" />
                  <span>USDC</span>
                </div>
              </Option>
              <Option value="USDT" className="customize-option-label-item">
                <div className="customize-option-label-item">
                  <img src={coinImg} alt="" />
                  <span>USDT</span>
                </div>
              </Option>
            </Select>
          </div>
        </div>
      </div>
      {/* <div className="tx-fee">
        <div className="tx-fee-text">Tx Fee</div>
        <div className="tx-fee-price">--</div>
      </div> */}
      {data == '七' || data == '六' || discText() ? (
        <div className="available">
          <a
            href="https://www.hkex.com.hk/Services/Trading-hours-and-Severe-Weather-Arrangements/Trading-Hours/Securities-Market?"
            target="_blank"
            className="content">
            <img src={warning} alt="" />
            <span>Only available during&nbsp;</span>
            <u>market hours</u>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-link"></use>
            </svg>
          </a>
        </div>
      ) : null}
      <Button
        className="confirm-order"
        disabled={!tradeAmount || !tradeCollateral || Number(sliderValue) <= 0 || discText()}
        onClick={openConfirmOrder}>
        <span>Confirm Order</span>
      </Button>
    </div>
  )
}
export default SymbolTrade
