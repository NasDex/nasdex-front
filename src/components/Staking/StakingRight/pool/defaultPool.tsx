/** @format */

import useModal from 'hooks/useModal'
import React, {useCallback, useEffect, useState} from 'react'
import CoinLogo from '../../../../img/stake/logo.png'
import StakeCard from '../stake'
import UntakeCard from '../unstake'
import ClaimCard from '../claimAll'
import CalculatorCard from '../deaufltCalculator'
import {Button} from 'antd'
import {useMasterchef, useNSDX, useNSDXVault} from 'constants/hooks/useContract'
import {useActiveWeb3React} from 'hooks'
import {formatUnits} from 'ethers/lib/utils'
import {fixD, getpriceList} from 'utils'
import useApproveFarm from 'hooks/deaufltPool/useApproveFarm'
import notification from 'utils/notification'
import useAuth from 'hooks/useAuth'
import {useWalletModal} from 'components/WalletModal'
import {MasterChefAddress, NSDXPrice, NSDXToken, NSDXVaultAddress} from '../../../../constants/index'
import {getLibrary} from 'utils/getLibrary'
import masterChefAbi from '../../../../constants/abis/masterChef.json'
import nadxVaultAbi from '../../../../constants/abis/nadxVault.json'
import nadxTokenAbi from '../../../../constants/abis/nadx.json'
import {ethers} from 'ethers'
import {useStakeState} from 'state/stake/hooks'
import {Skeleton} from 'antd'

interface DefaultPoolItem {
  pid: string
  symbol: string
  poolType: string
  decimals: number
  address: string
  allocPoint: number
  totalAllocPoint: number
  nsdxPerBlock: number
  vaultStakedBalance: number //已质押到复投合约的数量
  stakedBalance: number // 已质押到MasterChef合约的数量
  balance: number //可用数量
}
interface DefaultPoolProps {
  DefaultPoolListArray: Array<DefaultPoolItem>
}
const DefaultPool: React.FC<DefaultPoolProps> = props => {
  const {DefaultPoolListArray} = props
  return (
    <div>
      {DefaultPoolListArray.map((ele, key) => (
        <DefaultPoolItem defaultPoolItem={ele} key={key}></DefaultPoolItem>
      ))}
    </div>
  )
}
const DefaultPoolItem: React.FC<any> = props => {
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState('')
  const [isApproved, setIsApproved] = useState(false)
  const [totalLiquidity, setTotalLiquidity] = useState('0')
  const [pendingNsdx, setpendingNsdx] = useState('')
  const [harvestBalance, setHarvestBalance] = useState('')
  const stakeState = useStakeState()
  const {priceList} = stakeState
  const {defaultPoolItem} = props
  const MasterChefContract = useMasterchef()
  const NSDXContract = useNSDX()
  const NSDXVaultContract = useNSDXVault()
  const {login, logout} = useAuth()
  const {account} = useActiveWeb3React()
  const {onPresentConnectModal, onPresentAccountModal} = useWalletModal(login, logout, account || undefined)
  // 获取池子信息
  const [poolInfo, setPoolInfo] = useState({
    allocPoint: 0,
    lastRewardBlock: '',
  })
  async function getPoolInfo() {
    // const provider = window.ethereum
    // const library = getLibrary(provider)
    // 普通创建合约未链接钱包获取数据
    // const MasterChefContract = new ethers.Contract(MasterChefAddress, masterChefAbi, library)
    const info: any = {}
    const poolInfoItem = await MasterChefContract.poolInfo(defaultPoolItem.pid)
    info.lastRewardBlock = poolInfoItem.lastRewardBlock.toString()
    info.allocPoint = poolInfoItem.allocPoint.toString()
    setPoolInfo(info)
    // 普通创建合约未链接钱包获取数据
    // const NSDXContract = new ethers.Contract(NSDXToken, nadxTokenAbi, library)
    // 所有已质押代币
    const totalNadx = formatUnits(await NSDXContract.balanceOf(MasterChefAddress), defaultPoolItem.decimals)
    setTotalLiquidity(totalNadx)

    // const info: any = {}
    // const poolInfoItem = await MasterChefContract.poolInfo(defaultPoolItem.pid)
    // info.lastRewardBlock = poolInfoItem.lastRewardBlock.toString()
    // info.allocPoint = poolInfoItem.allocPoint.toString()
    // setPoolInfo(info)
  }

  // 获取用户信息
  async function getUserInfo() {
    // 用户当前代币余额
    const balance = formatUnits(await NSDXContract.balanceOf(account), defaultPoolItem.decimals)
    setBalance(fixD(balance, 4))
    // 用户已质押代币
    const stakedBalance = await MasterChefContract.userInfo(defaultPoolItem.pid, account)
    const amountValue = formatUnits(stakedBalance.amount.toString(), defaultPoolItem.decimals)
    setAmount(fixD(amountValue, 8))
    // 待收割奖励
    const pendingNsdxValue = await MasterChefContract.pendingNSDX(defaultPoolItem.pid, account)
    const pendingNsdx = formatUnits(pendingNsdxValue.toString(), defaultPoolItem.decimals)
    setHarvestBalance(pendingNsdx)
    // 所有已质押代币
    const totalNadx = formatUnits(await NSDXContract.balanceOf(MasterChefAddress), defaultPoolItem.decimals)
    setTotalLiquidity(totalNadx)

    // console.log(balance,amountValue,totalNadx,pendingNsdx)
  }

  // 是否授权
  async function getAllowance() {
    const result = await NSDXContract.allowance(account, MasterChefAddress)
    const allowance = Number(formatUnits(result.toString(), defaultPoolItem.decimals))
    if (account && allowance <= 0) {
      setIsApproved(true)
    } else {
      setIsApproved(false)
    }
  }

  // 授权
  const {onApprove} = useApproveFarm(NSDXContract)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
      // notification({
      //   type: 'success',
      //   message: 'Approve Success',
      //   description: 'Approve NSDX Success',
      // })
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, account])

  // 设置Apr
  const [apr, setApr] = useState('')
  const [openCalculatorCard] = useModal(<CalculatorCard apr={apr}></CalculatorCard>)

  useEffect(() => {
    async function calculateApr() {
      // const nsdxPerBlock = await MasterChefContract.nsdxPerBlock()
      let aprP: any
      const tvlF = totalLiquidity
      // const price = NSDXPrice
      const price = priceList.NSDX

      const day = defaultPoolItem.nsdxPerBlock * 43200
      if (Number(defaultPoolItem.nsdxPerBlock) > 0 && Number(tvlF)) {
        aprP =
          ((day * (poolInfo.allocPoint / defaultPoolItem.totalAllocPoint) * price * 365) / (Number(tvlF) * price)) * 100
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
          <div className="text">Total Staked (NSDX)</div>
        </div>
        <div className="apr">
          <div className="title">
            {!apr ? <Skeleton active paragraph={{rows: 0}} /> : `${apr}%`}

            {/* {apr}% */}
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
              <p>≈${fixD(Number(harvestBalance)*priceList.NSDX, 4)}</p>
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
              <p>≈${fixD(Number(amount)*priceList.NSDX, 4)}</p>
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

export default DefaultPool
