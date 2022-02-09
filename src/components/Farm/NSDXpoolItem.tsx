/** @format */

import react, { useState, useEffect } from 'react'
import { Button, Skeleton } from 'antd'
import '../../style/Farm/farmPool.less'
import { NavLink } from 'react-router-dom'
import { useNSDXTestContract, useMasterChefTestContract } from 'constants/hooks/useContract'
import { fixD } from 'utils'
import { useCommonState } from 'state/common/hooks'
import { upDateCoinStock, upDateFarmCoinSelect } from 'state/farm/actions'
import { formatUnits } from 'ethers/lib/utils'
import { useActiveWeb3React } from 'hooks'
import { MasterChefTestAddress } from '../../constants/index'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
const FarmPoolItem: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const commonState = useCommonState()
  const { name, source, iconUrl, id, decimals, cAssetName, nsdxPerBlock } = props.farmPoolItem
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch()
  const [totalLiquidity, setTotalLiquidity] = useState('0')
  const [totalAllocPoint, setTotalAllocPoint] = useState(0)
  const [swapPrice, setSwapPrice] = useState('40')
  const [longApr, setLongApr] = useState('')
  const MasterChefTestContract = useMasterChefTestContract()
  const NSDXTestContract = useNSDXTestContract()
  const [poolInfo, setPoolInfo] = useState({
    allocPoint: 0,
    lastRewardBlock: '',
  })
  async function getPoolInfo() {
    const info: any = {}
    const poolInfo = await MasterChefTestContract.poolInfo(id)
    if (poolInfo) {
      info.lastRewardBlock = poolInfo.lastRewardBlock.toString()
      info.allocPoint = poolInfo.allocPoint.toString()
    }
    setPoolInfo(info)
    const decimals = await NSDXTestContract.decimals()
    const totalNadx = await NSDXTestContract.balanceOf(MasterChefTestAddress)
    setTotalLiquidity(formatUnits(totalNadx, decimals.toString()))
    const totalAllocPoint = await MasterChefTestContract.totalAllocPoint()
    setTotalAllocPoint(Number(formatUnits(totalAllocPoint, 0)))
  }

  function selectAssetname(name: any, cAssetName: any) {
    dispatch(upDateCoinStock({ farmCoinStock: name }))
    dispatch(upDateFarmCoinSelect({ farmCoinSelect: cAssetName }))
  }

  useEffect(() => {
    async function calculateApr() {
      const { priceList } = props
      let longApr: any
      const tvlF = totalLiquidity
      const price = priceList.NSDX
      const day = Number(nsdxPerBlock) * 43200
      if (Number(nsdxPerBlock) > 0 && Number(tvlF)) {
        longApr = ((day * (Number(poolInfo.allocPoint) / totalAllocPoint) * 365) / Number(tvlF)) * 100
      } else {
        longApr = ''
      }
      if (longApr < 100000000) {
        const result = fixD(longApr, 2)
        setLongApr(result as string)
      } else {
        setLongApr('Infinity')
      }
    }
    if (totalLiquidity && poolInfo.allocPoint && totalAllocPoint && nsdxPerBlock) {
      calculateApr()
    }
  }, [totalLiquidity, totalAllocPoint, nsdxPerBlock])
  useEffect(() => {
    let timer: any
    const getBaseData = () => {
      getPoolInfo()
      return getBaseData
    }
    if (NSDXTestContract) {
      timer = setInterval(getBaseData(), 30000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [account, NSDXTestContract, MasterChefTestContract])
  return (
    <div className="farm-pool-item">
      <div className="pool-header">
        <img className="pool-logo" src={iconUrl} alt="" />
        <div>
          <div className="pool-name">{name}</div>
          <div className="pool-source">{source}</div>
        </div>
      </div>
      <div className="apr-info">
        <div className="long-apr">
          <div className="long-apr-title">{!longApr ? <Skeleton active paragraph={{ rows: 0 }} /> : `${longApr}%`}</div>
          <div className="long-apr-text">{t('LongAPR')}</div>
        </div>
        {/* <div className="long-TVL">
          <div className="long-TVL-title">{!longTVL ? <Skeleton active paragraph={{ rows: 0 }} /> : `${longTVL}`}</div>
          <div className="long-apr-text">Long TVL</div>
          <div className="hover">{longTVL}</div>
        </div> */}
      </div>
      <div className="amm-price">
        <div className="leabl">{t('SwapPrice')}</div>
        <div className="text">{fixD(swapPrice, commonState.assetBaseInfoObj[cAssetName].fixDPrecise)}</div>
      </div>
      <div className="amm-price">
        <div className="leabl">{t('Staked')}(NSDX)</div>
        <div className="text">{fixD(totalLiquidity, commonState.assetBaseInfoObj[cAssetName].fixDPrecise)}</div>
      </div>
      <div className="action-btn">
        <NavLink to={`/farming/long/${cAssetName}/${name}`} onClick={() => selectAssetname(`${name}`, `${cAssetName}`)}>
          <Button
            className={name === 'NSDX' ? 'farmBtn longBtn' : 'farmBtn'}
            onClick={() => selectAssetname(`${name}`, `${cAssetName}`)}>
            {t('LongFarm')}
          </Button>
        </NavLink>
      </div>
    </div>
  )
}

export default FarmPoolItem
