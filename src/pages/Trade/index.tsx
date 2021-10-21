/** @format */

import React from 'react'
import '../../style/Trade/trade.less'
import SymbolList from '../../components/Mint/SymbolList'
import TradeLeft from '../../components/Trade/TradeLeft'
import TradeRight from '../../components/Trade/TradeRight/index'
import Title from '../../components/Title'
const symbolMock = [
  {
    id: '0',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nGOOGL',
    convertUsd: '2808.01',
    isRise: true,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '1',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nAPPL',
    convertUsd: '149.96',
    isRise: true,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '2',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nMSFT',
    convertUsd: '708.15',
    isRise: false,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '3',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nMSFT',
    convertUsd: '708.15',
    isRise: false,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '4',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nMSFT',
    convertUsd: '708.15',
    isRise: false,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
]
const SymoblChart = {
  symbolName: '',
  symbolLogo: '',
  premium: '--',
  volume: '43,123.09',
  liquidity: '25,93M',
}
export default function Trade() {
  return (
    <div className="trade-container">
      <div className="container-center">
      <Title title="Trade" hasOpen />
        <div className="manage-symbol-trade">
          <TradeLeft SymoblChart={SymoblChart}></TradeLeft>
          <TradeRight></TradeRight>
        </div>
      </div>
    </div>
  )
}
