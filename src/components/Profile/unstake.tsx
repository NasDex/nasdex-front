/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import react, { useEffect, useState } from 'react'
import { Modal, Button, Input } from 'antd'
import '../../style/Profile/unstake.less'
import { useCommonState } from 'state/common/hooks'
import { getOneAssetInfo, getSwapPrice } from 'utils/getList'
import { useFarmState } from 'state/farm/hooks'
import { fixD, numToWei } from 'utils'
import { useLongStakingContract, useMasterChefTestContract } from 'constants/hooks/useContract'
import { useActiveWeb3React } from 'hooks'
import useModal from '../../hooks/useModal'
import { upDateTxHash } from 'state/mint/actions'
import OrderNoifcation from '../common/Notification'
type IconType = 'success' | 'info' | 'error' | 'warning'
import Notification from 'utils/notification'
import { useDispatch } from 'react-redux'
import { parseUnits, formatUnits } from 'ethers/lib/utils'
import Setting from 'components/common/Setting'
import { upDateOneAssetBaseInfo } from 'state/common/actions'
import Precision from 'utils/precision'
import { useTranslation } from 'react-i18next'
const defaultOnDismiss = () => null
const defaultSetIsModalVisible = () => null
const defaultConfirmSuccess = () => null
const defaultSetProfileLongFarmConfirm = () => null

type StakeProps = {
  onDismiss?: () => void
  setIsModalVisible?: (args1: any) => void
  setConfirmSuccess?: (confirmSuccess: any) => void
  setProfileLongFarmConfirm?: (profileLongFarmConfirm: any) => void
  poolInfo?: any
}
const Stake = ({ onDismiss = defaultOnDismiss, poolInfo,
  setIsModalVisible = defaultSetIsModalVisible,
  setConfirmSuccess = defaultConfirmSuccess,
  setProfileLongFarmConfirm = defaultSetProfileLongFarmConfirm
}: StakeProps) => {
  const { t, i18n } = useTranslation()
  const [openFarmSetting] = useModal(<Setting from="profile"></Setting>)
  const commonState = useCommonState()
  const { assetBaseInfoObj } = commonState
  const farmState = useFarmState()
  const [amount, setAmount] = useState('')
  const [assetValue, setAssetValue] = useState('')
  const [cAssetValue, setCAssetValue] = useState('')
  const [token0Type, setToken0Type] = useState('')
  const [swapAmountMin, setSwapAmountMin] = useState('')
  const [swapBmountMin, setSwapBmountMin] = useState('')
  const [requestedLoading, setRequestedLoading] = useState(false)
  const [clickUnstakeBtn, setClickUnstakeBtn] = useState(false)
  const LongStakingContract = useLongStakingContract()
  const MasterChefTestContract = useMasterChefTestContract()
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch()
  const [openWaiting] = useModal(
    <OrderNoifcation
      type="noMessageWaitings"
      title={t('Claim')}
      from="farming"
      message={`${t('confirmWallet')}`}></OrderNoifcation>,
  )
  const openNotificationWithIcon = (type: IconType, message: any) => {
    Notification({
      type,
      message: `${message}`,
    })
  }
  const [openWaringNoifcation] = useModal(
    <OrderNoifcation type="waring" title={t('Claim')} from="farming"></OrderNoifcation>,
  )
  const [openNoifcation] = useModal(<OrderNoifcation type="success" title={t('Claim')} from="farming"></OrderNoifcation>)

  async function clickUnstake(id: any, longId: any) {
    dispatch(upDateTxHash({ hash: '' }))
    setClickUnstakeBtn(true)
    setProfileLongFarmConfirm(true)
    const newDate = new Date()
    const nowtime = newDate.getTime()
    const swapDeadline = Number(nowtime) + Number(commonState.profileMintDeadline) * 60
    let AmountMin
    let BmountMin
    if (token0Type == 'asset') {
      AmountMin = parseUnits(
        fixD(swapAmountMin, assetBaseInfoObj[poolInfo.assetTokenName].decimals).toString(), assetBaseInfoObj[poolInfo.assetTokenName].decimals)
      BmountMin = parseUnits(
        fixD(swapBmountMin, assetBaseInfoObj[poolInfo.cAssetTokenName].decimals).toString(), assetBaseInfoObj[poolInfo.cAssetTokenName].decimals)
    } else {
      AmountMin = parseUnits(
        fixD(swapBmountMin, assetBaseInfoObj[poolInfo.cAssetTokenName].decimals).toString(), assetBaseInfoObj[poolInfo.cAssetTokenName].decimals)
      BmountMin = parseUnits(
        fixD(swapAmountMin, assetBaseInfoObj[poolInfo.assetTokenName].decimals).toString(), assetBaseInfoObj[poolInfo.assetTokenName].decimals)
    }
    const amountValue = parseUnits(amount, 18)
    try {
      openWaiting()
      let tx
      if (poolInfo.assetTokenName == 'NSDX') {
        tx = await MasterChefTestContract.withdraw(id, amountValue, AmountMin, BmountMin, swapDeadline)
      } else {
        tx = await LongStakingContract.withdraw(longId, amountValue, AmountMin, BmountMin, swapDeadline)
      }
      dispatch(upDateTxHash({ hash: tx.hash }))
      openNoifcation()
      const receipt = await tx.wait()
      if (receipt.status) {
        if (poolInfo.assetTokenName == 'NSDX') {
          setConfirmSuccess(id)
        } else {
          setConfirmSuccess(longId)
        }
        const assetNewInfo = await getOneAssetInfo(
          poolInfo.assetTokenName,
          commonState.assetBaseInfoObj[poolInfo.assetTokenName].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const Info = { ...commonState.assetBaseInfoObj[poolInfo.assetTokenName], ...assetNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: Info }))
        const newInfo = await getOneAssetInfo(
          poolInfo.cAssetTokenName,
          commonState.assetBaseInfoObj[poolInfo.cAssetTokenName].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const onecAssetInfo = { ...commonState.assetBaseInfoObj[poolInfo.cAssetTokenName], ...newInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: onecAssetInfo }))
        openNotificationWithIcon('success', 'Success')
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error', 'Error')
      }
      setClickUnstakeBtn(false)
    } catch (error: any) {
      if (error.message.includes('transaction was replaced')) {
        const assetNewInfo = await getOneAssetInfo(
          poolInfo.assetTokenName,
          commonState.assetBaseInfoObj[poolInfo.assetTokenName].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const Info = { ...commonState.assetBaseInfoObj[poolInfo.assetTokenName], ...assetNewInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: Info }))
        const newInfo = await getOneAssetInfo(
          poolInfo.cAssetTokenName,
          commonState.assetBaseInfoObj[poolInfo.cAssetTokenName].address,
          account,
          commonState.assetBaseInfoObj,
        )
        const onecAssetInfo = { ...commonState.assetBaseInfoObj[poolInfo.cAssetTokenName], ...newInfo }
        dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: onecAssetInfo }))
      } else {
        openWaringNoifcation()
        openNotificationWithIcon('error', error.message)
      }
      setClickUnstakeBtn(false)
      return
    }
  }
  async function getRecevied(amount: any) {
    let swapPrice: any = {}
    let LPtotal
    let asset
    let cAsset
    if (poolInfo.assetTokenName == 'NSDX') {
      return false
    } else {
      swapPrice = await getSwapPrice(
        commonState.assetBaseInfoObj[poolInfo.cAssetTokenName].address,
        commonState.assetBaseInfoObj[poolInfo.assetTokenName].address,
      )
      if (swapPrice) {
        const token0Name = commonState.assetsNameInfo[swapPrice.token0]
        const token1Name = commonState.assetsNameInfo[swapPrice.token1]
        const reserves0 = Number(formatUnits(swapPrice.reserves[0], commonState.assetBaseInfoObj[token0Name].decimals))
        const reserves1 = Number(formatUnits(swapPrice.reserves[1], commonState.assetBaseInfoObj[token1Name].decimals))
        LPtotal = poolInfo.totalStakedNum
        const token0Type = commonState.assetBaseInfoObj[token0Name].type
        setToken0Type(token0Type)
        if (token0Type == 'asset') {
          asset = (Number(amount) / LPtotal) * Number(reserves0)
          cAsset = (Number(amount) / LPtotal) * Number(reserves1)
        } else {
          asset = (Number(amount) / LPtotal) * Number(reserves1)
          cAsset = (Number(amount) / LPtotal) * Number(reserves0)
        }
      }
      if (asset) {
        setAssetValue(asset.toString())
        const result = asset - asset * commonState.profileSlippageTolerance * 0.01
        setSwapAmountMin(fixD(result.toString(), 12))
      }
      if (cAsset) {
        setCAssetValue(cAsset.toString())
        const result = cAsset - cAsset * commonState.profileSlippageTolerance * 0.01
        setSwapBmountMin(fixD(result.toString(), 12))
      }
    }
  }
  useEffect(() => {
    setAmount(amount)
    if (Number(amount) <= Number(poolInfo.Staked)) {
      getRecevied(amount)
    }
  }, [amount])

  return (
    <Modal
      title={t('Unstake')}
      maskClosable={false}
      width={420}
      footer={null}
      visible={true}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}>
      <div className="unstake-container">
        {poolInfo.assetTokenName == 'NSDX' ? (
          <div className="liquidity-logo">
            <img src={require(`../../img/coin/${poolInfo.assetTokenName}.png`).default} alt="" />
            <div className="liquidity-name">{poolInfo.assetTokenName}</div>
          </div>
        ) : (
          <div className="liquidity-logo">
            <img
              style={{ width: '64px' }}
              src={require(`../../img/coin/${poolInfo.assetTokenName}-${poolInfo.cAssetTokenName}.png`).default}
              alt=""
            />
            <div className="liquidity-name">
              {poolInfo.assetTokenName} - {poolInfo.cAssetTokenName} LP
            </div>
          </div>
        )}
        <svg className="icon" aria-hidden="true" fill="#999999" onClick={openFarmSetting}>
          <use xlinkHref="#Icon-Set-Active"></use>
        </svg>
        <div className="amount">
          <div className="amount-header">
            <div className="amount-header-text">{t('Input')}</div>
            <div className="amount-header-available">
              {t('Available')} <span>{fixD(poolInfo.Staked, 6) < 0.000001 ? '<0.000001' : fixD(poolInfo.Staked, 6)}</span>
            </div>
          </div>
          <div className="amount-input">
            <Input
              value={amount}
              bordered={false}
              placeholder="0.0"
              onChange={e => {
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,6})?.*$/, '$1')
                setAmount(e.target.value)
              }}></Input>
            <Button
              className="max-btn"
              disabled={poolInfo.Staked === amount}
              onClick={() => {
                setAmount(poolInfo.Staked)
              }}>
              {t('MAX')}
            </Button>
          </div>
        </div>
        {poolInfo.assetTokenName == 'NSDX' ||
          Number(amount) > Number(poolInfo.Staked) ||
          !amount ||
          !assetValue ? null : (
          <div>
            <div className="Recevied">
              <p className="amount-tit">{t('newReceive')}</p>
              <div className="asset">
                <span>
                  {assetValue && fixD(assetValue, 12) < '0.000000000001' ? '0.0' : fixD(assetValue, 12)}{' '}
                  {poolInfo.assetTokenName}
                </span>
                <span>
                  {cAssetValue && fixD(cAssetValue, 12) < '0.000000000001' ? '0.0' : fixD(cAssetValue, 12)}{' '}
                  {poolInfo.cAssetTokenName}
                </span>
              </div>
            </div>
          </div>
        )}
        {Number(amount) > Number(poolInfo.Staked) ? (
          <Button className="stake-btn" disabled>
            {t('Insufficient')}
          </Button>
        ) : (
          <Button
            className="stake-btn"
            disabled={
              Number(amount) > Number(poolInfo.Staked) ||
              Number(amount) <= 0 ||
              (Number(amount) > 0 && Number(assetValue) <= 0)
            }
            loading={requestedLoading}
            onClick={() => clickUnstake(poolInfo.id, poolInfo.longId)}>
            {t('Unstake')}
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default Stake
