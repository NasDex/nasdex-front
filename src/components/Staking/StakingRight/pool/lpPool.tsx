/** @format */

import useModal from 'hooks/useModal'
import React, { useCallback, useEffect, useState } from 'react'
import CoinLogo from '../../../../img/stake/coin@2x.png'
import StakeCard from '../stake'
import UntakeCard from '../unstake'
import ClaimCard from '../claimAll'
import { Button } from 'antd'
import SourceImg from '../../../../img/stake/source@2x.png'
import { useLpContract, useMasterchef, useNSDX, useNSDXVault } from 'constants/hooks/useContract'
import CalculatorCard from '../deaufltCalculator'
import useAuth from 'hooks/useAuth'
import { useActiveWeb3React } from 'hooks'
import { useWalletModal } from 'components/WalletModal'
import { getLibrary } from 'utils/getLibrary'
import { ethers } from 'ethers'
import { MasterChefAddress } from '../../../../constants/index'
import masterChefAbi from '../../../../constants/abis/masterChef.json'
import { NSDXToken } from '../../../../constants/index'
import { formatUnits } from 'ethers/lib/utils'
import { fixD, getpriceList } from 'utils'
import useApproveFarm from 'hooks/deaufltPool/useApproveFarm'
import nadxTokenAbi from '../../../../constants/abis/nadx.json'
import { useStakeState } from 'state/stake/hooks'
import { Skeleton } from 'antd'
import { useDispatch } from 'react-redux'
import { setPriceList } from 'state/stake/actions'

interface LpPoolItem {
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
interface LpPoolProps {
  LpPoolListArray: Array<LpPoolItem>
  setLpTotalPrice?: (...args: number[]) => void
}
const LPPool: React.FC<LpPoolProps> = props => {
  const { LpPoolListArray, setLpTotalPrice } = props

  return (
    <div>
      {LpPoolListArray.map((ele, key) => (
        <LpPoolItem key={key} setLpTotalPrice={setLpTotalPrice} lpPoolItem={ele}></LpPoolItem>
      ))}
    </div>
  )
}
const LpPoolItem: React.FC<any> = props => {
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState('')
  const [isApproved, setIsApproved] = useState(false)
  const [totalLiquidity, setTotalLiquidity] = useState('0')
  const [harvestBalance, setHarvestBalance] = useState('')
  const [accountLpPrice, setAccountLpPrice] = useState(0)
  const stakeState = useStakeState()
  const { priceList } = stakeState
  const { lpPoolItem, setLpTotalPrice } = props
  const MasterChefContract = useMasterchef()
  const NADXContract = useNSDX()
  const { login, logout } = useAuth()
  const { account } = useActiveWeb3React()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const [poolInfo, setPoolInfo] = useState({
    allocPoint: 0,
    lastRewardBlock: '',
  })

  async function getPoolInfo() {
    const info: any = {}
    const poolInfoItem = await MasterChefContract.poolInfo(lpPoolItem.pid)
    info.lastRewardBlock = poolInfoItem.lastRewardBlock.toString()
    info.allocPoint = poolInfoItem.allocPoint.toString()
    setPoolInfo(info)
    const totalNadx = formatUnits(await LPContract.balanceOf(MasterChefAddress), lpPoolItem.decimals)
    setTotalLiquidity(totalNadx)

  }

  async function getUserInfo() {
    const balance = formatUnits(await LPContract.balanceOf(account), lpPoolItem.decimals)
    setBalance(fixD(balance, 8))
    const stakedBalance = await MasterChefContract.userInfo(lpPoolItem.pid, account)
    const amountValue = formatUnits(stakedBalance.amount.toString(), lpPoolItem.decimals)
    setAmount(fixD(amountValue, 8))
    const pendingNsdxValue = await MasterChefContract.pendingNSDX(lpPoolItem.pid, account)
    const pendingNsdx = formatUnits(pendingNsdxValue.toString(), lpPoolItem.decimals)
    setHarvestBalance(pendingNsdx)
  }
  const LPContract = useLpContract()
  async function getAllowance() {
    const result = await LPContract.allowance(account, MasterChefAddress)
    const allowance = Number(formatUnits(result.toString(), lpPoolItem.decimals))
    if (account && allowance <= 0) {
      setIsApproved(true)
    } else {
      setIsApproved(false)
    }
  }
  const { onApprove } = useApproveFarm(LPContract)
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
  const [reserves, setReserves] = useState([])
  const [totalSupply, setTotalSupply] = useState(0)
  const dispatch = useDispatch()
  const [totalSupplyPrice, setTotalSupplyPrice] = useState('0')

  async function getReservesAndTotalSupply() {
    const totalSupplyValue = Number(formatUnits(await LPContract.totalSupply(), lpPoolItem.decimals))
    setTotalSupply(totalSupplyValue)
    const reservesValue = await LPContract.getReserves()
    setReserves(reservesValue)
  }
  useEffect(() => {
    const tvlF = totalLiquidity
    let currencyANum = 0
    let currencyBNum = 0
    if (reserves && reserves[0]) {
      currencyANum = Number(formatUnits(reserves[0], 6))
    }
    if (reserves && reserves[1]) {
      currencyBNum = Number(formatUnits(reserves[1], lpPoolItem.decimals))
    }
    const num = (Number(tvlF) / Number(totalSupply)) * Number(currencyANum) * 2
    const accountNum = (Number(amount) / Number(totalSupply)) * Number(currencyANum) * 2
    dispatch(
      setPriceList({
        priceList: {
          NSDX: fixD(currencyANum / currencyBNum, 2),
        },
      }),
    )
    setAccountLpPrice(accountNum)
    setTotalSupplyPrice(fixD(num, 2))
    setLpTotalPrice(num)
  }, [totalSupplyPrice, totalLiquidity, reserves])

  useEffect(() => {
    async function calculateApr() {
      let aprP: any = 0
      const tvlF = totalLiquidity
      const price = priceList.NSDX

      const day = lpPoolItem.nsdxPerBlock * 43200

      if (lpPoolItem.nsdxPerBlock && Number(tvlF)) {
        aprP =
          ((day * (poolInfo.allocPoint / lpPoolItem.totalAllocPoint) * price * 365) / Number(totalSupplyPrice)) * 100
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

    if (totalLiquidity && totalSupply && totalSupplyPrice) {
      calculateApr()
    }
  }, [totalLiquidity, totalSupply, totalSupplyPrice])

  useEffect(() => {
    let timer: any
    const getBaseData = () => {
      getPoolInfo()
      getReservesAndTotalSupply()

      if (account) {
        getUserInfo()
        getAllowance()
      }
      return getBaseData
    }
    if (MasterChefContract && NADXContract) {
      timer = setInterval(getBaseData(), 30000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [account, MasterChefContract, NADXContract])

  const [openStakeCard] = useModal(
    <StakeCard
      poolInfo={{
        ...lpPoolItem,
        balance,
        poolType: 'PreIDO',
      }}></StakeCard>,
  )
  const [openUntakeCard] = useModal(
    <UntakeCard
      poolInfo={{
        ...lpPoolItem,
        amount,
      }}></UntakeCard>,
  )
  const [openClaimCard] = useModal(
    <ClaimCard
      poolInfo={{
        ...lpPoolItem,
        harvestBalance,
      }}></ClaimCard>,
  )
  return (
    <div className="liquidity-item liquidity-item-lp">
      <div className="liquidity-header">
        <div className="liquidity-logo">
          <img src={CoinLogo} alt="" />
          <div className="liquidity-name">NSDX - USDC LP</div>
        </div>

        <div className="liquidity-source">
          <a
            href="https://quickswap.exchange/#/add/0x3813e82e6f7098b9583FC0F33a962D02018B6803/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
            target="_blank">
            From
            <img src={SourceImg} alt="" />
            Get NSDX-USDC LPT
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-link"></use>
            </svg>
          </a>
        </div>
      </div>

      <div className="liquidity-bottom">
        <div className="total-liquidity">
          <div className="title">$ {fixD(totalSupplyPrice, 4)} </div>
          <div className="text">Total Liquidity</div>
        </div>
        <div className="apr">
          <div className="title">
            {/* {apr}% */}
            {!apr ? <Skeleton active paragraph={{ rows: 0 }} /> : `${apr}%`}
            <svg className="icon" aria-hidden="true" onClick={openCalculatorCard}>
              <use xlinkHref="#icon-calculator"></use>
            </svg>
          </div>
          <div className="text">APR</div>
        </div>
        {!account ? (
          <Button className="pc-stake-btn" onClick={() => onPresentConnectModal()}>
            Connect
          </Button>
        ) : !isApproved ? (
          <Button className="pc-stake-btn" onClick={openStakeCard}>
            Stake
          </Button>
        ) : (
          <Button className="pc-stake-btn" onClick={() => handleApprove()} loading={requestedApproval}>
            Approve
          </Button>
        )}
      </div>
      {!account ? (
        <Button className="h5-stake-btn" onClick={() => onPresentConnectModal()}>
          Connect
        </Button>
      ) : !isApproved ? (
        <Button className="h5-stake-btn" onClick={openStakeCard}>
          Stake
        </Button>
      ) : (
        <Button className="h5-stake-btn" onClick={() => handleApprove()} loading={requestedApproval}>
          Approve
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
              <span>Rewards (NSDX)</span>
              <p>{fixD(harvestBalance, 4)}</p>
              <p>≈${fixD(Number(harvestBalance) * priceList.NSDX, 4)}</p>
            </div>
            {!account ? (
              <Button className="pc-stake-btn" onClick={() => onPresentConnectModal()}>
                Connect
              </Button>
            ) : (
              <Button onClick={() => openClaimCard()}>Claim</Button>
            )}
          </div>
        ) : null}
        {Number(amount) > 0 ? (
          <div className="claim">
            <div className="left">
              <span>Staked</span>
              <p>{fixD(amount, 4)}</p>
              <p>≈${fixD(accountLpPrice, 4)}</p>
            </div>
            {!account ? (
              <Button className="pc-stake-btn" onClick={() => onPresentConnectModal()}>
                Connect
              </Button>
            ) : !isApproved ? (
              <Button className="pc-stake-btn" onClick={openUntakeCard}>
                Unstake
              </Button>
            ) : (
              <Button className="pc-stake-btn" onClick={() => handleApprove()} loading={requestedApproval}>
                Approve
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default LPPool
