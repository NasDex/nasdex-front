/** @format */

import React, { forwardRef, useEffect, useRef, useState } from 'react'
import '../../style/Trade/trade.less'
import TradeLeft from '../../components/common/SymbolChart'
import TradeRight from '../../components/Trade/TradeRight/index'
import Title from '../../components/Title'
import { useActiveWeb3React } from 'hooks'
import { getLibrary } from 'utils/getLibrary'
import { useCommonState } from 'state/common/hooks'
import { ethers } from 'ethers'
import { SwapRouterAddress } from 'constants/index'
import { formatUnits } from 'ethers/lib/utils'
import Erc20Abi from 'constants/abis/erc20.json'
import { upDateAssetBaseInfoObj } from 'state/common/actions'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { simpleRpcProvider } from 'utils/providers'
const symbolMock = [
  {
    id: '0',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nGOOGL',
    convertUsd: '2808.01',
    isRise: true,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '1',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nAPPL',
    convertUsd: '149.96',
    isRise: true,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '2',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nMSFT',
    convertUsd: '708.15',
    isRise: false,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '3',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nMSFT',
    convertUsd: '708.15',
    isRise: false,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
  {
    id: '4',
    iconUrl: '/image/coin/USDT@2x.png',
    name: 'nMSFT',
    convertUsd: '708.15',
    isRise: false,
    priceIncrease: '9.02',
    changeRate: '8.06',
  },
]
const SymoblChart = {
  symbolName: '',
  symbolLogo: '',
  premium: '--',
  volume: '43,123.09',
  liquidity: '25,93M',
  from: 'trade',
}
const Trade: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const params = props.match.params.assetName
  const cAssetName = props.match.params.cAssetName

  const { account } = useActiveWeb3React()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  async function getSwapAssetInfo() {
    const provider = window.ethereum
    const library = getLibrary(provider) ?? simpleRpcProvider
    const assetBaseInfo: any = []
    const { assetBaseInfoObj } = commonState
    const assetBaseInfoMock = JSON.parse(JSON.stringify(assetBaseInfoObj))
    Object.keys(assetBaseInfoMock).forEach(function (assetName) {
      assetBaseInfo.push(assetBaseInfoMock[assetName])
    })
    for (let i = 0; i < assetBaseInfo.length; i++) {
      const asset = assetBaseInfo[i].name
      const contract = new ethers.Contract(assetBaseInfoMock[asset].address, Erc20Abi, library)
      const balance = formatUnits(await contract.balanceOf(account), assetBaseInfoObj[asset].decimals)
      if (assetBaseInfoMock[asset] && account) {
        assetBaseInfoMock[asset].balance = balance
      }
      const swapResult = await contract.allowance(account, SwapRouterAddress)
      const swapContractAllowance = Number(formatUnits(swapResult.toString(), assetBaseInfoMock[asset].decimals))
      if (swapContractAllowance <= 0 && assetBaseInfoMock[asset]) {
        assetBaseInfoMock[asset].swapContractAllowance = false
      } else {
        assetBaseInfoMock[asset].swapContractAllowance = true
      }
    }
    console.log(assetBaseInfoMock, 1231)
    dispatch(upDateAssetBaseInfoObj({ assetBaseInfoObj: assetBaseInfoMock }))
  }
  return (
    <div className="trade-container">
      <div className="container-center">
        <Title title={t('Swap')} hasOpen />
        <div className="manage-symbol-trade">
          <TradeLeft SymoblChart={SymoblChart}></TradeLeft>
          <TradeRight assetName={params} cAssetName={cAssetName}></TradeRight>
        </div>
      </div>
    </div>
  )
}
export default Trade
