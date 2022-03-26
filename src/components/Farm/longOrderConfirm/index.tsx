/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import react, { useState, useEffect } from 'react'
import { Modal, Button, Skeleton } from 'antd'
import '../../../style/Farm/longOrderConfirm.less'
import { useDispatch } from 'react-redux'
import { useFarmState } from 'state/farm/hooks'
import OrderNoifcation from '../../common/Notification'
import useModal from '../../../hooks/useModal'
import { useLongStakingContract } from 'constants/hooks/useContract'
import { parseUnits, formatUnits } from 'ethers/lib/utils'
import { upDateTxHash } from 'state/farm/actions'
import { useCommonState } from 'state/common/hooks'
import { upDateOneAssetBaseInfo } from '../../../state/common/actions'
import { getOneAssetInfo, getSwapPrice } from 'utils/getList'
import { useActiveWeb3React } from 'hooks'
import { fixD, numToWei } from 'utils'
import { getLibrary } from 'utils/getLibrary'
import { ethers } from 'ethers'
import ltokenAbi from 'constants/abis/ltoken.json'
import { useTranslation } from 'react-i18next'
import { MasterChefTestAddress } from '../../../constants/index'
import { simpleRpcProvider } from 'utils/providers'
const defaultOnDismiss = () => null
const defaultOpenNotificationWithIcon = () => null
const defaultSetLongConfirm = () => null
const defaultSetLongConfirmBtn = () => null
type OrderConfirmModalProps = {
  onDismiss?: () => void
  openNotificationWithIcon?: (IconType: any) => void
  setLongConfirm?: (LongConfirm: any) => void
  setLongConfirmBtn?: (LongConfirmBtn: any) => void
  token0Address: any
  pid: any
  tokenAPrice: any
  tokenBPrice: any
  tokenAamount: any
  tokenBamount: any
  tokenA: any
  tokenB: any
}

const LongOrderConfirm = ({
  onDismiss = defaultOnDismiss,
  token0Address,
  pid,
  tokenAPrice,
  tokenBPrice,
  tokenAamount,
  tokenBamount,
  tokenA,
  tokenB,
  openNotificationWithIcon = defaultOpenNotificationWithIcon,
  setLongConfirm = defaultSetLongConfirm,
  setLongConfirmBtn = defaultSetLongConfirmBtn,
}: OrderConfirmModalProps) => {
  const { t, i18n } = useTranslation()
  const farmState = useFarmState()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  const [LP, setLP] = useState('')
  const [sharePool, setSharePool] = useState('')
  const { account } = useActiveWeb3React()
  const [isChildTab, setChildTab] = useState(true)
  const provider = window.ethereum
  const library = getLibrary(provider) ?? simpleRpcProvider
  const [openNoifcation] = useModal(<OrderNoifcation type="success" title={t('LongFarm')} from="farm"></OrderNoifcation>)
  const longStakingContract = useLongStakingContract()
  const [openWaringNoifcation] = useModal(
    <OrderNoifcation type="warning" title={t('LongFarm')} from="farm"></OrderNoifcation>,
  )
  const [openWaiting] = useModal(
    <OrderNoifcation type="waitings" title={t('LongFarm')} from="farm" message={``}></OrderNoifcation>,
  )

  const Areturned = (Number(tokenBamount) * tokenBPrice).toString()
  const Aminimum = Number(Areturned) - Number(Areturned) * Number(farmState.slippageTolerance) * 0.01
  const Breturned = (Number(tokenAamount) * tokenAPrice).toString()
  const Bminimum = Number(Breturned) - Number(Breturned) * Number(farmState.slippageTolerance) * 0.01
  async function openPosition() {
    if (!pid) {
      return false
    }

    const id = pid
    const Aamount = parseUnits(tokenAamount, commonState.assetBaseInfoObj[tokenA].decimals)
    const Bamount = parseUnits(tokenBamount, commonState.assetBaseInfoObj[tokenB].decimals)
    const swapAmountAMin = parseUnits(
      fixD(Aminimum, commonState.assetBaseInfoObj[tokenA].decimals).toString(), commonState.assetBaseInfoObj[tokenA].decimals)
    const swapAmountBMin = parseUnits(
      fixD(Bminimum, commonState.assetBaseInfoObj[tokenB].decimals).toString(), commonState.assetBaseInfoObj[tokenB].decimals)
    const newDate = new Date()
    const nowtime = newDate.getTime()
    const swapDeadline = Math.ceil(nowtime / 1000) + Number(farmState.deadline) * 60
    dispatch(upDateTxHash({ hash: '' }))
    try {
      setLongConfirmBtn(true)
      setLongConfirm(true)
      let tx
      openWaiting()
      if (token0Address == commonState.assetBaseInfoObj[tokenA].address) {
        tx = await longStakingContract.deposit(
          Number(id),
          Aamount,
          Bamount,
          swapAmountAMin,
          swapAmountBMin,
          swapDeadline,
        )
      } else {
        tx = await longStakingContract.deposit(
          Number(id),
          Bamount,
          Aamount,
          swapAmountBMin,
          swapAmountAMin,
          swapDeadline,
        )
      }
      dispatch(upDateTxHash({ hash: tx.hash }))
      openNoifcation()
      setLongConfirmBtn(false)
      const receipt = await tx.wait()
      if (receipt.status) {
        const assetNewInfo = await getOneAssetInfo(
          tokenA,
          commonState.assetBaseInfoObj[tokenA].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const oneAssetInfo = { ...commonState.assetBaseInfoObj[tokenA], ...assetNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: oneAssetInfo }))
        const newInfo = await getOneAssetInfo(
          tokenB,
          commonState.assetBaseInfoObj[tokenB].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const onecAssetInfo = { ...commonState.assetBaseInfoObj[tokenB], ...newInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: onecAssetInfo }))
        setLongConfirm(false)
        openNotificationWithIcon('success')
      } else {
        setLongConfirm(false)
        openWaringNoifcation()
        openNotificationWithIcon('error')
      }
    } catch (error: any) {
      if (error.message.includes('transaction was replaced')) {
        const assetNewInfo = await getOneAssetInfo(
          tokenA,
          commonState.assetBaseInfoObj[tokenA].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const oneAssetInfo = { ...commonState.assetBaseInfoObj[tokenA], ...assetNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: oneAssetInfo }))
        const newInfo = await getOneAssetInfo(
          tokenB,
          commonState.assetBaseInfoObj[tokenB].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const onecAssetInfo = { ...commonState.assetBaseInfoObj[tokenB], ...newInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: onecAssetInfo }))
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error')
      }
      setLongConfirmBtn(false)
      setLongConfirm(false)
      return
    }
  }

  useEffect(() => {
    if (tokenAamount) {
      getLP(
        tokenAamount,
        fixD((tokenAPrice * Number(tokenAamount)).toString(), commonState.assetBaseInfoObj[tokenA].fixDPrecise),
      )
    }
  }, [account, tokenAamount, tokenBamount])

  async function getLP(tokenAamount: any, tokenBamount: any) {
    setLP('')
    setSharePool('')
    let swapPrice: any = {}
    let tokenALP: any
    let tokenBLP: any
    let share: any
    let name: any = {}
    swapPrice = await getSwapPrice(
      commonState.assetBaseInfoObj[tokenA].address,
      commonState.assetBaseInfoObj[tokenB].address,
    )
    if (swapPrice) {
      const contract = new ethers.Contract(swapPrice.result, ltokenAbi, library)
      const token0Name = commonState.assetsNameInfo[swapPrice.token0]
      const token1Name = commonState.assetsNameInfo[swapPrice.token1]
      const reserves0 = Number(formatUnits(swapPrice.reserves[0], commonState.assetBaseInfoObj[token0Name]?.decimals))
      const reserves1 = Number(formatUnits(swapPrice.reserves[1], commonState.assetBaseInfoObj[token1Name]?.decimals))
      const totalStaked = await contract.totalSupply()
      if (commonState.assetBaseInfoObj[token0Name].type == 'asset') {
        name = token0Name
      } else {
        name = token1Name
      }
      const LPtotal = Number(formatUnits(totalStaked, commonState.assetBaseInfoObj[name].decimals))
      tokenALP = (Number(tokenAamount) / Number(reserves0)) * LPtotal
      tokenBLP = (Number(tokenBamount) / Number(reserves1)) * LPtotal
      if (tokenALP > tokenBLP) {
        setLP(fixD(tokenBLP.toString(), 12))
        share = (Number(tokenBLP) / (LPtotal + Number(tokenBLP))) * 100
      } else {
        setLP(fixD(tokenALP.toString(), 12))
        share = (Number(tokenALP) / (LPtotal + Number(tokenALP))) * 100
      }
      setSharePool(fixD(share.toString(), 6))
    }
  }

  return (
    <Modal title={t('LongFarm')} width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="long-order-confirm-conntent">
        <div className="price">
          <div>
            <img src={require(`../../../img/coin/${tokenA}.png`).default} alt="" />
            <span>Deposit</span>
          </div>
          <div className="mint-assets">
            {tokenAamount} <span>{tokenA}</span>
          </div>
        </div>
        <div className="longAdd">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-add"></use>
          </svg>
        </div>
        <div className="price">
          <div>
            <img src={require(`../../../img/coin/${tokenB}.png`).default} alt="" />
            <span>Deposit</span>
          </div>
          <div className="mint-assets">
            {tokenBamount} <span>{tokenB}</span>
          </div>
        </div>
        <div className="detail">
          <div className="detail-item">
            <div className="leabl">{t('Price')}</div>
            <div className="text">
              {isChildTab ? `1 ${tokenA}` : `1 ${tokenB}`} =
              {isChildTab
                ? ` ${fixD(tokenAPrice, commonState.assetBaseInfoObj[tokenB].fixDPrecise)} ${tokenB}`
                : ` ${fixD(tokenBPrice, commonState.assetBaseInfoObj[tokenA].fixDPrecise)} ${tokenA}`}
              <svg className="icon" aria-hidden="true" onClick={() => setChildTab(!isChildTab)}>
                <use xlinkHref="#Icon-Trade-Active"></use>
              </svg>
            </div>
          </div>
          <div className="detail-item">
            <div className="leabl">{t('newReceive')} ({t('Estimated')})</div>
            <div className="text">
              {LP ? `${LP} ` : <Skeleton.Input style={{ width: 100, height: 20 }} active />} {tokenA}-{tokenB} LP
            </div>
          </div>
          <div className="detail-item">
            <div className="leabl">{t('SharePool')}</div>
            <div className="text">
              {sharePool ? (
                Number(sharePool) < 0.01 ? (
                  '<0.01'
                ) : (
                  `${fixD(sharePool, 2)}`
                )
              ) : (
                <Skeleton.Input style={{ width: 100, height: 20 }} active />
              )}
              %
            </div>
          </div>
        </div>
        <Button className="confirm-btn" onClick={() => openPosition()}>
          <span className="mintSpan">{t('Confirm')}</span>
        </Button>
      </div>
    </Modal>
  )
}

export default LongOrderConfirm
