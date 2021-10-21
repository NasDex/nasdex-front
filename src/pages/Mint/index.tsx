/** @format */

import React from 'react'
import '../../style/Mint/mint.less'
import Title from '../../components/Title'
import SymbolList from '../../components/Mint/SymbolList'
import SymbolTradeChart from '../../components/Mint/SymbolChart/index'
import SymbolTrade from '../../components/Mint/SymbolTrade/index'
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
const symoblChart = {
  symbolName: '',
  symbolLogo: '',
  premium: '--',
  volume: '43,123.09',
  liquidity: '25,93M',
}
export default function Staking() {
  return (
    <div className="mint-container">
      <div className="container-center">
        <Title title="Mint" hasOpen />
        {/* <SymbolList SymbolListArray={symbolMock}></SymbolList> */}
        <div className="symbol-trade">
          <SymbolTradeChart SymoblChart={symoblChart}></SymbolTradeChart>
          <SymbolTrade></SymbolTrade>
        </div>
      </div>
    </div>
  )
}
