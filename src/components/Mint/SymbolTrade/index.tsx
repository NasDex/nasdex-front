/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import react, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import '../../../style/Mint/symbolTrade.less'
import { Input, Select, Button, Slider, Skeleton } from 'antd'
import ConfirmOrder from '../OrderConfirm/index'
import { useDispatch } from 'react-redux'
import {
  upDateCoinSelect,
  upDateCoinStock,
  upDateMintCollateralRatio,
  upDateMintTradeAmount,
  upDateMintTradeCollateral,
} from '../../../state/mint/actions'
import useModal from '../../../hooks/useModal'
import TipsImg from '../../../img/common/tips@2x.png'
import warning from '../../../img/mint/warning.png'
import Notification from '../../../utils/notification'
import React from 'react'
import { fixD } from 'utils'
import { useMintState } from 'state/mint/hooks'
import { useCommonState } from 'state/common/hooks'
import { useManageState } from 'state/manage/hooks'
import useApproveFarm from '../../common/approve/index'
import { mintAddress } from '../../../constants/index'
import { useErc20Contract } from 'constants/hooks/useContract'
import { useActiveWeb3React } from 'hooks'
type IconType = 'success' | 'info' | 'error' | 'warning'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import { LowerRatio } from 'utils/commonComponents'
import Setting from '../../common/Setting'
import { number } from 'echarts'
import { useTranslation } from 'react-i18next'
const { Option } = Select
const SymbolTrade: React.FC<any> = props => {
  const openNotificationWithIcon = (type: IconType) => {
    Notification({
      type,
      message: `${t('Mint')} - ${t('Mint')} ${tradeAmount} ${selectStock}`,
    })
  }
  const { t, i18n } = useTranslation()
  const [openSetting] = useModal(<Setting from="mint"></Setting>)
  const { login, logout } = useAuth()
  const { account } = useActiveWeb3React()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const mintState = useMintState()
  const manageState = useManageState()
  const commonState = useCommonState()
  const [mintConfirm, setMintConfirm] = useState(false)
  const [mintConfirmBtn, setMintConfirmBtn] = useState(false)

  const dispatch = useDispatch()
  const [tradeAmount, setAmount] = useState('')
  const [tradeCollateral, setTradeCollateral] = useState('')
  const inputRef = React.useRef<any>(null)
  const [input, setInput] = React.useState(true)
  const [amountInputFocus, setamountInputFocus] = useState(false)
  const [collateralInputFocus, setCollateralInputFocus] = useState(false)
  const [sliderInputFocus, setSliderInputFocus] = useState(false)
  const [amountActive, setAmountActive] = useState(false)
  const [collateralActive, setCollateralActive] = useState(false)
  const [selectCoin, setSelectCoin] = useState(props.cAssetName === undefined ? commonState.defaultCAsset : 'USDC')
  const [selectStock, setSelectStock] = useState(props.assetName === undefined ? commonState.defaultAsset : 'nSE')
  const [data, setData] = useState('')
  const [minCollateral, setMinCollateral] = useState('150')
  const [red, setRed] = useState('165')
  const [orange, setOrange] = useState('180')
  const [safe, setSafe] = useState('200')
  const myDate = new Date()
  const inputReftwo = React.useRef<any>(null)
  const marksMock: any = {}

  const marks = {
    150: {
      style: {
        color: '#909DB4',
        marginRight: '20px',
      },
      label: (
        <strong>
          {t('Min')} {minCollateral}% <img className="tips-img" src={TipsImg} alt="" />
          <div className="tips-texts">
            {t('minCollateralTips')}
          </div>
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
  const [assetsBalance, setAssetsBalance] = useState('0')
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

  const [openConfirmOrder] = useModal(
    <ConfirmOrder
      openNotificationWithIcon={openNotificationWithIcon}
      setMintConfirm={setMintConfirm}
      setMintConfirmBtn={setMintConfirmBtn}
      setTradeCollateral={setTradeCollateral}
      setAmount={setTradeCollateral}
      setSliderValue={setSliderValue}
      safe={safe}
    ></ConfirmOrder>)
  function handleConfirm() {
    dispatch(upDateMintTradeAmount({ mintTradeAmount: tradeAmount }))
    dispatch(upDateMintCollateralRatio({ mintCollateralRatio: sliderValue }))
    dispatch(upDateMintTradeCollateral({ mintTradeCollateral: tradeCollateral }))
    dispatch(upDateCoinStock({ mintCoinStock: selectStock }))
    dispatch(upDateCoinSelect({ mintCoinSelect: selectCoin }))
    openConfirmOrder()
  }

  useEffect(() => {
    const newData = getweekday(new Date(myDate.toLocaleDateString()))
    setData(newData)
  }, [data])

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
  }, [
    tradeAmount,
    tradeCollateral,
    sliderValue,
    mintState,
    amountInputFocus,
    collateralInputFocus,
    commonState.assetBaseInfoObj,
  ])

  useEffect(() => {
    function setAttribute(assetType: string, assetName: string) {
      if(assetType === 'asset') {
        setSelectStock(assetName)
        dispatch(upDateCoinStock({ mintCoinStock: assetName }))
      } else {
        setSelectCoin(props.assetName)
        dispatch(upDateCoinSelect({ mintCoinSelect: assetName }))
      }
    }

    console.log(`Props ${props.assetName}, ${props.cAssetName}`)
    if (props.assetName  === undefined) {
      dispatch(upDateCoinStock({ mintCoinStock: commonState.defaultAsset }))
    } else {
      const assetType = commonState.assetBaseInfoObj[props.assetName].type
      setAttribute(assetType, props.assetName)
    }

    if (props.cAssetName === undefined) {
      dispatch(upDateCoinSelect({ mintCoinSelect: commonState.defaultCAsset }))
    } else {
      const assetType = commonState.assetBaseInfoObj[props.cAssetName].type
      setAttribute(assetType, props.cAssetName)
    }
  }, [])

  useEffect(() => {
    if (commonState.assetBaseInfoObj[selectCoin].balance) {
      setAssetsBalance(commonState.assetBaseInfoObj[selectCoin].balance)
    }
    if (mintState.mintCoinSelect) {
      setSelectCoin(mintState.mintCoinSelect)
    }
    if (mintState.mintCoinStock) {
      setSelectStock(mintState.mintCoinStock)
    }
  }, [mintState.mintCoinStock, mintState.mintCoinSelect, commonState.assetBaseInfoObj[selectCoin].balance])

  useEffect(() => {
    if (selectStock) {
      const minCollateral = Number(commonState.assetBaseInfoObj[selectStock]?.minCollateral)
      const red = Number(commonState.assetBaseInfoObj[selectStock]?.minCollateral) + 15
      const orange = Number(commonState.assetBaseInfoObj[selectStock]?.minCollateral) + 30
      const safe = Number(commonState.assetBaseInfoObj[selectStock]?.minCollateral) + 50
      setMinCollateral(minCollateral.toString())
      setRed(red.toString())
      setOrange(orange.toString())
      setSafe(safe.toString())
      setSliderValue(safe.toString())
    }
  }, [commonState.assetBaseInfoObj, selectStock])
  useEffect(() => {
    if (!mintConfirmBtn) {
      setTradeCollateral('')
      setAmount('')
      setSliderValue(safe.toString())
    }
  }, [mintConfirmBtn])

  return (
    <div className="trade">
      <div className="trade-title">
        <span className="title">{t('Mint')} {selectStock}</span>
      </div>
      <div className={amountActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p className="amount-text">{t('Amount')}</p>
          <div className="balance">
            {t('Balance')}&nbsp;
            {account ? (
              mintConfirm ? (
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
          </div>
        </div>
        <div className="trade-price">
          {mintConfirmBtn ? (
            <Skeleton.Input style={{ width: 100, height: 20 }} active />
          ) : (
            <Input
              placeholder="0.0"
              value={tradeAmount}
              defaultValue=""
              bordered={false}
              onChange={e => {
                setCollateralInputFocus(false)
                setamountInputFocus(true)
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
              onSelect={LabeledValue => {
                setSelectStock(LabeledValue)
                dispatch(upDateCoinStock({ mintCoinStock: LabeledValue }))
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
            {mintConfirmBtn ? (
              <Skeleton.Input style={{ width: 100, height: 20 }} active />
            ) : (
              <Input
                placeholder={safe.toString()}
                maxLength={3}
                defaultValue={sliderValue}
                onChange={e => {
                  setamountInputFocus(true)
                  setCollateralInputFocus(false)
                  setSliderInputFocus(true)
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
              setCollateralInputFocus(false)
            }}
            defaultValue={Number(safe)}></Slider>
        </div>
      </div>
      <div className={collateralActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p>{t('Collateral')}</p>
          <div className="balance">
            {t('Balance')}&nbsp;
            {account ? (
              mintConfirm ? (
                <Skeleton.Input style={{ width: 100, height: 20 }} active />
              ) : (
                fixD(assetsBalance, commonState.assetBaseInfoObj[selectCoin].fixDPrecise)
              )
            ) : (
              '0.0'
            )}
            {Number(assetsBalance) <= 0 ? null : (
              <Button
                disabled={Number(assetsBalance) > 0 && account ? false : true}
                onClick={() => {
                  setCollateralInputFocus(true)
                  setamountInputFocus(false)
                  setTradeCollateral(assetsBalance)
                }}>
                {t('MAX')}
              </Button>
            )}
          </div>
        </div>
        <div className="trade-price">
          {mintConfirmBtn ? (
            <Skeleton.Input style={{ width: 100, height: 20 }} active />
          ) : (
            <Input
              placeholder="0.0"
              value={tradeCollateral}
              bordered={false}
              onChange={e => {
                setCollateralInputFocus(true)
                setamountInputFocus(false)
                setCollateralActive(true)
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,4})?.*$/, '$1')
                setTradeCollateral(e.target.value)
              }}
              onClick={() => {
                setCollateralActive(true)
              }}
              onBlur={() => {
                setCollateralActive(false)
                setCollateralInputFocus(false)
              }}
            />
          )}
          <div className="select-box">
            <Select
              defaultValue={selectCoin}
              value={selectCoin}
              bordered={false}
              onSelect={LabeledValue => {
                setSelectCoin(LabeledValue)
                dispatch(upDateCoinSelect({ mintCoinSelect: LabeledValue }))
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
      {
        Number(sliderValue) < Number(minCollateral) ? LowerRatio(t) : null
      }
      {!account ? (
        <Button className="confirm-order" onClick={() => onPresentConnectModal()}>
          {t('Connect')}
        </Button>
      ) : commonState.assetBaseInfoObj[selectCoin]?.mintContractAllowance ?
        Number(tradeCollateral) > Number(assetsBalance) ? (
          <Button disabled className="confirm-order">
            {t('Insufficient')}
          </Button>
        ) : (
          <Button
            disabled={
              !Number(tradeAmount) ||
                !Number(tradeCollateral) ||
                Number(sliderValue) < Number(minCollateral) ||
                mintConfirmBtn
                ? true
                : false
            }
            className="confirm-order"
            onClick={() => handleConfirm()}>
            <span>{t('ConfirmOrder')}</span>
          </Button>
        ) : (
          <Button
            className="confirm-order"
            loading={requestedApproval}
            onClick={() => handleApprove()}>
            <span>{t('Approve')}</span>
          </Button>
        )}
    </div>
  )
}
export default SymbolTrade
