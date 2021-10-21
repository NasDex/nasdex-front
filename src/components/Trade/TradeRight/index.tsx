/** @format */

import react, {useState} from 'react'
import '../../../style/Trade/tradeRight.less'
import Buy from './buy'
import Sell from './sell'
import {Tabs} from 'antd'
import useModal from 'hooks/useModal'
import TradeSetting from '../../../components/Trade/tradeSetting'
const {TabPane} = Tabs

const tablieNav = [
  {
    label: 'Buy',
    // icon: '#add-collateral',
  },
  {
    label: 'Sell',
    // icon: '#withdraw',
  },
  // {
  //   label: 'Close',
  //   icon: '#redeem',
  // },
]
const ProfileList: React.FC<any> = props => {
  const [headerActive, setHeaderActive] = useState('Buy')
  const [openTradeSetting] = useModal(<TradeSetting></TradeSetting>)

  function callback(key: string) {
    console.log(key)
  }
  function showTable(type: string) {
    switch (type) {
      case 'Buy':
        return <Buy></Buy>
      case 'Sell':
        return <Sell></Sell>
      default:
        break
    }
  }
  return (
    <div className="tradeRight-table-content">
      <ul className="table-header-tab">
        {tablieNav.map((ele, key) => (
          <li
            className={['header-tab-item', ele.label === headerActive ? 'header-tab-item-active' : null].join(' ')}
            key={key}
            onClick={() => setHeaderActive(ele.label)}>
            {ele.label}
          </li>
        ))}
        <svg className="icon" aria-hidden="true" fill='#999999' onClick={openTradeSetting}>
          <use xlinkHref='#Icon-Set-Active'></use>
        </svg>

      </ul>
      <div className="table-container">{showTable(headerActive)}</div>
    </div>
  )
}
export default ProfileList
