/** @format */

import react from 'react'
import ProfileCard from '../../components/Profile/card'
import CoinList from '../../components/Profile/coinList'
import Title from '../../components/Title'
import ProfileList from '../../components/Profile/profileList'
import '../../style/Profile/index.less'
export default function Profile() {
  return (
    <div className="profile-container">
      <div className="container-center">
        <Title title="Profile" hasOpen hasAddress />
        <div className="profile-content">
          <div className="profile-data">
            <ProfileCard></ProfileCard>
            <CoinList></CoinList>
          </div>
          <div className="profile-list">
            <ProfileList></ProfileList>
          </div>
        </div>
      </div>
    </div>
  )
}
