/** @format */

import react, {useState} from 'react'
import {Modal, Button, Input} from 'antd'
import logo from '../../../img/mint/apple-logo.png'
import tencent from '../../../img/coin/tencent.png'
import USDT from '../../../img/coin/USDT@2x.png'
import USDC from '../../../img/coin/USDC@2x.png'
import '../../../style/Mint/chooseAssetPair.less'
import {useMintState} from 'state/mint/hooks'
import {upDateCoinSelect} from 'state/mint/actions'
import {useDispatch} from 'react-redux'

const defaultOnDismiss = () => null

type AssetPairProps = {
  onDismiss?: () => void
}

const AssetPair = ({onDismiss = defaultOnDismiss}: AssetPairProps) => {
  const mintState = useMintState()
  const [basePool, setBasePool] = useState(mintState.mintCoinSelect)
  const dispatch = useDispatch()

  return (
    <Modal title="Select a Pool" width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="chooseAssetPair-container">
        {/* <Input placeholder="Search name or pool address" bordered={false} /> */}
        <div className="base">
          <p>Common bases</p>
        </div>
        <div className="asset">
          <div
            className="asset-item"
            style={
              basePool === 'USDC'
                ? {
                    borderColor: '#005aff',
                  }
                : {}
            }
            onClick={() => {
              setBasePool('USDC')
              dispatch(upDateCoinSelect({mintCoinSelect: 'USDC'}))
              onDismiss()
            }}>
            <img src={USDC} alt="" />
            <span>USDC</span>
          </div>
          <div
            className="asset-item"
            style={
              basePool === 'USDT'
                ? {
                    borderColor: '#005aff',
                  }
                : {}
            }
            onClick={() => {
              setBasePool('USDT')
              dispatch(upDateCoinSelect({mintCoinSelect: 'USDT'}))
              onDismiss()
            }}>
            <img src={USDT} alt="" />
            <span>USDT</span>
          </div>
        </div>
        <div className="card">
          <div className="item">
            <div className="left">
              <img className="logo" src={tencent} alt="" />
              <div className="tit">
                <p>nTENCT</p>
                <span>Tencent Holdings Ltd</span>
              </div>
            </div>
            <div className="right">
              <p>${mintState.mintNowPrice}</p>
              <span>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-Connect-Wallet"></use>
                </svg>
                0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AssetPair
