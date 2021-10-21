/** @format */

import react, {useState} from 'react'
import '../../style/Profile/profileList.less'
import ProfileTable from '../Profile/positionTable'
import FarmingTable from '../Profile/farmingTable'
import StakingTable from '../Profile/stakingTable'
import HistoryTable from '../Profile/historyTable'
import {Tabs} from 'antd'
const {TabPane} = Tabs

const tablieNav = [
  {
    label: 'Positions',
    icon: '#Positions',
  },
  // {
  //   label: 'Farming',
  //   icon: '#profile-farming',
  // },
  // {
  //   label: 'Staking',
  //   icon: '#profile-staking',
  // },
  {
    label: 'History',
    icon: '#profile-history',
  },
]
const ProfileList: React.FC<any> = props => {
  const [headerActive, setHeaderActive] = useState('Positions')
  function callback(key: string) {
    console.log(key)
  }
  function showTable(type: string) {
    switch (type) {
      case 'Positions':
        return <ProfileTable></ProfileTable>
      case 'Farming':
        return <FarmingTable></FarmingTable>
      case 'Staking':
        return <StakingTable></StakingTable>
      case 'History':
        return <HistoryTable></HistoryTable>
      default:
        break
    }
  }
  return (
    <div className="table-content">
      <ul className="table-header-tab">
        {tablieNav.map((ele, key) => (
          <li
            className={['header-tab-item', ele.label === headerActive ? 'header-tab-item-active' : null].join(' ')}
            key={key}
            onClick={() => setHeaderActive(ele.label)}>
            <svg className="icon" aria-hidden="true" fill={ele.label === headerActive?'#005AFF':'#1C1C1C'}>
              <use xlinkHref={ele.icon}></use>
            </svg>
            {ele.label}
          </li>
        ))}
        {
          headerActive==='Farming'?
          <div className="farm">
            <div className="item">
              <span className="totalReward">Total Reward</span>
              <span className="totalRewardVale">356.703834 MIR</span>
            </div>
            <div className="item">
              <span className="totalReward">Total Reward</span>
              <span className="totalRewardVale">356.703834 MIR</span>
            </div>
          </div>:null}
      </ul>
      <div className="table-container">{showTable(headerActive)}</div>
    </div>
  )
}
export default ProfileList
