/** @format */

import React from 'react'
import '../../style/Farm/farm.less'
import SymbolList from '../../components/Mint/SymbolList'
import FarmLeft from '../../components/Farm/FarmLeft'
import FarmRight from '../../components/Farm/FarmRight'
import Title from '../../components/Title'
import {NavLink, useLocation} from 'react-router-dom'
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
const Farm:React.FC<any> = props => {
  const params = props.match.params.poolType
  return (
    <div className="farm-container">
      <div className="container-center">
        <NavLink to={`/farm`} activeClassName="active">
          <Title title="farm" hasOpen />
        </NavLink>
        <div className="farm-symbol-trade">
          <FarmLeft SymoblChart={SymoblChart}></FarmLeft>
          <FarmRight poolType={params}></FarmRight>
        </div>
      </div>
    </div>
  )
}
export default Farm