/** @format */

import react, { useEffect, useState } from 'react'
import { Button } from 'antd'
import '../../../style/Staking/stakingLeft.less'
import useModal from '../../../hooks/useModal'
import { formatUnits } from 'ethers/lib/utils'
import { useNSDX, useNSDXVault } from 'constants/hooks/useContract'
import { useActiveWeb3React } from 'hooks'
import { fixD, getpriceList } from 'utils'
import ClaimCard from '../StakingRight/claimBounty'
import tip from '../../../img/common/tips@2x.png'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import { useStakeState } from 'state/stake/hooks'

const StakingLeft = () => {
  const NSDXVaultContract = useNSDXVault()
  const { account } = useActiveWeb3React()
  const [harvestBalance, setHarvestBalance] = useState('0.0')
  const [taotalHarvestBalance, setTotalarvestBalance] = useState('0.0')
  const [balance, setBalance] = useState('0.0')
  const [usdPrice, setUsdPrice]: any = useState({})
  const { login, logout } = useAuth()
  const stakeState = useStakeState()
  const { priceList } = stakeState
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const NADXContract = useNSDX()
  const [openClaimCard] = useModal(
    <ClaimCard
      poolInfo={{
        harvestBalance,
        taotalHarvestBalance,
      }}></ClaimCard>,
  )

  async function getNadxBalance() {
    const balance = formatUnits(await NADXContract.balanceOf(account), 18)
    setBalance(fixD(balance, 4))
  }

  useEffect(() => {
    let timer: any
    const getBaseData = () => {
      if (account) {
        getNadxBalance()
      }
      return getBaseData
    }
    if (NADXContract && NSDXVaultContract) {
      timer = setInterval(getBaseData(), 30000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [account, NADXContract, NSDXVaultContract])

  return (
    <div className="staking-left">

      <div className="nsdx-balance">
        <div className="staking-left-title">NSDX Balance</div>
        <div className="nsdx-usd">
          <div className="nsdx-num">{balance}</div>
          <div className="nsdx-num-usd">≈${fixD(Number(balance) * Number(priceList.NSDX), 4)}</div>
        </div>
        <div className="nsdx-price">
          <div className="nsdx-text">NSDX Price</div>
          <div>
            $ <span className="nsdx-usd">{fixD(priceList.NSDX, 2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default StakingLeft
