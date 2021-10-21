/** @format */

import react from 'react'
import {Button} from 'antd'
import '../../style/Farm/farmPool.less'
import {NavLink, useLocation} from 'react-router-dom'
interface FarmItem {
  id: string
  iconUrl: string
  name: string
  source: string
  aprLong: string
  aprShort: string
  ammPirce: string
  premium: string
}
interface FarmListProps {
  SymbolListArray: Array<FarmItem>
}
const FarmListArray = [
  {
    id: '0',
    iconUrl: '/image/coin/nasd.png',
    name: 'NASD',
    source: 'NASDEX',
    aprLong: '3.56%',
    aprShort: '182.32%',
    ammPirce: '720.77 USDC',
    staked: '720.77 NASD',
  },
  {
    id: '1',
    iconUrl: '/image/coin/nappl.png',
    name: 'nAPPL',
    source: 'Apple Inc.',
    aprLong: '3.56%',
    aprShort: '182.32%',
    ammPirce: '720.77 USDC',
    staked: '720.77 NASD',
  },
  {
    id: '2',
    iconUrl: '/image/coin/ntwtr.png',
    name: 'nTWTR',
    source: 'Twitter Inc.',
    aprLong: '3.56%',
    aprShort: '182.32%',
    ammPirce: '720.77 USDC',
    staked: '720.77 NASD',
  },
  {
    id: '3',
    iconUrl: '/image/coin/ntsla.png',
    name: 'nTsla',
    source: 'Tesla Inc.',
    aprLong: '3.56%',
    aprShort: '182.32%',
    ammPirce: '720.77 USDC',
    staked: '720.77 NASD',
  },
  {
    id: '4',
    iconUrl: '/image/coin/nabnb.png',
    name: 'nABNB',
    source: 'Airbnb Inc.',
    aprLong: '3.56%',
    aprShort: '182.32%',
    ammPirce: '720.77 USDC',
    staked: '720.77 NASD',
  },
  {
    id: '5',
    iconUrl: '/image/coin/namzn.png',
    name: 'nAMZN',
    source: 'Amazon.con Inc.',
    aprLong: '3.56%',
    aprShort: '182.32%',
    ammPirce: '720.77 USDC',
    staked: '720.77 NASD',
  },
]
const FarmPoolList = () => {
  return (
    <div className="farm-pool-list">
      {FarmListArray.map((ele, key) => (
        <FarmPoolItem farmPoolItem={ele} key={key}></FarmPoolItem>
      ))}
    </div>
  )
}

const FarmPoolItem: React.FC<any> = props => {
  const {name, source, iconUrl, aprLong, aprShort, ammPirce, staked} = props.farmPoolItem
  return (
    <div className="farm-pool-item">
      <div className="pool-header">
        <img className="pool-logo" src={iconUrl} alt="" />
        <div>
          <div className="pool-name">{name}</div>
          <div className="pool-source">{source}</div>
        </div>
      </div>
      <div className="apr-info">
        <div className="long-apr">
          <div className="long-apr-title">{aprLong}</div>
          <div className="long-apr-text">long APR</div>
        </div>
        <div className="short-apr">
          <div className="long-apr-title">{aprShort}</div>
          <div className="long-apr-text">Short APR</div>
        </div>
      </div>
      <div className="amm-price">
        <div className="leabl">Swap Price</div>
        <div className="text">{ammPirce}</div>
      </div>
      <div className="amm-price">
        <div className="leabl">Staked</div>
        <div className="text">{staked}</div>
      </div>
      <div className="action-btn">
        {
          name === 'NASD' ?
            <NavLink to={`/farming/long`}><Button className={name === 'NASD' ? 'farmBtn longBtn' : 'farmBtn'}>Long Farm</Button></NavLink> :
            <NavLink to={`/farming/Long`}><Button className={name === 'NASD' ? 'farmBtn longBtn' : 'farmBtn'}>Long Farm</Button></NavLink>
        }
        {
          name==='NASD' ?
            null:
            <NavLink to={`/farming/Short`}> <Button className="farmBtn shortBtn">Short Farm</Button></NavLink>
        }
      </div>
    </div>
  )
}

export default FarmPoolList
