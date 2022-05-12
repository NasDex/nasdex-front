/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import react, { useState, useEffect } from 'react'
import { Modal, Button, Input } from 'antd'
import '../../../style/Mint/chooseAssetPair.less'
import { useMintState } from 'state/mint/hooks'
import { useManageState } from 'state/manage/hooks'
import { useFarmState } from 'state/farm/hooks'
import { useTradeState } from 'state/trade/hooks'
import { upDateCoinSelect as upDateMintCoinSelect, upDateCoinStock as upDateMintCoinStock } from 'state/mint/actions'
import { upDateFarmCoinSelect, upDateCoinStock as upDateFarmCoinStock } from 'state/farm/actions'
import { upDateTradeCoinSelect, upDateCoinStock as upDateTradeCoinStock } from 'state/trade/actions'
import { useDispatch } from 'react-redux'
import { useActiveWeb3React } from 'hooks'
import { useCommonState } from 'state/common/hooks'
import { fixD, getpriceList } from 'utils/dist'
import { useTranslation } from 'react-i18next'
import { restrictedCoins } from 'constants/index'
const defaultOnDismiss = () => null

type AssetPairProps = {
  onDismiss?: () => void
  from: string
}
const AssetPair = ({ onDismiss = defaultOnDismiss, from }: AssetPairProps) => {
  const { t, i18n } = useTranslation()
  const mintState = useMintState()
  const commonState = useCommonState()
  const manageState = useManageState()
  const farmState = useFarmState()
  const tradeState = useTradeState()
  const dispatch = useDispatch()
  const account = useActiveWeb3React()
  const [assetInfo, setAssetInfo] = useState([])
  const [basePool, setBasePool] = useState(
    from == 'mint' && mintState.mintCoinSelect
      ? mintState.mintCoinSelect
      : (from == 'farm' || from == 'longFarm') && farmState.farmCoinSelect
        ? farmState.farmCoinSelect
        : from == 'trade' && tradeState.tradeCoinSelect
          ? tradeState.tradeCoinSelect
          : commonState.defaultCAsset,
  )
  const [assetPool, setAssetPool] = useState(
    from == 'mint' && mintState.mintCoinStock
      ? mintState.mintCoinStock
      : (from == 'farm' || from == 'longFarm') && farmState.farmCoinStock
        ? farmState.farmCoinStock
        : from == 'trade' && tradeState.tradeCoinStock
          ? tradeState.tradeCoinStock
          : commonState.defaultAsset,
  )
  function coinSelect(basePool: any) {
    if (from == 'mint') {
      dispatch(upDateMintCoinSelect({ mintCoinSelect: basePool }))
    } else if (from == 'farm' || from == 'longFarm') {
      dispatch(upDateFarmCoinSelect({ farmCoinSelect: basePool }))
    } else if (from == 'trade') {
      dispatch(upDateTradeCoinSelect({ tradeCoinSelect: basePool }))
    }
  }
  function assetSelect(asset: any) {
    if (from == 'mint') {
      dispatch(upDateMintCoinStock({ mintCoinStock: asset }))
    } else if (from == 'farm' || from == 'longFarm') {
      dispatch(upDateFarmCoinStock({ farmCoinStock: asset }))
    } else if (from == 'trade') {
      dispatch(upDateTradeCoinStock({ tradeCoinStock: asset }))
    }
  }
  useEffect(() => {
    getAssetInfo()
  }, [commonState.assetBaseInfoObj])
  async function getAssetInfo() {
    const result: any = []
    let allAssetsListInfo: any = []
    const info: any = []
    Object.keys(commonState.assetBaseInfoObj).forEach(function (assetName) {
      info.push(commonState.assetBaseInfoObj[assetName])
    })
    allAssetsListInfo = info
    if (allAssetsListInfo.length > 0) {
      allAssetsListInfo.forEach((position: any) => {
        let value: any
        let balance: any
        if (position.type == 'asset') {
          if (account) {
            if (position.type == 'asset') {
              value = (Number(position.swapPrice) * Number(position.balance)).toString()
            } else {
              value = (Number(position.unitPrice) * Number(position.balance)).toString()
            }
            balance = position.balance
          } else {
            value = '0.0'
            balance = '0.0'
          }
          result.push({
            key: position.id,
            balance: Number(balance),
            name: position.name,
            value: Number(value),
            desc: position.assetTit,
          })
        }
      })
    }
    if (result.length > 0) {
      setAssetInfo(result)
    } else {
      setAssetInfo([])
    }
  }
  return (
    <Modal title={t('selectPool')} width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="chooseAssetPair-container">
        {/* <Input placeholder="Search name or pool address" bordered={false} /> */}
        <div className="base">
          <p>{t('commonBases')}</p>
        </div>
        <div className="asset">
          {commonState.cAssetsListInfo.map((ele: any, index: any) => (
            <div
              key={index}
              className="asset-item"
              style={
                restrictedCoins.includes(ele.name) ? {
                  pointerEvents: "none",
                  backgroundColor: "rgb(0,0,0,0.05)",
                  cursor: "not-allowed"
                } : basePool == `${ele.name}`
                  ? {
                    borderColor: '#005aff',
                  }
                  : {}
              }
              onClick={() => {
                setBasePool(`${ele.name}`)
                coinSelect(ele.name)
                onDismiss()
              }}>
              <img src={require(`../../../img/coin/${ele.name}.png`).default} alt="" />
              <span>{ele.name}</span>
            </div>
          ))}
        </div>
        {assetInfo.map((ele: any, index: any) => (
          <div className="card" key={index}>
            <div
              className="item"
              style={
                `${ele.name}` == assetPool
                  ? {
                    borderColor: '#005aff',
                  }
                  : {}
              }
              onClick={() => {
                setAssetPool(`${ele.name}`)
                assetSelect(ele.name)
                onDismiss()
              }}>
              <div className="left">
                <img className="logo" src={require(`../../../img/coin/${ele.name}.png`).default} alt="" />
                <div className="tit">
                  <p>{ele.name}</p>
                  <span>{ele.desc}</span>
                </div>
              </div>
              <div className="right">
                <p>${ele.value < 0.0001 && ele.value > 0 ? '<0.0001' : fixD(ele.value, 4)}</p>
                <span>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-Connect-Wallet"></use>
                  </svg>
                  {ele.balance < 0.000001 && ele.balance > 0 ? '<0.000001' : fixD(ele.balance, 6)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default AssetPair
