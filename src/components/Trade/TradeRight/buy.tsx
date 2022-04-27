/* eslint-disable @typescript-eslint/no-var-requires */

import { useState, useEffect, useCallback } from 'react'
import '../../../style/Trade/buy.less'
import lpContractAbi from '../../../constants/abis/lpContract.json'
import { Input, Select, Button, Skeleton } from 'antd'
import { fixD } from 'utils'
import ConfirmOrder from '../buyOrderConfirm/index'
import Notification from '../../../utils/notification'
type IconType = 'success' | 'info' | 'error' | 'warning'
import { useActiveWeb3React } from 'hooks'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import { useCommonState, useProvider } from 'state/common/hooks'
import { useTradeState } from 'state/trade/hooks'
import useApproveFarm from 'components/common/approve/index'
import { getLpPairDetail, SwapRouterAddress } from 'constants/index'
import {
  useSwapFactoryContract,
  useCustomSwapRouterContract,
} from 'constants/hooks/useContract'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import iconSwapActive from '../../../img/swap/icon-swap-normal-light.png'
import precision from 'utils/precision'
import warning from 'img/mint/warning.png'
import { upDateCoinStock, upDateTradeCoinSelect } from '../../../state/trade/actions'
import { useDispatch } from 'react-redux'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ethers } from 'ethers'
import { getAllowance } from 'utils/getList'
const { Option } = Select

const Buy: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
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
  const library = useProvider()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const [tokenA, setTokenA] = useState(commonState.defaultAsset)
  const [tokenB, setTokenB] = useState(commonState.defaultCAsset)

  const [tokenFeeAamount, setFeeTokenAamount] = useState('')
  const [show, setShow] = useState(false)
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
  const [APrice, setAPrice] = useState(Number(tokenAamount) / Number(tokenBamount))
  const [BPrice, setBPrice] = useState(Number(tokenBamount) / Number(tokenAamount))
  const { assetBaseInfoObj } = commonState

  // Getting allowance
  const [allowance, setAllowance] = useState("0")
  const getTokenAllowance = useCallback(async(tokenAddress: any, decimal: string) => {
    if(account !== undefined && account !== null) {
      const contract = new ethers.Contract(tokenAddress, lpContractAbi, library)
      const allowance = await getAllowance(contract, account, SwapRouterAddress, decimal )

      if(allowance !== undefined) {
        setAllowance(allowance.allowance)
        // console.log(`Allowance of ${tokenAddress} on contract ${allowance.allowance}`)
        setTokenApprove(parseFloat(allowance.allowance) > 0)
      }
    }
  }, [account, library])

  // Setting token A balance and token A allowance
  useEffect(() => {
    if(library !== undefined && tokenA !== "" && tokenA !== undefined) {
      const assetTokenA = commonState.assetBaseInfoObj[tokenA]
      // console.log(`Token A is changing, balance for token A :`, assetTokenA)
      setTokenABalance(assetTokenA.balance)
      getTokenAllowance(assetTokenA.address, assetTokenA.decimals)
    }
  }, [library, tokenA, commonState.assetBaseInfoObj])

  const [tokenAaddress, setTokenAaddress] = useState(commonState.assetBaseInfoObj[tokenA]?.address)
  const [tokenBaddress, setTokenBaddress] = useState(commonState.assetBaseInfoObj[tokenB]?.address)

  const [pair, setPair] = useState('')
  useEffect(() => {
    if(library !== undefined) {
      if (tokenAaddress && tokenBaddress && account !== undefined && commonState.assetsNameInfo) {
        getPair()
      }
      if (pair) {
        getReserver(pair)
      }
    }
  }, [library, tokenAaddress, tokenBaddress, account, pair, commonState.assetsNameInfo])
  // const swapFactoryContract = useSwapFactoryContract()

  async function getPair() {
    // const result = await swapFactoryContract.getPair(tokenAaddress, tokenBaddress)
    // if (Number(formatUnits(result, 18)) > 0) {
    //   setPair(result)
    // } else {
    //   setPair('')
    // }
    const result = getLpPairDetail(tokenAaddress, tokenBaddress)
    setPair(result !== undefined && result.lp !== undefined ? result.lp : "")
  }
  const [priceTo, setPriceTo] = useState(0)
  const [priceForm, setPriceForm] = useState(0)
  const [reserves0, setReserves0] = useState(0)
  async function getReserver(result: string) {
    const contract = new ethers.Contract(result, lpContractAbi, library)
    const reserves = await contract.getReserves()
    const token0 = await contract.token0()
    const token1 = await contract.token1()
    const token0Name = commonState.assetsNameInfo[token0]
    const token1Name = commonState.assetsNameInfo[token1]
    const reserves0 = Number(formatUnits(reserves[0], commonState.assetBaseInfoObj[token0Name]?.decimals))
    const reserves1 = Number(formatUnits(reserves[1], commonState.assetBaseInfoObj[token1Name]?.decimals))

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
      const result = await onApprove()
      if(result !== undefined && result) {
        setTokenApprove(true)
      }
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, account])
  
  const [minimumReceived, setMinimumReceived] = useState('')
  const swapRouterContract = useCustomSwapRouterContract()
  useEffect(() => {
    if (tokenBamount && isChangeTokenB) {
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 1200)
      getAmountsIn()
    } 
    if (tokenAamount && isChangeTokenA) {
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 1200)
      getAmountsOut()
    }
    setTimer(false)
    setTimeout(() => {
      setTimer(true)
    }, 5000)
  }, [tokenAamount, tokenBamount, isChangeTokenA, isChangeTokenB, tokenA, tokenB])

  const fixDPreciseA = assetBaseInfoObj[tokenA].fixDPrecise
  const fixDPreciseB = assetBaseInfoObj[tokenB].fixDPrecise

  async function getAmountsOut() {
    if (tokenAamount == '' || parseFloat(tokenAamount) === 0) {
      return false
    }
    const parseAmount = parseUnits(tokenAamount, assetBaseInfoObj[tokenA].decimals)
    const amountsOut = await swapRouterContract.getAmountsOut(parseAmount, [tokenAaddress, tokenBaddress])
    const tokenBAmount = formatUnits(amountsOut[1], assetBaseInfoObj[tokenB].decimals)
    setTokenBamount(fixD(tokenBAmount, fixDPreciseB))
  }

  async function getAmountsIn() {
    if (tokenBamount == '' || parseFloat(tokenBamount) === 0) {
      return false
    }
    const parseAmount = parseUnits(tokenBamount, assetBaseInfoObj[tokenB].decimals)
    const amountsIn = await swapRouterContract.getAmountsIn(parseAmount, [tokenAaddress, tokenBaddress])
    const tokenBAmount = formatUnits(amountsIn[0], assetBaseInfoObj[tokenA].decimals)
    setTokenAamount(fixD(tokenBAmount, fixDPreciseA))
  }
  useEffect(() => {
    setBPrice(Number(tokenBamount) / Number(tokenAamount))
    setAPrice(Number(tokenAamount) / Number(tokenBamount))
  }, [tokenAamount, tokenBamount])

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
  useEffect(() => {
    if (account) {
      setTokenAPrice('')
      setTokenBPrice('')
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
      }, 10000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timer])


  const [isModalVisible, setIsModalVisible] = useState(false)

  function tabCoin() {
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 1200)
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
      <div className={amountActive ? 'amount-active amount' : 'amount'}>
        <div className="amount-header">
          <p className="amount-text">{t('Pay')}</p>
          <div className="balance">
            {t('Balance')} {account ? swapConfirm ? (
              <Skeleton.Input style={{ width: 100, height: 20 }} active />
            ) : ((tokenA && fixDPreciseA && commonState.assetBaseInfoObj[tokenA]?.balance ?
              (fixD(commonState.assetBaseInfoObj[tokenA]?.balance, fixDPreciseA)) : '0.0')) : '0.0'}

            {/** Max Button */}
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
                ele.name !== 'NSDX' && ele.isNoNStableCoin != 1 ? <Option
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
                ele.name !== 'NSDX' && ele.isNoNStableCoin != 1 ? <Option
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
            <div className="tx-fee-text">{t('PriceImpact')}</div>
            {!show ? <div className="tx-fee-price">
              {isChildTab ?
                fixD(Number(tokenBamount) / Number(tokenAamount), commonState.assetBaseInfoObj[tokenB]?.fixDPrecise) == 'Infinity' ||
                  fixD(Number(tokenBamount) / Number(tokenAamount), commonState.assetBaseInfoObj[tokenB]?.fixDPrecise) == '0'
                  ? `--` : Number(minusNum(BPrice, priceTo, priceTo)) >= 0.01 ?
                    minusNum(BPrice, priceTo, priceTo) : '<0.01'
                :
                fixD(Number(tokenAamount) / Number(tokenBamount), commonState.assetBaseInfoObj[tokenA]?.fixDPrecise) == 'Infinity' ||
                  fixD(Number(tokenAamount) / Number(tokenBamount), commonState.assetBaseInfoObj[tokenA]?.fixDPrecise) == '0'
                  ? `--` :
                  Number(minusNum(APrice, priceForm, priceForm)) >= 0.01 ?
                    minusNum(APrice, priceForm, priceForm) : '<0.01'}%</div> : '-- %'}
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
      {!show ? isChildTab ? fixD(Number(tokenBamount) / Number(tokenAamount), commonState.assetBaseInfoObj[tokenB]?.fixDPrecise) == 'Infinity' ||
        fixD(Number(tokenBamount) / Number(tokenAamount), commonState.assetBaseInfoObj[tokenB]?.fixDPrecise) == '0'
        ? null : (minusNum(BPrice, priceTo, priceTo) && Number(minusNum(BPrice, priceTo, priceTo)) > 20 ?
          <div className="available">
            <div className="content">
              <img src={warning} alt="" />
              <span>{t('highPriceImpact')}</span>
            </div>
          </div> : null) :
        fixD(Number(tokenAamount) / Number(tokenBamount), commonState.assetBaseInfoObj[tokenA]?.fixDPrecise) == 'Infinity' ||
          fixD(Number(tokenAamount) / Number(tokenBamount), commonState.assetBaseInfoObj[tokenA]?.fixDPrecise) == '0'
          ? null : minusNum(APrice, priceForm, priceForm) && Number(minusNum(APrice, priceForm, priceForm)) > 20 ? <div className="available">
            <div className="content">
              <img src={warning} alt="" />
              <span>{t('highPriceImpact')}</span>
            </div>
          </div> : null : null}
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
