/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import react, { useRef, useState } from 'react'
import '../../../style/Mint/symbolChart.less'
import TipsImg from '../../../img/common/tips@2x.png'
import useModal from '../../../hooks/useModal'
import TikerInfo from './tikerInfo'
import * as echarts from 'echarts'
import AssetPair from './chooseAssetPair'
import axios from 'axios'
import { useEffect } from 'react'
import { fixD, numberConversion } from 'utils'
import { useDispatch } from 'react-redux'
import { useMintState } from 'state/mint/hooks'
import { useManageState } from 'state/manage/hooks'
import { useFarmState } from 'state/farm/hooks'
import { useTradeState } from 'state/trade/hooks'
import { useCommonState } from 'state/common/hooks'
import { getSwapPrice, getOneAssetInfo } from 'utils/getList'
import { upDateOneAssetBaseInfo } from 'state/common/actions'
import { useActiveWeb3React } from 'hooks'
import { upDateIsTab } from 'state/trade/actions'
import { getLibrary } from 'utils/getLibrary'
import { ethers } from 'ethers'
import lpContractAbi from '../../../constants/abis/lpContract.json'
import SwapFactoryAbi from '../../../constants/abis/swapFactory.json'
import LongStakingAbi from '../../../constants/abis/LongStaking.json'
import {
  SwapFactoryAddress,
  MasterChefTestAddress,
  LongStakingAddress,
  ETHOracleAddress,
  STAOracleAddress,
} from '../../../constants/index'
import { formatUnits } from 'ethers/lib/utils'
import ltokenAbi from 'constants/abis/ltoken.json'
import ETHOracle from '../../../constants/abis/ETHOracle.json'
import STAOracle from '../../../constants/abis/STAOracle.json'
import { useTranslation } from 'react-i18next'

interface SymoblChartProps {
  SymoblChart: SymoblChart
  assetName?: string
  cAssetName?: string
}
interface SymoblChart {
  symbolName: string
  symbolLogo: string
  premium: string
  volume: string
  liquidity: string
  from: string
}

interface AutoPoolItem {
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

const SymbolTradeChart: React.FC<SymoblChartProps> = props => {
  const { t, i18n } = useTranslation()
  const timeStatusList = [`${t('Day')}`, `${t('Week')}`, `${t('Month')}`]
  const mintState = useMintState()
  const manageState = useManageState()
  const farmState = useFarmState()
  const tradeState = useTradeState()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  const [nowPrice, setNowPrice] = useState(0)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [Liquidity, setLiquidity] = useState('')
  const [symbol, setSymbol] = useState('')
  const { volume, liquidity, premium, from } = props.SymoblChart
  const [timeStatus, setTimeStatus] = useState(`${t('Day')}`)
  const [assetName, setAssetName] = useState(props.assetName || commonState.defaultAsset)
  const [cAssetName, setcAssetName] = useState(props.cAssetName || commonState.defaultCAsset)
  const [openAssetPair] = useModal(<AssetPair from={from} ></AssetPair>)
  const [openTikerInfo] = useModal(<TikerInfo nowPrice={nowPrice} from={from} cAssetName={cAssetName}></TikerInfo>)
  const [premiumValue, setPremiumValue] = useState('')
  const chartRef = useRef(null)
  const { account } = useActiveWeb3React()
  const [isTab, setIsTab] = useState(false)
  const provider = window.ethereum
  const library = getLibrary(provider)
  async function getOraclePrice(assetName: any, cAssetName: any) {
    let asset
    let cAsset
    let oraclePrice
    if (commonState.assetBaseInfoObj[assetName].type == 'asset') {
      asset = assetName
      cAsset = cAssetName
    } else {
      asset = cAssetName
      cAsset = assetName
    }
    if (asset == 'nSTA') {
      const STAOracleContract = new ethers.Contract(STAOracleAddress, STAOracle, library)
      const STAOraclePrice = await STAOracleContract.latestRoundData()
      oraclePrice = fixD(formatUnits(STAOraclePrice.answer, 8), 4)
    } else if (asset == 'nETH') {
      const ETHOracleContract = new ethers.Contract(ETHOracleAddress, ETHOracle, library)
      const ETHOraclePrice = await ETHOracleContract.latestRoundData()
      oraclePrice = fixD(formatUnits(ETHOraclePrice.answer, 8), 4)
    }
    // const oneAssetInfo = { ...commonState.assetBaseInfoObj[asset], oraclePrice }
    // dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: oneAssetInfo }))
    if (account) {
      const assetNewInfo = await getOneAssetInfo(
        asset,
        commonState.assetBaseInfoObj[asset].address,
        account,
        commonState.assetBaseInfoObj,
      )
      const oneAssetInfo = { ...commonState.assetBaseInfoObj[asset], ...assetNewInfo, oraclePrice }
      // console.log(oneAssetInfo, 'oneAssetInfo')
      dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: oneAssetInfo }))
      const cassetNewInfo = await getOneAssetInfo(
        cAsset,
        commonState.assetBaseInfoObj[cAsset].address,
        account,
        commonState.assetBaseInfoObj,
      )
      const onecAssetInfo = { ...commonState.assetBaseInfoObj[cAsset], ...cassetNewInfo }
      // console.log(onecAssetInfo, 'onecAssetInfo')
      dispatch(upDateOneAssetBaseInfo({ oneAssetBaseInfo: onecAssetInfo }))
    }
  }
  useEffect(() => {
    setIsTab(!isTab)
  }, [tradeState.isTab])
  useEffect(() => {
    if (!assetName) {
      setAssetName(commonState.defaultAsset)
    }
    if (!cAssetName) {
      setAssetName(commonState.defaultCAsset)
    }
    getOraclePrice(assetName, cAssetName)
    let timer: any
    const getBaseData = () => {
      getPrice(assetName, cAssetName)
      return getBaseData
    }
    if (assetName && cAssetName) {
      timer = setInterval(getBaseData(), 5000)
    }
    return () => {
      clearInterval(timer)
    }
    // getPrice(assetName, cAssetName)
  }, [account, assetName, cAssetName])
  async function getPrice(assetName: any, cAssetName: any) {
    if (commonState.assetBaseInfoObj[assetName].type == 'asset') {
      assetName = assetName
      cAssetName = cAssetName
    } else {
      assetName = cAssetName
      cAssetName = assetName
    }
    let price
    let oraclePrice
    // let asset
    // let longFarmingUserInfo
    const swapPriceResult = await getSwapPrice(
      commonState.assetBaseInfoObj[cAssetName].address,
      commonState.assetBaseInfoObj[assetName].address,
    )
    if (swapPriceResult) {
      const token0Name = commonState.assetsNameInfo[swapPriceResult.token0]
      const token1Name = commonState.assetsNameInfo[swapPriceResult.token1]
      const reserves0 = Number(formatUnits(swapPriceResult.reserves[0], commonState.assetBaseInfoObj[token0Name]?.decimals))
      const reserves1 = Number(formatUnits(swapPriceResult.reserves[1], commonState.assetBaseInfoObj[token1Name]?.decimals))
      // if (account) {
      //   const LongStakingContract = new ethers.Contract(LongStakingAddress, LongStakingAbi, library)
      //   const contract = new ethers.Contract(swapPrice.result, ltokenAbi, library)
      //   const obj = commonState.longFarmingInfo.find(function (obj: any) {
      //     return (obj.name == assetName && obj.cAssetName == cAssetName)
      //   })
      //   longFarmingUserInfo = await LongStakingContract.userInfo(Number(obj.longId), account)
      //   const totalStaked = await contract.totalSupply()
      //   const LPtotal = Number(formatUnits(totalStaked, commonState.assetBaseInfoObj[assetName].decimals))
      //   // console.log(LPtotal, 'LPtotal')
      //   if (swapPrice.token0 == commonState.assetBaseInfoObj[assetName].address) {
      //     asset = Number(formatUnits(longFarmingUserInfo.amount, commonState.assetBaseInfoObj[assetName].decimals)) / LPtotal * Number(reserves0)
      //   } else {
      //     asset = Number(formatUnits(longFarmingUserInfo.amount, commonState.assetBaseInfoObj[assetName].decimals)) / LPtotal * Number(reserves1)
      //   }
      //   setLiquidity(fixD((asset * commonState.assetBaseInfoObj[assetName].swapPrice), 2).toString())
      // }
      if (swapPriceResult.token0 == commonState.assetBaseInfoObj[assetName].address) {
        price = (reserves1 / reserves0).toString()
      } else {
        price = (reserves0 / reserves1).toString()
      }
      oraclePrice = Number(commonState.assetBaseInfoObj[assetName].oraclePrice)
      if (Number(price) - oraclePrice > 0) {
        const result = ((Number(price) - oraclePrice) / oraclePrice) * 100
        setPremiumValue(fixD(result.toString(), 2))
      } else {
        const result = ((oraclePrice - Number(price)) / oraclePrice) * 100
        setPremiumValue('-' + fixD(result.toString(), 2))
      }
    }
  }
  useEffect(() => {
    if (from == 'mint' && mintState.mintCoinStock) {
      setAssetName(mintState.mintCoinStock)
    }
    if (from == 'mint' && mintState.mintCoinSelect) {
      setcAssetName(mintState.mintCoinSelect)
    }
    if (from == 'farm' && farmState.farmCoinStock) {
      if (commonState.assetBaseInfoObj[farmState.farmCoinStock].type == 'asset') {
        setAssetName(farmState.farmCoinStock)
      } else {
        if (farmState.farmCoinSelect) {
          setAssetName(farmState.farmCoinSelect)
        }
      }
    }
    if (from == 'farm' && farmState.farmCoinSelect) {
      if (commonState.assetBaseInfoObj[farmState.farmCoinSelect].type == 'cAsset') {
        setcAssetName(farmState.farmCoinSelect)
      } else {
        if (farmState.farmCoinStock) {
          setcAssetName(farmState.farmCoinStock)
        }
      }
    }
    if (from == 'trade' && tradeState.tradeCoinStock) {
      if (commonState.assetBaseInfoObj[tradeState.tradeCoinStock].type == 'asset') {
        setAssetName(tradeState.tradeCoinStock)
      } else {
        if (tradeState.tradeCoinSelect) {
          setAssetName(tradeState.tradeCoinSelect)
        }
      }
    }
    if (from == 'trade' && tradeState.tradeCoinSelect) {
      if (commonState.assetBaseInfoObj[tradeState.tradeCoinSelect].type == 'cAsset') {
        setcAssetName(tradeState.tradeCoinSelect)
      } else {
        if (tradeState.tradeCoinStock) {
          setcAssetName(tradeState.tradeCoinStock)
        }
      }
    }
    if (from == 'manage') {
      setAssetName(manageState.positionInfo.assetTokenName)
      setcAssetName(manageState.positionInfo.cAssetTokenName)
    }
  }, [account, from, mintState, manageState, tradeState, farmState])

  useEffect(() => {
    if (commonState.assetBaseInfoObj[assetName].type == 'asset') {
      setAssetName(assetName)
      setcAssetName(cAssetName)
    } else {
      setAssetName(cAssetName)
      setcAssetName(assetName)
    }
    // getRate()
    let symbol: any
    let asset
    let casset
    let valueChange: any
    if (commonState.assetBaseInfoObj[assetName].type == 'asset') {
      if (assetName == 'nSTA') {
        symbol = `SE/USD`
        valueChange = 200
      } else {
        const assetArr = assetName.split('')
        const newassetArr = assetArr.slice(1)
        asset = newassetArr.join('')
        const cassetArr = cAssetName.split('')
        const newcassetArr = cassetArr.slice(0, -1)
        casset = newcassetArr.join('')
        symbol = `${asset}/${casset}`
        valueChange = 150
      }
    } else {
      if (cAssetName == 'nSTA') {
        symbol = `SE/USD`
        valueChange = 200
      } else {
        const assetArr = cAssetName.split('')
        const newassetArr = assetArr.slice(1)
        asset = newassetArr.join('')
        const cassetArr = assetName.split('')
        const newcassetArr = cassetArr.slice(0, -1)
        casset = newcassetArr.join('')
        symbol = `${asset}/${casset}`
        valueChange = 150
      }
    }
    // symbol = `${asset}/${casset}`
    // const symbol = 'SE/USD'
    if (timeStatus || assetName) {
      switch (timeStatus) {
        case `${t('Day')}`:
          getKlineData(symbol, '15m', 86400, 9, 'day', valueChange)
          break
        case `${t('Week')}`:
          getKlineData(symbol, '1h', 604800, 24, 'week', valueChange)
          break
        case `${t('Month')}`:
          getKlineData(symbol, '1d', 2592000, 2, 'month', valueChange)
          break
        // case 'Year':
        //   getKlineData('1d', 31536000, 1,'year')
        //   break
        default:
          break
      }
    }
  }, [timeStatus, assetName, cAssetName])
  const [timeIndex, setTimeIndex] = useState(0)
  function TimeStatus(label: any, key: any) {
    setTimeStatus(label)
    setTimeIndex(key)
  }
  useEffect(() => {
    setTimeStatus(timeStatusList[timeIndex])
  }, [i18n.language])
  const [data, setData] = useState([''])
  const [timerInterval, setTimerInterval] = useState(0)
  // console.log(data,'data##')
  const [dateList, setDateList]: any = useState()
  const [valueList, setValueList]: any = useState()

  const options = {
    // Make gradient line here

    title: [
      {
        left: 'center',
        // text: 'Gradient along the y axis',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      // formatter: '{b0}<br/>{c0}',
      formatter: '{b0}',
    },
    xAxis: {
      data: dateList,
      inverse: true,
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      show: true,
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        interval: timerInterval,
        textStyle: {
          color: '#909DB4',
        },
      },
      axisPointer: {
        label: {
          backgroundColor: '#F4F8FF',
          color: '#909DB4',
          fontFamily: 'PingFang',
        },
      },
    },
    yAxis: {
      // show: false,
      min: (value: any) => {
        return value.min - value.min * 0.005
      },
      max: (value: any) => {
        return value.max + value.max * 0.005
      },
      position: 'right',
      splitLine: {
        show: false,
      },
      axisPointer: {
        label: {
          backgroundColor: '#005AFF',
          color: '#FFFFFF',
          fontFamily: 'PingFang',
        },
      },
    },
    grid: [
      {
        x: 10,
        y: 50,
        x2: 40,
        y2: 30,
      },
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: valueList,
        lineStyle: {
          color: '#005AFF',
        },
        areaStyle: {
          normal: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0, 81, 255, 0.1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0.3)',
                },
              ],
              globalCoord: false,
            },
          },
        },
      },
    ],
  }
  const [usdPrice, setUsdPrice] = useState(7.7832)
  function newDate(newDate: number) {
    let news
    if (newDate < 10) {
      news = '0' + newDate
    } else {
      news = newDate
    }
    return news
  }
  async function getKlineData(
    symbol: string,
    type: string,
    timestamp: number,
    interval: number,
    timeType: string,
    valueChange: number,
  ) {
    function formtDate(date: number) {
      const d = new Date(date * 1000)
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const day = d.getDate()
      const hour = d.getHours()
      const mins = d.getMinutes()
      if (timeType == 'day') {
        return newDate(hour) + ':' + newDate(mins)
      }
      if (timeType == 'week') {
        return newDate(month) + '-' + newDate(day) + ' ' + newDate(hour) + ':' + newDate(mins)
      }
      if (timeType == 'month') {
        return newDate(month) + '-' + newDate(day)
      }
      if (timeType == 'year') {
        return year + '-' + newDate(month)
      }
    }

    const nowDate = Math.round(new Date().getTime() / 1000).toString()
    const beforeDate = Number(nowDate) - timestamp
    axios({
      method: 'GET',
      baseURL: 'https://api.nasdex.xyz',
      url: `/v1/price?symbol=${symbol}&type=${type}&start=${beforeDate}&end=${nowDate}`,
    }).then(res => {
      if (res && res.data && res.data.code === 0) {
        const data = res.data.data.data
        const dateList = data.map(function (item: any) {
          return formtDate(item.time)
        })
        const valueList = data.map(function (item: any) {
          return item.value
        })
        const arr = JSON.parse(JSON.stringify(valueList))
        const minPrice = arr.sort()[0] - Number(valueChange)
        const maxPrice =
          Number(
            arr.sort(function (a: any, b: any) {
              return b - a
            })[0],
          ) + Number(valueChange)
        setMinPrice(Math.floor(minPrice))
        setMaxPrice(Math.ceil(maxPrice))
        setDateList(dateList.reverse())
        setValueList(valueList.reverse())
        setTimerInterval(interval)
      }
    })
  }

  useEffect(() => {
    const chart = echarts.getInstanceByDom(chartRef.current as unknown as HTMLDivElement)
    let myChart = null
    if (valueList && valueList.length > 0 && dateList && dateList.length > 0) {
      if (chart) {
        myChart = chart
      } else {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement)
      }
      myChart.setOption(options)
    }
  }, [valueList, dateList, timerInterval, minPrice, usdPrice])

  return (
    <div className="symbol-chart">
      <div className="title">
        <div className="symbol-info">
          <div className="logo">
            <img
              src={
                assetName
                  ? require(`../../../img/coin/${assetName}.png`).default
                  : require(`../../../img/coin/${commonState.defaultAsset}.png`).default
              }
              alt=""
            />
          </div>
          <div className="symbol-name">
            <div className="name">
              <span>{assetName}</span> / {cAssetName}
              {from == 'manage' || from == 'trade' ? null : (
                <svg className="icon" aria-hidden="true" onClick={openAssetPair}>
                  <use xlinkHref="#icon-Under"></use>
                </svg>
              )}
            </div>
            <div className="source">
              {commonState.assetBaseInfoObj[assetName]?.assetTit}&nbsp;
              <img src={TipsImg} alt="" onClick={openTikerInfo} />
            </div>
          </div>
        </div>
        <div className="symbol-total">
          <div className="premium">
            <div className="leabl">
              {t('Premium')}
              <p>{t('PremiumTips')}</p>
              <img src={TipsImg} alt="" />
            </div>
            <div className="text">{premiumValue}%</div>
          </div>
        </div>
      </div>
      <div className="chart-info">
        <div className="symbol-price">
          {from == 'trade' || from == 'farm' ? (
            <div className="price">
              {commonState.assetBaseInfoObj[cAssetName].type == 'asset'
                ? commonState.assetBaseInfoObj[cAssetName].oraclePrice
                : commonState.assetBaseInfoObj[assetName].oraclePrice}
              &nbsp;
              {commonState.assetBaseInfoObj[cAssetName].type == 'asset' ? assetName : cAssetName}
              <img src={TipsImg} alt="" />
              <div className="tips-text">{t('OraclePrice')}</div>
            </div>
          ) : (
            <div className="price">
              {assetName
                ? commonState.assetBaseInfoObj[assetName].oraclePrice
                : commonState.assetBaseInfoObj[commonState.defaultAsset].oraclePrice}
              &nbsp;
              {cAssetName ? cAssetName : commonState.defaultCAsset}
              <img src={TipsImg} alt="" />
              <div className="tips-text">{t('OraclePrice')}</div>
            </div>
          )}
        </div>
        <div className="time-type">
          {timeStatusList.map((item, key) => (
            <span
              key={key}
              onClick={() => TimeStatus(item, key)}
              style={
                item === timeStatus
                  ? {
                    color: '#333333',
                    background: '#F2F4FC',
                  }
                  : {}
              }>
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="chart-view" style={{ width: '580', height: '359px' }} ref={chartRef} />
    </div>
  )
}
export default SymbolTradeChart
