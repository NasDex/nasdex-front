/** @format */

import react, { useState } from 'react'
import '../../../style/Staking/stakingRight.less'
import { useMasterchef, useNSDX, useNSDXVault } from 'constants/hooks/useContract'
import { useActiveWeb3React } from 'hooks'
import { NSDXToken, MasterChefAddress, NSDXVaultAddress } from '../../../constants/index'
import { formatUnits } from 'ethers/lib/utils'
import { useEffect } from 'react'
import AutoPool from './pool/autoPool'
import DefaultPool from './pool/defaultPool'
import LpPool from './pool/lpPool'
import { fixD, getpriceList } from 'utils'
import { getLibrary } from 'utils/getLibrary'
import masterChefAbi from '../../../constants/abis/masterChef.json'
import nadxVaultAbi from '../../../constants/abis/nadxVault.json'
import nadxTokenAbi from '../../../constants/abis/nadx.json'
import LpAbi from '../../../constants/abis/lpContract.json'
import { ethers } from 'ethers'
import { useStakeState } from 'state/stake/hooks'
import { setPriceList } from 'state/stake/actions'
import { useTranslation } from 'react-i18next'

const StakingRight = () => {
  const { t, i18n } = useTranslation()
  const { account } = useActiveWeb3React()
  const NSDXContract = useNSDX()
  const MasterChefContract = useMasterchef()

  const [totalAllocPoint, setTotalAllocPoint] = useState(12000)
  const [nsdxPerBlock, setNsdxPerBlock] = useState(0.35)
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
      vaultStakedBalance: 0,
      stakedBalance: 0,
      balance: 0,
      usdPrice: '',
    },
    {
      pid: '0',
      symbol: 'NSDX',
      poolType: 'PreIDO',
      decimals: 18,
      address: '0xf495C59dF44a9784FEcaC65307C2848a99a59D00',
      allocPoint: 4000,
      totalAllocPoint: totalAllocPoint,
      nsdxPerBlock: nsdxPerBlock,
      vaultStakedBalance: 0,
      stakedBalance: 0,
      balance: 0,
      usdPrice: '',
    },
    {
      pid: '1',
      symbol: 'NSDX - USDC LP',
      poolType: 'Lpfarming',
      decimals: 18,
      address: '0x56B8936a96cD5EE5C5837F385a19B4c2999fD74a',
      allocPoint: 2000,
      totalAllocPoint: totalAllocPoint,
      nsdxPerBlock: nsdxPerBlock,
      vaultStakedBalance: 0,
      stakedBalance: 0,
      balance: 0,
      usdPrice: '',
      abi: LpAbi,
      currencyA: 'USDC',
      currencyB: 'NSDX',
    },
  ]

  const stakeState = useStakeState()
  const { priceList } = stakeState

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
  async function initData() {
    if (MasterChefContract && NSDXContract) {
      const totalNadx = formatUnits(await NSDXContract.balanceOf(MasterChefAddress), 18)
      setTotalLiquidity(Number(totalNadx))

      for (let i = 0; i < poolBaseInfo.length; i++) {
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
        <div className={i18n.language == 'zh-CN' ? "liquidity-banner-zh liquidity-banner" : "liquidity-banner"}>
          <div className="total-liquidity">
            <div className="total-liquidity-title">
              $ {fixD(Number(totalLiquidity) * Number(priceList.NSDX) + lpTotalPrice, 4)}
            </div>
            <div className="total-liquidity-text">{t('TotalValueLocked')}</div>
          </div>
        </div>
        <div className="liquidity-content">
          <DefaultPool DefaultPoolListArray={DefaultPoolListArray}></DefaultPool>
          <LpPool LpPoolListArray={LpPoolListArray} setLpTotalPrice={setLpTotalPrice}></LpPool>
        </div>
      </div>
    </div>
  )
}
export default StakingRight
