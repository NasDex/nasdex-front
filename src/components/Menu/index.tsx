/** @format */

import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import WalletCard from '../Wallet/selectWallet'
import AccountCard from '../Wallet/accountCard'
import NetworkCard from '../Wallet/networkCard'
import FailedCard from '../Wallet/connectionFailed'
import LogoPC from '../../img/common/logo@2x.png'
import LogoH5 from '../../img/common/logoh5@2x.png'
import BtnLight from '../../img/menu/Btn-light@2x.png'
import BtnBlack from '../../img/menu/btn-black@2x.png'
import preview from '../../img/menu/preview.png'
import waring from '../../img/common/waring@2x.png'
import '../../style/menu.less'
import useModal from '../../hooks/useModal'
import { useWeb3React } from '@web3-react/core'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'react-i18next'
import { Select, Button } from 'antd'
import '../../style/title.less'
import i18n from '../../react-i18next-config'

const { Option } = Select
const Menu: React.FC = props => {
  const { t } = useTranslation()
  const { children } = props
  const [showListMenu, setShowListMenu] = useState(false)
  const [openWalletCard] = useModal(<WalletCard></WalletCard>)
  const [openAccountCard] = useModal(<AccountCard></AccountCard>)
  const [openNetwork] = useModal(<NetworkCard></NetworkCard>)

  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  const selectList = [
    {
      label: 'English',
      value: 'en'
    },
    {
      label: '中文',
      value: 'zh-CN'
    }
  ]
  const { pathname } = useLocation()
  useEffect(() => {
    setShowListMenu(false)
  }, [pathname])
  const [isOpen, setIsOpen] = useState(false)
  function clickLabel(label: any, value: any) {
    i18n.changeLanguage(value)
  }
  useEffect(() => {
    const lan = localStorage.getItem('i18nextLng')
    if (lan) {
      i18n.changeLanguage(lan)
    }
  }, [])
  return (
    <div className="container">
      <div className="sidebar">
        <div className="h5-nav">
          <img src={LogoPC} />
          <svg
            className="icon"
            aria-hidden="true"
            onClick={() => {
              setShowListMenu(!showListMenu)
            }}>
            <use xlinkHref="#icon-menu-open"></use>
          </svg>
        </div>
        <div className={showListMenu ? 'menu-list-block show' : 'menu-list-block'}>
          <div className="logo">
            <NavLink to={`/trade`} activeClassName="active">
              <img src={LogoPC} />
            </NavLink>
            <span className="toggle-btn">
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-left"></use>
              </svg>
            </span>
          </div>
          {/* <div className="wallet-btn connect-wallet-btn" onClick={openWalletCard}> */}
          {!account ? (
            <div className="wallet-btn connect-wallet-btn" onClick={() => onPresentConnectModal()}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-Connect-Wallet"></use>
              </svg>
              <span>{t('ConnectWallet')}</span>
            </div>
          ) : (
            <div className="wallet-btn wallet-account" onClick={() => onPresentAccountModal()}>
              <div className="network" onClick={openNetwork}>
                <i></i>
                <span>Polygon</span>
              </div>
              <div className="address" onClick={openAccountCard}>
                {/* 0x1343..1231 */}
                {accountEllipsis}
              </div>
            </div>
          )}

          {/* <div className="total-protfolio">
            <p>
              <span>Your total asset protfolio</span>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-right"></use>
              </svg>
            </p>
            <div className="total-num">
              <span>$25,650</span>
              <div className="rate">
                <span>2.1%</span>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-growth"></use>
                </svg>
              </div>
            </div>
          </div> */}
          <div className="menu-container">
            <div className="menu-list">
              {/* <a>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#Icon-User-Profile-Active"></use>
              </svg>
              <span>User Profile</span>
            </a>
            <a>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#Icon-Trade-Active"></use>
              </svg>
              <span>Trade</span>
            </a> */}
              <NavLink to={`/profile`} activeClassName="active" className={pathname == '/manage' ? 'active' : ''}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#Icon-User-Profile-Active"></use>
                </svg>
                <span>{t('Profile')}</span>
              </NavLink>

              <NavLink to={`/Trade`} activeClassName="active">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#Icon-Trade-Active"></use>
                </svg>
                <span>{t('Swap')}</span>
              </NavLink>

              <NavLink to={`/mint`} activeClassName="active">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#Icon-Mint-Active"></use>
                </svg>
                <span style={{ width: '38px' }}>{t('Mint')}</span>
                {/* <img src={preview} alt="" /> */}
              </NavLink>

              <NavLink
                to={`/Farm`}
                activeClassName="active"
                className={
                  pathname == '/farming/long' || pathname == '/farming/Long' || pathname == '/farming/Short'
                    ? 'active'
                    : ''
                }>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#Icon-Farm-Active"></use>
                </svg>
                <span>{t('Farm')}</span>
              </NavLink>
              <NavLink to={`/staking`} activeClassName="active">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#Icon-Stake-Active"></use>
                </svg>
                <span>{t('Stake')}</span>
              </NavLink>
            </div>
            <div className="menu-bottom">
              <div className="tip">
                <div className="tit">
                  <img src={waring} alt="" />
                  <span>{t('Note')}:</span>
                </div>
                <p>{t('riskTips')}</p>
              </div>
              <a className="docs" href="https://nasdexofficial.gitbook.io/nasdex/" target="_blank">
                {t('NASDEXDocs')}
              </a>
              <div className="link-list">
                <a href="https://twitter.com/nasdex_xyz" target="_blank">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon_twitter"></use>
                  </svg>
                </a>
                <a href="https://t.me/nasdex_xyz" target="_blank">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon_Telegram-Group"></use>
                  </svg>
                </a>
                {/* <a>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon_Telegram-Channel"></use>
                </svg>
              </a> */}
                <a href="https://medium.com/@nasdex" target="_blank">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon_Medium"></use>
                  </svg>
                </a>
                {/* <a>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon_Discord"></use>
                </svg>
              </a> */}
              </div>
              <div className="language-select" onClick={() => setIsOpen(!isOpen)}>
                <i></i>
                <div className="select-name" >
                  <svg className="icon" aria-hidden="true" >
                    <use xlinkHref="#language"></use>
                  </svg>
                  <span>{i18n.language == 'zh-CN' ? '语言' : 'Language'}</span>
                </div>
                {isOpen ? (
                  <ul onClick={() => setIsOpen(!isOpen)}>
                    {selectList.map((ele, index) => (
                      <li className="customize-option-label-item" key={index} onClick={() => clickLabel(ele.label, ele.value)}>
                        {ele.label}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              {/* <div className="theme-mode-box">
            <span>Dark Mode</span>
            <div className="mode-select">
              <img src={BtnLight} />
            </div>
          </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="main">{children}</div>
    </div>
  )
}

export default Menu
