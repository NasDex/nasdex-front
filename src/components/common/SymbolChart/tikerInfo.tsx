/** @format */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */
import react, { useEffect, useState } from 'react'
import { Modal, Button } from 'antd'
import '../../../style/Mint/tikerInfo.less'
import { useManageState } from 'state/manage/hooks'
import { useMintState } from 'state/mint/hooks'
import { useFarmState } from 'state/farm/hooks'
import { useTradeState } from 'state/trade/hooks'
import { useCommonState } from 'state/common/hooks'
import { useActiveWeb3React } from 'hooks'
import { useTranslation } from 'react-i18next'
import { fixD } from 'utils/dist'
const defaultOnDismiss = () => null

type TikerInfoProps = {
  onDismiss?: () => void
  nowPrice?: number
  from?: string
  cAssetName?: string
}

const TikerInfo = ({ onDismiss = defaultOnDismiss, nowPrice = 0, from, cAssetName }: TikerInfoProps) => {
  const { t, i18n } = useTranslation()
  const manageState = useManageState()
  const mintState = useMintState()
  const farmState = useFarmState()
  const tradeState = useTradeState()
  const commonState = useCommonState()
  const [assetName, setAssetName] = useState(commonState.defaultAsset)
  const [cAssetTokenName, setcAssetTokenName] = useState(cAssetName)
  const { account } = useActiveWeb3React()
  useEffect(() => {
    if (from == 'mint' && mintState.mintCoinStock) {
      setAssetName(mintState.mintCoinStock)
    }
    if ((from == 'farm' || from == 'longFarm') && farmState.farmCoinStock) {
      setAssetName(farmState.farmCoinStock)
    }
    if (
      from == 'trade' &&
      tradeState.tradeCoinStock &&
      commonState.assetBaseInfoObj[tradeState.tradeCoinStock].type == 'cAsset'
    ) {
      setAssetName(tradeState.tradeCoinSelect)
      setcAssetTokenName(tradeState.tradeCoinStock)
    }
    if (
      from == 'trade' &&
      tradeState.tradeCoinStock &&
      commonState.assetBaseInfoObj[tradeState.tradeCoinStock].type !== 'cAsset'
    ) {
      setAssetName(tradeState.tradeCoinStock)
    }
    if (from == 'manage') {
      setAssetName(manageState.positionInfo.assetTokenName)
    }
  }, [account, from, from, mintState, manageState, tradeState, farmState, assetName])
  return (
    <Modal title={t('TickerInfo')} width={420} footer={null} visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <div className="tikerInfo-container">
        <div className="top">
          <div className="left">
            <img
              className="logo"
              src={
                assetName
                  ? require(`../../../img/coin/${assetName}.png`).default
                  : require(`../../../img/coin/${commonState.defaultAsset}.png`).default
              }
              alt=""
            />
            <div className="tit">
              <p className="titp">{assetName ? assetName : commonState.defaultAsset}</p>
              {/* <span>Tencent Holdings Ltd</span> */}
              <span>{commonState.assetBaseInfoObj[assetName].assetTit}</span>
            </div>
          </div>
          <h5>
            {from == 'trade' || from == 'longFarm' ? fixD(commonState.assetBaseInfoObj[assetName].swapPrice, 4) : commonState.assetBaseInfoObj[assetName].oraclePrice} {cAssetTokenName}
          </h5>
        </div>
        <div className="card">
          <div className="item">
            <p className="itemp">{t('MinColRatio')}</p>
            <span>{commonState.assetBaseInfoObj[assetName].minCollateral}%</span>
          </div>
        </div>
        <div className="describe">{commonState.assetBaseInfoObj[assetName].assetDesc} </div>
        {/* <div className="describe">{i18n.language == 'zh-CN' ?
          'Sea Limited是一家总部位于新加坡的科技集团。Sea Limited成立于2009年，旗下包括Shopee、SeaMoney、Garena和一家在新加坡超级联赛中踢球的足球俱乐部Lion City Sailors FC。这家控股公司拥有超过33,000雇员。'
          : 'Sea Limited is a tech conglomerate headquartered in Singapore. Established in 2009, Sea Limited is a holding company for Shopee, SeaMoney, Garena and a football club Lion City Sailors FC which plays in Singapore Premier League. It has over 33,000 employees.'
        }</div> */}
      </div>
    </Modal>
  )
}

export default TikerInfo
