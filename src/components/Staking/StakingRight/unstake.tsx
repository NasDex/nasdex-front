/** @format */

import react, { useState } from 'react'
import { Modal, Button, Input } from 'antd'
import SourceImg from '../../../img/stake/source@2x.png'
import CoinLogo from '../../../img/stake/coin@2x.png'
import '../../../style/Staking/unstake.less'
import useUnstakeFarms from 'hooks/autoStake/useUnstakeFarms'
import useMasterUnstakeFarms from 'hooks/deaufltPool/useUnstakeFarms'

const defaultOnDismiss = () => null

type StakeProps = {
  onDismiss?: () => void
  poolInfo?: any
}

const Stake = ({ onDismiss = defaultOnDismiss, poolInfo = {} }: StakeProps) => {
  const [amount, setAmount] = useState('')
  const [requestedLoading, setRequestedLoading] = useState(false)

  const { onUnstake } = useUnstakeFarms(0)
  const { onMasterUnstake } = useMasterUnstakeFarms(poolInfo.pid)

  const handleUnstake = async (amount: string) => {
    setRequestedLoading(true)
    if (poolInfo.poolType === 'PreIDO' || poolInfo.poolType === 'Lpfarming') {
      await onMasterUnstake(amount)
    } else {
      await onUnstake(amount)
    }
    setRequestedLoading(false)
    onDismiss()
  }

  return (
    <Modal title="Unstake" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="unstake-container">
        <div className="liquidity-logo">
          <img src={CoinLogo} alt="" />
          <div className="liquidity-name">{poolInfo.symbol}</div>
        </div>
        <div className="amount">
          <div className="amount-header">
            <div className="amount-header-text">Input</div>
            <div className="amount-header-available">
              Available <span>{poolInfo.amount}</span>
            </div>
          </div>
          <div className="amount-input">
            <Input
              value={amount}
              bordered={false}
              placeholder="0.0"
              onChange={e => {
                e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
                setAmount(e.target.value)
              }}></Input>
            <Button
              className="max-btn"
              disabled={poolInfo.amount === amount}
              onClick={() => {
                setAmount(poolInfo.amount)
              }}>
              MAX
            </Button>
          </div>
        </div>
        <Button
          className="stake-btn"
          disabled={Number(amount) > poolInfo.amount || !amount}
          loading={requestedLoading}
          onClick={() => handleUnstake(amount)}>
          Unstake
        </Button>
      </div>
    </Modal>
  )
}

export default Stake
