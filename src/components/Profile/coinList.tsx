/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import react, { useEffect, useState } from 'react'
import '../../style/Profile/coinList.less'
import { useActiveWeb3React } from 'hooks'
import zhanweifu from '../../img/common/zhanweifu.png'
import { fixD } from 'utils'
import { useCommonState } from 'state/common/hooks'
const CoinList: React.FC<any> = props => {
  const { account } = useActiveWeb3React()
  const commonState = useCommonState()
  const [assetInfo, setAssetInfo] = useState([])
  const notAccount: any = [
    {
      key: '0',
      tokenBalance: '0.0',
      name: 'NSDX',
      value: '0.0',
    },
    {
      key: '1',
      tokenBalance: '0.0',
      name: 'USDC',
      value: '0.0',
    },
  ]
  // async function getPositions() {
  //   const result: any = []
  //   let allAssetsListInfo: any = []
  //   const info: any = []
  //   Object.keys(commonState.assetBaseInfoObj).forEach(function (assetName) {
  //     info.push(commonState.assetBaseInfoObj[assetName])
  //   })
  //   allAssetsListInfo = info
  //   if (allAssetsListInfo.length > 0) {
  //     allAssetsListInfo.forEach((position: any) => {
  //       if (parseFloat(position.balance) > 0 && account) {
  //         let value: any
  //         if (position.type == 'asset') {
  //           value = (Number(position.swapPrice) * Number(position.balance)).toString()
  //         } else {
  //           value = (Number(position.unitPrice) * Number(position.balance)).toString()
  //         }
  //         if (position.name == 'NSDX') {
  //           value = (Number(props.priceList.NSDX) * Number(position.balance)).toString()
  //         }
  //         result.push({
  //           key: position.id,
  //           tokenBalance: Number(position.balance),
  //           name: position.name,
  //           value: Number(value),
  //         })
  //       }
  //     })
  //   }
  //   if (result.length > 0) {
  //     setAssetInfo(result)
  //   } else {
  //     setAssetInfo(notAccount) // Show NSDX + USDC
  //   }
  // }
  async function getPositions() {
    const assets = commonState.assets
    const assetBalances = commonState.assetBalances
    const swapPrices = commonState.swapPrices

    if(assets !== null && assets !== undefined && assetBalances !== null && assetBalances !== undefined) {
      const allAssetsListInfo = Object.values(assets)

      const result = allAssetsListInfo.map((position: any) => {
        const assetBalance = assetBalances[position.name]?.balance
      
        if (assetBalance !== undefined && parseFloat(assetBalance) > 0 && account) {
          let value: any
          if (position.type == 'asset') {
            const assetSwapPrice = swapPrices[`${position.name}/USDC`]
            value = (Number(assetSwapPrice) * Number(assetBalance)).toString()
          } else {
            value = (Number(position.unitPrice) * Number(assetBalance)).toString()
          }
          if (position.name == 'NSDX') {
            value = (Number(props.priceList.NSDX) * Number(assetBalance)).toString()
          }

          const obj = {
            key: position.id,
            tokenBalance: parseFloat(assetBalance),
            name: position.name,
            value: Number(value),
          }

          return obj
        }
      })
  
      setAssetInfo(result.length > 0 ? result : notAccount) // Show NSDX + USDC
    }
  }

  useEffect(() => {
    getPositions()
  }, [account, commonState.assets, commonState.assetBalances, commonState.swapPrices, props])

  return (
    <div className="coin-list">
      {assetInfo.map((ele: any, key: any) => (
        <div className="coin-item" key={key}>
          <div className="coin-item-left">
            <img
              className="coin-logo"
              src={ele.name ? require(`../../img/coin/${ele.name}.png`).default : { zhanweifu }}
              alt=""
            />
            {ele.name}
          </div>
          <div className="coin-item-right">
            <div className="coin-balance">
              <p className="balance-num">
                {account
                  ? ele.tokenBalance < 0.000001 && ele.tokenBalance > 0
                    ? '<0.000001'
                    : fixD(ele.tokenBalance, 6)
                  : '0.0'}
              </p>
              <p className="balance-price">
                $ {account ? (ele.value < 0.0001 && ele.value > 0 ? '<0.0001' : fixD(ele.value, 4)) : '0.0'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default CoinList
