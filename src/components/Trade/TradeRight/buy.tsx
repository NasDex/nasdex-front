/* eslint-disable @typescript-eslint/no-var-requires */

import react, { useState, useEffect, useCallback, useRef } from 'react'
import '../../../style/Trade/buy.less'
import { Input, Select, Button, Skeleton } from 'antd'
import { fixD, numToWei } from 'utils'
import useModal from '../../../hooks/useModal'
import ConfirmOrder from '../buyOrderConfirm/index'
import Notification from '../../../utils/notification'
type IconType = 'success' | 'info' | 'error' | 'warning'
import { useActiveWeb3React } from 'hooks'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import { useCommonState } from 'state/common/hooks'
import { useTradeState } from 'state/trade/hooks'
import useApproveFarm from 'components/common/approve/index'
import { SwapRouterAddress } from 'constants/index'
import {
  useErc20Contract,
  useLpContract,
  useLpContractCommon,
  useSwapFactoryContract,
  useSwapRouterContract,
} from 'constants/hooks/useContract'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import iconSwapActive from '../../../img/swap/icon-swap-normal-light.png'
import iconSwapDis from '../../../img/swap/icon-swap-disabled-light.png'
import iconSwap from '../../../img/swap/icon-swap-hover-light.png'
import active from '../../../img/swap/active.png'
import { getLibrary } from 'utils/getLibrary'
import lpContractAbi from '../../../constants/abis/lpContract.json'

import { ethers } from 'ethers'
import { useHistory, useLocation, useParams } from 'react-router'
import { upDateCoinStock, upDateTradeCoinSelect } from '../../../state/trade/actions'
import { useDispatch } from 'react-redux'
import { useMintState } from 'state/mint/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
const { Option } = Select

const Buy: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const mintState = useMintState()
  const hash = mintState.hash
  const openNotificationWithIcon = (type: IconType) => {
    Notification({
      type,
      message: `${t('Swap')} ${type}`,
    })
  }
  const [amountActive, setAmountActive] = useState(false)
  const [collateralActive, setCollateralActive] = useState(false)
  const [swapConfirm, setSwapConfirm] = useState(false)
  const [swapConfirmBtn, setSwapConfirmBtn] = useState(false)
  const { login, logout } = useAuth()
  const { account } = useActiveWeb3React()
  const commonState = useCommonState()
  const tradeState = useTradeState()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const [tokenA, setTokenA] = useState(commonState.defaultAsset)
  const [tokenB, setTokenB] = useState(commonState.defaultCAsset)

  const [tokenFeeAamount, setFeeTokenAamount] = useState('')
  const [tokenFeeBamount, setFeeTokenBamount] = useState('')
  const [tokenAamount, setTokenAamount] = useState('')
  const [tokenBamount, setTokenBamount] = useState('')
  const [tokenABalance, setTokenABalance] = useState('')
  const [tokenApprove, setTokenApprove] = useState(false)
  const [isChangeTokenA, setIsChangeTokenA] = useState(false)
  const [isChangeTokenB, setIsChangeTokenB] = useState(false)
  const [isTab, setIsTab] = useState(true)
  const [isChildTab, setChildTab] = useState(true)
  const [tokenAPrice, setTokenAPrice] = useState('')
  const [tokenBPrice, setTokenBPrice] = useState('')

  const { assetBaseInfoObj } = commonState
  useEffect(() => {
    if (commonState.assetBaseInfoObj[tokenA].balance) {
      setTokenABalance(commonState.assetBaseInfoObj[tokenA].balance)
    }
    if (tokenA || commonState.assetBaseInfoObj[tokenA].swapContractAllowance) {
      setTokenA(tokenA)
      setTokenApprove(commonState.assetBaseInfoObj[tokenA].swapContractAllowance)
    }
  }, [tokenA, commonState.assetBaseInfoObj])

  const [tokenAaddress, setTokenAaddress] = useState(commonState.assetBaseInfoObj[tokenA]?.address)
  const [tokenBaddress, setTokenBaddress] = useState(commonState.assetBaseInfoObj[tokenB]?.address)

  const [pair, setPair] = useState('')
  useEffect(() => {
    if (tokenAaddress && tokenBaddress && account) {
      getPair()
    }
    if (pair) {
      getReserver(pair)
    }
  }, [tokenAaddress, tokenBaddress, account, pair])
  const swapFactoryContract = useSwapFactoryContract()

  async function getPair() {
    const result = await swapFactoryContract.getPair(tokenAaddress, tokenBaddress)
    if (Number(formatUnits(result, 18)) > 0) {
      setPair(result)
    } else {
      setPair('')
    }
  }
  const [priceTo, setPriceTo] = useState(0)
  const [priceForm, setPriceForm] = useState(0)
  const [reserves0, setReserves0] = useState(0)

  async function getReserver(result: string) {
    const provider = window.ethereum
    const library = getLibrary(provider)
    const contract = new ethers.Contract(result, lpContractAbi, library)
    const reserves = await contract.getReserves()
    const token0 = await contract.token0()
    const token1 = await contract.token1()
    const token0Name = commonState.assetsNameInfo[token0]
    const token1Name = commonState.assetsNameInfo[token1]
    const reserves0 = Number(formatUnits(reserves[0], commonState.assetBaseInfoObj[token0Name].decimals))
    const reserves1 = Number(formatUnits(reserves[1], commonState.assetBaseInfoObj[token1Name].decimals))

    if (token0 == tokenAaddress) {
      const priceTo = reserves0 / reserves1
      const priceForm = reserves1 / reserves0
      setPriceForm(priceTo)
      setPriceTo(priceForm)
    } else {
      const priceForm = reserves0 / reserves1
      const priceTo = reserves1 / reserves0
      setPriceForm(priceTo)
      setPriceTo(priceForm)
    }
    setReserves0(reserves0)

  }
  const dispatch = useDispatch()

  const { onApprove } = useApproveFarm(tokenA, SwapRouterAddress, 'swap')
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
  const [minimumReceived, setMinimumReceived] = useState('')
  const swapRouterContract = useSwapRouterContract()
  useEffect(() => {
    if (tokenBamount && isChangeTokenB) {
      getAmountsIn()
    }
    if (tokenAamount && isChangeTokenA) {
      getAmountsOut()
    }
    setTimer(false)
    setTimeout(() => {
      setTimer(true)
    }, 5000)
  }, [tokenAamount, tokenBamount, isChangeTokenA, isChangeTokenB])

  const fixDPreciseA = assetBaseInfoObj[tokenA].swapPrecise
  const fixDPreciseB = assetBaseInfoObj[tokenB].swapPrecise
  async function getAmountsOut() {
    if (tokenAamount == '' || tokenAamount == '0') {
      return false
    }
    const parseAmount = parseUnits(tokenAamount, assetBaseInfoObj[tokenA].decimals)
    const amountsOut = await swapRouterContract.getAmountsOut(parseAmount, [tokenAaddress, tokenBaddress])
    const tokenBAmount = formatUnits(amountsOut[1], assetBaseInfoObj[tokenB].decimals)
    setTokenBamount(fixD(tokenBAmount, fixDPreciseB))
  }

  async function getAmountsIn() {
    if (tokenBamount == '' || tokenBamount == '0') {
      return false
    }
    const parseAmount = parseUnits(tokenBamount, assetBaseInfoObj[tokenB].decimals)
    const amountsIn = await swapRouterContract.getAmountsIn(parseAmount, [tokenAaddress, tokenBaddress])
    const tokenBAmount = formatUnits(amountsIn[0], assetBaseInfoObj[tokenA].decimals)
    setTokenAamount(fixD(tokenBAmount, fixDPreciseA))
  }

  async function getPrice() {
    const parseAmount = parseUnits('1', assetBaseInfoObj[tokenA].decimals)
    const parseBmount = parseUnits('1', assetBaseInfoObj[tokenB].decimals)
    const amountsOut = await swapRouterContract.getAmountsOut(parseAmount, [tokenAaddress, tokenBaddress])
    const amountsIn = await swapRouterContract.getAmountsIn(parseBmount, [tokenAaddress, tokenBaddress])
    const tokenAPrice = formatUnits(amountsIn[0], assetBaseInfoObj[tokenA].decimals)
    const tokenBPrice = formatUnits(amountsOut[1], assetBaseInfoObj[tokenB].decimals)
    setTokenAPrice(tokenAPrice)
    setTokenBPrice(tokenBPrice)
  }
  useEffect(() => {
    if (account) {
      setTokenAPrice('')
      setTokenBPrice('')
      getPrice()
    }
  }, [account, tokenA, tokenB])
  const [timer, setTimer] = useState(false)

  useEffect(() => {
    let interval: any
    if (timer) {
      interval = setInterval(() => {
        if (tokenBamount && isChangeTokenB && !swapConfirmBtn) {
          getAmountsIn()
        }
        if (tokenAamount && isChangeTokenA && !swapConfirmBtn) {
          getAmountsOut()
        }
      }, 3000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timer])

  const [isModalVisible, setIsModalVisible] = useState(false)

  function tabCoin() {
    const templateTokenA = tokenA
    const templateTokenB = tokenB
    const templateTokenAPrice = tokenAPrice
    const templateTokenBPrice = tokenBPrice
    const templateTokenAamount = tokenAamount.toString()
    const templateTokenBamount = tokenBamount.toString()
    const templateTokenAaddress = tokenBaddress
    const templateTokenBaddress = tokenAaddress
    const ChangeTokenA = isChangeTokenA
    const ChangeTokenB = isChangeTokenB
    dispatch(upDateCoinStock({ tradeCoinStock: tokenB }))
    dispatch(upDateTradeCoinSelect({ tradeCoinSelect: tokenA }))
    setTokenBamount(templateTokenAamount)
    setTokenAamount(templateTokenBamount)
    setTokenA(templateTokenB)
    setTokenB(templateTokenA)
    setTokenAaddress(templateTokenAaddress)
    setTokenBaddress(templateTokenBaddress)
    setTokenAPrice(templateTokenBPrice)
    setTokenBPrice(templateTokenAPrice)
    setIsTab(!isTab)
    setIsChangeTokenA(ChangeTokenB)
    setIsChangeTokenB(ChangeTokenA)
  }
  useEffect(() => {
    if (!props.assetName) {
      dispatch(upDateCoinStock({ tradeCoinStock: commonState.defaultAsset }))
    }
    if (!props.cAssetName) {
      dispatch(upDateTradeCoinSelect({ tradeCoinSelect: commonState.defaultCAsset }))
    }
    if (props.assetName && commonState.assetBaseInfoObj[props.assetName].type == 'cAsset') {
      setIsTab(!isTab)
    }
    if (props.assetName) {
      setTokenA(props.assetName)
      setTokenAaddress(commonState.assetBaseInfoObj[props.assetName].address)
      dispatch(upDateCoinStock({ tradeCoinStock: props.assetName }))
    }
    if (props.cAssetName) {
      setTokenB(props.cAssetName)
      setTokenBaddress(commonState.assetBaseInfoObj[props.cAssetName].address)
      dispatch(upDateTradeCoinSelect({ tradeCoinSelect: props.cAssetName }))
    }
  }, [])

  useEffect(() => {
    if (!swapConfirmBtn) {
      setTokenBamount('')
      setTokenAamount('')
    }
    if (swapConfirmBtn) {
      setIsModalVisible(false)
    }
  }, [swapConfirmBtn])

  return (
    <div className="buy-container">
      {/* <div className="trade-title">Trade nAPPL</div> */}
      <div className={amountActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p className="amount-text">{t('Pay')}</p>
          <div className="balance">
            {t('Balance')} {account ? swapConfirm ? (
              <Skeleton.Input style={{ width: 100, height: 20 }} active />
            ) : ((tokenA && fixDPreciseA && commonState.assetBaseInfoObj[tokenA]?.balance ?
              (fixD(commonState.assetBaseInfoObj[tokenA]?.balance, fixDPreciseA)) : '0.0')) : '0.0'}

            {Number(commonState.assetBaseInfoObj[tokenA]?.balance) <= 0 ? null :
              <Button
                disabled={Number(commonState.assetBaseInfoObj[tokenA]?.balance) > 0 && account ? false : true}
                onClick={() => {
                  setTokenAamount(commonState.assetBaseInfoObj[tokenA]?.balance)
                  setIsChangeTokenA(true)
                  setIsChangeTokenB(false)
                }}>
                {t('MAX')}
              </Button>
            }
          </div>
        </div>
        <div className="trade-price">
          {swapConfirmBtn ? (
            <Skeleton.Input style={{ width: 100, height: 20 }} active />
          ) : (
            <Input
              placeholder="0.0"
              value={tokenAamount}
              defaultValue=""
              bordered={false}
              onChange={e => {
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,8})?.*$/, '$1')
                setTokenAamount(e.target.value)
                setIsChangeTokenA(true)
                setIsChangeTokenB(false)
                setAmountActive(true)
              }}
              onClick={() => {
                setAmountActive(true)
              }}
              onBlur={() => {
                setAmountActive(false)
              }}
            />
          )}
          <div className="select-box">
            <Select
              dropdownMatchSelectWidth={120}
              value={tokenA}
              bordered={false}
              onSelect={labeledValue => {
                setTokenA(labeledValue)
                setTokenAaddress(commonState.assetBaseInfoObj[labeledValue]?.address)
                dispatch(upDateCoinStock({ tradeCoinStock: labeledValue }))
                getPair()
                setIsChangeTokenA(true)
                setIsChangeTokenB(false)
              }}
              suffixIcon={
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-Under"></use>
                </svg>
              }>
              {commonState.allAssetsListInfo.map((ele: any, index: any) => (
                ele.name !== 'NSDX' ? <Option
                  value={ele.name}
                  disabled={ele.name == tokenB || commonState.assetBaseInfoObj[ele.name].type == commonState.assetBaseInfoObj[tokenB].type}
                  className="customize-option-label-item"
                  key={index}>
                  <div className="customize-option-label-item">
                    <img src={require(`../../../img/coin/${ele.name}.png`).default} alt="" />
                    <span>{ele.name}</span>
                  </div>
                </Option> : null

              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="tab-coin">
        <img
          onClick={() => {
            tabCoin()
          }}
          src={iconSwapActive}
          alt=""
        />
      </div>
      <div className={collateralActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p>{t('newReceive')} ({t('Estimated')})</p>
          <div className="balance">{t('Balance')} {account ?
            swapConfirm ? (
              <Skeleton.Input style={{ width: 100, height: 20 }} active />
            ) : ((tokenB && fixDPreciseB && commonState.assetBaseInfoObj[tokenB]?.balance ?
              fixD(commonState.assetBaseInfoObj[tokenB]?.balance, fixDPreciseB) : '0.0')) : '0.0'}</div>
        </div>
        <div className="trade-price">
          {swapConfirmBtn ? (
            <Skeleton.Input style={{ width: 100, height: 20 }} active />
          ) : (
            <Input
              placeholder="0.0"
              value={tokenBamount}
              defaultValue=""
              bordered={false}
              onChange={e => {
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,6})?.*$/, '$1')
                setTokenBamount(e.target.value)
                setIsChangeTokenA(false)
                setIsChangeTokenB(true)
                setCollateralActive(true)
              }}
              onClick={() => {
                setCollateralActive(true)
              }}
              onBlur={() => {
                setCollateralActive(false)
              }}
            />
          )}
          <div className="select-box">
            <Select
              value={tokenB}
              bordered={false}
              dropdownMatchSelectWidth={120}
              onSelect={labeledValue => {
                setTokenB(labeledValue)
                setTokenBaddress(commonState.assetBaseInfoObj[labeledValue]?.address)
                dispatch(upDateTradeCoinSelect({ tradeCoinSelect: labeledValue }))
                getPair()
                setIsChangeTokenA(false)
                setIsChangeTokenB(true)
              }}
              suffixIcon={
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-Under"></use>
                </svg>
              }>
              {commonState.allAssetsListInfo.map((ele: any, index: any) => (
                ele.name !== 'NSDX' ? <Option
                  value={ele.name}
                  disabled={ele.name == tokenA || commonState.assetBaseInfoObj[ele.name].type == commonState.assetBaseInfoObj[tokenA].type}
                  className="customize-option-label-item"
                  key={index}>
                  <div className="customize-option-label-item">
                    <img src={require(`../../../img/coin/${ele.name}.png`).default} alt="" />
                    <span>{ele.name}</span>
                  </div>
                </Option> : null

              ))}
            </Select>
          </div>
        </div>
      </div>
      {(tokenAamount || tokenBamount) && account ? (
        <div className="tx-fee">
          <div className="item">
            <div className="tx-fee-text">{t('Price')}</div>
            <div className="tx-fee-price">
              {isChildTab ? `1 ${tokenA}` : `1 ${tokenB}`} =
              {isChildTab ?
                fixD(Number(tokenBamount) / Number(tokenAamount), commonState.assetBaseInfoObj[tokenB]?.fixDPrecise) == 'Infinity' ||
                  fixD(Number(tokenBamount) / Number(tokenAamount), commonState.assetBaseInfoObj[tokenB]?.fixDPrecise) == '0'
                  ? `-- ${tokenB}` : ` ${fixD(Number(tokenBamount) / Number(tokenAamount), commonState.assetBaseInfoObj[tokenB]?.fixDPrecise)} ${tokenB}`
                :
                fixD(Number(tokenAamount) / Number(tokenBamount), commonState.assetBaseInfoObj[tokenA]?.fixDPrecise) == 'Infinity' ||
                  fixD(Number(tokenAamount) / Number(tokenBamount), commonState.assetBaseInfoObj[tokenA]?.fixDPrecise) == '0'
                  ? `-- ${tokenA}` : ` ${fixD(Number(tokenAamount) / Number(tokenBamount), commonState.assetBaseInfoObj[tokenA]?.fixDPrecise)} ${tokenA}`}
              <svg className="icon" aria-hidden="true" onClick={() => setChildTab(!isChildTab)}>
                <use xlinkHref="#Icon-Trade-Active"></use>
              </svg>
            </div>
          </div>
          <div className="item">
            <div className="tx-fee-text">{isChangeTokenA ? t('MinimumReceived') : t('MaximumSold')} </div>
            <div className="tx-fee-price">
              {
                isChangeTokenA ?
                  fixD(Number(tokenBamount) - (Number(tokenBamount) * Number(tradeState.slippageTolerance) / 100), fixDPreciseB)
                  : fixD(Number(tokenAamount) + (Number(tokenAamount) * Number(tradeState.slippageTolerance) / 100), fixDPreciseA)
              }
              {
                isChangeTokenA ? ` ${tokenB}` : ` ${tokenA}`
              }

            </div>
          </div>
          <div className="item">
            <div className="tx-fee-text">{t('SlippageTolerance')}</div>
            <div className="tx-fee-price">{tradeState.slippageTolerance}%</div>
          </div>
        </div>
      ) : null}
      {!account ? (
        <Button className="confirmOrder" onClick={() => onPresentConnectModal()}>
          {t('Connect')}
        </Button>
      ) : !pair ? (
        <Button className="confirmOrder" disabled>
          {t('InsufficientLiquidity')}
        </Button>
      ) :
        Number(tokenAamount) > Number(commonState.assetBaseInfoObj[tokenA]?.balance) ? (
          <Button
            disabled
            className="confirmOrder"
          >
            {t('Insufficient')}
          </Button>
        ) :
          !tokenApprove ? (
            <Button
              loading={requestedApproval}
              className="confirmOrder"
              onClick={handleApprove}>
              {t('Approve')}
            </Button>
          )
            : (
              !isTab && Number(tokenBamount) > reserves0 || isTab && Number(tokenAamount) > reserves0 ? <Button className="confirmOrder" disabled>
                {t('newInsufficientLiquidity')}
              </Button> :
                <Button className="confirmOrder" disabled={!tokenAamount || !Number(tokenAamount) || swapConfirmBtn} onClick={() => {
                  setIsModalVisible(true)
                }}>
                  {t('ConfirmOrder')}
                </Button>
            )}
      {
        isModalVisible ? <ConfirmOrder
          openNotificationWithIcon={openNotificationWithIcon}
          getAmountsOut={getAmountsOut}
          setIsModalVisible={setIsModalVisible}
          setSwapConfirm={setSwapConfirm}
          setSwapConfirmBtn={setSwapConfirmBtn}
          tradeInfo={{
            tokenA: tokenA,
            tokenB: tokenB,
            tokenAamount: tokenAamount,
            tokenBamount: tokenBamount,
            tokenAaddress: tokenAaddress,
            tokenBaddress: tokenBaddress,
            fixDPreciseA: fixDPreciseA,
            fixDPreciseB: fixDPreciseB,
            priceForm: priceForm,
            priceTo: priceTo,
            isTab: isTab,
            tokenAPrice: tokenAPrice,
            tokenBPrice: tokenBPrice,
            isChangeTokenB: isChangeTokenB,
            isChangeTokenA: isChangeTokenA
          }}></ConfirmOrder> : null
      }

    </div>
  )
}
export default Buy
