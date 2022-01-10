/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import react, { useState, useEffect, useCallback } from 'react'
import '../../../style/Farm/short.less'
import { Input, Select, Button, Slider, Skeleton } from 'antd'
import TipsImg from '../../../img/common/tips@2x.png'
import warning from '../../../img/mint/warning.png'
import waringPng from '../../../img/common/waring@2x.png'
import ConfirmOrder from '../shortOrderConfirm/index'
import Notification from '../../../utils/notification'
import { useMintState } from 'state/mint/hooks'
import { useCommonState } from 'state/common/hooks'
import { getSwapPrice } from 'utils/getList'
type IconType = 'success' | 'info' | 'error' | 'warning'
import useModal from '../../../hooks/useModal'
import { fixD } from 'utils'
import {
  upDateFarmCoinSelect,
  upDateFarmCollateralRatio,
  upDateFarmTradeAmount,
  upDateFarmTradeCollateral,
  upDateCoinStock,
  upDateFarmMinimumReceived,
  upDateFarmReturned,
} from '../../../state/farm/actions'
import { useFarmState } from 'state/farm/hooks'
import { useDispatch } from 'react-redux'
import { useActiveWeb3React } from 'hooks'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import useApproveFarm from '../../common/approve/index'
import { LowerRatio } from 'utils/commonComponents'
import { mintAddress, USDTaddress } from '../../../constants/index'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { useSwapRouterContract } from 'constants/hooks/useContract'
import { useTranslation } from 'react-i18next'
const { Option } = Select
const Short: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const farmState = useFarmState()
  const mintState = useMintState()
  const commonState = useCommonState()
  const [tradeAmount, setAmount] = useState('')
  const [tradeCollateral, setTradeCollateral] = useState('')
  const [shortConfirm, setShortConfirm] = useState(false)
  const [shortConfirmBtn, setShortConfirmBtn] = useState(false)
  const [amountInputFocus, setamountInputFocus] = useState(false)
  const [collateralInputFocus, setCollateralInputFocus] = useState(false)
  const [sliderInputFocus, setSliderInputFocus] = useState(false)
  const [amountActive, setAmountActive] = useState(false)
  const [collateralActive, setCollateralActive] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [selectCoin, setSelectCoin] = useState(props.cAssetName)
  const [swapPrice, setSwapPrice] = useState('')
  const [returned, setReturned] = useState('')
  const [minimum, setMinimum] = useState('')
  const [data, setData] = useState('')
  const myDate = new Date()
  const [selectStock, setSelectStock] = useState(props.assetName)
  const { login, logout } = useAuth()
  const { account } = useActiveWeb3React()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const openNotificationWithIcon = (type: IconType) => {
    Notification({
      type,
      message: type == 'error' ? `${t('ShortFarm')} ${type}` : `${t('ShortFarm')} - ${t('Shorted')} ${tradeAmount} ${selectStock}`,
    })
  }

  const marksMock: any = {}
  const minCollateral = Number(commonState.assetBaseInfoObj[selectStock].minCollateral)
  const red = Number(commonState.assetBaseInfoObj[selectStock].minCollateral) + 15
  const orange = Number(commonState.assetBaseInfoObj[selectStock].minCollateral) + 30
  const safe = Number(commonState.assetBaseInfoObj[selectStock].minCollateral) + 50
  const marks = {
    150: {
      style: {
        color: '#909DB4',
        marginRight: '20px',
      },
      label: (
        <strong>
          {t('Min')} {minCollateral}% <img className="tips-img" src={TipsImg} alt="" />{' '}
          <div className="tips-texts">
            {t('minCollateralTips')}
          </div>{' '}
        </strong>
      ),
    },
    200: {
      style: {
        color: '#909DB4',
      },
      label: <strong>{t('Safe')} {safe}%</strong>,
    },
  }
  marksMock[minCollateral] = marks[150]
  marksMock[safe] = marks[200]
  const [sliderValue, setSliderValue] = useState(safe.toString())
  const { onApprove } = useApproveFarm(selectCoin, mintAddress, 'mint')
  const [requestedApproval, setRequestedApproval] = useState(false)
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, account])

  const [openConfirmOrder] = useModal(
    <ConfirmOrder
      openNotificationWithIcon={openNotificationWithIcon}
      setShortConfirmBtn={setShortConfirmBtn}
      setShortConfirm={setShortConfirm}
    ></ConfirmOrder>)
  function changeSlider(value: string) {
    setSliderValue(value)
  }
  function getweekday(date: any) {
    const weekArray = ['七', '一', '二', '三', '四', '五', '六']
    const week = weekArray[new Date(date).getDay()]
    return week
  }
  function discText() {
    const newDate = new Date()
    const geDays = newDate.getDay()
    let dtext = true
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
  function handleConfirm() {
    dispatch(upDateFarmTradeAmount({ farmTradeAmount: tradeAmount }))
    dispatch(upDateFarmCollateralRatio({ farmCollateralRatio: sliderValue }))
    dispatch(upDateFarmTradeCollateral({ farmTradeCollateral: tradeCollateral }))
    dispatch(upDateCoinStock({ farmCoinStock: selectStock }))
    dispatch(upDateFarmCoinSelect({ farmCoinSelect: selectCoin }))
    openConfirmOrder()
  }
  useEffect(() => {
    if (farmState.farmCoinSelect) {
      setSelectCoin(farmState.farmCoinSelect)
    }
    if (farmState.farmCoinStock) {
      setSelectStock(farmState.farmCoinStock)
    }
  }, [farmState.farmCoinSelect, farmState.farmCoinStock, commonState.assetBaseInfoObj[selectCoin].balance])
  useEffect(() => {
    if (!shortConfirmBtn) {
      setAmount('')
      setTradeCollateral('')
      setSliderValue(safe.toString())
    }
  }, [shortConfirmBtn])
  useEffect(() => {
    const newData = getweekday(new Date(myDate.toLocaleDateString()))
    setData(newData)
    if (shortConfirm) {
      setOpenConfirm(true)
    }
    if (!shortConfirm) {
      setOpenConfirm(false)
    }
  }, [shortConfirm, data])
  useEffect(() => {
    setAmount('')
    setTradeCollateral('')
  }, [selectStock, selectCoin])
  useEffect(() => {
    if (amountInputFocus) {
      setTradeCollateral('')
      const result = (
        (Number(tradeAmount) * commonState.assetBaseInfoObj[selectStock].oraclePrice * Number(sliderValue)) /
        100
      ).toString()
      if (Number(result) > 0) {
        setTradeCollateral(fixD(result, commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
      } else {
        setTradeCollateral('')
      }
    }
    if (collateralInputFocus) {
      if (Number(sliderValue) > 0) {
        setAmount('')
        const amount = (
          (Number(tradeCollateral) / commonState.assetBaseInfoObj[selectStock].oraclePrice / Number(sliderValue)) *
          100
        ).toString()
        if (Number(amount) > 0) {
          setAmount(fixD(amount, commonState.assetBaseInfoObj[selectStock].fixDPrecise))
        } else {
          setAmount('')
        }
      }
    }
    // if (tradeCollateral) {
    //   getPrice()
    // }
    if (tradeAmount && amountInputFocus) {
      getAmountsOut()
    }
    if (tradeAmount && collateralInputFocus) {
      // console.log(tradeAmount, 'tradeAmoun11')
      getAmountsIn(tradeAmount)
    }
  }, [
    tradeAmount,
    tradeCollateral,
    sliderValue,
    farmState,
    amountInputFocus,
    collateralInputFocus,
    commonState.assetBaseInfoObj,
  ])
  const swapRouterContract = useSwapRouterContract()
  async function getAmountsOut() {
    const parseAmount = parseUnits(tradeAmount, commonState.assetBaseInfoObj[selectStock].decimals)
    const amountsOut = await swapRouterContract.getAmountsOut(parseAmount, [
      commonState.assetBaseInfoObj[selectStock].address,
      commonState.assetBaseInfoObj[selectCoin].address,
    ])
    const tokenBAmount = formatUnits(amountsOut[1], commonState.assetBaseInfoObj[selectCoin].decimals)
    setamountInputFocus(false)
    setReturned(fixD(tokenBAmount, commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
    dispatch(upDateFarmReturned({ farmReturned: tokenBAmount }))
    const minimum = Number(tokenBAmount) - Number(tokenBAmount) * Number(farmState.slippageTolerance) * 0.01
    setMinimum(fixD(minimum.toString(), commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
    dispatch(upDateFarmMinimumReceived({ farmMinimumReceived: minimum.toString() }))
  }

  async function getAmountsIn(tradeAmount: any) {
    const parseAmount = parseUnits(tradeAmount, commonState.assetBaseInfoObj[selectStock].decimals)
    const amountsOut = await swapRouterContract.getAmountsOut(parseAmount, [
      commonState.assetBaseInfoObj[selectStock].address,
      commonState.assetBaseInfoObj[selectCoin].address,
    ])
    const tokenBAmount = formatUnits(amountsOut[1], commonState.assetBaseInfoObj[selectCoin].decimals)
    setCollateralInputFocus(false)
    setReturned(fixD(tokenBAmount, commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
    dispatch(upDateFarmReturned({ farmReturned: tokenBAmount }))
    const minimum = Number(tokenBAmount) - Number(tokenBAmount) * Number(farmState.slippageTolerance) * 0.01
    setMinimum(fixD(minimum.toString(), commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
    dispatch(upDateFarmMinimumReceived({ farmMinimumReceived: minimum.toString() }))
  }

  // async function getPrice() {
  //   let price
  //   const swapPrice = await getSwapPrice(commonState.assetBaseInfoObj[selectStock].address, commonState.assetBaseInfoObj[selectCoin].address)
  //   if (swapPrice) {
  //     const token0Name = commonState.assetsNameInfo[swapPrice.token0]
  //     const token1Name = commonState.assetsNameInfo[swapPrice.token1]
  //     const reserves0 = Number(formatUnits(swapPrice.reserves[0], commonState.assetBaseInfoObj[token0Name].decimals))
  //     const reserves1 = Number(formatUnits(swapPrice.reserves[1], commonState.assetBaseInfoObj[token1Name].decimals))
  //     if (swapPrice.token0 == commonState.assetBaseInfoObj[selectStock].address) {
  //       price = ((reserves1 / reserves0).toString())
  //     } else {
  //       price = ((reserves0 / reserves1).toString())
  //     }
  //     setSwapPrice(price)
  //     const result = (Number(tradeAmount) * Number(price)).toString()
  //     setReturned(fixD(result, commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
  //     dispatch(upDateFarmReturned({ farmReturned: result }))
  //     const minimum = Number(result) - Number(result) * Number(farmState.slippageTolerance) * 0.01
  //     setMinimum(fixD(minimum.toString(), commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
  //     dispatch(upDateFarmMinimumReceived({ farmMinimumReceived: minimum.toString() }))
  //   }
  // }
  return (
    <div className="short-container">
      <div className="short-desc"> {t('shortDesc')} </div>
      <div className={amountActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p className="amount-text">{t('Amount')}</p>
          <div className="balance">
            {t('Balance')}&nbsp;
            {account ? (
              openConfirm ? (
                <Skeleton.Input style={{ width: 100, height: 20 }} active />
              ) : (
                fixD(
                  commonState.assetBaseInfoObj[selectStock]?.balance,
                  commonState.assetBaseInfoObj[selectStock].fixDPrecise,
                )
              )
            ) : (
              '0.0'
            )}
            {/* <Button disabled>MAX</Button> */}
          </div>
        </div>
        <div className="trade-price">
          {shortConfirmBtn ? (
            <Skeleton.Input style={{ width: 100, height: 20 }} active />
          ) : (
            <Input
              placeholder="0.0"
              value={tradeAmount}
              defaultValue=""
              bordered={false}
              onChange={e => {
                setamountInputFocus(true)
                setCollateralInputFocus(false)
                setAmountActive(true)
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,6})?.*$/, '$1')
                setAmount(e.target.value)
              }}
              onClick={() => {
                setAmountActive(true)
              }}
              onBlur={() => {
                setAmountActive(false)
                setamountInputFocus(false)
              }}
            />
          )}
          <div className="select-box">
            <Select
              defaultValue={selectStock}
              value={selectStock}
              // style={{width: 98}}
              onSelect={LabeledValue => {
                setSelectStock(LabeledValue)
                dispatch(upDateCoinStock({ farmCoinStock: LabeledValue }))
              }}
              bordered={false}
              suffixIcon={
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-Under"></use>
                </svg>
              }>
              {commonState.assetsListInfo.map((ele: any, index: any) => (
                <Option value={ele.name} className="customize-option-label-item" key={index}>
                  <div className="customize-option-label-item">
                    <img src={require(`../../../img/coin/${ele.name}.png`).default} alt="" />
                    <span>{ele.name}</span>
                  </div>
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="collateral">
        <div className="collateral-ratio-header">
          <div className="collateral-title-">{t('CollateralRatio')}</div>
          <div
            className={
              Number(sliderValue) < Number(red)
                ? 'input-box-slide-active input-box'
                : sliderInputFocus
                  ? 'input-box-active input-box'
                  : 'input-box'
            }>
            {shortConfirmBtn ? (
              <Skeleton.Input style={{ width: 100, height: 20 }} active />
            ) : (
              <Input
                placeholder={safe.toString()}
                maxLength={3}
                defaultValue={sliderValue}
                onChange={e => {
                  setamountInputFocus(true)
                  setSliderInputFocus(true)
                  setCollateralInputFocus(false)
                  e.target.value = e.target.value.replace(/[^\d]/g, '')
                  setSliderValue(e.target.value)
                }}
                onClick={() => {
                  setSliderInputFocus(true)
                }}
                onBlur={() => {
                  setamountInputFocus(false)
                  setSliderInputFocus(false)
                }}
                value={sliderValue}
                suffix="%"
                bordered={false}
              />
            )}
            {Number(sliderValue) < Number(red) ? (
              <div className="input-btn-min">{t('HigherRisk')}</div>
            ) : Number(sliderValue) < Number(safe) ? (
              <div className="input-btn-middle">{t('MediumRisk')}</div>
            ) : (
              <div className="input-btn-max">{t('Safe')}</div>
            )}
          </div>
        </div>
        <div
          className={[
            'collateral-slider',
            Number(sliderValue) < Number(red)
              ? 'collateral-slider-min'
              : Number(sliderValue) < Number(orange)
                ? 'collateral-slider-middle'
                : 'collateral-slider-max',
          ].join(' ')}>
          <Slider
            max={300}
            marks={marksMock}
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
            defaultValue={safe}></Slider>
        </div>
      </div>
      <div className={collateralActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p>{t('Collateral')}</p>
          <div className="balance">
            {t('Balance')}&nbsp;
            {account ? (
              openConfirm ? (
                <Skeleton.Input style={{ width: 100, height: 20 }} active />
              ) : (
                fixD(
                  commonState.assetBaseInfoObj[selectCoin]?.balance,
                  commonState.assetBaseInfoObj[selectCoin].fixDPrecise,
                )
              )
            ) : (
              '0.0'
            )}
            {Number(commonState.assetBaseInfoObj[selectCoin]?.balance) <= 0 ? null : (
              <Button
                disabled={
                  !account ? true : Number(commonState.assetBaseInfoObj[selectCoin]?.balance) > 0 ? false : true
                }
                onClick={() => {
                  setCollateralInputFocus(true)
                  setamountInputFocus(false)
                  setTradeCollateral(commonState.assetBaseInfoObj[selectCoin]?.balance)
                }}>
                {t('MAX')}
              </Button>
            )}
          </div>
        </div>
        <div className="trade-price">
          {shortConfirmBtn ? (
            <Skeleton.Input style={{ width: 100, height: 20 }} active />
          ) : (
            <Input
              placeholder="0.0"
              value={tradeCollateral}
              bordered={false}
              onChange={e => {
                setamountInputFocus(false)
                setCollateralInputFocus(true)
                setCollateralActive(true)
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,4})?.*$/, '$1')
                setTradeCollateral(e.target.value)
              }}
              onClick={() => {
                setCollateralActive(true)
              }}
              onBlur={() => {
                setCollateralInputFocus(false)
                setCollateralActive(false)
              }}
            />
          )}
          <div className="select-box">
            <Select
              defaultValue={selectCoin}
              // style={{width: 98}}
              value={selectCoin}
              bordered={false}
              onSelect={LabeledValue => {
                setSelectCoin(LabeledValue)
                dispatch(upDateFarmCoinSelect({ farmCoinSelect: LabeledValue }))
              }}
              suffixIcon={
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-Under"></use>
                </svg>
              }>
              {commonState.cAssetsListInfo.map((ele: any, index: any) => (
                <Option value={ele.name} className="customize-option-label-item" key={index}>
                  <div className="customize-option-label-item">
                    <img src={require(`../../../img/coin/${ele.name}.png`).default} alt="" />
                    <span>{ele.name}</span>
                  </div>
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="tx-fee">
        <div className="item">
          <div className="tx-fee-text">{t('SlippageTolerance')}</div>
          <div className="tx-fee-price">{farmState.slippageTolerance}%</div>
        </div>
        {returned && minimum && tradeAmount && tradeCollateral ? (
          <div>
            <div className="item">
              <div className="tx-fee-text">{t('Returned')}</div>
              <div className="tx-fee-price">
                {returned} {farmState.farmCoinSelect}
              </div>
            </div>
            <div className="item">
              <div className="tx-fee-text">{t('MinimumReceived')}</div>
              <div className="tx-fee-price">
                {minimum} {farmState.farmCoinSelect}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {/* {Number(tradeCollateral) && (Number(tradeCollateral) < 50) ? (
        <div className="available">
          <a href="" target="_blank" className="content">
            <img src={warning} alt="" />
            <span>The collateral amount cannot be lower than $50.</span>
          </a>
        </div>
      ) : null} */}
      <div className="tips-available">
        <div className="content">
          <img src={waringPng} alt="" />
          <span>{farmState.farmCoinSelect} {t('ruturnTips')}</span>
        </div>
      </div>
      {
        //   selectStock !== 'nETH' ? (
        //   data == '七' || data == '六' || discText() ? (
        //     TradingTimer()
        //   ) : Number(sliderValue) < Number(minCollateral) ? (
        //     LowerRatio()
        //   ) : null
        // ) :
        Number(sliderValue) < Number(minCollateral) ? LowerRatio(t) : null
      }
      {!account ? (
        <Button className="short-farm" onClick={() => onPresentConnectModal()}>
          {t('Connect')}
        </Button>
      ) : Number(tradeCollateral) > Number(commonState.assetBaseInfoObj[selectCoin]?.balance) ? (
        <Button disabled className="short-farm">
          {t('Insufficient')}
        </Button>
      ) : commonState.assetBaseInfoObj[selectCoin]?.mintContractAllowance ? (
        <Button
          disabled={
            // data == '七' || data == '六' || discText() ||
            Number(tradeCollateral) > Number(commonState.assetBaseInfoObj[selectCoin]?.balance) ||
              !Number(tradeAmount) ||
              !Number(tradeCollateral) ||
              Number(sliderValue) < Number(minCollateral) ||
              // Number(tradeCollateral) < 50 ||
              shortConfirmBtn
              ? true
              : false
          }
          className="short-farm"
          onClick={() => handleConfirm()}>
          {t('ShortFarm')}
        </Button>
      ) : (
        <Button
          className="short-farm"
          loading={requestedApproval}
          // disabled={!tradeAmount || !tradeCollateral || Number(sliderValue) <= 0 || discText()}
          onClick={() => handleApprove()}>
          <span>{t('Approve')}</span>
        </Button>
      )}
    </div>
  )
}
export default Short
