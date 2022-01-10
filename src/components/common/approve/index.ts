/** @format */

import {useCallback} from 'react'
import {ethers, Contract} from 'ethers'
import {useCommonState} from 'state/common/hooks'
import {upDateOneAssetBaseInfo} from '../../../state/common/actions'
import {useActiveWeb3React} from 'hooks'
import {useDispatch} from 'react-redux'
import Erc20Abi from 'constants/abis/erc20.json'
import {getLibrary} from 'utils/getLibrary'
const useApproveFarm = (asset: string, address: string, type: string) => {
  const {account} = useActiveWeb3React()
  const commonState = useCommonState()
  const dispatch = useDispatch()
  const provider = window.ethereum
  const library = getLibrary(provider)
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
    } catch (e) {
      return false
    }
  }, [contract, address])

  return {onApprove: handleApprove}
}

export default useApproveFarm
