/** @format */

import {useCallback} from 'react'
import {ethers} from 'ethers'
import {useCommonState, useProvider} from 'state/common/hooks'
import {upDateOneAssetBaseInfo} from '../../../state/common/actions'
import {useActiveWeb3React} from 'hooks'
import {useDispatch} from 'react-redux'
import Erc20Abi from 'constants/abis/erc20.json'
import { mintAddress, SwapRouterAddress, LongStakingAddress } from 'constants/index'
import {formatUnits} from 'ethers/lib/utils'
const useApproveFarm = (asset: string, address: string, type: string) => {
  const {account} = useActiveWeb3React()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  const library = useProvider()
  const contract = new ethers.Contract(commonState.assetBaseInfoObj[asset].address, Erc20Abi, library?.getSigner())
  const handleApprove = useCallback(async () => {
    try {
      const tx = await contract.approve(address, ethers.constants.MaxUint256)
      const receipt = await tx.wait()
      if (type == 'mint') {
        const mintContractAllowance = true
        const oneAssetInfo = {...commonState.assetBaseInfoObj[asset], mintContractAllowance}
        dispatch(upDateOneAssetBaseInfo({oneAssetBaseInfo: oneAssetInfo}))
      } else if (type == 'swap') {
        const swapContractAllowance = true
        const oneAssetInfo = {...commonState.assetBaseInfoObj[asset], swapContractAllowance}
        dispatch(upDateOneAssetBaseInfo({oneAssetBaseInfo: oneAssetInfo}))
      } else if (type == 'longFarm') {
        const longFarmAllowance = true
        const oneAssetInfo = {...commonState.assetBaseInfoObj[asset], longFarmAllowance}
        dispatch(upDateOneAssetBaseInfo({oneAssetBaseInfo: oneAssetInfo}))
      }
      return receipt.status
    } catch (e: any) {
      console.log(e)
      if (e.message.includes('transaction was replaced')) {
        if (type == 'mint') {
          let mintContractAllowance :any
          const result = await contract.allowance(account, mintAddress)
          const allowance = Number(formatUnits(result.toString(), commonState.assetBaseInfoObj[asset].decimals))
          if (allowance <= 0 && commonState.assetBaseInfoObj[asset]) {
            mintContractAllowance = false
          } else {
            mintContractAllowance = true
          }
        const oneAssetInfo = {...commonState.assetBaseInfoObj[asset], mintContractAllowance}
        dispatch(upDateOneAssetBaseInfo({oneAssetBaseInfo: oneAssetInfo}))
      } else if (type == 'swap') {
        let swapContractAllowance :any
        const swapResult = await contract.allowance(account, SwapRouterAddress)
        const swapAllowance = Number(formatUnits(swapResult.toString(), commonState.assetBaseInfoObj[asset].decimals))
        if (swapAllowance <= 0 && commonState.assetBaseInfoObj[asset]) {
          swapContractAllowance = false
        } else {
          swapContractAllowance = true
        }
        const oneAssetInfo = {...commonState.assetBaseInfoObj[asset], swapContractAllowance}
        dispatch(upDateOneAssetBaseInfo({oneAssetBaseInfo: oneAssetInfo}))
      } else if (type == 'longFarm') {
        let longFarmAllowance :any
        const longFarmResult = await contract.allowance(account, LongStakingAddress)
        const longAllowance = Number(formatUnits(longFarmResult.toString(), commonState.assetBaseInfoObj[asset].decimals))
        if (longAllowance <= 0 && commonState.assetBaseInfoObj[asset]) {
          longFarmAllowance = false
        } else {
          longFarmAllowance = true
        }
        const oneAssetInfo = {...commonState.assetBaseInfoObj[asset], longFarmAllowance}
        dispatch(upDateOneAssetBaseInfo({oneAssetBaseInfo: oneAssetInfo}))
      }
      } else {
        return false
      }
      return
    }
  }, [contract, address])

  return {onApprove: handleApprove}
}

export default useApproveFarm
