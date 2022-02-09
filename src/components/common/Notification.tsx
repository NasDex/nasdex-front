/** @format */

import react from 'react'
import { Modal, Button } from 'antd'
import tradesubmittedImg from '../../img/common/tradesubmitted@2x.png'
import waitingsImg from '../../img/common/waitings.gif'
import rejectedImg from '../../img/common/waring@2x.png'
import '../../style/Mint/notification.less'
import Notification from '../../utils/notification'
import { useMintState } from 'state/mint/hooks'
import { upDateMintInitInfo } from '../../state/mint/actions'
import { upDateFarmInitInfo } from '../../state/farm/actions'
import { upDateNewPositionInfo } from '../../state/manage/actions'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
interface NotificationProps {
  type: string
  title: string
  message?: React.ReactNode
  from: string
  onDismiss?: () => void
}
type IconType = 'success' | 'info' | 'error' | 'warning'
const defaultOnDismiss = () => null

const RenderWaitings: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const { message } = props
  function createMarkup() {
    return { __html: message }
  }
  return (
    <div className="waitings-modal">
      <img src={waitingsImg} alt="" />
      <p>{t('confirmWallet')}</p>
      <p dangerouslySetInnerHTML={createMarkup()}>
        {/* {dangerouslySetInnerHTML(message)} */}
        {/* Collateral <span>{Collateral}</span> {cAssetToken} to mint <span>{asset}</span> {assetToken} */}
      </p>
    </div>
  )
}

const RenderNoMessageWaitings: React.FC<any> = props => {
  const { message } = props
  function createMarkup() {
    return { __html: message }
  }
  return (
    <div className="waitings-modal">
      <img src={waitingsImg} alt="" />
      <p dangerouslySetInnerHTML={createMarkup()}></p>
    </div>
  )
}

const RenderSuccess: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const mintState = useMintState()
  const { onDismiss, from } = props
  const hash = mintState.hash
  const dispatch = useDispatch()
  function handle() {
    onDismiss()
    if (from == 'close') {
      location.href = '/profile'
    } else {
      location.href = `/profile/${t('Farming')}`
    }
  }
  function dispatchHandle() {
    onDismiss()
    dispatch(upDateNewPositionInfo({ newPositionInfo: hash }))
    dispatch(upDateMintInitInfo({ mintInitInfo: hash }))
    dispatch(upDateFarmInitInfo({ farmInitInfo: hash }))
  }
  return (
    <div className="success-modal">
      <img src={tradesubmittedImg} alt="" />
      <p>{t('TransactionSubmitted')}</p>
      {hash ? (
        <a href={'https://polygonscan.com/tx/' + hash} target="_blank">
          {t('ViewExplorer')}
        </a>
      ) : null}
      <div>
        <Button className="modal-btn" onClick={from == 'close' || from == 'farm' ? handle : dispatchHandle}>
          {t('OK')}
        </Button>
      </div>
    </div>
  )
}

const RenderRejected: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const mintState = useMintState()
  const { onDismiss } = props
  const hash = mintState.hash
  function handle() {
    onDismiss()
  }
  return (
    <div className="rejected-modal">
      <img src={rejectedImg} alt="" />
      <p>{t('TransactionRejected')}</p>
      {hash ? (
        <a href={'https://polygonscan.com/tx/' + hash} target="_blank">
          {t('ViewExplorer')}
        </a>
      ) : null}
      <div>
        <Button className="modal-btn" onClick={() => handle()}>
          {t('Dismiss')}
        </Button>
      </div>
    </div>
  )
}

const OrderNoifcation = ({ onDismiss = defaultOnDismiss, type, title, message, from }: NotificationProps) => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const mintState = useMintState()
  const hash = mintState.hash
  function handle() {
    onDismiss()
    if (from == 'close') {
      location.href = '/profile'
    } else {
      location.href = `/profile/${t('Farming')}`
    }
  }
  function disPatchHandle() {
    onDismiss()
    dispatch(upDateNewPositionInfo({ newPositionInfo: hash }))
    dispatch(upDateMintInitInfo({ mintInitInfo: hash }))
    dispatch(upDateFarmInitInfo({ farmInitInfo: hash }))
  }
  return (
    <Modal
      title={title}
      width={400}
      footer={null}
      visible={true}
      onOk={onDismiss}
      from={from}
      onCancel={type !== 'success' ? onDismiss : from == 'close' || from == 'farm' ? handle : disPatchHandle}
      message={message}>
      {type === 'success' ? (
        <RenderSuccess onDismiss={onDismiss} from={from} />
      ) : type === 'waitings' ? (
        <RenderWaitings message={message} />
      ) : type === 'noMessageWaitings' ? (
        <RenderNoMessageWaitings onDismiss={onDismiss} from={from} message={message} />
      ) : (
        <RenderRejected onDismiss={onDismiss} />
      )}
    </Modal>
  )
}

export default OrderNoifcation
