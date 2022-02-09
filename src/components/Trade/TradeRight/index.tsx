/** @format */

import react, { useState } from 'react'
import '../../../style/Trade/tradeRight.less'
import Buy from './buy'
import { Tabs } from 'antd'
import useModal from 'hooks/useModal'
import TradeSetting from '../../../components/common/Setting'
const { TabPane } = Tabs
import { useTranslation } from 'react-i18next'
const tablieNav = [
  {
    label: 'Buy',
  },
  {
    label: 'Sell',
  },
]
const ProfileList: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const [openTradeSetting] = useModal(<TradeSetting from="trade"></TradeSetting>)
  return (
    <div className="tradeRight-table-content">
      <ul className="table-header-tab">
        <li className="header-tab-item">{t('Swap')}</li>
        {/* {tablieNav.map((ele, key) => (
          <li
            className={['header-tab-item', ele.label === headerActive ? 'header-tab-item-active' : null].join(' ')}
            key={key}
            onClick={() => setHeaderActive(ele.label)}>
            {ele.label}
          </li>
        ))} */}
        <svg className="icon" aria-hidden="true" fill="#999999" onClick={openTradeSetting}>
          <use xlinkHref="#Icon-Set-Active"></use>
        </svg>
      </ul>
      <div className="table-container">
        <Buy assetName={props.assetName} cAssetName={props.cAssetName}></Buy>
      </div>
    </div>
  )
}
export default ProfileList
