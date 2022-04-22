/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import { useRef, useState } from 'react'
import '../../../style/Mint/symbolChart.less'
import TipsImg from '../../../img/common/tips@2x.png'
import useModal from '../../../hooks/useModal'
import TikerInfo from './tikerInfo'
import * as echarts from 'echarts'
import AssetPair from './chooseAssetPair'
import axios from 'axios'
import { useEffect } from 'react'
import { fixD } from 'utils'
import { useDispatch } from 'react-redux'
import { useMintState } from 'state/mint/hooks'
import { useManageState } from 'state/manage/hooks'
import { useFarmState } from 'state/farm/hooks'
import { useTradeState } from 'state/trade/hooks'
import { useCommonState } from 'state/common/hooks'
import { useActiveWeb3React } from 'hooks'
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
  const [openAssetPair] = useModal(<AssetPair from={from}></AssetPair>)
  const [timeStatus, setTimeStatus] = useState(`${t('Day')}`)
  const [assetName, setAssetName] = useState(props.assetName || commonState.defaultAsset)
  const [cAssetName, setcAssetName] = useState(props.cAssetName || commonState.defaultCAsset)
  const [openTikerInfo] = useModal(<TikerInfo nowPrice={nowPrice} from={from} cAssetName={cAssetName}></TikerInfo>)
  const [premiumValue, setPremiumValue] = useState('')
  const chartRef = useRef(null)
  const { account } = useActiveWeb3React()
  const [isTab, setIsTab] = useState(false)
 
  /** START OF REVAMP */
  const [price, setPrice] = useState(0)
  const [priceLabel, setPriceLabel] = useState("")
  const oraclePrices = commonState.oraclePrices
  const swapPrices = commonState.swapPrices
  const calculatePremium = (swapPrice: string, oraclePrice: string) => {
    const swapPriceNum = parseFloat(swapPrice)
    const oraclePriceNum = parseFloat(oraclePrice)

    const difference = (swapPriceNum > oraclePriceNum) 
      ? ((swapPriceNum - oraclePriceNum) / swapPriceNum) * 100
      : ((oraclePriceNum - swapPriceNum) / oraclePriceNum) * 100

    setPremiumValue(fixD(difference.toString(),2))
  }
  useEffect(() => {
    const combinedName = `${assetName}/${cAssetName}`
    const oraclePrice = oraclePrices[combinedName]
    const swapPrice = swapPrices[combinedName]

    // Mint page handling
    if(["mint"].includes(from)) {
      setPrice(fixD(oraclePrice,4))
      setPriceLabel(cAssetName)
      calculatePremium(swapPrice, oraclePrice)
    }

    // Mint page handling
    if(["trade"].includes(from)) {
      setPrice(fixD(swapPrice,4))
      setPriceLabel(cAssetName)
      calculatePremium(swapPrice, oraclePrice)
    }

  }, [oraclePrices, swapPrices, cAssetName, assetName])
 
  useEffect(() => {
    setIsTab(!isTab)
  }, [tradeState.isTab])

  useEffect(() => {
    // Mint page handling
    if(from === "mint") {
      if(mintState.mintCoinStock) setAssetName(mintState.mintCoinStock)
      if(mintState.mintCoinSelect) setcAssetName(mintState.mintCoinSelect)
    }
  
    // Farm or Long Farm handling
    if(['farm','longFarm'].includes(from)) {
      if(farmState.farmCoinStock) {
        const assetType = commonState.assetBaseInfoObj[farmState.farmCoinStock]?.type
        assetType === 'asset' ? setAssetName(farmState.farmCoinStock) : setcAssetName(farmState.farmCoinStock)
      }

      if(farmState.farmCoinSelect) {
        const assetType = commonState.assetBaseInfoObj[farmState.farmCoinSelect]?.type
        assetType === 'asset' ? setAssetName(farmState.farmCoinSelect) : setcAssetName(farmState.farmCoinSelect)
      }
    }

    // Trade page handling
    if(from === "trade") {
      if(tradeState.tradeCoinStock) {
        const assetType = commonState.assetBaseInfoObj[tradeState.tradeCoinStock]?.type
        assetType === 'asset' ? setAssetName(tradeState.tradeCoinStock) : setcAssetName(tradeState.tradeCoinStock)
      }

      if(tradeState.tradeCoinSelect) {
        const assetType = commonState.assetBaseInfoObj[tradeState.tradeCoinSelect]?.type
        assetType === 'asset' ? setAssetName(tradeState.tradeCoinSelect) : setcAssetName(tradeState.tradeCoinSelect)
      }
    }
   
    // Manage page handling
    if (from == 'manage') {
      setAssetName(manageState.positionInfo.assetTokenName)
      setcAssetName(manageState.positionInfo.cAssetTokenName)
    }
  }, [account, from, mintState, manageState, tradeState, farmState])

  useEffect(() => {
    if (commonState.assetBaseInfoObj[assetName]?.type == 'asset') {
      setAssetName(assetName)
      setcAssetName(cAssetName)
    } else {
      setAssetName(cAssetName)
      setcAssetName(assetName)
    }
    let symbol: any
    let asset
    let casset
    let valueChange: any
    if (commonState.assetBaseInfoObj[assetName]?.type == 'asset') {
      // if (assetName == 'nSE') {
      //   symbol = `SE/USD`
      //   valueChange = 200
      // } else {
      //   const assetArr = assetName.split('')
      //   const newassetArr = assetArr.slice(1)
      //   asset = newassetArr.join('')
      //   const cassetArr = cAssetName.split('')
      //   const newcassetArr = cassetArr.slice(0, -1)
      //   casset = newcassetArr.join('')
      //   symbol = `${asset}/${casset}`
      //   valueChange = 150
      // }
      console.log(commonState.assetBaseInfoObj)
      symbol = `${commonState.assetBaseInfoObj[assetName]?.key}/${commonState.assetBaseInfoObj[cAssetName]?.key}`
      valueChange = 200
    } else {
      if (cAssetName == 'nSE') {
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
    if (timeStatus || assetName) {
      switch (timeStatus) {
        case `${t('Day')}`:
          getKlineData(symbol, '1d', 86400, 9, 'day', valueChange)
          break
        case `${t('Week')}`:
          getKlineData(symbol, '7d', 604800, 24, 'week', valueChange)
          break
        case `${t('Month')}`:
          getKlineData(symbol, '1m', 2592000, 2, 'month', valueChange)
          break
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
  const [dateList, setDateList]: any = useState()
  const [valueList, setValueList]: any = useState()

  const options = {
    title: [
      {
        left: 'center',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: '{c0}',
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
    setValueList([])
    setDateList([])
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

    let lpUrl = ''
    if (from == 'trade' || from == 'longFarm') {
      lpUrl = '/lp'
    }
    console.log(`Fire graph data`)
    // console.log(` url : https://beta-api.nasdex.xyz/v1/price${lpUrl}?symbol=${symbol}&type=${type}&start=${beforeDate}&end=${nowDate}`)
    axios({
      method: 'GET',
      baseURL: 'https://beta-api.nasdex.xyz',
      url: `/v1/price${lpUrl}?symbol=${symbol}&type=${type}&start=${beforeDate}&end=${nowDate}`,
    }).then(res => {
      if (res && res.data && res.data.code === 0) {
        let data = res.data.data.data
        // console.log(`Graph data returned`, data)
        if (data === undefined) {
          console.log(`Graph data is undefined`)
          return
        }
        if (data.length <= 0) {
          console.log(`Graph data is empty`)
          return
        }

        // Sort graph data in case graph data from API is not in sorted manne
        data = data.sort((a: { time: number }, b: { time: number }) => (a.time > b.time) ? 1 : (a.time < b.time) ? -1 : 0)
        // console.log(`Sorted Data: `, data)

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

  function createMarkup() {
    if (from == 'trade' || from == 'longFarm') {
      return {
        __html: `<span>${t('swapPrice')}</span>
      <p>${t('swapPriceTips')}</p>`,
      }
    } else {
      return { __html: `${t('OraclePrice')}` }
    }
  }
  
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
          <div className="price">
            {price} {priceLabel}
            {(from == 'trade' || from == 'longFarm') ? null : <img src={TipsImg} alt="" />}
            {(from == 'trade' || from == 'longFarm') ? null : <div className="tips-text" dangerouslySetInnerHTML={createMarkup()}></div>}
          </div>
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
