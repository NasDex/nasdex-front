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
import previewHover from '../../img/menu/preview-hover.png'
import '../../style/menu.less'
import useModal from '../../hooks/useModal'
import { useWeb3React } from '@web3-react/core'
import { useWalletModal } from 'components/WalletModal'
import useAuth from 'hooks/useAuth'

const Menu: React.FC = props => {
  
  const { children } = props
  const [showListMenu, setShowListMenu] = useState(false)
  
  const { pathname } = useLocation()
  useEffect(() => {
    setShowListMenu(false)
  }, [pathname])

  const [openWalletCard] = useModal(<WalletCard></WalletCard>)
  const [openAccountCard] = useModal(<AccountCard></AccountCard>)
  const [openNetwork] = useModal(<NetworkCard></NetworkCard>)

  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account || undefined)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null

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
            <img src={LogoPC} />
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
              <span>Connect Wallet</span>
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
              {/* <NavLink to={`/profile`} activeClassName="active" className={pathname=='/manage'?'active':''} >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#Icon-Mint-Active"></use>
                  </svg>
                  <span>Profile</span>
                </NavLink>


              <NavLink to={`/Trade`} activeClassName="active">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#Icon-Trade-Active"></use>
                </svg>
                <span>Trade</span>
              </NavLink> */}
              <NavLink to={`/mint`} activeClassName="active">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#Icon-Mint-Active"></use>
                </svg>
                <span style={{ width: '38px' }}>Mint</span>
                <img src={preview} alt="" />
              </NavLink>
              <NavLink to={`/staking`} activeClassName="active">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#Icon-Stake-Active"></use>
                </svg>
                <span>Stake</span>
              </NavLink>
{/* 
              <NavLink to={`/Farm`} activeClassName="active"
                className={pathname == '/farming/long' || pathname == '/farming/Long' || pathname == '/farming/Short' ? 'active' : ''}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#Icon-Farm-Active"></use>
              </svg>
              <span>Farm</span>
            </NavLink> */}
            </div>

            <div className="menu-bottom">
              <a className="docs" href="https://nasdexofficial.gitbook.io/nasdex/" target="_blank">
                NASDEX Docs
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
