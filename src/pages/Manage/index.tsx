/** @format */

import React from 'react'
import '../../style/Manage/manage.less'
import SymbolList from '../../components/Mint/SymbolList'
import ManageLeft from '../../components/Manage/ManageLeft'
import ManageRight from '../../components/Manage/ManageRight/index'
import {NavLink, useLocation} from 'react-router-dom'
import Title from '../../components/Title/index'
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
export default function Staking() {
  return (
    <div className="manage-container">
      <div className="container-center">
        <NavLink to={`/profile`} activeClassName="active">
          <Title title="manage" hasOpen />
        </NavLink>
        <div className="manage-symbol-trade">
          <ManageLeft SymoblChart={SymoblChart}></ManageLeft>
          <ManageRight></ManageRight>
        </div>
      </div>
    </div>
  )
}
