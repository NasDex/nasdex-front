/** @format */

import React, { useEffect, useState } from 'react'
import '../../style/Mint/mint.less'
import Title from '../../components/Title'
import SymbolTradeChart from '../../components/common/SymbolChart'
import SymbolTrade from '../../components/Mint/SymbolTrade'
import { useActiveWeb3React } from 'hooks'
import { getLibrary } from 'utils/getLibrary'
import { useCommonState } from 'state/common/hooks'
import { ethers } from 'ethers'
import { mintAddress, SwapRouterAddress } from 'constants/index'
import { formatUnits } from 'ethers/lib/utils'
import Erc20Abi from 'constants/abis/erc20.json'
import { upDateAssetBaseInfoObj } from 'state/common/actions'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
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
const symoblChart = {
  symbolName: '',
  symbolLogo: '',
  premium: '--',
  volume: '43,123.09',
  liquidity: '25,93M',
  from: 'mint',
}

const Staking: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const params = props.match.params.assetName
  const cAssetName = props.match.params.cAssetName
  const { account } = useActiveWeb3React()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  async function getMintAssetInfo() {
    const provider = window.ethereum
    const library = getLibrary(provider)
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
      const result = await contract.allowance(account, mintAddress)
      const allowance = Number(formatUnits(result.toString(), assetBaseInfoMock[asset].decimals))
      if (allowance <= 0 && assetBaseInfoObj[asset]) {
        assetBaseInfoMock[asset].mintContractAllowance = false
      } else {
        assetBaseInfoMock[asset].mintContractAllowance = true
      }
    }
    dispatch(upDateAssetBaseInfoObj({ assetBaseInfoObj: assetBaseInfoMock }))
  }

  // useEffect(() => {
  //   if (account) {
  //     getMintAssetInfo()
  //   }
  // }, [account])
  return (
    <div className="mint-container">
      <div className="container-center">
        <Title title={t('Mint')} hasOpen />
        {/* <SymbolList SymbolListArray={symbolMock}></SymbolList> */}
        <div className="symbol-trade">
          <SymbolTradeChart SymoblChart={symoblChart}></SymbolTradeChart>
          <SymbolTrade assetName={params} cAssetName={cAssetName}></SymbolTrade>
        </div>
      </div>
    </div>
  )
}

export default Staking