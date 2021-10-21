/** @format */

import react from 'react'
import {Modal, Button} from 'antd'
import logo from '../../../img/coin/tencent.png'
import '../../../style/Mint/tikerInfo.less'

const defaultOnDismiss = () => null

type TikerInfoProps = {
  onDismiss?: () => void
  nowPrice?: number
}

const TikerInfo = ({onDismiss = defaultOnDismiss, nowPrice = 0}: TikerInfoProps) => {
  return (
    <Modal title="Ticker Info" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="tikerInfo-container">
        <div className="top">
          <div className="left">
            <img className="logo" src={logo} alt="" />
            <div className="tit">
              <p className="titp">nTENCT</p>
              <span>Tencent Holdings Ltd</span>
            </div>
          </div>
          <h5>{nowPrice} USD</h5>
        </div>
        <div className="card">
          <div className="item">
            <p className="itemp">Min. Col. Ratio</p>
            <span>150%</span>
          </div>
          {/* <div className="item">
            <p className="itemp">Collateral Value</p>
            <span>48.48M USD</span>
          </div>
          <div className="item">
            <p className="itemp">Market Cap</p>
            <span>22.62M USD</span>
          </div> */}
        </div>
        <div className="describe">
          Tencent is a multinational corporate holding company in China. Tencent's business has expanded to social,
          finance, information, tools, platforms and other fields. Its subsidiaries specialize in various global
          Internet-related services and products, entertainment, artificial intelligence and technology. At present,
          Tencent owns Tencent QQ and WeChat, the most used social software in mainland China, and Tencent Games, the
          largest online game community. In the field of e-books, it owns the Reading Group, which operates QQ Reading
          and WeChat Reading.
        </div>
      </div>
    </Modal>
  )
}

export default TikerInfo
