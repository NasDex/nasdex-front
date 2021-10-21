/** @format */

import react, {useState} from 'react'
import '../../../style/Staking/stakingRight.less'
import {useMasterchef, useNSDX, useNSDXVault} from 'constants/hooks/useContract'
import {useActiveWeb3React} from 'hooks'
import {NSDXToken, MasterChefAddress, NSDXVaultAddress} from '../../../constants/index'
import {formatUnits} from 'ethers/lib/utils'
import {useEffect} from 'react'
import AutoPool from './pool/autoPool'
import DefaultPool from './pool/defaultPool'
import LpPool from './pool/lpPool'
import {fixD, getpriceList} from 'utils'
import {getLibrary} from 'utils/getLibrary'
import masterChefAbi from '../../../constants/abis/masterChef.json'
import nadxVaultAbi from '../../../constants/abis/nadxVault.json'
import nadxTokenAbi from '../../../constants/abis/nadx.json'
import LpAbi from '../../../constants/abis/lpContract.json'
import {ethers} from 'ethers'
import {useStakeState} from 'state/stake/hooks'
import {setPriceList} from 'state/stake/actions'

const poolBaseInfo = [
  {
    pid: '0',
    symbol: 'Auto NSDX',
    poolType: 'vault',
    decimals: 18,
    address: '0xf495C59dF44a9784FEcaC65307C2848a99a59D00',
    allocPoint: 0,
    totalAllocPoint: 0,
    nsdxPerBlock: 0,
    vaultStakedBalance: 0, //已质押到复投合约的数量
    stakedBalance: 0, // 已质押到MasterChef合约的数量
    balance: 0, //可用数量
    usdPrice: '',
  },
  {
    pid: '0',
    symbol: 'NSDX',
    poolType: 'PreIDO',
    decimals: 18,
    address: '0xf495C59dF44a9784FEcaC65307C2848a99a59D00',
    allocPoint: 1000,
    totalAllocPoint: 3000,
    nsdxPerBlock: 0.35,
    vaultStakedBalance: 0, //已质押到复投合约的数量
    stakedBalance: 0, // 已质押到MasterChef合约的数量
    balance: 0, //可用数量
    usdPrice: '',
  },
  {
    pid: '1',
    symbol: 'NSDX - USDC LP',
    poolType: 'Lpfarming',
    decimals: 18,
    address: '0x56B8936a96cD5EE5C5837F385a19B4c2999fD74a',
    allocPoint: 2000,
    totalAllocPoint: 3000,
    nsdxPerBlock: 0.35,
    vaultStakedBalance: 0, //已质押到复投合约的数量
    stakedBalance: 0, // 已质押到MasterChef合约的数量
    balance: 0, //可用数量
    usdPrice: '',
    abi: LpAbi,
    currencyA: 'NSDX',
    currencyB: 'USDC',
  },
]

const StakingRight = () => {
  const {account} = useActiveWeb3React()
  // 获取质押代币余额
  const NSDXContract = useNSDX()
  // const NSDXVaultContract = useNSDXVault()
  const MasterChefContract = useMasterchef()
  // const provider = window.ethereum
  // const library = getLibrary(provider)
  // 普通创建合约未链接钱包获取数据
  // const MasterChefContract = new ethers.Contract(MasterChefAddress, masterChefAbi, library)
  // const NSDXVaultContract = new ethers.Contract(NSDXVaultAddress, nadxVaultAbi, library)
  // const NSDXContract = new ethers.Contract(NSDXToken, nadxTokenAbi, library)

  const stakeState = useStakeState()
  const {priceList} = stakeState

  useEffect(() => {
    let timer: any
    const getBaseData = () => {
      initData()
      return getBaseData
    }
    if (NSDXContract) {
      timer = setInterval(getBaseData(), 300000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [account, NSDXContract])

  const [poolInfoArray, setPoolInfoArray] = useState(poolBaseInfo)
  const [totalLiquidity, setTotalLiquidity] = useState(0)
  const [lpTotalPrice, setLpTotalPrice] = useState(0)
  // const NADXContract = useNSDX()

  // 获取基础数据
  async function initData() {
    if (MasterChefContract && NSDXContract) {
      // 每个区块产生的奖励数量
      // const nsdxPerBlock = formatUnits(await MasterChefContract.nsdxPerBlock(), 18)
      // 所有池子的总权重
      // const totalAllocPoints = await MasterChefContract.totalAllocPoint()
      // 所有已质押代币
      const totalNadx = formatUnits(await NSDXContract.balanceOf(MasterChefAddress), 18)

      // 复投池所有已质押代币
      // const autoTotalNadx = Number(formatUnits(await NSDXVaultContract.balanceOf(), 18))
      // setTotalLiquidity(Number(totalNadx) + Number(autoTotalNadx))
      setTotalLiquidity(Number(totalNadx))

      for (let i = 0; i < poolBaseInfo.length; i++) {
        // poolBaseInfo[i].totalAllocPoint = Number(totalAllocPoints)
        // poolBaseInfo[i].nsdxPerBlock = Number(nsdxPerBlock)
        poolBaseInfo[i].usdPrice = priceList.NSDX
      }
      setPoolInfoArray(poolBaseInfo)
    }
  }

  const AutoPoolListArray = poolBaseInfo.filter(ele => ele.poolType === 'vault')
  const DefaultPoolListArray = poolBaseInfo.filter(ele => ele.poolType === 'PreIDO')
  const LpPoolListArray = poolBaseInfo.filter(ele => ele.poolType === 'Lpfarming')

  return (
    <div className="staking-right">
      <div className="liquidity">
        <div className="liquidity-banner">
          <div className="total-liquidity">
            <div className="total-liquidity-title">
              $ {fixD(Number(totalLiquidity) * Number(priceList.NSDX) + lpTotalPrice, 4)}
            </div>
            <div className="total-liquidity-text">Total Value Locked</div>
          </div>
        </div>
        <div className="liquidity-content">
          {/* <AutoPool AutoPoolListArray={AutoPoolListArray}></AutoPool> */}
          <DefaultPool DefaultPoolListArray={DefaultPoolListArray}></DefaultPool>
          <LpPool LpPoolListArray={LpPoolListArray} setLpTotalPrice={setLpTotalPrice}></LpPool>
        </div>
      </div>
    </div>
  )
}
export default StakingRight
