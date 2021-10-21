/** @format */

import react, {useRef, useState} from 'react'
import '../../../style/Manage/manageLeft.less'
import useChart from '../../../hooks/useChart'
import TipsImg from '../../../img/common/tips@2x.png'
import tencent from '../../../img/coin/tencent.png'
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

const timeStatusList = ['Day', 'Week', 'Month', 'Year']
const ManageLeft: React.FC<SymoblChartProps> = props => {
  const {premium, volume, liquidity} = props.SymoblChart
  const [timeStatus, setTimeStatus] = useState('Year')
  const chartRef = useRef(null)
  const data = [
    ['00:00', 116],
    ['00:15', 129],
    ['00:30', 135],
    ['00:45', 86],
    ['01:00', 73],
    ['01:15', 85],
    ['01:30', 73],
    ['01:45', 68],
    ['02:00', 92],
    ['02:15', 130],
    ['02:30', 245],
    ['02:45', 139],
    ['03:00', 115],
    ['03:15', 111],
    ['03:30', 309],
    ['03:45', 206],
    ['04:00', 137],
    ['04:15', 128],
    ['04:30', 85],
    ['04:45', 94],
    ['05:00', 71],
    ['05:15', 106],
    ['05:30', 84],
    ['05:45', 93],
    ['06:00', 85],
    ['06:15', 73],
    ['06:30', 83],
    ['06:45', 125],
    ['07:00', 107],
    ['07:15', 82],
    ['07:30', 44],
    ['07:45', 72],
    ['08:00', 106],
    ['08:15', 107],
    ['08:30', 66],
    ['08:45', 91],
    ['09:00', 92],
    ['09:15', 113],
    ['09:30', 107],
    ['09:45', 131],
    ['10:00', 111],
    ['10:15', 64],
    ['10:30', 69],
    ['10:45', 88],
    ['11:00', 77],
    ['11:15', 83],
    ['11:30', 111],
    ['11:45', 57],
    ['12:00', 55],
    ['12:15', 60],
  ]

  const dateList = data.map(function (item) {
    return item[0]
  })
  const valueList = data.map(function (item) {
    return item[1]
  })
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
        // interval: interval,
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
      // min: minPrice,
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
  useChart(chartRef, options)
  return (
    <div className="manageLeft-container">
      <div className="title">
        <div className="symbol-info">
          <div className="logo">
            <img src={tencent} alt="" />
          </div>
          <div className="symbol-name">
            <div className="name">
              <span>nTENCT</span> / USDC
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-Under"></use>
              </svg>
            </div>
            <div className="source">
              Tencent Holdings&nbsp;
              <img src={TipsImg} alt="" />
            </div>
          </div>
        </div>
        <div className="symbol-total">
          <div className="premium">
            <div className="title">Premium</div>
            <div className="text">{premium}</div>
          </div>
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
          <div className="price">127.83 USDC 
          <img src={TipsImg} alt="" />
          <div className="tips-text">Oracle Price</div>
          </div>
          <div className="rise">
            9.02(8.06%)
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-growth"></use>
            </svg>
          </div>
        </div>
        <div className="time-type">
          {timeStatusList.map((item,index)=> (
            <span
              key={index}
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
export default ManageLeft
