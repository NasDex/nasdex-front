/** @format */

import react, { useState, useEffect } from 'react'
import { Button, Skeleton } from 'antd'
import '../../style/Farm/farmPool.less'
import { NavLink } from 'react-router-dom'
import TipsImg from '../../img/common/tips@2x.png'
import {
  useShortStakingContract,
  useShortStockAContract,
  useMasterChefTestContract,
  useLongStakingContract,
} from 'constants/hooks/useContract'
import { fixD } from 'utils'
import { getCommonLongApr, getCommonShortApr } from 'utils/getAPR'
import { formatUnits } from 'ethers/lib/utils'
import { useActiveWeb3React } from 'hooks'
import { useCommonState } from 'state/common/hooks'
import { getSwapPrice } from 'utils/getList'
import { upDateCoinStock, upDateFarmCoinSelect } from '../../state/farm/actions'
import { useDispatch } from 'react-redux'
import { getLibrary } from 'utils/getLibrary'
import { ethers } from 'ethers'
import lTokenAbi from 'constants/abis/ltoken.json'
import { LongStakingAddress, MasterChefTestAddress } from 'constants/index'
import { useTranslation } from 'react-i18next'
import { simpleRpcProvider } from 'utils/providers'
const FarmPoolItem: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const { name, source, iconUrl, id, decimals, longId, cAssetName } = props.farmPoolItem
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch()
  const commonState = useCommonState()
  const [swapPrice, setSwapPrice] = useState('--')
  const [oraclePrice, setOraclePrice] = useState('')
  const [premium, setPremium] = useState('--')
  const [shortTVL, setShortTVL] = useState('')
  const [aprShort, setApr] = useState('')
  const [longTVL, setLongTVL] = useState('')
  const [longApr, setLongApr] = useState('')
  const ShortStockAContract = useShortStockAContract()
  const ShortStakingContract = useShortStakingContract()
  const longStakingContract = useLongStakingContract()
  const MasterChefTestContract = useMasterChefTestContract()
  const provider = window.ethereum
  const library = getLibrary(provider) ?? simpleRpcProvider
  const { priceList, farmPoolItem } = props

  async function getPoolInfo() {
    const price = priceList
    const longAprResult = await getCommonLongApr(
      price,
      farmPoolItem,
      MasterChefTestContract,
      longStakingContract,
      account,
      LongStakingAddress,
      formatUnits,
      lTokenAbi,
      ethers,
      library,
      commonState,
    )

    if (longAprResult.longTvlF) {
      setLongTVL(fixD(longAprResult.longTvlF, 2))
    }
    if (longAprResult.longAprP < 100000000) {
      setLongApr(fixD(longAprResult.longAprP, 2))
      setSwapPrice(longAprResult.swapPrice)
    } else {
      setLongApr('Infinity')
    }
    const shortAprResult = await getCommonShortApr(
      commonState.assetBaseInfoObj[name].oraclePrice,
      price,
      props.farmPoolItem,
      MasterChefTestContract,
      ShortStakingContract,
      account,
      MasterChefTestAddress,
      formatUnits,
      lTokenAbi,
      ethers,
      library,
      commonState,
    )
    if (shortAprResult.shortTvlF) {
      setShortTVL(fixD(shortAprResult.shortTvlF, 2))
    }
    if (shortAprResult.shortAprP < 100000000) {
      setApr(fixD(shortAprResult.shortAprP, 2))
    } else {
      setApr('Infinity')
    }
  }

  function selectAssetname(name: any, cAssetName: any) {
    dispatch(upDateCoinStock({ farmCoinStock: name }))
    dispatch(upDateFarmCoinSelect({ farmCoinSelect: cAssetName }))
  }

  useEffect(() => {
    if (name) {
      setOraclePrice(commonState.assetBaseInfoObj[name].oraclePrice)
      // setSwapPrice(commonState.assetBaseInfoObj[name].swapPrice)
    }
    if (Number(swapPrice) - Number(oraclePrice) > 0) {
      const result = ((Number(swapPrice) - Number(oraclePrice)) / Number(oraclePrice)) * 100
      setPremium(fixD(result.toString(), 2))
    } else {
      const result = ((Number(oraclePrice) - Number(swapPrice)) / Number(oraclePrice)) * 100
      setPremium('-' + fixD(result.toString(), 2))
    }
  }, [name, swapPrice, oraclePrice, commonState.assetBaseInfoObj])

  useEffect(() => {
    getPrice()
  }, [account])

  async function getPrice() {
    const swapPrice = await getSwapPrice(
      commonState.assetBaseInfoObj[cAssetName].address,
      commonState.assetBaseInfoObj[name].address,
    )

    if (swapPrice) {
      const token0Name = commonState.assetsNameInfo[swapPrice.token0]
      const token1Name = commonState.assetsNameInfo[swapPrice.token1]
      const reserves0 = Number(formatUnits(swapPrice.reserves[0], commonState.assetBaseInfoObj[token0Name]?.decimals))
      const reserves1 = Number(formatUnits(swapPrice.reserves[1], commonState.assetBaseInfoObj[token1Name]?.decimals))

      if (reserves0 == 0 && reserves1 == 0) {
        setSwapPrice('0')
      } else {
        if (swapPrice.token0 == commonState.assetBaseInfoObj[name].address) {
          setSwapPrice((reserves1 / reserves0).toString())
        } else {
          setSwapPrice((reserves0 / reserves1).toString())
        }
      }
    }
  }

  useEffect(() => {
    let timer: any
    const getBaseData = async () => {
      await getPoolInfo()
      return getBaseData
    }

    getBaseData().then(() => {
      if (ShortStakingContract && MasterChefTestContract) {
        timer = setInterval(async () => await getBaseData(), 30000)
      }
      return () => {
        clearInterval(timer)
      }
    })
  }, [account, ShortStakingContract, ShortStockAContract, MasterChefTestContract])
  function thousands(num: any) {
    const str = num.toString()
    const reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    return str.replace(reg, "$1,")
  }

  return (
    <div className="farm-pool-item">
      <div className="pool-header">
        <img className="pool-logo" src={iconUrl} alt="" />
        <div>
          <div className="pool-name">{name}</div>
          <div className="pool-source">{source}</div>
        </div>
      </div>
      <div className='farmPoolBox'>
        <div className="apr-info">
          <div className="long-apr">
            <div className="long-apr-title">{longApr == '' ? <Skeleton active paragraph={{ rows: 0 }} /> : `${longApr}%`}</div>
            <div className="long-apr-text">{t('LongAPR')}</div>
          </div>
          <div className="short-apr">
            <div className="long-apr-title">{aprShort == '' ? <Skeleton active paragraph={{ rows: 0 }} /> : `${aprShort}%`}</div>
            <div className="long-apr-text">{t('ShortAPR')}</div>
          </div>
        </div>
        <div className="apr-info">
          <div className="long-TVL">
            <div className="long-TVL-title">{longTVL == '' ? <Skeleton active paragraph={{ rows: 0 }} /> : `$${thousands(longTVL)}`}</div>
            <div className="long-apr-text">{t('LongTVL')}</div>
            <div className="hover">${thousands(longTVL)}</div>
          </div>
          <div className="short-TVL">
            <div className="long-TVL-title">{shortTVL == '' ? <Skeleton active paragraph={{ rows: 0 }} /> : `$${thousands(shortTVL)}`}</div>
            <div className="long-apr-text">{t('ShortTVL')}</div>
            <div className="hover">${thousands(shortTVL)}</div>
          </div>
        </div>
      </div>
      <div className="amm-price">
        <div className="leabl">{t('SwapPrice')}</div>
        <div className="text">
          {fixD(swapPrice, commonState.assetBaseInfoObj[cAssetName].fixDPrecise)} {cAssetName}
        </div>
      </div>
      <div className="amm-price">
        <div className="leabl premium">
          {t('Premium')}
          <p>{t('PremiumTips')}</p>
          <img src={TipsImg} alt="" />
        </div>
        <div className="text">{premium}%</div>
      </div>
      <div className="action-btn">
        <NavLink to={`/farming/${t('Long')}/${cAssetName}/${name}`}>
          <Button
            className={name === 'NSDX' ? 'farmBtn longBtn' : 'farmBtn'}
            onClick={() => selectAssetname(`${name}`, `${cAssetName}`)}>
            {t('LongFarm')}
          </Button>
        </NavLink>
        <NavLink to={`/farming/${t('Short')}/${cAssetName}/${name}`}>
          <Button className="farmBtn shortBtn" onClick={() => selectAssetname(`${name}`, `${cAssetName}`)}>
            {t('ShortFarm')}
          </Button>
        </NavLink>
      </div>
    </div>
  )
}

export default FarmPoolItem
