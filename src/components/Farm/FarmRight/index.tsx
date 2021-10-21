/** @format */

import react, {useState} from 'react'
import '../../../style/Farm/farmRight.less'
import Long from './long'
import Short from './short'
import {Tabs} from 'antd'
import useModal from 'hooks/useModal'
import FarmSetting from '../farmSetting'
const {TabPane} = Tabs

const FarmRight: React.FC<any> = props => {
  const  tablieNav = [
  {
    label: 'Long',
    // icon: '#add-collateral',
  },
  {
    label: props.poolType.toString()==='long'?'':'Short',
    // icon: '#withdraw',
  },
]
  const [headerActive, setHeaderActive] = useState(props.poolType.toString()==='long'?'Long':props.poolType.toString())
  const [openFarmSetting] = useModal(<FarmSetting></FarmSetting>)

  function callback(key: string) {
    console.log(key)
  }
  function showTable(type: string) {
    switch (type) {
      case 'Long':
        return <Long></Long>
      case 'Short':
        return <Short></Short>
      default:
        break
    }
  }
  return (
    <div className="farmRight-table-content">
      <ul className="table-header-tab">
        {tablieNav.map((ele, key) => (
          <li
            className={['header-tab-item', ele.label === headerActive ? 'header-tab-item-active' : null].join(' ')}
            key={key}
            onClick={() => setHeaderActive(ele.label)}>
            {ele.label}
          </li>
        ))}
        <svg className="icon" aria-hidden="true" fill='#999999' onClick={openFarmSetting}>
          <use xlinkHref='#Icon-Set-Active'></use>
        </svg>

      </ul>
      <div className="table-container">{showTable(headerActive)}</div>
    </div>
  )
}
export default FarmRight
