/** @format */

import react, { useState, useEffect } from 'react'
import { Input, Modal } from 'antd'
import '../../style/setting.less'
import { upDateTradeDeadline, upDateTradeSlippageTolerance } from '../../../src/state/trade/actions'
import { upDateFarmDeadline, upDateFarmSlippageTolerance } from 'state/farm/actions'
import { upDateMintSlippageTolerance, upDateMintDeadline } from 'state/mint/actions'
import { upDateProfileSlippageTolerance, upDateProfileMintDeadline } from 'state/common/actions'
import { useFarmState } from 'state/farm/hooks'
import { useMintState } from 'state/mint/hooks'
import { useTradeState } from 'state/trade/hooks'
import { useCommonState } from 'state/common/hooks'
import { useDispatch } from 'react-redux'
import warning from '../../img/mint/warning.png'
import waringPng from '../../img/common/waring@2x.png'
import { useTranslation } from 'react-i18next'
const defaultOnDismiss = () => null

type TradeSettingProps = {
  onDismiss?: () => void
  poolInfo?: any
  from?: string
}

const slippageArr = ['0.1', '0.5', '1']
const TradeSetting = ({ onDismiss = defaultOnDismiss, from }: TradeSettingProps) => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const farmState = useFarmState()
  const tradeState = useTradeState()
  const mintState = useMintState()
  const commonState = useCommonState()
  const [setting, setSetting] = useState(
    from == 'farm'
      ? farmState.slippageTolerance
      : from == 'trade'
        ? tradeState.slippageTolerance
        : from == 'mint'
          ? mintState.slippageTolerance
          : from == 'profile'
            ? commonState.profileSlippageTolerance
            : '0.1',
  )
  const [deadline, setDeadline] = useState(
    from == 'farm'
      ? farmState.deadline
      : from == 'trade'
        ? tradeState.deadline
        : from == 'mint'
          ? mintState.deadline
          : from == 'profile'
            ? commonState.profileMintDeadline
            : '20',
  )
  useEffect(() => {
    if (from == 'trade') {
      dispatch(upDateTradeSlippageTolerance({ slippageTolerance: setting }))
      dispatch(upDateTradeDeadline({ deadline: deadline }))
    }
    if (from == 'mint') {
      dispatch(upDateMintSlippageTolerance({ slippageTolerance: setting }))
      dispatch(upDateMintDeadline({ deadline: deadline }))
    }
    if (from == 'farm') {
      dispatch(upDateFarmSlippageTolerance({ slippageTolerance: setting }))
      dispatch(upDateFarmDeadline({ deadline: deadline }))
    }
    if (from == 'profile') {
      dispatch(upDateProfileSlippageTolerance({ profileSlippageTolerance: setting }))
      dispatch(upDateProfileMintDeadline({ profileMintDeadline: deadline }))
    }
  }, [setting, deadline, from])
  return (
    <Modal title={t('Setting')} width={376} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="farm-setting">
        <div className="farm-setting-content">
          <div className="slippage-tolerance">{t('Slippagetolerance')}</div>
          <div className="input-content">
            {slippageArr.map((ele, key) => (
              <div
                className={['slippage-item', ele === setting ? 'slippage-item-active' : null].join(' ')}
                key={key}
                onClick={() => setSetting(ele)}>
                {ele}%
              </div>
            ))}
            <Input
              suffix="%"
              onClick={() => setSetting('')}
              value={setting}
              onChange={e => {
                e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1')
                setSetting(e.target.value)
              }}
            />
          </div>
        </div>
        {setting < 5 ? null : setting > 50 ? (
          <div className="available">
            <div className="content">
              <img src={warning} alt="" />
              <span>{t('validSlippage')}</span>
            </div>
          </div>
        ) : (
          <div className="tips-available">
            <div className="content">
              <img src={waringPng} alt="" />
              <span>{t('fronturn')}</span>
            </div>
          </div>
        )}
        {/* <div className="farm-setting-alert">Slippage must be within 2 decimal points</div> */}
        <div className="deadline">
          <p className="tx">{t('TxDeadline')} ({t('mins')})</p>
          <Input
            value={deadline}
            onChange={e => {
              e.target.value = e.target.value.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1')
              setDeadline(e.target.value)
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default TradeSetting
