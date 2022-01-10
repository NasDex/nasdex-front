/* eslint-disable @typescript-eslint/no-var-requires*/


import react, { useEffect, useRef, useState } from 'react'
import { Modal, Button } from 'antd'
import '../../../style/Trade/buyOrderConfirm.less'
import { useTradeState } from 'state/trade/hooks'
import OrderNoifcation from '../../common/Notification'
import useModal from '../../../hooks/useModal'
import { parseUnits } from 'ethers/lib/utils'
import { useSwapRouterContract } from 'constants/hooks/useContract'
import { useActiveWeb3React } from 'hooks'
import { fixD, numToWei } from 'utils'
import { upDateTxHash } from 'state/mint/actions'
import { useDispatch } from 'react-redux'
import { useCommonState } from 'state/common/hooks'
import { getOneAssetInfo } from 'utils/getList'
import precision from 'utils/precision'
import { upDateOneAssetBaseInfo } from 'state/common/actions'
import Precision from 'utils/precision'
import waring from '../../../img/common/waring@2x.png'
import { useTranslation } from 'react-i18next'
const defaultOnDismiss = () => null
const defaultOpenNotificationWithIcon = () => null
const defaultGetAmountsOut = () => null
const defaultSetIsModalVisible = () => null
const defaultSetSwapConfirm = () => null
const defaultSetSwapConfirmBtn = () => null

type OrderConfirmModalProps = {
  onDismiss?: () => void
  getAmountsOut?: () => void,
  setIsModalVisible?: (args1: any) => void,
  openNotificationWithIcon?: (IconType: any) => void
  setSwapConfirm?: (swapConfirm: any) => void
  setSwapConfirmBtn?: (swapConfirmBtn: any) => void
  tradeInfo: any
}

const LongOrderConfirm = ({
  onDismiss = defaultOnDismiss,
  openNotificationWithIcon = defaultOpenNotificationWithIcon,
  getAmountsOut = defaultGetAmountsOut,
  setIsModalVisible = defaultSetIsModalVisible,
  setSwapConfirm = defaultSetSwapConfirm,
  setSwapConfirmBtn = defaultSetSwapConfirmBtn,
  tradeInfo,
}: OrderConfirmModalProps) => {
  const { t, i18n } = useTranslation()
  const {
    tokenA,
    tokenB,
    tokenAamount,
    tokenBamount,
    tokenAaddress,
    tokenBaddress,
    tokenBPrice,
    tokenAPrice,
    fixDPreciseA,
    fixDPreciseB,
    priceForm,
    priceTo,
    isTab,
    tokenFeeAamount,
    tokenFeeBamount,
    isChangeTokenA,
    isChangeTokenB

  } = tradeInfo

  const [tokenBamountTemp, setTokenBamountTemp] = useState(tokenBamount)
  const [tokenAamountTemp, setTokenAamountTemp] = useState(tokenAamount)

  const usePrevious = (value: any) => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }
  const prevCount = usePrevious(tokenBamountTemp)
  const prevCount1 = usePrevious(tokenAamountTemp)

  const [updatePrice, setUpdatePrice] = useState(false)

  useEffect(() => {
    if (isChangeTokenA && prevCount && prevCount !== tokenBamount) {
      setUpdatePrice(true)
    }
    if (isChangeTokenB && prevCount1 && prevCount1 !== tokenAamount) {
      setUpdatePrice(true)
    }
  }, [prevCount, tokenBamount, tokenAamount, isChangeTokenA, isChangeTokenB])
  const tradeState = useTradeState()
  const [isLoading, setIsLoading] = useState(false)
  const [openNoifcation] = useModal(<OrderNoifcation type="success" title={t('Swap')} from="trade"></OrderNoifcation>)
  const swapRouterContract = useSwapRouterContract()
  const [isChildTab, setChildTab] = useState(isTab)
  const commonState = useCommonState()
  const { assetBaseInfoObj } = commonState
  const { account } = useActiveWeb3React()
  const [openWaiting] = useModal(
    <OrderNoifcation
      type="waitings"
      title={t('Swap')}
      from="trade"
      message={`{t('Pay')} <span>${tokenAamount}</span> ${tokenA} ${t('toreceive')} <span>${fixD(
        tokenBamount,
        assetBaseInfoObj[tokenB].swapPrecise,
      )}</span> ${tokenB}`}></OrderNoifcation>,
  )
  const [openWaringNoifcation] = useModal(<OrderNoifcation type="waring" title={t('Swap')} from="mint"></OrderNoifcation>)
  const dispatch = useDispatch()

  async function confirmSwap() {
    if (isChangeTokenA) {
      swapExactTokensForTokens()
    } else if (isChangeTokenB) {
      swapTokensForExactTokens()
    }
  }

  async function swapExactTokensForTokens() {
    dispatch(upDateTxHash({ hash: '' }))
    setSwapConfirm(true)
    setSwapConfirmBtn(true)
    setIsLoading(true)
    const amountIn = parseUnits(tokenAamount, assetBaseInfoObj[tokenA].decimals)
    const amountOutMin = parseUnits(
      fixD(tokenBamount - tokenBamount * 0.01 * Number(tradeState.slippageTolerance), assetBaseInfoObj[tokenB].decimals).toString(),
      assetBaseInfoObj[tokenB].decimals)
    const timestamp = Math.ceil(new Date().valueOf() / 1000) + 60
    openWaiting()
    try {
      const txHash = await swapRouterContract.swapExactTokensForTokens(
        amountIn,
        amountOutMin,
        [tokenAaddress, tokenBaddress],
        account,
        timestamp,
      )
      dispatch(upDateTxHash({ hash: txHash.hash }))
      setSwapConfirmBtn(false)
      openNoifcation()
      setIsModalVisible(false)
      const receipt = await txHash.wait()
      if (receipt.status) {
        const tokenBNewInfo = await getOneAssetInfo(tokenB, tokenBaddress, account, commonState.assetBaseInfoObj)
        const tokenBInfo = { ...commonState.assetBaseInfoObj[tokenB], ...tokenBNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: tokenBInfo }))
        const tokenANewInfo = await getOneAssetInfo(tokenA, tokenAaddress, account, commonState.assetBaseInfoObj)
        const tokenAInfo = { ...commonState.assetBaseInfoObj[tokenA], ...tokenANewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: tokenAInfo }))
        setSwapConfirm(false)
        openNotificationWithIcon('success')
      } else {
        setSwapConfirm(false)
        setSwapConfirmBtn(false)
        setIsLoading(false)
        openWaringNoifcation()
        openNotificationWithIcon('error')
      }
    } catch (error: any) {
      if (error.message.includes('transaction was replaced')) {
        const tokenBNewInfo = await getOneAssetInfo(tokenB, tokenBaddress, account, commonState.assetBaseInfoObj)
        const tokenBInfo = { ...commonState.assetBaseInfoObj[tokenB], ...tokenBNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: tokenBInfo }))
        const tokenANewInfo = await getOneAssetInfo(tokenA, tokenAaddress, account, commonState.assetBaseInfoObj)
        const tokenAInfo = { ...commonState.assetBaseInfoObj[tokenA], ...tokenANewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: tokenAInfo }))
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error')
      }
      setSwapConfirm(false)
      setSwapConfirmBtn(false)
      setIsLoading(false)
      setIsModalVisible(false)
    }
  }
  async function swapTokensForExactTokens() {
    dispatch(upDateTxHash({ hash: '' }))
    setSwapConfirm(true)
    setSwapConfirmBtn(true)
    setIsLoading(true)
    const amountOut = parseUnits(tokenBamount, assetBaseInfoObj[tokenB].decimals)
    const amountInMax = parseUnits(
      fixD(Number(tokenAamount) + Number(tokenAamount) * 0.01 * Number(tradeState.slippageTolerance), assetBaseInfoObj[tokenA].decimals).toString(),
      assetBaseInfoObj[tokenA].decimals)
    const timestamp = Math.ceil(new Date().valueOf() / 1000) + 60
    openWaiting()
    try {
      const txHash = await swapRouterContract.swapTokensForExactTokens(
        amountOut,
        amountInMax,
        [tokenAaddress, tokenBaddress],
        account,
        timestamp,
      )
      dispatch(upDateTxHash({ hash: txHash.hash }))
      setSwapConfirmBtn(false)
      openNoifcation()
      setIsModalVisible(false)
      const receipt = await txHash.wait()
      if (receipt.status) {
        const tokenBNewInfo = await getOneAssetInfo(tokenB, tokenBaddress, account, commonState.assetBaseInfoObj)
        const tokenBInfo = { ...commonState.assetBaseInfoObj[tokenB], ...tokenBNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: tokenBInfo }))
        const tokenANewInfo = await getOneAssetInfo(tokenA, tokenAaddress, account, commonState.assetBaseInfoObj)
        const tokenAInfo = { ...commonState.assetBaseInfoObj[tokenA], ...tokenANewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: tokenAInfo }))
        setSwapConfirm(false)
        openNotificationWithIcon('success')
      } else {
        setSwapConfirm(false)
        setSwapConfirmBtn(false)
        setIsLoading(false)
        openWaringNoifcation()
        openNotificationWithIcon('error')
      }
    } catch (error: any) {
      if (error.message.includes('transaction was replaced')) {
        const tokenBNewInfo = await getOneAssetInfo(tokenB, tokenBaddress, account, commonState.assetBaseInfoObj)
        const tokenBInfo = { ...commonState.assetBaseInfoObj[tokenB], ...tokenBNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: tokenBInfo }))
        const tokenANewInfo = await getOneAssetInfo(tokenA, tokenAaddress, account, commonState.assetBaseInfoObj)
        const tokenAInfo = { ...commonState.assetBaseInfoObj[tokenA], ...tokenANewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: tokenAInfo }))
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error')
      }
      setSwapConfirm(false)
      setSwapConfirmBtn(false)
      setIsLoading(false)
      setIsModalVisible(false)
    }
  }
  async function swapETHForExactTokens() {
    dispatch(upDateTxHash({ hash: '' }))
    setSwapConfirm(true)
    setSwapConfirmBtn(true)
    setIsLoading(true)
    const amountIn = parseUnits(tokenAamount, assetBaseInfoObj[tokenA].decimals)
    const amountOut = parseUnits(Math.floor(tokenBamount).toString(), assetBaseInfoObj[tokenB].decimals)
    const timestamp = Math.ceil(new Date().valueOf() / 1000) + 60
    openWaiting()
    try {
      const txHash = await swapRouterContract.swapETHForExactTokens(
        amountOut,
        [tokenAaddress, tokenBaddress],
        account,
        timestamp,
        {
          value: amountIn,
        },
      )
      dispatch(upDateTxHash({ hash: txHash.hash }))
      setSwapConfirmBtn(false)
      openNoifcation()
      const receipt = await txHash.wait()
      const tokenBNewInfo = await getOneAssetInfo(tokenB, tokenBaddress, account, commonState.assetBaseInfoObj)
      const tokenBInfo = { ...commonState.assetBaseInfoObj[tokenB], ...tokenBNewInfo }
      dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: tokenBInfo }))
      const tokenANewInfo = await getOneAssetInfo(tokenA, tokenAaddress, account, commonState.assetBaseInfoObj)
      const tokenAInfo = { ...commonState.assetBaseInfoObj[tokenA], ...tokenANewInfo }
      dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: tokenAInfo }))
      setIsModalVisible(false)
      openNotificationWithIcon('success')
      setSwapConfirm(false)
      setIsLoading(false)
    } catch (error) {
      setSwapConfirm(false)
      setSwapConfirmBtn(false)
      openWaringNoifcation()
      setIsLoading(false)
      openNotificationWithIcon('error')
    }
  }
  async function swapExactETHForTokens() {
    dispatch(upDateTxHash({ hash: '' }))
    setSwapConfirm(true)
    setSwapConfirmBtn(true)
    setIsLoading(true)
    const amountIn = parseUnits('0', assetBaseInfoObj[tokenA].decimals)
    const amountOutMin = parseUnits(tokenBamount, assetBaseInfoObj[tokenB].decimals)
    const timestamp = Math.ceil(new Date().valueOf() / 1000) + 60
    openWaiting()
    try {
      const txHash = await swapRouterContract.swapExactETHForTokens(
        amountIn,
        [tokenBaddress, tokenAaddress],
        account,
        timestamp,
        {
          value: amountOutMin,
        },
      )
      dispatch(upDateTxHash({ hash: txHash.hash }))
      setSwapConfirmBtn(false)
      openNoifcation()
      const receipt = await txHash.wait()
      if (receipt.status) {
        const tokenBNewInfo = await getOneAssetInfo(tokenB, tokenBaddress, account, commonState.assetBaseInfoObj)
        const tokenBInfo = { ...commonState.assetBaseInfoObj[tokenB], ...tokenBNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: tokenBInfo }))
        const tokenANewInfo = await getOneAssetInfo(tokenA, tokenAaddress, account, commonState.assetBaseInfoObj)
        const tokenAInfo = { ...commonState.assetBaseInfoObj[tokenA], ...tokenANewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: tokenAInfo }))
        setSwapConfirm(false)
        openNotificationWithIcon('success')
      } else {
        setSwapConfirm(false)
        setSwapConfirmBtn(false)
        openWaringNoifcation()
        setIsLoading(false)
        openNotificationWithIcon('error')
      }

      setIsLoading(false)
    } catch (error) {
      setSwapConfirm(false)
      setSwapConfirmBtn(false)
      openWaringNoifcation()
      setIsLoading(false)
      openNotificationWithIcon('error')
    }
  }
  return (
    <Modal title={t('Swap')} width={420} footer={null} visible={true} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
      <div className="buy-order-confirm-conntent">
        <div className="price">
          <div>
            <img src={require(`../../../img/coin/${tokenA}.png`).default} alt="" />
            <span>{t('Pay')}</span>
          </div>
          <div className="mint-assets">
            {
              updatePrice ? prevCount1 : tokenAamountTemp
            } <span>{tokenA}</span>
          </div>
        </div>
        <div className="longAdd">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-arrow-trade"></use>
          </svg>
        </div>
        <div className="price">
          <div>
            <img src={require(`../../../img/coin/${tokenB}.png`).default} alt="" />
            <span>{t('newReceive')}</span>
          </div>
          <div className="mint-assets">
            {
              updatePrice ? prevCount : tokenBamountTemp
            }
            <span>{tokenB}</span>
          </div>
        </div>
        <div className="detail">
          <div className="detail-item">
            <div className="leabl">{t('Price')}</div>
            {/* <div className="text">{tradeState.tradeCollateralRatio}%</div> */}
            <div className="text">
              {/* {
                isChildTab ? `1 ${tokenA}` : `1 ${tokenB}`
              } = {isChildTab ? `${fixD(priceTo, 4)} ${tokenB}` : `${fixD(priceForm, 4)} ${tokenA}`}


              <svg className="icon" aria-hidden="true" onClick={() => {
                setChildTab(!isChildTab)
              }}>
                <use xlinkHref="#Icon-Trade-Active"></use>
              </svg> */}
              {isChildTab ? `1 ${tokenA}` : `1 ${tokenB}`} =
              {isChildTab
                ? ` ${fixD(
                  Number(tokenBamount) / Number(tokenAamount),
                  commonState.assetBaseInfoObj[tokenB]?.fixDPrecise,
                )} ${tokenB}`
                : ` ${fixD(
                  Number(tokenAamount) / Number(tokenBamount),
                  commonState.assetBaseInfoObj[tokenA]?.fixDPrecise,
                )} ${tokenA}`}
              <svg className="icon" aria-hidden="true" onClick={() => setChildTab(!isChildTab)}>
                <use xlinkHref="#Icon-Trade-Active"></use>
              </svg>
              {/* 1 {tokenA} = {fixD(tokenBamount / tokenAamount, fixDPreciseB)} {tokenB}{' '} */}
            </div>
          </div>
          <div className="detail-item">
            <div className="leabl">{t('SlippageTolerance')}</div>
            <div className="text">{tradeState.slippageTolerance}%</div>
          </div>
          <div className="detail-item">
            <div className="leabl">{isChangeTokenA ? t('MinimumReceived') : t('MaximumSold')} </div>
            <div className="text">
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
        </div>
        {
          updatePrice ? <div className="price-updated">
            <div className="price-updated-leabl">
              <img src={waring} alt="" />
              {t('Price')} {t('Updated')}
            </div>
            <Button className="price-updated-button" onClick={() => { setTokenBamountTemp(tokenBamount), setTokenAamountTemp(tokenAamount), setUpdatePrice(false) }}>Accept</Button>
          </div> : null
        }

        <Button className="confirm-btn" disabled={updatePrice} onClick={() => confirmSwap()} loading={isLoading}>
          {t('Confirm')}
        </Button>
      </div>
    </Modal>
  )
}

export default LongOrderConfirm
