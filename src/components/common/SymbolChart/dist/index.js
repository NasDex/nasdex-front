/** @format */

'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = {next: verb(0), throw: verb(1), return: verb(2)}),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return {value: op[1], done: false}
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return {value: op[0] ? op[1] : void 0, done: true}
    }
  }
exports.__esModule = true
/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
var react_1 = require('react')
require('../../../style/Mint/symbolChart.less')
var tips_2x_png_1 = require('../../../img/common/tips@2x.png')
var useModal_1 = require('../../../hooks/useModal')
var tikerInfo_1 = require('./tikerInfo')
var echarts = require('echarts')
var chooseAssetPair_1 = require('./chooseAssetPair')
var axios_1 = require('axios')
var react_2 = require('react')
var utils_1 = require('utils')
var react_redux_1 = require('react-redux')
var hooks_1 = require('state/mint/hooks')
var hooks_2 = require('state/manage/hooks')
var hooks_3 = require('state/farm/hooks')
var hooks_4 = require('state/trade/hooks')
var hooks_5 = require('state/common/hooks')
var actions_1 = require('state/common/actions')
var useContract_1 = require('constants/hooks/useContract')
var hooks_6 = require('hooks')
var actions_2 = require('state/trade/actions')
var timeStatusList = ['Day', 'Week', 'Month', 'Year']
var SymbolTradeChart = function (props) {
  var mintState = hooks_1.useMintState()
  var manageState = hooks_2.useManageState()
  var farmState = hooks_3.useFarmState()
  var tradeState = hooks_4.useTradeState()
  var commonState = hooks_5.useCommonState()
  var _a = react_1.useState(0),
    nowPrice = _a[0],
    setNowPrice = _a[1]
  var _b = react_1.useState(0),
    minPrice = _b[0],
    setMinPrice = _b[1]
  var _c = props.SymoblChart,
    volume = _c.volume,
    liquidity = _c.liquidity,
    premium = _c.premium,
    from = _c.from
  var openAssetPair = useModal_1['default'](React.createElement(chooseAssetPair_1['default'], {from: from}))[0]
  var openTikerInfo = useModal_1['default'](
    React.createElement(tikerInfo_1['default'], {nowPrice: nowPrice, from: from}),
  )[0]
  var _d = react_1.useState('Day'),
    timeStatus = _d[0],
    setTimeStatus = _d[1]
  var _e = react_1.useState('nSTA'),
    assetName = _e[0],
    setAssetName = _e[1]
  var _f = react_1.useState('USDT'),
    cAssetName = _f[0],
    setcAssetName = _f[1]
  var _g = react_1.useState('--'),
    premiumValue = _g[0],
    setPremiumValue = _g[1]
  var chartRef = react_1.useRef(null)
  var account = hooks_6.useActiveWeb3React().account
  var AssetContract = useContract_1.useAssetContract()
  function getMinRatio(assetName) {
    return __awaiter(this, void 0, void 0, function () {
      var minCollateralInfo, minCollateral
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, AssetContract.asset(commonState.assetBaseInfoObj[assetName].address)]
          case 1:
            minCollateralInfo = _a.sent()
            minCollateral = minCollateralInfo.minCRatio / 10
            dispatch(actions_1.upDateMinRadio({minRadio: minCollateral}))
            return [2 /*return*/]
        }
      })
    })
  }
  var _h = react_1.useState(false),
    isTab = _h[0],
    setIsTab = _h[1]
  react_2.useEffect(
    function () {
      setIsTab(!isTab)
    },
    [tradeState.isTab],
  )
  react_2.useEffect(
    function () {
      if (!assetName) {
        setAssetName('nSTA')
      }
      if (
        Number(commonState.assetBaseInfoObj[assetName].swapPrice) -
          Number(commonState.assetBaseInfoObj[assetName].oraclePrice) >
        0
      ) {
        var result =
          (Number(
            Number(commonState.assetBaseInfoObj[assetName].swapPrice) -
              Number(commonState.assetBaseInfoObj[assetName].oraclePrice),
          ) /
            Number(commonState.assetBaseInfoObj[assetName].oraclePrice)) *
          100
        setPremiumValue(utils_1.fixD(result.toString(), 2))
      } else {
        var result =
          ((Number(commonState.assetBaseInfoObj[assetName].oraclePrice) -
            Number(commonState.assetBaseInfoObj[assetName].swapPrice)) /
            Number(commonState.assetBaseInfoObj[assetName].oraclePrice)) *
          100
        setPremiumValue('-' + utils_1.fixD(result.toString(), 2))
      }
    },
    [assetName],
  )
  react_2.useEffect(
    function () {
      if (from == 'mint' && mintState.mintCoinStock) {
        setAssetName(mintState.mintCoinStock)
      }
      if (from == 'mint' && mintState.mintCoinSelect) {
        setcAssetName(mintState.mintCoinSelect)
      }
      if (from == 'farm' && farmState.farmCoinStock) {
        setAssetName(farmState.farmCoinStock)
      }
      if (from == 'farm' && farmState.farmCoinSelect) {
        setcAssetName(farmState.farmCoinSelect)
      }
      if (from == 'trade' && tradeState.tradeCoinStock) {
        setAssetName(tradeState.tradeCoinStock)
      }
      if (from == 'trade' && tradeState.tradeCoinSelect) {
        setcAssetName(tradeState.tradeCoinSelect)
      }
      if (from == 'manage') {
        setAssetName(manageState.positionInfo.assetTokenName)
        setcAssetName(manageState.positionInfo.cAssetTokenName)
      }
      if (account) {
        getMinRatio(assetName)
      }
    },
    [account, from, mintState, manageState, tradeState, farmState],
  )
  // console.log(data,'data##')
  // console.log(minuteData,'minuteData#')
  // let chartData: any = []
  react_2.useEffect(
    function () {
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
    },
    [timeStatus],
  )
  // const data = [...chartData]
  var _j = react_1.useState(['']),
    data = _j[0],
    setData = _j[1]
  var _k = react_1.useState(0),
    interval = _k[0],
    setInterval = _k[1]
  // console.log(data,'data##')
  var _l = react_1.useState(),
    dateList = _l[0],
    setDateList = _l[1]
  var _m = react_1.useState(),
    valueList = _m[0],
    setValueList = _m[1]
  react_2.useEffect(
    function () {
      var dateList = data.map(function (item) {
        return item[0]
      })
      setDateList(dateList)
      var valueList = data.map(function (item) {
        return item[1]
      })
      setValueList(valueList)
    },
    [data],
  )
  var options = {
    // Make gradient line here
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
  function formatDate(date) {
    var d = new Date(date)
    var month = '' + (d.getMonth() + 1),
      day = '' + d.getDate()
    var year = d.getFullYear()
    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    return [year, month, day].join('-')
  }
  var _o = react_1.useState(7.7832),
    usdPrice = _o[0],
    setUsdPrice = _o[1]
  function getRate() {
    return __awaiter(this, void 0, void 0, function () {
      var usdprice
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              axios_1['default']({
                method: 'GET',
                url: 'https://api.it120.cc/gooking/forex/rate?fromCode=HKD&toCode=USD',
              }).then(function (res) {
                if (res && res.status === 200 && res.data.code === 0) {
                  setUsdPrice(res.data.data.rate)
                }
              }),
            ]
          case 1:
            usdprice = _a.sent()
            return [2 /*return*/]
        }
      })
    })
  }
  var dispatch = react_redux_1.useDispatch()
  function getdayKlineData() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        axios_1['default']({
          method: 'GET',
          baseURL: 'https://web.ifzq.gtimg.cn',
          url: '/appstock/app/minute/query?code=hk00700',
        }).then(function (res) {
          var dataArray = []
          if (res && res.status === 200) {
            var data_1 = res.data.data.hk00700.data.data
            var minPriceArr_1 = []
            data_1.forEach(function (ele) {
              var mockArr = ele.split(' ')
              var time = mockArr[0].slice(0, 2) + ':' + mockArr[0].slice(2)
              if (time !== '12:00') {
                dataArray.push([time, Number(mockArr[1]) / usdPrice])
                minPriceArr_1.push(mockArr[1])
              }
            })
            setData(dataArray)
            var nowPrice_1 = Number(utils_1.fixD(dataArray[dataArray.length - 1][1], 2))
            var minPrice_1 = minPriceArr_1.sort()[0] / usdPrice
            if (!(Number(nowPrice_1) > 10000000)) {
              setNowPrice(nowPrice_1)
              // dispatch(upDateMintNowPrice({mintNowPrice: nowPrice}))
            }
            setMinPrice(Math.floor(minPrice_1))
            setInterval(59)
          }
        })
        return [2 /*return*/]
      })
    })
  }
  function getweekKlineData() {
    return __awaiter(this, void 0, void 0, function () {
      var date, nowDate, beforeDate
      return __generator(this, function (_a) {
        date = new Date()
        nowDate = formatDate(date.getTime())
        beforeDate = formatDate(date.getTime() - 604800000)
        axios_1['default']({
          method: 'GET',
          baseURL: 'https://web.ifzq.gtimg.cn',
          url: '/appstock/app/fqkline/get?param=hk00700,day,' + beforeDate + ',' + nowDate + ',500,qfq',
        }).then(function (res) {
          var dataArray = []
          if (res && res.status === 200) {
            var data_2 = res.data.data.hk00700.day
            var minPriceArr_2 = []
            data_2.forEach(function (ele) {
              dataArray.push([ele[0], Number(ele[1]) / usdPrice])
              minPriceArr_2.push(ele[1])
            })
            var minPrice_2 = minPriceArr_2.sort()[0] / usdPrice
            setData(dataArray)
            setInterval(0)
            setMinPrice(Math.floor(minPrice_2))
          }
        })
        return [2 /*return*/]
      })
    })
  }
  function getmonthKlineData() {
    return __awaiter(this, void 0, void 0, function () {
      var date, nowDate, beforeDate
      return __generator(this, function (_a) {
        date = new Date()
        nowDate = formatDate(date.getTime())
        beforeDate = formatDate(date.getTime() - 2592000000)
        axios_1['default']({
          method: 'GET',
          baseURL: 'https://web.ifzq.gtimg.cn',
          url: '/appstock/app/fqkline/get?param=hk00700,day,' + beforeDate + ',' + nowDate + ',800,qfq',
        }).then(function (res) {
          var dataArray = []
          if (res && res.status === 200) {
            var data_3 = res.data.data.hk00700.day
            var minPriceArr_3 = []
            data_3.forEach(function (ele) {
              dataArray.push([ele[0], Number(ele[1]) / usdPrice])
              minPriceArr_3.push(ele[1])
            })
            var minPrice_3 = minPriceArr_3.sort()[0] / usdPrice
            setInterval(5)
            setMinPrice(Math.floor(minPrice_3))
            setData(dataArray)
          }
        })
        return [2 /*return*/]
      })
    })
  }
  function getyearKlineData() {
    return __awaiter(this, void 0, void 0, function () {
      var date, nowDate, beforeDate
      return __generator(this, function (_a) {
        date = new Date()
        nowDate = formatDate(date.getTime())
        beforeDate = formatDate(date.getTime() - 31536000000)
        axios_1['default']({
          method: 'GET',
          baseURL: 'https://web.ifzq.gtimg.cn',
          url: '/appstock/app/fqkline/get?param=hk00700,month,' + beforeDate + ',' + nowDate + ',500,qfq',
        }).then(function (res) {
          var dataArray = []
          if (res && res.status === 200) {
            var minPriceArr_4 = []
            setData([])
            var data_4 = res.data.data.hk00700.month
            data_4.forEach(function (ele) {
              dataArray.push([ele[0], Number(ele[1]) / usdPrice])
              minPriceArr_4.push(ele[1])
            })
            console.log(minPriceArr_4.sort())
            var minPrice_4 = minPriceArr_4.sort()[0] / usdPrice
            setMinPrice(60)
            setInterval(2)
            setData(dataArray)
          }
        })
        return [2 /*return*/]
      })
    })
  }
  react_2.useEffect(
    function () {
      var chart = echarts.getInstanceByDom(chartRef.current)
      var myChart = null
      if (valueList && valueList.length > 0 && dateList && dateList.length > 0) {
        if (chart) {
          myChart = chart
        } else {
          myChart = echarts.init(chartRef.current)
        }
        myChart.setOption(options)
      }
    },
    [valueList, dateList, interval, minPrice, usdPrice],
  )
  return React.createElement(
    'div',
    {className: 'symbol-chart'},
    React.createElement(
      'div',
      {className: 'title'},
      React.createElement(
        'div',
        {className: 'symbol-info'},
        React.createElement(
          'div',
          {className: 'logo'},
          React.createElement('img', {
            src: assetName
              ? require('../../../img/coin/' + assetName + '.png')['default']
              : require('../../../img/coin/nSTA.png')['default'],
            alt: '',
          }),
        ),
        React.createElement(
          'div',
          {className: 'symbol-name'},
          React.createElement(
            'div',
            {className: 'name'},
            React.createElement('span', null, assetName),
            ' / ',
            cAssetName,
            from == 'manage' || from == 'trade'
              ? null
              : React.createElement(
                  'svg',
                  {className: 'icon', 'aria-hidden': 'true', onClick: openAssetPair},
                  React.createElement('use', {xlinkHref: '#icon-Under'}),
                ),
            from == 'trade'
              ? React.createElement('div', {
                  className: 'swap-symbol-tab',
                  onClick: function () {
                    dispatch(actions_2.upDateIsTab({isTab: !tradeState.isTab}))
                  },
                })
              : null,
          ),
          React.createElement(
            'div',
            {className: 'source'},
            'Sea Ltd\u00A0',
            React.createElement('img', {src: tips_2x_png_1['default'], alt: '', onClick: openTikerInfo}),
          ),
        ),
      ),
      React.createElement(
        'div',
        {className: 'symbol-total'},
        React.createElement(
          'div',
          {className: 'premium'},
          React.createElement(
            'div',
            {className: 'leabl'},
            'Premium',
            React.createElement('p', null, 'Percentage difference between Swap and Oracle price'),
            React.createElement('img', {src: tips_2x_png_1['default'], alt: ''}),
          ),
          React.createElement('div', {className: 'text'}, premiumValue, '%'),
        ),
        React.createElement(
          'div',
          {className: 'liquidity'},
          React.createElement('div', {className: 'title'}, 'Liquidity($)'),
          React.createElement('div', {className: 'text'}, liquidity),
        ),
      ),
    ),
    React.createElement(
      'div',
      {className: 'chart-info'},
      React.createElement(
        'div',
        {className: 'symbol-price'},
        from == 'trade'
          ? React.createElement(
              'div',
              {className: 'price'},
              commonState.assetBaseInfoObj[cAssetName].oraclePrice
                ? commonState.assetBaseInfoObj[cAssetName].oraclePrice
                : commonState.assetBaseInfoObj[assetName].oraclePrice,
              '\u00A0',
              commonState.assetBaseInfoObj[cAssetName].oraclePrice ? assetName : cAssetName,
              React.createElement('img', {src: tips_2x_png_1['default'], alt: ''}),
              React.createElement('div', {className: 'tips-text'}, 'Oracle Price'),
            )
          : React.createElement(
              'div',
              {className: 'price'},
              assetName
                ? commonState.assetBaseInfoObj[assetName].oraclePrice
                : commonState.assetBaseInfoObj['nSTA'].oraclePrice,
              '\u00A0',
              cAssetName ? cAssetName : 'USDT',
              React.createElement('img', {src: tips_2x_png_1['default'], alt: ''}),
              React.createElement('div', {className: 'tips-text'}, 'Oracle Price'),
            ),
      ),
      React.createElement(
        'div',
        {className: 'time-type'},
        timeStatusList.map(function (item, key) {
          return React.createElement(
            'span',
            {
              key: key,
              onClick: function () {
                return setTimeStatus(item)
              },
              style:
                item === timeStatus
                  ? {
                      color: '#333333',
                      background: '#F2F4FC',
                    }
                  : {},
            },
            item,
          )
        }),
      ),
    ),
    React.createElement('div', {className: 'chart-view', style: {width: '580', height: '359px'}, ref: chartRef}),
  )
}
exports['default'] = SymbolTradeChart
