/** @format */

import { useWeb3React } from '@web3-react/core'
import CopyToClipboard from 'components/WalletModal/CopyToClipboard'
import { useTranslation } from 'react-i18next'
import { Select, Button } from 'antd'
import { NavLink } from 'react-router-dom'
import React from 'react'
import '../../style/title.less'
const { Option } = Select
type TitleProps = {
  title: string
  hasOpen?: boolean
  hasAddress?: boolean
}
const Title = ({ title, hasOpen, hasAddress }: TitleProps) => {
  const { t, i18n } = useTranslation()
  const { account } = useWeb3React()
  return (
    <div className="title">
      {title == 'manage' || title == 'farm' ? (
        <div className="position">
          {title == 'manage' ? <span className="manage">{t('Position')}</span> : <span className="farm">{t('Farm')}</span>}
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-left"></use>
          </svg>
          <NavLink to={title == 'farm' ? (`/farm`) : title == 'manage' ? (`/profile`) : (`/mint`)} activeClassName="active">
            <span >{t('AllAssets')}</span>
          </NavLink>
        </div>
      ) : (
        title
      )}
      {/* {hasOpen ? (
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-on"></use>
        </svg>
      ) : null} */}
      {hasAddress && account ? (
        <div className="address">
          <CopyToClipboard toCopy={account}>
            <span className="pc-account">{account}</span>
            <span className="h5-account">
              {account.substr(0, 10)}...{account.substr(account.length - 50, 10)}
            </span>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#copy"></use>
            </svg>
          </CopyToClipboard>
        </div>
      ) : null}
    </div>
  )
}
export default Title
