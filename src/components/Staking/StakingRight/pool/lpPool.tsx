/** @format */

import useModal from 'hooks/useModal'
import React, {useCallback, useEffect, useState} from 'react'
import CoinLogo from '../../../../img/stake/coin@2x.png'
import StakeCard from '../stake'
import UntakeCard from '../unstake'
import ClaimCard from '../claimAll'
import {Button} from 'antd'
import SourceImg from '../../../../img/stake/source@2x.png'
import {useLpContract, useMasterchef, useNSDX, useNSDXVault} from 'constants/hooks/useContract'
import CalculatorCard from '../deaufltCalculator'
import useAuth from 'hooks/useAuth'
import {useActiveWeb3React} from 'hooks'
import {useWalletModal} from 'components/WalletModal'
import {getLibrary} from 'utils/getLibrary'
import {ethers} from 'ethers'
import {MasterChefAddress} from '../../../../constants/index'
import masterChefAbi from '../../../../constants/abis/masterChef.json'
import {NSDXToken} from '../../../../constants/index'
import {formatUnits} from 'ethers/lib/utils'
import {fixD, getpriceList} from 'utils'
import useApproveFarm from 'hooks/deaufltPool/useApproveFarm'
import nadxTokenAbi from '../../../../constants/abis/nadx.json'
import {useStakeState} from 'state/stake/hooks'
import {Skeleton} from 'antd'

interface LpPoolItem {
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
interface LpPoolProps {
  LpPoolListArray: Array<LpPoolItem>
  setLpTotalPrice?: (...args: number[]) => void
}
const LPPool: React.FC<LpPoolProps> = props => {
  const {LpPoolListArray, setLpTotalPrice} = props

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
  const [accountLpPrice,setAccountLpPrice] = useState(0)
  const stakeState = useStakeState()
  const {priceList} = stakeState
  const {lpPoolItem, setLpTotalPrice} = props
  const MasterChefContract = useMasterchef()
  const NADXContract = useNSDX()
  // const NSDXVaultContract = useNSDXVault()
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
    // const LPContract = new ethers.Contract(lpPoolItem.address, lpPoolItem.abi, library)
    // 普通创建合约未链接钱包获取数据
    // const MasterChefContract = new ethers.Contract(MasterChefAddress, masterChefAbi, library)
    const info: any = {}
    const poolInfoItem = await MasterChefContract.poolInfo(lpPoolItem.pid)
    info.lastRewardBlock = poolInfoItem.lastRewardBlock.toString()
    info.allocPoint = poolInfoItem.allocPoint.toString()
    setPoolInfo(info)
    // 普通创建合约未链接钱包获取数据

    // 所有已质押代币
    const totalNadx = formatUnits(await LPContract.balanceOf(MasterChefAddress), lpPoolItem.decimals)
    setTotalLiquidity(totalNadx)

    // const info: any = {}
    // const poolInfoItem = await MasterChefContract.poolInfo(lpPoolItem.pid)
    // info.lastRewardBlock = poolInfoItem.lastRewardBlock.toString()
    // info.allocPoint = poolInfoItem.allocPoint.toString()
    // setPoolInfo(info)
  }

  // 获取用户信息
  async function getUserInfo() {
    // 用户当前代币余额
    const balance = formatUnits(await LPContract.balanceOf(account), lpPoolItem.decimals)
    setBalance(fixD(balance, 8))
    // 用户已质押代币
    const stakedBalance = await MasterChefContract.userInfo(lpPoolItem.pid, account)
    const amountValue = formatUnits(stakedBalance.amount.toString(), lpPoolItem.decimals)
    setAmount(fixD(amountValue, 8))
    // console.log(amountValue,'amountValue##')
    // 待收割奖励
    const pendingNsdxValue = await MasterChefContract.pendingNSDX(lpPoolItem.pid, account)
    const pendingNsdx = formatUnits(pendingNsdxValue.toString(), lpPoolItem.decimals)
    setHarvestBalance(pendingNsdx)
    // 用户已质押代币
    // const accountNadx = formatUnits(await LPContract.balanceOf(account), lpPoolItem.decimals)
    // setTotalLiquidity(totalNadx)
    // console.log(accountNadx,'accountNadx##')
    // 所有已质押代币
    // const totalNadx = formatUnits(await NADXContract.balanceOf(MasterChefAddress), lpPoolItem.decimals)
    // setTotalLiquidity(totalNadx)
    // const totalNadx = formatUnits(await LPContract.balanceOf(account), lpPoolItem.decimals)
    // setTotalLiquidity(totalNadx)

    // console.log(balance,amountValue,totalNadx,pendingNsdx)
  }
  const LPContract = useLpContract()
  // 是否授权
  async function getAllowance() {
    const result = await LPContract.allowance(account, MasterChefAddress)
    const allowance = Number(formatUnits(result.toString(), lpPoolItem.decimals))
    if (account && allowance <= 0) {
      setIsApproved(true)
    } else {
      setIsApproved(false)
    }
  }

  // 授权
  const {onApprove} = useApproveFarm(LPContract)
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
  const [reserves, setReserves] = useState([])
  const [totalSupply, setTotalSupply] = useState(0)
  async function getReservesAndTotalSupply() {
    // const provider = window.ethereum
    // const library = getLibrary(provider)
    // const LPContract = new ethers.Contract(lpPoolItem.address, lpPoolItem.abi, library)
    const totalSupplyValue = Number(formatUnits(await LPContract.totalSupply(), lpPoolItem.decimals))
    setTotalSupply(totalSupplyValue)
    const reservesValue = await LPContract.getReserves()
    setReserves(reservesValue)
  }
  const [totalSupplyPrice, setTotalSupplyPrice] = useState('0')
  useEffect(() => {
    async function calculateApr() {
      // const nsdxPerBlock = await MasterChefContract.nsdxPerBlock()
      let aprP: any = 0
      const tvlF = totalLiquidity
      // const price = NSDXPrice
      const price = priceList.NSDX

      const day = lpPoolItem.nsdxPerBlock * 43200
      let currencyANum = 0
      let currencyBNum = 0
      if (reserves && reserves[0]) {
        currencyANum = Number(formatUnits(reserves[0], lpPoolItem.decimals)) * priceList[lpPoolItem.currencyA]
      }
      if (reserves && reserves[1]) {
        currencyBNum = Number(formatUnits(reserves[1], lpPoolItem.decimals)) * priceList[lpPoolItem.currencyB]
      }
      const num = (Number(tvlF) / Number(totalSupply)) * Number(currencyANum + currencyBNum)
      const accountNum = (Number(amount) / Number(totalSupply)) * Number(currencyANum + currencyBNum)
      // console.log(accountNum,'accountNum##')
      setAccountLpPrice(accountNum)
      setTotalSupplyPrice(fixD(num, 2))
      setLpTotalPrice(num)
      if (lpPoolItem.nsdxPerBlock && Number(tvlF)) {
        aprP = ((day * (poolInfo.allocPoint / lpPoolItem.totalAllocPoint) * price * 365) / num) * 100
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

    if (
      totalLiquidity &&
      reserves[0] &&
      reserves[1] &&
      totalSupply &&
      priceList[lpPoolItem.currencyA] &&
      priceList[lpPoolItem.currencyB]
    ) {
      calculateApr()
    }
  }, [totalLiquidity, reserves, totalSupply, priceList])

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
            {!apr ? <Skeleton active paragraph={{rows: 0}} /> : `${apr}%`}
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

      {/* <span className="line"></span> */}
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
              <p>≈${fixD(accountLpPrice,4)}</p>
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
