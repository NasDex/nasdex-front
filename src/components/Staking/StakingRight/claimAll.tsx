/** @format */

import react, {useState} from 'react'
import {Modal, Button} from 'antd'
import logo from '../../../img/stake/logo.png'
import '../../../style/Staking/claimAll.less'
import useMasterHarvestFarm from 'hooks/deaufltPool/useHarvestFarm'
import {NSDXPrice} from '../../../constants/index'
import {fixD} from 'utils'

const defaultOnDismiss = () => null

type ClaimAllProps = {
  onDismiss?: () => void
  poolInfo?: any
}

const ClaimAll = ({onDismiss = defaultOnDismiss, poolInfo = {}}: ClaimAllProps) => {
  const {onMasterReward} = useMasterHarvestFarm(poolInfo.pid)
  const [requestedLoding, setRequestedLoding] = useState(false)
  const handleHarvest = async (amount: string) => {
    setRequestedLoding(true)
    try {
      await onMasterReward()
    } catch (e) {
      console.error(e)
    } finally {
      onDismiss()
      setRequestedLoding(false)
    }
  }
  return (
    <Modal title="Claim" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="claim-container">
        <img className="logo-img" src={logo} alt="" />
        <div className="text">
          <p className="textp">Rewards</p>
          <span>{fixD(poolInfo.harvestBalance, 4)}</span>≈${fixD(poolInfo.harvestBalance * poolInfo.usdPrice, 4)}
        </div>
        <Button className="claim-btn" loading={requestedLoding} onClick={() => handleHarvest(poolInfo.harvestBalance)}>
          Claim
        </Button>
      </div>
    </Modal>
  )
}

export default ClaimAll
