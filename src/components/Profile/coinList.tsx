/** @format */

import react from 'react'
import USDTLogo from '../../img/coin/USDT@2x.png'
import USDCLogo from '../../img/coin/USDC@2x.png'
import NSDX from '../../img/stake/logo.png'
import '../../style/Profile/coinList.less'
const coinArr = [
  {
    logo: NSDX,
    name: 'NSDX',
    balance: '8129.419',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDCLogo,
    name: 'USDC',
    balance: '481205.0123',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDTLogo,
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDCLogo,
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDCLogo,
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDCLogo,
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDCLogo,
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDCLogo,
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDCLogo,
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
  {
    logo: USDCLogo,
    name: 'USDT',
    balance: '5710.0141253',
    balancePrice: '$1000.0123',
  },
]

const CoinList: React.FC<any> = props => {
  return (
    <div className="coin-list">
      {coinArr.map((ele, key) => (
        <CoinlistItem coinItem={ele} key={key}></CoinlistItem>
      ))}
    </div>
  )
}
const CoinlistItem: React.FC<any> = props => {
  const {name, logo, balance, balancePrice} = props.coinItem
  return (
    <div className="coin-item">
      <div className="coin-item-left">
        <img className="coin-logo" src={logo} alt="" />
        {name}
      </div>
      <div className="coin-item-right">
        <div className="coin-balance">
          <p className="balance-num">{balance}</p>
          <p className="balance-price">{balancePrice}</p>
        </div>
      </div>
    </div>
  )
}
export default CoinList
