/** @format */

import React, {useRef} from 'react'
import {useTranslation} from 'react-i18next'
import {Select, Button} from 'antd'
import useChart from '../../hooks/useChart'

const {Option} = Select
export default function Test() {
  const {t, i18n} = useTranslation()

  const chartRef = useRef(null)
  const options = {
    title: {
      text: '测试表格 react-hook 抽离',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  }
  useChart(chartRef, options)

  function handleChange(value: string) {
    console.log(`selected ${value}`)
    i18n.changeLanguage(value)
  }
  return (
    <div>
      <p>content {t('test')}</p>
      <Select defaultValue="lucy" style={{width: 120}} onChange={handleChange}>
        <Option value="zh-CN">中文</Option>
        <Option value="en">English</Option>
      </Select>
      <Button type="primary">Primary Button</Button>
      <div style={{width: '400px', height: '400px'}} ref={chartRef} />
    </div>
  )
}
