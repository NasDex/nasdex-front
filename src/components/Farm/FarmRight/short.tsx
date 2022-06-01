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
import { useCommonState, useProvider } from 'state/common/hooks'
import { getAllowance, getSwapPrice } from 'utils/getList'
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
import { mintAddress, restrictedCoins, USDCaddress, USDTaddress } from '../../../constants/index'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { useCustomSwapRouterContract, useSwapRouterContract } from 'constants/hooks/useContract'
import { useTranslation } from 'react-i18next'
import precision from 'utils/precision'
import Erc20Abi from 'constants/abis/erc20.json'
import { ethers } from 'ethers'
import { ShortStakingAddress } from 'constants/dist'
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
  const [show, setShow] = useState(false)
  const [tokenBamount, setTokenBamount] = useState('')
  const [expectedPrice, setExpectedPrice] = useState(0)
  const [selectCoin, setSelectCoin] = useState(props.cAssetName)
  const [swapPrice, setSwapPrice] = useState('')
  const [returned, setReturned] = useState('')
  const [minimum, setMinimum] = useState('')
  const [data, setData] = useState('')
  const myDate = new Date()
  const [selectStock, setSelectStock] = useState(props.assetName)
  const { login, logout } = useAuth()
  const { account } = useActiveWeb3React()
  const library = useProvider()
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
      setCassetAllowance("100000000000000000000000")
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
    getPrice()
  }, [selectStock, selectCoin])
  function useDebounceHook(value: any, delay: any) {
    const [debounceValue, setDebounceValue] = useState(0)
    useEffect(() => {
      const timer = setTimeout(() => setDebounceValue(value), delay)
      return () => clearTimeout(timer)
    }, [value, delay])
    return debounceValue
  }
  const debounce = useDebounceHook(tradeAmount, 300)
  useEffect(() => {
    const nAssetOraclePrice = commonState.assetBaseInfoObj[selectStock].oraclePrice 
    const cAssetOraclePrice = commonState.assetBaseInfoObj[selectCoin].oraclePrice

    const isCassetNonStablecoin = commonState.assetBaseInfoObj[selectCoin].isNoNStableCoin === undefined 
      ? false 
      : commonState.assetBaseInfoObj[selectCoin].isNoNStableCoin === 0 
        ? false
        : true
    const inputAmount = Number(debounce)
    const collateralRatio = Number(sliderValue)/100

    let collateralAmount=0
    let precise = 0

    // nAsset input change
    if (amountInputFocus) {
      setTradeCollateral('')
      collateralAmount = (isCassetNonStablecoin) 
        ? ((inputAmount * nAssetOraclePrice) / cAssetOraclePrice) * collateralRatio 
        : inputAmount * nAssetOraclePrice * collateralRatio 
      const result = collateralAmount.toString()
      precise = commonState.assetBaseInfoObj[selectCoin].fixDPrecise
      setTradeCollateral(fixD(result, precise))
    }

    // cAsset input changes
    if (collateralInputFocus) {
      const cAmountBeforeCollateral = parseFloat(tradeCollateral) / collateralRatio
      const finalOraclePrice = isCassetNonStablecoin
        ? nAssetOraclePrice / cAssetOraclePrice
        : nAssetOraclePrice
      const expectedNassetAmount = (cAmountBeforeCollateral / finalOraclePrice).toString()
      setAmount(fixD(expectedNassetAmount, commonState.assetBaseInfoObj[selectStock].fixDPrecise))
    }

    if (debounce && amountInputFocus && farmState.slippageTolerance && debounce > 0) {
      getAmountsOut(debounce)
    }
    if (debounce && collateralInputFocus && farmState.slippageTolerance && debounce > 0) {
      getAmountsOut(debounce)
    }
  }, [
    debounce,
    tradeCollateral,
    sliderValue,
    farmState,
    amountInputFocus,
    collateralInputFocus,
    commonState.assetBaseInfoObj,
    commonState.oraclePrices
  ])
  useEffect(() => {
    if (tradeAmount && tradeCollateral && farmState.slippageTolerance) {
      getAmountsOut(tradeAmount)
    }
    if (tradeAmount && tradeCollateral && farmState.slippageTolerance) {
      getAmountsOut(tradeAmount)
    }
  }, [farmState.slippageTolerance])
  function minusNum(a: any, b: any, price: any) {
    if (a && b && price) {
      let num
      if (precision.minus(Number(a), Number(b)) > 0) {
        num = precision.minus(Number(a), Number(b))
      } else {
        num = precision.minus(Number(b), Number(a))
      }
      return (fixD(Number(num) / Number(price) * 100, 2))
    }
  }
  const swapRouterContract = useSwapRouterContract()
  async function getAmountsOut(tradeAmount: any) {
    if(parseFloat(tradeAmount) > 0) {
      const parseAmount = parseUnits(tradeAmount, commonState.assetBaseInfoObj[selectStock].decimals)
      const amountsOut = await swapRouterContract.getAmountsOut(parseAmount, [
        commonState.assetBaseInfoObj[selectStock].address,
        USDCaddress
      ])
      const tokenBAmount = formatUnits(amountsOut[1], commonState.assetBaseInfoObj[selectCoin].decimals)
      setTokenBamount(fixD(tokenBAmount, commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
      setExpectedPrice(Number(fixD(tokenBAmount, commonState.assetBaseInfoObj[selectCoin].fixDPrecise) / tradeAmount))
      setamountInputFocus(false)
      setReturned(fixD(tokenBAmount, commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
      dispatch(upDateFarmReturned({ farmReturned: tokenBAmount }))
      const minimum = Number(fixD(tokenBAmount, commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
        - Number(fixD(tokenBAmount, commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
        * Number(farmState.slippageTolerance) * 0.01
      setMinimum(fixD(minimum.toString(), commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
      dispatch(upDateFarmMinimumReceived({ farmMinimumReceived: minimum.toString() }))
    }
  }

  async function getPrice() {
    let price
    const swapPrice = await getSwapPrice(
      commonState.assetBaseInfoObj[selectStock].address, 
      commonState.assetBaseInfoObj[selectCoin].address,
      commonState.assetBaseInfoObj[selectStock].decimals, 
      commonState.assetBaseInfoObj[selectStock].decimals, 
      library
    )
    if (swapPrice) {
      const token0Name = commonState.assetsNameInfo[swapPrice.token0]
      const token1Name = commonState.assetsNameInfo[swapPrice.token1]
      const reserves0 = Number(formatUnits(swapPrice.reserves[0], commonState.assetBaseInfoObj[token0Name]?.decimals))
      const reserves1 = Number(formatUnits(swapPrice.reserves[1], commonState.assetBaseInfoObj[token1Name]?.decimals))
      if (swapPrice.token0 == commonState.assetBaseInfoObj[selectStock].address) {
        price = ((reserves1 / reserves0).toString())
      } else {
        price = ((reserves0 / reserves1).toString())
      }
      setSwapPrice(price)
    }
  }

  // allowance checking
  const [cAssetAllowance, setCassetAllowance] = useState("0")
  const getTokenAllowance = useCallback(async(tokenAddress: any, decimal: string) => {
    if(account !== undefined && account !== null) {
      const contract = new ethers.Contract(tokenAddress, Erc20Abi, library)
      const allowance = await getAllowance(contract, account, mintAddress, decimal )
      setCassetAllowance(allowance.allowance)
    }
  }, [account, library])
  useEffect(() => {
    if(account !== undefined && library !== undefined && commonState.assetBaseInfoObj !== undefined) {
        const cAsset = commonState.assetBaseInfoObj[selectCoin]
        if(cAsset === undefined) {
          return
        }
        getTokenAllowance(cAsset.address, cAsset.decimals)
    }
  }, [account, library, selectCoin, commonState.assetBaseInfoObj])


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
              setCollateralInputFocus(false)
            }}
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
                  setTradeCollateral(fixD(commonState.assetBaseInfoObj[selectCoin]?.balance, commonState.assetBaseInfoObj[selectCoin].fixDPrecise))
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
              {commonState.cAssetsListInfo.filter((c: any) => !restrictedCoins.includes(c.name)).map((ele: any, index: any) => (
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
          <div className="item">
            <div className="tx-fee-text">{t('MinimumReturned')}</div>
            <div className="tx-fee-price">
              {minimum} {farmState.farmCoinSelect}
            </div>
          </div>
        ) : null}
        {tradeAmount && tradeCollateral && swapPrice ?
          <div className="item">
            <div className="tx-fee-text">{t('PriceImpact')}</div>
            {!show ? <div className="tx-fee-price">
              {
                fixD(Number(expectedPrice), commonState.assetBaseInfoObj[selectCoin]?.fixDPrecise) == 'Infinity' ||
                  fixD(Number(expectedPrice), commonState.assetBaseInfoObj[selectCoin]?.fixDPrecise) == '0'
                  ? `--` : Number(minusNum(expectedPrice, swapPrice, swapPrice)) >= 0.01 ?
                    minusNum(expectedPrice, swapPrice, swapPrice) : '<0.01'}%</div> : '-- %'}
          </div> : null}
      </div>
      {!show ?
        fixD(Number(expectedPrice), commonState.assetBaseInfoObj[selectCoin]?.fixDPrecise) == 'Infinity' ||
          fixD(Number(expectedPrice), commonState.assetBaseInfoObj[selectCoin]?.fixDPrecise) == '0' ?
          null : minusNum(expectedPrice, swapPrice, swapPrice) && Number(minusNum(expectedPrice, swapPrice, swapPrice)) > 20 ?
            <div className="available">
              <div className="content">
                <img src={warning} alt="" />
                <span>{t('highPriceImpact')}</span>
              </div>
            </div> : null : null}
      <div className="tips-available">
        <div className="content">
          <img src={waringPng} alt="" />
          <span>USDC {t('ruturnTips')}</span>
        </div>
      </div>
      {
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
      ) : parseFloat(cAssetAllowance) > 0 ? (
        <Button
          disabled={
            restrictedCoins.includes(selectCoin) ||
            Number(tradeCollateral) > Number(commonState.assetBaseInfoObj[selectCoin]?.balance) ||
              !Number(tradeAmount) ||
              !Number(tradeCollateral) ||
              Number(sliderValue) < Number(minCollateral) ||
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
          onClick={() => handleApprove()}>
          <span>{t('Approve')}</span>
        </Button>
      )}
    </div>
  )
}
export default Short
