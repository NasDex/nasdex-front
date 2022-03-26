/** @format */

import useModal from 'hooks/useModal'
import React, { useCallback, useEffect, useState } from 'react'
import CoinLogo from '../../../../img/stake/logo.png'
import StakeCard from '../stake'
import UntakeCard from '../unstake'
import ClaimCard from '../claimAll'
import CalculatorCard from '../deaufltCalculator'
import { Button } from 'antd'
import { useMasterchef, useNSDX, useNSDXVault } from 'constants/hooks/useContract'
import { useActiveWeb3React } from 'hooks'
import { formatUnits } from 'ethers/lib/utils'
import { fixD, getpriceList } from 'utils'
import useApproveFarm from 'hooks/deaufltPool/useApproveFarm'
import notification from 'utils/notification'
import useAuth from 'hooks/useAuth'
import { useWalletModal } from 'components/WalletModal'
import { MasterChefAddress, NSDXPrice, NSDXToken, NSDXVaultAddress } from '../../../../constants/index'
import { getLibrary } from 'utils/getLibrary'
import masterChefAbi from '../../../../constants/abis/masterChef.json'
import nadxVaultAbi from '../../../../constants/abis/nadxVault.json'
import nadxTokenAbi from '../../../../constants/abis/nadx.json'
import { ethers } from 'ethers'
import { useStakeState } from 'state/stake/hooks'
import { Skeleton } from 'antd'
import { useTranslation } from 'react-i18next'
interface DefaultPoolItem {
  pid: string
  symbol: string
  poolType: string
  decimals: number
  address: string
  allocPoint: number
  totalAllocPoint: number
  nsdxPerBlock: number
  vaultStakedBalance: number
  stakedBalance: number
  balance: number
}
interface DefaultPoolProps {
  DefaultPoolListArray: Array<DefaultPoolItem>
}
const DefaultPool: React.FC<DefaultPoolProps> = props => {
  const { DefaultPoolListArray } = props
  return (
    <div>
      {DefaultPoolListArray.map((ele, key) => (
        <DefaultPoolItem defaultPoolItem={ele} key={key}></DefaultPoolItem>
      ))}
    </div>
  )
}
const DefaultPoolItem: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState('')
  const [isApproved, setIsApproved] = useState(false)
  const [totalLiquidity, setTotalLiquidity] = useState('0')
  const [pendingNsdx, setpendingNsdx] = useState('')
  const [harvestBalance, setHarvestBalance] = useState('')
  const stakeState = useStakeState()
  const { priceList } = stakeState
  const { defaultPoolItem } = props
  const MasterChefContract = useMasterchef()
  const NSDXContract = useNSDX()
  const NSDXVaultContract = useNSDXVault()
  const { login, logout } = useAuth()
  const { account } = useActiveWeb3React()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const [poolInfo, setPoolInfo] = useState({
    allocPoint: 0,
    lastRewardBlock: '',
  })
  async function getPoolInfo() {
    const info: any = {}
    const poolInfoItem = await MasterChefContract.poolInfo(defaultPoolItem.pid)
    console.log('poolInfoItem', poolInfoItem)
    info.lastRewardBlock = poolInfoItem.lastRewardBlock.toString()
    info.allocPoint = poolInfoItem.allocPoint.toString()
    setPoolInfo(info)
    const totalNadx = formatUnits(await NSDXContract.balanceOf(MasterChefAddress), defaultPoolItem.decimals)
    setTotalLiquidity(totalNadx)
  }
  async function getUserInfo() {
    const balance = formatUnits(await NSDXContract.balanceOf(account), defaultPoolItem.decimals)
    setBalance(fixD(balance, 4))
    const stakedBalance = await MasterChefContract.userInfo(defaultPoolItem.pid, account)
    const amountValue = formatUnits(stakedBalance.amount.toString(), defaultPoolItem.decimals)
    setAmount(fixD(amountValue, 8))
    const pendingNsdxValue = await MasterChefContract.pendingNSDX(defaultPoolItem.pid, account)
    const pendingNsdx = formatUnits(pendingNsdxValue.toString(), defaultPoolItem.decimals)
    setHarvestBalance(pendingNsdx)
    const totalNadx = formatUnits(await NSDXContract.balanceOf(MasterChefAddress), defaultPoolItem.decimals)
    setTotalLiquidity(totalNadx)
  }

  async function getAllowance() {
    const result = await NSDXContract.allowance(account, MasterChefAddress)
    const allowance = Number(formatUnits(result.toString(), defaultPoolItem.decimals))
    if (account && allowance <= 0) {
      setIsApproved(true)
    } else {
      setIsApproved(false)
    }
  }

  const { onApprove } = useApproveFarm(NSDXContract)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, account])

  const [apr, setApr] = useState('')
  const [openCalculatorCard] = useModal(<CalculatorCard apr={apr}></CalculatorCard>)

  useEffect(() => {
    async function calculateApr() {
      let aprP: any
      const tvlF = totalLiquidity
      const price = priceList.NSDX
      const totalAllocPoint = await MasterChefContract.totalAllocPoint()
      const nsdxPerBlock = await MasterChefContract.nsdxPerBlock()
      const day = Number(formatUnits(nsdxPerBlock, 18)) * 43200
      if (Number(formatUnits(nsdxPerBlock, 18)) > 0 && Number(tvlF)) {
        aprP =
          ((day * (poolInfo.allocPoint / Number(totalAllocPoint.toString())) * price * 365) / (Number(tvlF) * price)) * 100
      } else {
        aprP = ''
      }
      if (aprP < 100000000) {
        const result = fixD(aprP, 2)
        setApr(result as string)
      } else {
        setApr('Infinity')
      }
    }
    if (totalLiquidity && priceList.NSDX && poolInfo.allocPoint && defaultPoolItem.totalAllocPoint) {
      calculateApr()
    }
  }, [totalLiquidity, priceList])

  useEffect(() => {
    let timer: any
    const getBaseData = () => {
      getPoolInfo()
      if (account) {
        getUserInfo()
        getAllowance()
      }
      return getBaseData
    }
    if (MasterChefContract && NSDXContract && NSDXVaultContract) {
      timer = setInterval(getBaseData(), 30000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [account, MasterChefContract, NSDXContract, NSDXVaultContract])

  const [openStakeCard] = useModal(
    <StakeCard
      poolInfo={{
        ...defaultPoolItem,
        balance,
        poolType: 'PreIDO',
      }}></StakeCard>,
  )
  const [openUntakeCard] = useModal(
    <UntakeCard
      poolInfo={{
        ...defaultPoolItem,
        amount,
      }}></UntakeCard>,
  )
  const [openClaimCard] = useModal(
    <ClaimCard
      poolInfo={{
        ...defaultPoolItem,
        harvestBalance,
      }}></ClaimCard>,
  )

  return (
    <div className="liquidity-item">
      <div className="liquidity-header">
        <div className="liquidity-logo">
          <img src={CoinLogo} alt="" className="liquidity-naxlogo-img" />
          <div className="liquidity-name">{defaultPoolItem.symbol}</div>
        </div>

        {/* <div className="liquidity-source">
    <a href="https://quickswap.exchange/#/pool" target="_blank">
      From
      <img src={SourceImg} alt="" />
      Get NSDX-USDC LPT
      <svg className="icon" aria-hidden="true">
        <use xlinkHref="#icon-link"></use>
      </svg>
    </a>
  </div> */}
      </div>

      <div className="liquidity-bottom">
        <div className="total-liquidity">
          <div className="title">{fixD(totalLiquidity, 4)} </div>
          <div className="text">{t('TotalStaked')}</div>
        </div>
        <div className="apr">
          <div className="title">
            {!apr ? <Skeleton active paragraph={{ rows: 0 }} /> : `${apr}%`}

            {/* {apr}% */}
            <svg className="icon" aria-hidden="true" onClick={openCalculatorCard}>
              <use xlinkHref="#icon-calculator"></use>
            </svg>
          </div>
          <div className="text">{t('APR')}</div>
        </div>
        {!account ? (
          <Button className="pc-stake-btn" onClick={() => onPresentConnectModal()}>
            {t('Connect')}
          </Button>
        ) : !isApproved ? (
          <Button className="pc-stake-btn" onClick={openStakeCard}>
            {t('Stake')}
          </Button>
        ) : (
          <Button className="pc-stake-btn" onClick={() => handleApprove()} loading={requestedApproval}>
            {t('Approve')}
          </Button>
        )}
      </div>
      {!account ? (
        <Button className="h5-stake-btn" onClick={() => onPresentConnectModal()}>
          {t('Connect')}
        </Button>
      ) : !isApproved ? (
        <Button className="h5-stake-btn" onClick={openStakeCard}>
          {t('Stake')}
        </Button>
      ) : (
        <Button className="h5-stake-btn" onClick={() => handleApprove()} loading={requestedApproval}>
          {t('Approve')}
        </Button>
      )}
      {Number(harvestBalance) > 0 ? (
        Number(amount) > 0 ? (
          <span className="line"></span>
        ) : null
      ) : Number(amount) > 0 ? (
        <span className="line"></span>
      ) : null}
      <div className="claim-unstake">
        {Number(harvestBalance) > 0 ? (
          <div className="claim">
            <div className="left">
              <span>{t('Rewards')} (NSDX)</span>
              <p>{fixD(harvestBalance, 4)}</p>
              <p>≈${fixD(Number(harvestBalance) * priceList.NSDX, 4)}</p>
            </div>
            {!account ? (
              <Button className="pc-stake-btn" onClick={() => onPresentConnectModal()}>
                {t('Connect')}
              </Button>
            ) : (
              <Button onClick={() => openClaimCard()}>{t('Claim')}</Button>
            )}
          </div>
        ) : null}
        {Number(amount) > 0 ? (
          <div className="claim">
            <div className="left">
              <span>{t('Staked')}</span>
              <p>{fixD(amount, 4)}</p>
              <p>≈${fixD(Number(amount) * priceList.NSDX, 4)}</p>
            </div>
            {!account ? (
              <Button className="pc-stake-btn" onClick={() => onPresentConnectModal()}>
                {t('Connect')}
              </Button>
            ) : !isApproved ? (
              <Button className="pc-stake-btn" onClick={openUntakeCard}>
                {t('Unstake')}
              </Button>
            ) : (
              <Button className="pc-stake-btn" onClick={() => handleApprove()} loading={requestedApproval}>
                {t('Approve')}
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DefaultPool
