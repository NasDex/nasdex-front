/** @format */

import React, {useEffect} from 'react'
import * as echarts from 'echarts'

function useChart(chartRef, options) {
  let myChart = null
  function renderChart() {
    const chart = echarts.getInstanceByDom(chartRef.current)
    if (chart) {
      myChart = chart
    } else {
      myChart = echarts.init(chartRef.current)
    }
    myChart.setOption(options)
  }

  useEffect(() => {
    renderChart()
  }, [options])

  useEffect(() => {
    return () => {
      myChart && myChart.dispose()
    }
  }, [])
  return
}
export default useChart
