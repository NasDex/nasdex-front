/** @format */

import react, {useRef, useState} from 'react'
import '../../../style/Mint/symbolChart.less'
import useChart from '../../../hooks/useChart'
import TipsImg from '../../../img/common/tips@2x.png'
import tencent from '../../../img/coin/tencent.png'
import useModal from '../../../hooks/useModal'
import TikerInfo from './tikerInfo'
import * as echarts from 'echarts'
import AssetPair from './chooseAssetPair'
import axios from 'axios'
import {useEffect} from 'react'
import {fixD} from 'utils'
import {upDateMintNowPrice} from 'state/mint/actions'
import {useDispatch} from 'react-redux'
import {useMintState} from 'state/mint/hooks'

interface SymoblChartProps {
  SymoblChart: SymoblChart
}
interface SymoblChart {
  symbolName: string
  symbolLogo: string
  premium: string
  volume: string
  liquidity: string
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
  vaultStakedBalance: number //已质押到复投合约的数量
  stakedBalance: number // 已质押到MasterChef合约的数量
  balance: number //可用数量
}

const timeStatusList = ['Day', 'Week', 'Month', 'Year']
const SymbolTradeChart: React.FC<SymoblChartProps> = props => {
  const [nowPrice, setNowPrice] = useState(0)
  const [minPrice, setMinPrice] = useState(0)
  const [openTikerInfo] = useModal(<TikerInfo nowPrice={nowPrice}></TikerInfo>)
  const [openAssetPair] = useModal(<AssetPair></AssetPair>)
  const {symbolName, symbolLogo, premium, volume, liquidity} = props.SymoblChart
  const [timeStatus, setTimeStatus] = useState('Day')
  const chartRef = useRef(null)
  const mintState = useMintState()

  // console.log(data,'data##')
  // console.log(minuteData,'minuteData#')
  // let chartData: any = []
  useEffect(() => {
    getRate()
    if (timeStatus) {
      switch (timeStatus) {
        case 'Day':
          getdayKlineData()
          break
        case 'Week':
          getweekKlineData()
          break
        case 'Month':
          getmonthKlineData()
          break
        case 'Year':
          getyearKlineData()
          break
        default:
          break
      }
    }
  }, [timeStatus])
  // const data = [...chartData]
  const [data, setData] = useState([''])
  const [interval, setInterval] = useState(0)
  // console.log(data,'data##')
  const [dateList, setDateList]: any = useState()
  const [valueList, setValueList]: any = useState()

  useEffect(() => {
    const dateList = data.map(function (item) {
      return item[0]
    })
    setDateList(dateList)
    const valueList = data.map(function (item) {
      return item[1]
    })
    setValueList(valueList)
  }, [data])
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
      formatter: '{b0}',
    },
    xAxis: {
      data: dateList,
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
        interval: interval,
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
      min: minPrice,
      // max: 80,
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
        // bottom: '60%',
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
                  color: 'rgba(0, 81, 255, 0.1)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0.3)', // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
        },
      },
    ],
  }
  function formatDate(date: any) {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate()
    const year = d.getFullYear()
    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    return [year, month, day].join('-')
  }
  const [usdPrice, setUsdPrice] = useState(7.7832)
  async function getRate() {
    const usdprice = await axios({
      method: 'GET',
      url: 'https://api.it120.cc/gooking/forex/rate?fromCode=HKD&toCode=USD',
    }).then(res => {
      if (res && res.status === 200 && res.data.code === 0) {
        setUsdPrice(res.data.data.rate)
      }
    })
  }
  const dispatch = useDispatch()

  async function getdayKlineData() {
    axios({
      method: 'GET',
      baseURL: 'https://web.ifzq.gtimg.cn',
      url: '/appstock/app/minute/query?code=hk00700',
    }).then(res => {
      const dataArray: any = []
      if (res && res.status === 200) {
        const data = res.data.data.hk00700.data.data
        const minPriceArr: any = []
        data.forEach((ele: string) => {
          const mockArr = ele.split(' ')
          const time = mockArr[0].slice(0, 2) + ':' + mockArr[0].slice(2)
          if (time !== '12:00') {
            dataArray.push([time, Number(mockArr[1]) / usdPrice])
            minPriceArr.push(mockArr[1])
          }
        })
        setData(dataArray)
        const nowPrice = Number(fixD(dataArray[dataArray.length - 1][1], 2))
        const minPrice = minPriceArr.sort()[0] / usdPrice
        if (!(Number(nowPrice) > 10000000)) {
          setNowPrice(nowPrice)
          dispatch(upDateMintNowPrice({mintNowPrice: nowPrice}))
        }
        setMinPrice(Math.floor(minPrice))
        setInterval(59)
      }
    })
  }
  async function getweekKlineData() {
    // 获取当前时间
    const date = new Date()
    const nowDate = formatDate(date.getTime())
    const beforeDate = formatDate(date.getTime() - 604800000)
    axios({
      method: 'GET',
      baseURL: 'https://web.ifzq.gtimg.cn',
      url: `/appstock/app/fqkline/get?param=hk00700,day,${beforeDate},${nowDate},500,qfq`,
    }).then(res => {
      const dataArray: any = []
      if (res && res.status === 200) {
        const data = res.data.data.hk00700.day
        const minPriceArr: any = []
        data.forEach((ele: string) => {
          dataArray.push([ele[0], Number(ele[1]) / usdPrice])
          minPriceArr.push(ele[1])
        })
        const minPrice = minPriceArr.sort()[0] / usdPrice
        setData(dataArray)
        setInterval(0)
        setMinPrice(Math.floor(minPrice))
      }
    })
  }

  async function getmonthKlineData() {
    // 获取当前时间
    const date = new Date()
    const nowDate = formatDate(date.getTime())
    const beforeDate = formatDate(date.getTime() - 2592000000)
    axios({
      method: 'GET',
      baseURL: 'https://web.ifzq.gtimg.cn',
      url: `/appstock/app/fqkline/get?param=hk00700,day,${beforeDate},${nowDate},800,qfq`,
    }).then(res => {
      const dataArray: any = []
      if (res && res.status === 200) {
        const data = res.data.data.hk00700.day
        const minPriceArr: any = []

        data.forEach((ele: string) => {
          dataArray.push([ele[0], Number(ele[1]) / usdPrice])
          minPriceArr.push(ele[1])
        })
        const minPrice = minPriceArr.sort()[0] / usdPrice
        setInterval(5)
        setMinPrice(Math.floor(minPrice))
        setData(dataArray)
      }
    })
  }
  async function getyearKlineData() {
    // 获取当前时间
    const date = new Date()
    const nowDate = formatDate(date.getTime())
    const beforeDate = formatDate(date.getTime() - 31536000000)
    axios({
      method: 'GET',
      baseURL: 'https://web.ifzq.gtimg.cn',
      url: `/appstock/app/fqkline/get?param=hk00700,month,${beforeDate},${nowDate},500,qfq`,
    }).then(res => {
      const dataArray: any = []
      if (res && res.status === 200) {
        const minPriceArr: any = []
        const data = res.data.data.hk00700.month
        data.forEach((ele: string) => {
          dataArray.push([ele[0], Number(ele[1]) / usdPrice])
          minPriceArr.push(ele[1])
        })
        console.log(minPriceArr.sort())
        const minPrice = minPriceArr.sort()[0] / usdPrice
        setMinPrice(60)
        setInterval(2)
        setData(dataArray)
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
  }, [valueList, dateList, interval, minPrice, usdPrice])

  return (
    <div className="symbol-chart">
      <div className="title">
        <div className="symbol-info">
          <div className="logo">
            <img src={tencent} alt="" />
          </div>
          <div className="symbol-name">
            <div className="name">
              <span>nTENCT</span> / {mintState.mintCoinSelect}
              <svg className="icon" aria-hidden="true" onClick={openAssetPair}>
                <use xlinkHref="#icon-Under"></use>
              </svg>
            </div>
            <div className="source">
              Tencent Holdings Ltd&nbsp;
              <img src={TipsImg} alt="" onClick={openTikerInfo} />
            </div>
          </div>
        </div>
        <div className="symbol-total">
          {/* <div className="premium">
            <div className="title">Premium</div>
            <div className="text">{premium}</div>
          </div> */}
          <div className="volume">
            <div className="title">Volume($)</div>
            <div className="text">{volume}</div>
          </div>
          <div className="liquidity">
            <div className="title">Liquidity($)</div>
            <div className="text">{liquidity}</div>
          </div>
        </div>
      </div>
      <div className="chart-info">
        <div className="symbol-price">
          <div className="price">
            {nowPrice} {mintState.mintCoinSelect}
            <img src={TipsImg} alt="" />
            <div className="tips-text">Oracle Price</div>
          </div>
          {/* <div className="rise">
            +1.62(8.06%)
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-growth"></use>
            </svg>
          </div> */}
        </div>
        <div className="time-type">
          {timeStatusList.map((item, key) => (
            <span
              key={key}
              onClick={() => setTimeStatus(item)}
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
      <div className="chart-view" style={{width: '580', height: '359px'}} ref={chartRef} />
    </div>
  )
}
export default SymbolTradeChart
