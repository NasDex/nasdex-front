/** @format */

import react, {useEffect, useState} from 'react'
import '../../../style/Mint/symbolList.less'
import {Tabs} from 'antd'

interface SymbolItem {
  id: string
  iconUrl: string
  name: string
  convertUsd: string
  isRise: boolean
  priceIncrease: string
  changeRate: string
}
interface SymbolListProps {
  SymbolListArray: Array<SymbolItem>
}

const SymbolList: React.FC<SymbolListProps> = props => {
  const {SymbolListArray} = props
  return (
    <div className="symbol-list">
      {SymbolListArray.map((items, index) => (
        <SymbolListItem SymbolItem={items} key={index} />
      ))}
      <div className="symbol-list-menu">
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon_more"></use>
        </svg>
      </div>
    </div>
  )
}

const SymbolListItem: React.FC<any> = props => {
  const {iconUrl, name, convertUsd, isRise, priceIncrease, changeRate, id} = props.SymbolItem
  const [defaultActiveKey, setDefaultActiveKey] = useState('1')
  return (
    <div className="symbol-item">
      <div className="symbol">
        <img src={iconUrl} alt="" />
        <div className="name">{name}</div>
      </div>
      <div className="convert-usd">
        <span>$</span>
        {convertUsd}
      </div>
      {isRise ? (
        <div className="rise">
          {priceIncrease}({changeRate})
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-growth"></use>
          </svg>
        </div>
      ) : (
        <div className="fall">
          {priceIncrease}({changeRate})
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-fall"></use>
          </svg>
        </div>
      )}
    </div>
  )
}

export default SymbolList
