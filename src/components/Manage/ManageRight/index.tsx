/** @format */

import react, {useState} from 'react'
import '../../../style/Manage/manageRight.less'
import AddCollateral from '../ManageRight/addCollateral'
import Withdraw from '../ManageRight/withdraw'
import Close from '../ManageRight/close'
import {Tabs} from 'antd'
const {TabPane} = Tabs

const tablieNav = [
  {
    label: 'Add Collateral',
    icon: '#add-collateral',
  },
  {
    label: 'Withdraw',
    icon: '#withdraw',
  },
  {
    label: 'Close',
    icon: '#redeem',
  },
]
const ProfileList: React.FC<any> = props => {
  const [headerActive, setHeaderActive] = useState('Add Collateral')
  function callback(key: string) {
    console.log(key)
  }
  function showTable(type: string) {
    switch (type) {
      case 'Add Collateral':
        return <AddCollateral></AddCollateral>
      case 'Withdraw':
        return <Withdraw></Withdraw>
      case 'Close':
        return <Close></Close>
      default:
        break
    }
  }
  return (
    <div className="manageRight-table-content">
      <ul className="table-header-tab">
        {tablieNav.map((ele, key) => (
          <li
            className={['header-tab-item', ele.label === headerActive ? 'header-tab-item-active' : null].join(' ')}
            key={key}
            onClick={() => setHeaderActive(ele.label)}>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={ele.icon}></use>
            </svg>
            {ele.label}
          </li>
        ))}
      </ul>
      <div className="table-container">{showTable(headerActive)}</div>
    </div>
  )
}
export default ProfileList
