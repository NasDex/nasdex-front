/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import react, { useState, useEffect } from 'react'
import '../../../style/Manage/withdraw.less'
import { Input, Select, Button, Slider, Skeleton } from 'antd'
import zhanweifu from '../../../img/common/zhanweifu.png'
import TipsImg from '../../../img/common/tips@2x.png'
import warning from '../../../img/mint/warning.png'
import { fixD } from 'utils'
import { useActiveWeb3React } from 'hooks'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import {
  upDateManageCollateralRatio,
  upDateManageTradeCollateral,
  upDateManageTradeAmount,
  upDateAssetAmount,
} from '../../../state/manage/actions'
import { useCommonState } from 'state/common/hooks'
import { useManageState } from 'state/manage/hooks'
import { useDispatch } from 'react-redux'
import useModal from 'hooks/useModal'
import ConfirmOrder from '../OrderConfirm/index'
import Notification from '../../../utils/notification'
import { LowerRatio } from 'utils/commonComponents'
import precision from 'utils/precision'
const { Option } = Select
import { useTranslation } from 'react-i18next'
type IconType = 'success' | 'info' | 'error' | 'warning'
const Withdraw: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const { login, logout } = useAuth()
  const { account } = useActiveWeb3React()
  const manageState = useManageState()
  const commonState = useCommonState()
  const { positionInfo } = props
  const { assetTokenName, cAssetTokenName } = positionInfo
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const [tradeAmount, setAmount] = useState('1')
  const [sliderValue, setSliderValue] = useState('')
  const [collateralConfirmBtn, setCollateralConfirmBtn] = useState(false)
  const [collateralConfirm, setCollateralConfirm] = useState(false)
  const [amountInputFocus, setamountInputFocus] = useState(false)
  const [collateralInputFocus, setCollateralInputFocus] = useState(true)
  const [amountActive, setAmountActive] = useState(false)
  const [selectCoin, setSelectCoin] = useState(manageState.manageCoinSelect)
  const [sliderInputFocus, setSliderInputFocus] = useState(false)
  const [collateralActive, setCollateralActive] = useState(false)
  const [data, setData] = useState('')
  const myDate = new Date()
  const openNotificationWithIcon = (type: IconType) => {
    Notification({
      type,
      message: `${t('Mint')} - ${t('Mint')} ${tradeAmount} ${assetTokenName}`,
    })
  }
  const marksMock: any = {}
  const minCollateral = Number(commonState.assetBaseInfoObj[assetTokenName].minCollateral)
  const red = Number(commonState.assetBaseInfoObj[assetTokenName].minCollateral) + 15
  const orange = Number(commonState.assetBaseInfoObj[assetTokenName].minCollateral) + 30
  const safe = Number(commonState.assetBaseInfoObj[assetTokenName].minCollateral) + 50
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
  const [tradeCollateral, setTradeCollateral] = useState(safe.toString())
  const [openConfirmOrder] = useModal(
    <ConfirmOrder
      openNotificationWithIcon={openNotificationWithIcon}
      confirmType="collateral"
      setCollateralConfirm={setCollateralConfirm}
      setCollateralConfirmBtn={setCollateralConfirmBtn}
    ></ConfirmOrder>,
  )

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

  function changeSlider(value: string) {
    setSliderValue(value)
  }

  function handleConfirm() {
    dispatch(upDateAssetAmount({ manageAssetAmount: tradeAmount }))
    dispatch(upDateManageTradeCollateral({ manageTradeCollateral: tradeCollateral }))
    dispatch(upDateManageCollateralRatio({ manageCollateralRatio: sliderValue }))
    dispatch(upDateManageTradeAmount({ manageTradeAmount: tradeAmount }))
    openConfirmOrder()
  }

  useEffect(() => {
    const newData = getweekday(new Date(myDate.toLocaleDateString()))
    setData(newData)
  }, [data])

  useEffect(() => {
    setSelectCoin(manageState.manageCoinSelect)
  }, [manageState.manageCoinSelect])

  // Asset oracle price
  const [assetOraclePrice, setAssetOraclePrice] = useState(0)
  useEffect(() => {
    if(commonState.oraclePrices !== undefined && positionInfo !== undefined) {
      const assetName = positionInfo.assetTokenName
     
      const assetOraPrice = commonState.oraclePrices[`${assetName}/USDC`]
      setAssetOraclePrice(assetOraPrice)
    }
  }, [commonState.oraclePrices, positionInfo])

  useEffect(() => {
    if (collateralInputFocus) {
      if (Number(tradeAmount) > 0) {
        const result = (
          (Number(tradeCollateral) / Number(tradeAmount) / assetOraclePrice) *
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
        (Number(tradeAmount) * assetOraclePrice * Number(sliderValue)) /
        100
      ).toString()
      if (Number(result) > 0) {
        setTradeCollateral(fixD(result, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise))
      } else {
        setTradeCollateral('')
      }
    }
  }, [tradeCollateral, sliderValue])
  useEffect(() => {
    setTradeCollateral(fixD(positionInfo.cAssetAmountSub, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise))
    setAmount(fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise))
    setSliderValue(positionInfo.cRatio)
  }, [positionInfo])

  return (
    <div className="manageRight-withdraw-container">
      {
        precision.minus(Number(tradeCollateral),
          Number(fixD(positionInfo.cAssetAmountSub, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise))) > 0 ?
          <div className="edit-title">
            <span>{t('AddCollateral')}</span>
            <div>
              {collateralConfirm ? (
                <Skeleton.Input style={{ width: 100, height: 20 }} active />
              ) : (
                <p>
                  {precision.minus(Number(tradeCollateral),
                    Number(fixD(positionInfo.cAssetAmountSub, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise)))}{' '}
                  {positionInfo.cAssetTokenName}
                </p>
              )}
            </div>
          </div>
          : precision.minus(Number(tradeCollateral),
            Number(fixD(positionInfo.cAssetAmountSub, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise))) < 0 ?
            <div className="edit-title">
              <span>{t('WithdrawCollateral')}</span>
              <div>
                {collateralConfirm ? (
                  <Skeleton.Input style={{ width: 100, height: 20 }} active />
                ) : (
                  <p>
                    {precision.minus(Number(fixD(positionInfo.cAssetAmountSub, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise)),
                      Number(tradeCollateral))}{' '}
                    {positionInfo.cAssetTokenName}
                  </p>
                )}
              </div>
            </div> : <div className="edit-title">
              <span>{t('Collateral')}</span>
              <div>
                {collateralConfirm ? (
                  <Skeleton.Input style={{ width: 100, height: 20 }} active />
                ) : (
                  <p>
                    {0}{' '}
                    {cAssetTokenName}
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
      <div className={collateralActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p className="amount-text">{t('Edit')}</p>
          <div className="balance">
            {t('Balance')}{' '}
            {account ? (
              collateralConfirm ? (
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
          {collateralConfirmBtn ? (
            <Skeleton.Input style={{ width: 100, height: 20 }} active />
          ) : (
            <Input
              placeholder="0.0"
              value={tradeCollateral}
              bordered={false}
              onChange={e => {
                setCollateralInputFocus(true)
                setCollateralActive(true)
                setamountInputFocus(false)
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
          <div className="asset-box">
            <img
              alt={cAssetTokenName}
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              src={
                cAssetTokenName ? require(`../../../img/coin/${positionInfo.cAssetTokenName}.png`).default : { zhanweifu }
              }
            />
            <span>{cAssetTokenName}</span>
          </div>
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
            {collateralConfirm ? (
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
              setamountInputFocus(true)
              setCollateralInputFocus(false)
            }}
            defaultValue={safe}></Slider>
        </div>
      </div>
      <div className={amountActive ? 'amount-active amount amountDisabled' : 'amount amountDisabled'}>
        <div className="amount-header">
          <p>{positionInfo.isShort == true ? t('Short') : t('Mint')}</p>
          <div className="balance">
            {t('Balance')}{' '}
            {account ? (
              collateralConfirm ? (
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
          {collateralConfirmBtn ? (
            <Skeleton.Input style={{ width: 100, height: 20 }} active />
          ) : (
            <Input
              disabled
              placeholder="0.0"
              value={tradeAmount}
              defaultValue=""
              bordered={false}
              onClick={() => {
                setamountInputFocus(true)
                setAmountActive(true)
                setCollateralInputFocus(false)
              }}
              onBlur={() => {
                setAmountActive(false)
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
      {Number(tradeCollateral) == 0 ? (
        <div className="available">
          <div className="content">
            <img src={warning} alt="" />
            <span>{t('greaterZero')}</span>
          </div>
        </div>
      ) : null}
      {!account ? (
        <Button className="withdraw" onClick={() => onPresentConnectModal()}>
          {t('Connect')}
        </Button>
      ) :
        precision.minus(Number(tradeCollateral),
          Number(fixD(positionInfo.cAssetAmount, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise))) > 0
          && precision.minus(Number(tradeCollateral),
            Number(fixD(positionInfo.cAssetAmount, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise))) > Number(commonState.assetBaseInfoObj[cAssetTokenName]?.balance) ? (
          <Button disabled className="withdraw">
            {t('Insufficient')}
          </Button>
        ) : (
          <Button
            className="withdraw"
            disabled={
              tradeCollateral ==
                fixD(positionInfo.cAssetAmountSub, commonState.assetBaseInfoObj[cAssetTokenName].fixDPrecise) ||
                tradeCollateral == '0' ||
                Number(sliderValue) < minCollateral
                ? true
                : Number(sliderValue) < minCollateral || collateralConfirmBtn
                  ? true
                  : false
            }
            onClick={() => {
              handleConfirm()
            }}>
            {t('Confirm')}
          </Button>
        )}
      <div className="tx-fee">
        <div className="item">
          <div className="tx-fee-text">
            {positionInfo.isShort
              ? `${t('TotalShorted')} (${positionInfo.assetTokenName})`
              : `${t('TotalMinted')} (${positionInfo.assetTokenName})`}
          </div>
          <div className="tx-fee-price">
            {fixD(positionInfo.assetAmountSub, commonState.assetBaseInfoObj[assetTokenName].fixDPrecise)}
          </div>
        </div>
        <div className="item">
          <div className="tx-fee-text">{t('TotalCollateral')} ({cAssetTokenName})</div>
          <div className="tx-fee-price">{tradeCollateral ? tradeCollateral : '--'}</div>
        </div>
        <div className="item">
          <div className="tx-fee-text">{t('NewCollateralRatio')} (CR)</div>
          <div className="tx-fee-price">{sliderValue ? sliderValue : '--'}%</div>
        </div>
      </div>
    </div>
  )
}
export default Withdraw
