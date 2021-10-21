/** @format */

import react, {useState} from 'react'
import {Modal, Button, Input} from 'antd'
import SourceImg from '../../../img/stake/source@2x.png'
import NSDX from '../../../img/stake/logo.png'
import Auto from '../../../img/stake/nas.png'
import CoinLogo from '../../../img/stake/coin@2x.png'
import '../../../style/Staking/stake.less'
import useStakeFarms from 'hooks/autoStake/useStakeFarms'
import useMasterStakeFarms from 'hooks/deaufltPool/useStakeFarms'
import notification from 'utils/notification'
import {parseUnits} from 'ethers/lib/utils'

const defaultOnDismiss = () => null

type StakeProps = {
  onDismiss?: () => void
  poolInfo?: any
}

const Stake = ({onDismiss = defaultOnDismiss, poolInfo = {}}: StakeProps) => {
  const [amount, setAmount] = useState('')
  // 质押
  const {onStake} = useStakeFarms(0)
  const {onMasterStake} = useMasterStakeFarms(poolInfo.pid)
  const [requestedLoading, setRequestedLoading] = useState(false)

  const handleStake = async (amount: string) => {
    setRequestedLoading(true)
    // console.log(poolInfo.poolType, 'poolInfo.poolType##')
    if (poolInfo.poolType === 'PreIDO' || poolInfo.poolType === 'Lpfarming') {
      await onMasterStake(amount)
    } else {
      await onStake(amount)
    }
    setRequestedLoading(false)
    setAmount('')
    onDismiss()
    // notification({
    //   type: 'success',
    //   message: 'Stake Success',
    //   description: 'Stake NSDX Success',
    // })
  }
  return (
    <Modal title="Stake" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="stake-container">
        {poolInfo.poolType === 'Lpfarming' ? (
          <div className="liquidity-source-stake">
            <a href="https://quickswap.exchange/#/pool" target="_blank">
              From
              <img src={SourceImg} alt="" />
              Get NSDX-USDC LPT
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-link"></use>
              </svg>
            </a>
          </div>
        ) : null}

        <div className="liquidity-logo">
          <img
            src={poolInfo.poolType === 'vault' ? Auto : poolInfo.poolType === 'PreIDO' ? NSDX : CoinLogo}
            alt=""
            className={
              poolInfo.poolType === 'vault' ? 'Auto-img' : poolInfo.poolType === 'PreIDO' ? 'NSDX-img' : 'CoinLogo-img'
            }
          />
          {/* <img src={CoinLogo} alt="" /> */}
          <div className="liquidity-name">{poolInfo.symbol}</div>
        </div>
        <div className="amount">
          <div className="amount-header">
            <div className="amount-header-text">Input</div>
            <div className="amount-header-available">
              Available <span>{poolInfo.balance}</span>
            </div>
          </div>
          <div className="amount-input">
            <Input
              value={amount}
              placeholder="0.0"
              bordered={false}
              onChange={e => {
                e.target.value = e.target.value.replace(/[^\d\^.]/g, '')
                setAmount(e.target.value)
              }}></Input>
            <Button
              className="max-btn"
              disabled={poolInfo.balance === amount}
              onClick={() => {
                setAmount(poolInfo.balance)
              }}>
              MAX
            </Button>
          </div>
        </div>
        <Button
          className="stake-btn"
          disabled={Number(amount) > poolInfo.balance || !amount}
          onClick={() => handleStake(amount)}
          loading={requestedLoading}>
          Stake
        </Button>
      </div>
    </Modal>
  )
}

export default Stake
