/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import react, { useState, useEffect, useCallback } from 'react'
import '../../../style/Manage/addCollateral.less'
import { Input, Select, Button, Slider, Skeleton } from 'antd'
import TipsImg from '../../../img/common/tips@2x.png'
import zhanweifu from '../../../img/common/zhanweifu.png'
import warning from '../../../img/mint/warning.png'
import { fixD } from 'utils'
import { formatUnits } from 'ethers/lib/utils'
import { useActiveWeb3React } from 'hooks'
import { useWalletModal } from 'components/WalletModal'
import { useSwapRouterContract } from 'constants/hooks/useContract'
import useAuth from 'hooks/useAuth'
import {
  upDateManageTradeCollateral,
  upDateManageCollateralRatio,
  upDateManageTradeAmount,
  upDateAssetAmount,
} from '../../../state/manage/actions'
import { upDateFarmMinimumReceived, upDateFarmReturned } from '../../../state/farm/actions'
import { useManageState } from 'state/manage/hooks'
import { useCommonState, useProvider } from 'state/common/hooks'
import { getAllowance, getOraclePrice, getSwapPrice } from 'utils/getList'
import { useFarmState } from 'state/farm/hooks'
import { useDispatch } from 'react-redux'
import useModal from 'hooks/useModal'
import useApproveFarm from '../../common/approve/index'
import { useErc20Contract } from 'constants/hooks/useContract'
import { mintAddress, nAssetAddress, nonStablecoinCAsset, restrictedCoins, USDCaddress } from '../../../constants/index'
import ConfirmOrder from '../OrderConfirm/index'
import Notification from '../../../utils/notification'
import { LowerRatio } from 'utils/commonComponents'
import precision from 'utils/precision'
const { Option } = Select
type IconType = 'success' | 'info' | 'error' | 'warning'
import { useTranslation } from 'react-i18next'
import { parseUnits } from 'ethers/lib/utils'
import { ethers } from 'ethers'
import Erc20Abi from 'constants/abis/erc20.json'
const AddCollateral: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const manageState = useManageState()
  const commonState = useCommonState()
  const farmState = useFarmState()
  const swapRouterContract = useSwapRouterContract()
  const { positionInfo } = props
  const [editConfirm, setEditConfirm] = useState(false)
  const [editConfirmBtn, setEditConfirmBtn] = useState(false)
  const dispatch = useDispatch()
  const [tradeAmount, setAmount] = useState('')
  const [tradeCollateral, setTradeCollateral] = useState('')
  const [amountInputFocus, setamountInputFocus] = useState(true)
  const [collateralInputFocus, setCollateralInputFocus] = useState(false)
  const { assetTokenName, cAssetTokenName, cRatio } = positionInfo
  const [sliderInputFocus, setSliderInputFocus] = useState(false)
  const [amountActive, setAmountActive] = useState(false)
  const [collateralActive, setCollateralActive] = useState(false)
  const { login, logout } = useAuth()
  const { account } = useActiveWeb3React()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const [selectCoin, setSelectCoin] = useState(manageState.manageCoinSelect)
  const [minimum, setMinimum] = useState('--')
  const [returned, setReturned] = useState('')
  const [data, setData] = useState('')
  const myDate = new Date()
  const marksMock: any = {}
  const minCollateral = Number(commonState.assetBaseInfoObj[assetTokenName]?.minCollateral)
  const red = Number(commonState.assetBaseInfoObj[assetTokenName]?.minCollateral) + 15
  const orange = Number(commonState.assetBaseInfoObj[assetTokenName]?.minCollateral) + 30
  const safe = Number(commonState.assetBaseInfoObj[assetTokenName]?.minCollateral) + 50

   // allowance checking
   const library = useProvider()
   const [assetAllowance, setAssetAllowance] = useState("0")
   const getTokenAllowance = useCallback(async (tokenAddress: any, decimal: string) => {
     if (account !== undefined && account !== null) {
       const contract = new ethers.Contract(tokenAddress, Erc20Abi, library)
       const allowance = await getAllowance(contract, account, mintAddress, decimal)
       setAssetAllowance(allowance.allowance)
     }
   }, [account, library])
   useEffect(() => {
     if (account !== undefined && library !== undefined && commonState.assetBaseInfoObj !== undefined && assetTokenName !== undefined) {
       const asset = commonState.assetBaseInfoObj[assetTokenName]
       if (asset === undefined) {
         console.log(`asset is undefined`)
         return
       }
       getTokenAllowance(asset.address, asset.decimals)
     }
   }, [account, library, selectCoin, commonState.assetBaseInfoObj, assetTokenName])


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
  const openNotificationWithIcon = (type: IconType) => {
    Notification({
      type,
      message: `${t('Mint')} - ${t('Mint')} ${tradeAmount} ${assetTokenName}`,
    })
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

  const { onApprove } = useApproveFarm(assetTokenName, mintAddress, 'mint')
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
      confirmType="editNasset"
      setEditConfirm={setEditConfirm}
      setEditConfirmBtn={setEditConfirmBtn}
    ></ConfirmOrder>,
  )
  function changeSlider(value: string) {
    setSliderValue(value)
  }
  async function handleConfirm() {
    const minReceived = await getPrice()
    dispatch(upDateManageTradeAmount({ manageTradeAmount: tradeAmount }))
    dispatch(upDateAssetAmount({ manageAssetAmount: tradeAmount }))
    dispatch(upDateManageCollateralRatio({ manageCollateralRatio: sliderValue }))
    dispatch(upDateManageTradeCollateral({ manageTradeCollateral: tradeCollateral }))
    dispatch(upDateFarmReturned({ farmReturned: returned }))
    dispatch(upDateFarmMinimumReceived({ farmMinimumReceived: minReceived.toString() }))
    openConfirmOrder()
  }
  useEffect(() => {
    setSelectCoin(manageState.manageCoinSelect)
  }, [manageState.manageCoinSelect])

  useEffect(() => {
    const newData = getweekday(new Date(myDate.toLocaleDateString()))
    setData(newData)
  }, [data])

  // Oracle Prices
  const [assetOraclePrice, setAssetOraclePrice] = useState(0)
  const [cAssetOraclePrice, setCAssetOraclePrice] = useState(0)

  useEffect(() => {
    let assetPriceInCAsset = assetOraclePrice
    if (nonStablecoinCAsset.includes(cAssetTokenName)) {
      assetPriceInCAsset = assetOraclePrice / cAssetOraclePrice
    }
    
    if (amountInputFocus) {
      if (Number(tradeAmount) > 0) {
        const result = (
          (Number(tradeCollateral) / Number(tradeAmount) / assetPriceInCAsset) *
          100
        ).toString()
        if (Number(result) > 0) {
          setSliderValue(Number(result).toFixed(0))
        } else {
          setSliderValue('')
        }
      }
    } else {
      const result = (
        (Number(tradeCollateral) / Number(sliderValue) / assetPriceInCAsset) *
        100
      ).toString()
      if (Number(result) > 0) {
        setAmount(fixD(result, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise))
      } else {
        setAmount('')
      }
    }
  }, [tradeAmount, sliderValue, cAssetOraclePrice, assetOraclePrice])

  useEffect(() => {
    async function getOraclePrices() {
      if(positionInfo.assetTokenName !== undefined) {
        const assetOraPrice = await getOraclePrice(positionInfo.assetTokenName)
        setAssetOraclePrice(assetOraPrice)
      }

      if(positionInfo.cAssetTokenName !== undefined) {
        const cAssetOraPrice = await getOraclePrice(positionInfo.cAssetTokenName)
        setCAssetOraclePrice(cAssetOraPrice)
      }
    }
    getOraclePrices()
  }, [positionInfo.assetTokenName, positionInfo.cAssetTokenName])

  function useDebounceHook(value: any, delay: any) {
    const [debounceValue, setDebounceValue] = useState(0)
    useEffect(() => {
      const timer = setTimeout(() => setDebounceValue(value), delay)
      return () => clearTimeout(timer)
    }, [value, delay])
    return debounceValue
  }
  const debounce = useDebounceHook(tradeAmount, 1000)
  useEffect(() => {
    if (tradeAmount && precision.minus(Number(tradeAmount),
      Number(fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise))) > 0) {
      getPrice()
    }
  }, [farmState.slippageTolerance, debounce])

  async function getPrice() {
    // Difference between input amount with existing position amount
    let difference = precision.minus(Number(tradeAmount),
    Number(fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise)))
    if(difference < 0) {
      difference = (-1) * difference
    }
    const parseAmount = parseUnits( difference.toString(),
      commonState.assetBaseInfoObj[assetTokenName].decimals)

    const amountsOut = await swapRouterContract.getAmountsOut(parseAmount,
      [commonState.assetBaseInfoObj[assetTokenName].address,
      USDCaddress])
    const amount = formatUnits(amountsOut[1], commonState.assetBaseInfoObj[cAssetTokenName].decimals)
    const minReceive = precision.minus(fixD(Number(amount), commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise),
      (fixD(Number(amount), commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise) * Number(farmState.slippageTolerance) * 0.01))
    // console.log(`Minimum received ${minReceive}`)
    setMinimum(minReceive.toString())
    return minReceive
  }
  useEffect(() => {
    setTradeCollateral(fixD(positionInfo.cAssetAmountSub, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise))
    setAmount(fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise))
    setSliderValue(positionInfo.cRatio)
  }, [positionInfo])

  // Temporary disable short for aUST
  const [disableButton, setDisableButton] = useState(false)
  useEffect(() => {
    // Is shorting  using aUST
    const disablingButton=  (precision.minus(Number(tradeAmount),
    Number(fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise))) > 0) && restrictedCoins.includes(cAssetTokenName)
    setDisableButton(disablingButton)
  }, [tradeAmount, positionInfo.assetAmountSub,commonState.assetBaseInfoObj[assetTokenName]])
 

  return (
    <div className="manageRight-addCollateral-container">
      <div className={collateralActive ? 'amount-active amount amountDisabled' : 'amount amountDisabled'}>
        <div className="amount-header">
          <p className="amount-text">{t('Collateral')}</p>
          <div className="balance">
            {t('Balance')}{' '}
            {account ? (
              editConfirm ? (
                <Skeleton.Input style={{ width: 100, height: 20 }} active />
              ) : (
                fixD(
                  commonState.assetBaseInfoObj[cAssetTokenName]?.balance,
                  commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise,
                )
              )
            ) : (
              '0.0'
            )}
          </div>
        </div>
        <div className="trade-price">
          {editConfirmBtn ? (
            <Skeleton.Input style={{ width: 100, height: 20 }} active />
          ) : (
            <Input
              disabled
              placeholder="0.0"
              value={tradeCollateral}
              bordered={false}
              onClick={() => {
                setCollateralInputFocus(true)
                setCollateralActive(true)
                setamountInputFocus(false)
              }}
              onBlur={() => {
                setCollateralInputFocus(false)
                setCollateralActive(false)
              }}
            />
          )}
          {cAssetTokenName ? (
            <div className="asset-box">
              <img
                alt={cAssetTokenName}
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                src={
                  cAssetTokenName
                    ? require(`../../../img/coin/${positionInfo.cAssetTokenName}.png`).default
                    : { zhanweifu }
                }
              />

              <span>{cAssetTokenName}</span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="collateral">
        <div className="collateral-ratio-header">
          <div className="collateral-title-">{t('CollateralRatio')} ({t('Current')} {positionInfo.cRatio}%)</div>
          <div
            className={
              Number(sliderValue) < Number(red)
                ? 'input-box-slide-active input-box'
                : sliderInputFocus
                  ? 'input-box-active input-box'
                  : 'input-box'
            }>
            {editConfirm ? (
              <Skeleton.Input style={{ width: 100, height: 20 }} active />
            ) : (
              <Input
                placeholder={safe.toString()}
                maxLength={3}
                defaultValue={sliderValue}
                onChange={e => {
                  setamountInputFocus(false)
                  setSliderInputFocus(true)
                  setCollateralInputFocus(false)
                  e.target.value = e.target.value.replace(/[^\d]/g, '')
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
              setamountInputFocus(false)
              setCollateralInputFocus(false)
            }}
          ></Slider>
        </div>
      </div>
      {
        precision.minus(Number(tradeAmount),
          Number(fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise))) > 0 ?
          <div className="edit-title">
            <span>{positionInfo.isShort ? t('Short') : t('Mint')}</span>
            <div>
              {editConfirm ? (
                <Skeleton.Input style={{ width: 100, height: 20 }} active />
              ) : (
                <p>
                  {precision.minus(Number(tradeAmount),
                    Number(fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise)))}{' '}
                  {positionInfo.assetTokenName}
                </p>
              )}
            </div>
          </div>
          : precision.minus(Number(tradeAmount),
            Number(fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise))) < 0 ?
            <div className="edit-title">
              <span>{t('Burn')}</span>
              <div>
                {editConfirm ? (
                  <Skeleton.Input style={{ width: 100, height: 20 }} active />
                ) : (
                  <p>
                    {precision.minus(Number(fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise)),
                      Number(tradeAmount))}{' '}
                    {positionInfo.assetTokenName}
                  </p>
                )}
              </div>
            </div> : <div className="edit-title">
              <span>{positionInfo.isShort == true ? t('Short') : t('Mint')}</span>
              <div>
                {editConfirm ? (
                  <Skeleton.Input style={{ width: 100, height: 20 }} active />
                ) : (
                  <p>
                    {0}{' '}
                    {positionInfo.assetTokenName}
                  </p>
                )}
              </div>
            </div>
      }
      <div className="arrow">
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-arrow-trade"></use>
        </svg>
      </div>
      {/** Edit */}
      <div className={amountActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p>{positionInfo.isShort == true ? `${t('Edit')}` : `${t('Edit')}`}</p>
          <div className="balance">
            {t('Balance')}{' '}
            {account ? (
              editConfirm ? (
                <Skeleton.Input style={{ width: 100, height: 20 }} active />
              ) : (
                fixD(
                  commonState.assetBaseInfoObj[assetTokenName]?.balance,
                  commonState.assetBaseInfoObj[assetTokenName].fixDPrecise,
                )
              )
            ) : (
              '0.0'
            )}
          </div>
        </div>
        <div className="trade-price">
          {editConfirmBtn ? (
            <Skeleton.Input style={{ width: 100, height: 20 }} active />
          ) : (
            <Input
              placeholder="0.0"
              value={tradeAmount}
              defaultValue=""
              bordered={false}
              onChange={e => {
                setamountInputFocus(true)
                setAmountActive(true)
                setCollateralInputFocus(false)
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
          <div className="asset-box">
            <img
              src={assetTokenName ? require(`../../../img/coin/${assetTokenName}.png`).default : { zhanweifu }}
              alt=""
            />
            <span>{assetTokenName}</span>
          </div>
        </div>
      </div>
      {Number(sliderValue) < minCollateral ? LowerRatio(t) : null}
      {Number(tradeAmount) == 0 ? (
        <div className="available">
          <div className="content">
            <img src={warning} alt="" />
            <span>{t('greaterZero')}</span>
          </div>
        </div>
      ) : null}
      {Number(positionInfo.assetAmount) - Number(tradeAmount) >
        Number(commonState.assetBaseInfoObj[assetTokenName]?.balance) ? (
        <div className="available">
          <div className="content">
            <img src={warning} alt="" />
            <span>{t('Buy')} {assetTokenName} {t('toRepay')}</span>
          </div>
        </div>
      ) : null}
      {!account ? (
        <Button className="addCollateral" onClick={() => onPresentConnectModal()}>
          {t('Connect')}
        </Button>
      ) : disableButton ?
        <Button
          disabled={true}
          className="addCollateral"
          onClick={() => handleConfirm()}>
          {t('Confirm')}
        </Button>
        : parseFloat(assetAllowance) > 0 ? (
          <Button
            disabled={
              (Number(positionInfo.assetAmount) - Number(tradeAmount) >
                Number(commonState.assetBaseInfoObj[assetTokenName]?.balance) ||
                tradeAmount ==
                fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise) ||
                Number(sliderValue) < minCollateral ||
                tradeAmount == '0' ||
                editConfirmBtn
                ? true
                : false)
            }
            className="addCollateral"
            onClick={() => handleConfirm()}>
            {t('Confirm')}
          </Button>
        ) : tradeAmount ==
          fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise) || Number(tradeAmount) == 0 ? (
          <Button
            disabled={
              Number(positionInfo.assetAmount) - Number(tradeAmount) >
                Number(commonState.assetBaseInfoObj[assetTokenName]?.balance) ||
                tradeAmount ==
                fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise) ||
                Number(sliderValue) < minCollateral ||
                tradeAmount == '0' ||
                editConfirmBtn
                ? true
                : false
            }
            className="addCollateral"
            onClick={() => handleConfirm()}>
            {t('Confirm')}
          </Button>
        ) : (
          <Button className="addCollateral" loading={requestedApproval} onClick={() => handleApprove()}>
            <span>{t('Approve')}</span>
          </Button>
        )}
      <div className="tx-fee">
        <div className="item">
          <div className="tx-fee-text">
            {positionInfo.isShort
              ? `${t('TotalShorted')} (${positionInfo.assetTokenName})`
              : `${t('TotalMinted')} (${positionInfo.assetTokenName})`}
          </div>
          <div className="tx-fee-price">{tradeAmount ? tradeAmount : '--'}</div>
        </div>
        <div className="item">
          <div className="tx-fee-text">{t('TotalCollateral')} ({cAssetTokenName})</div>
          <div className="tx-fee-price">
            {fixD(positionInfo.cAssetAmountSub, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise)}
          </div>
        </div>
        <div className="item">
          <div className="tx-fee-text">{t('NewCollateralRatio')} (CR)</div>
          <div className="tx-fee-price">{sliderValue ? sliderValue : '--'}%</div>
        </div>
        {positionInfo.isShort ? (
          <div className="item">
            <div className="tx-fee-text">{t('SlippageTolerance')}</div>
            <div className="tx-fee-price">{farmState.slippageTolerance}%</div>
          </div>
        ) : null}
        {positionInfo.isShort && precision.minus(Number(tradeAmount),
          Number(fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise))) > 0 ? (
          <div className="item">
            <div className="tx-fee-text">{t('MinimumReturned')}</div>
            <div className="tx-fee-price">
              {fixD(minimum, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise)} {farmState.farmCoinSelect}
            </div>
          </div>
        ) : null}
        {/* {tradeAmount} \n
        {positionInfo.assetAmountSub} \n
        {precision.minus(Number(tradeAmount),
          Number(fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise)))} */}
      </div>
    </div>
  )
}
export default AddCollateral
