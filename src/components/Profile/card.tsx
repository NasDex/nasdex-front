/** @format */

import react from 'react'
import '../../style/Profile/card.less'
import profileTotalValueImg from '../../img/profile/profile-total-value.png'
import profilePriceImg from '../../img/profile/profile-price.png'
import profileStakedImg from '../../img/profile/profile-staked.png'
import { fixD, getpriceList } from 'utils'
import {useStakeState} from 'state/stake/hooks'
interface ProfileCardProps {
  text?: string
  icon?: string
  bgImg?: string
  value?: string
}

const ProfileCard: React.FC<ProfileCardProps> = props => {
  const { text, value, icon, bgImg } = props
  const stakeState = useStakeState()
  const {priceList} = stakeState
  return (
    <div className="card-list">
      <div className="card-list-item">
        <div className="card-content  card-content-total">
          <div className="card-header">
            {/* <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#Icon-Mint-Active"></use>
                </svg> */}
            <img src={profileTotalValueImg} alt="" />
            Total Value
          </div>
          <div className="card-footer">
            <span>$</span>
            12578113.3189521
          </div>
        </div>
        <div className="card-content  card-content-total card-content-price">
          <div className="card-header">
            {/* <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#Icon-Mint-Active"></use>
                </svg> */}
            <img src={profilePriceImg} alt="" />
            NSDX Price
          </div>
          <div className="card-footer">
            <span>$</span>{fixD(priceList.NSDX, 2)}
          </div>
        </div>
      </div>
      <div className="card-content  card-content-total card-content-staked">
        <div className="card-header">
          {/* <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#Icon-Mint-Active"></use>
                </svg> */}
          <img src={profileStakedImg} alt="" />
          Staked
        </div>
        <div className="card-footer">
          <span>$</span>
          12578113.3189521
        </div>
      </div>
    </div>
  )
}
export default ProfileCard
