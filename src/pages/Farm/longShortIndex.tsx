/** @format */

import React, { useEffect, useState } from 'react'
import '../../style/Farm/farm.less'
import FarmLeft from '../../components/common/SymbolChart'
import FarmRight from '../../components/Farm/FarmRight'
import Title from '../../components/Title'
import { NavLink } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks'
import { getLibrary } from 'utils/getLibrary'
import { useCommonState } from 'state/common/hooks'
import { ethers } from 'ethers'
import { LongStakingAddress, mintAddress, SwapRouterAddress } from 'constants/index'
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
const Farm: React.FC<any> = props => {
  const { t, i18n } = useTranslation()
  const params = props.match.params.poolType
  const cAssetName = props.match.params.cAssetName
  const assetName = props.match.params.assetName
  const { account } = useActiveWeb3React()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  const provider = window.ethereum
  const library = getLibrary(provider) ?? simpleRpcProvider
  const assetBaseInfo: any = []
  const { assetBaseInfoObj } = commonState
  const [longOrShort, setLongOrShort] = useState(`${t('Long')}`)
  const SymoblChart = {
    symbolName: '',
    symbolLogo: '',
    premium: '--',
    volume: '43,123.09',
    liquidity: '25,93M',
    from: longOrShort == 'Long' || longOrShort == '做多' ? 'longFarm' : 'farm',
  }
  async function getMintAssetInfo() {
    const assetBaseInfoMock = JSON.parse(JSON.stringify(assetBaseInfoObj))
    Object.keys(assetBaseInfoMock).forEach(function (assetName) {
      assetBaseInfo.push(assetBaseInfoMock[assetName])
    })
    for (let i = 0; i < assetBaseInfo.length; i++) {
      const asset = assetBaseInfo[i].name
      const contract = new ethers.Contract(assetBaseInfoMock[asset].address, Erc20Abi, library)
      const longFarmResult = await contract.allowance(account, LongStakingAddress)
      const longFarmAllowance = Number(formatUnits(longFarmResult.toString(), assetBaseInfoMock[asset].decimals))
      if (longFarmAllowance <= 0 && assetBaseInfoObj[asset]) {
        assetBaseInfoMock[asset].longFarmAllowance = false
      } else {
        assetBaseInfoMock[asset].longFarmAllowance = true
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
  return (
    <div className="farm-container">
      <div className="container-center">
        <Title title="farm" hasOpen />
        <div className="farm-symbol-trade">
          <FarmLeft SymoblChart={SymoblChart} assetName={assetName} cAssetName={cAssetName}></FarmLeft>
          <FarmRight poolType={params} assetName={assetName} cAssetName={cAssetName} setLongOrShort={setLongOrShort}></FarmRight>
        </div>
      </div>
    </div>
  )
}
export default Farm
