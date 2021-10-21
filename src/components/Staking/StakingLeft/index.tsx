/** @format */

import react, {useEffect, useState} from 'react'
import {Button} from 'antd'
import '../../../style/Staking/stakingLeft.less'
import useModal from '../../../hooks/useModal'
import {formatUnits} from 'ethers/lib/utils'
import {useNSDX, useNSDXVault} from 'constants/hooks/useContract'
import {useActiveWeb3React} from 'hooks'
import {fixD, getpriceList} from 'utils'
import ClaimCard from '../StakingRight/claimBounty'
import tip from '../../../img/common/tips@2x.png'
import {useWalletModal} from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import {useStakeState} from 'state/stake/hooks'

const StakingLeft = () => {
  const NSDXVaultContract = useNSDXVault()
  const {account} = useActiveWeb3React()
  const [harvestBalance, setHarvestBalance] = useState('0.0')
  const [taotalHarvestBalance, setTotalarvestBalance] = useState('0.0')
  const [balance, setBalance] = useState('0.0')
  const [usdPrice, setUsdPrice]: any = useState({})
  const {login, logout} = useAuth()
  const stakeState = useStakeState()
  const {priceList} = stakeState
  const {onPresentConnectModal, onPresentAccountModal} = useWalletModal(login, logout, account || undefined)
  const NADXContract = useNSDX()
  const [openClaimCard] = useModal(
    <ClaimCard
      poolInfo={{
        harvestBalance,
        taotalHarvestBalance,
      }}></ClaimCard>,
  )

  async function getNadxBalance() {
    // 收割奖励
    // const harvestBalance = formatUnits(await NSDXVaultContract.calculateHarvestNSDXRewards(), 18)
    // setHarvestBalance(fixD(harvestBalance, 4))
    // console.log(harvestBalance,'harvestBalance###')
    // 用户当前代币余额
    const balance = formatUnits(await NADXContract.balanceOf(account), 18)
    setBalance(fixD(balance, 4))
    // 全部奖励
    // const totalHarvestBalance = formatUnits(await NSDXVaultContract.calculateTotalPendingNSDXRewards(), 18)
    // setTotalarvestBalance(fixD(totalHarvestBalance, 4))
    // try{

    // }catch(err){
    // console.log(err)
    // }
    // console.log(totalHarvestBalance,'totalHarvestBalance###')
    // const pricePerFullShare = formatUnits(await NSDXVaultContract.getPricePerFullShare(),18)
  }

  useEffect(() => {
    let timer: any
    const getBaseData = () => {
      if (account) {
        getNadxBalance()
      }
      // getAccountNadxBalance()
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
      {/* <div className="auto-nsdx">
        <div className="staking-left-title">
          <span>Auto NSDX Bounty</span>
          <div className="tip">
            <img src={tip} alt="" className="tip-img" />
            <div className="tip-hover">
              <p>This bounty is given as a reward for providing a service to other users.</p>
              <p>
                Whenever you successfully claim the bounty, you’re also helping out by activating the Auto NSDX Pool’s
                compounding function for everyone.
              </p>
              <p>Auto-Compound Bounty: 0.05% of all Auto NSDX pool users pending yield</p>
            </div>
          </div>
        </div>
        <div className="nsdx-usd">
          <div className="nsdx-num">{fixD(harvestBalance, 4)}</div>
          <div className="nsdx-num-usd">≈${fixD(Number(harvestBalance) * 0.25, 4)}</div>
        </div>
        {!account ? (
          <Button className="claim-btn" onClick={() => onPresentConnectModal()}>
            Connect
          </Button>
        ) : Number(harvestBalance) * 0.25 === 0 ? (
          <Button className="claim-btn" disabled>
            Claim
          </Button>
        ) : (
          <Button className="claim-btn" onClick={openClaimCard}>
            Claim
          </Button>
        )}
      </div> */}

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
