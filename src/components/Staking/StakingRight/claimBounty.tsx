/** @format */

import react, { useState } from 'react'
import { Modal, Button } from 'antd'
import '../../../style/Staking/claimBounty.less'
import useHarvestFarm from 'hooks/autoStake/useHarvestFarm'
import { NSDXPrice } from '../../../constants/index'
import { fixD } from 'utils'
import { useTranslation } from 'react-i18next'
const defaultOnDismiss = () => null

type ClaimBountyProps = {
  onDismiss?: () => void
  poolInfo?: any
}

const ClaimBounty = ({ onDismiss = defaultOnDismiss, poolInfo = {} }: ClaimBountyProps) => {
  const { onReward } = useHarvestFarm('0')
  const { t, i18n } = useTranslation()
  const [requestedLoding, setRequestedLoding] = useState(false)
  const handleHarvest = async (amount: string) => {
    setRequestedLoding(true)
    await onReward()
    setRequestedLoding(false)
    onDismiss()
  }
  return (
    <Modal title={t('ClaimBounty')} width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="claimBounty-container">
        <div className="claimBountyTop">
          <div className="left">{t('Youclaim')}</div>
          <div className="right">
            <p>{fixD(poolInfo.harvestBalance, 4)} NSDX</p>
            <span className="rightSpan">≈{fixD(poolInfo.harvestBalance * poolInfo.usdPrice, 4)} USD</span>
          </div>
        </div>
        <div className="text">
          <div className="item">
            <span>{t('Pooltotalpending')}</span>
            <p>{poolInfo.taotalHarvestBalance} NSDX</p>
          </div>
          <div className="item">
            <span>{t('Bounty')}</span>
            <p>0.05%</p>
          </div>
        </div>
        <Button
          className="claimBounty-btn"
          loading={requestedLoding}
          onClick={() => {
            handleHarvest(poolInfo.harvestBalance)
          }}>
          {t('Confirm')}
        </Button>
      </div>
    </Modal>
  )
}

export default ClaimBounty
