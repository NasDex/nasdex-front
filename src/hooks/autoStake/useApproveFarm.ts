/** @format */

import {useCallback} from 'react'
import {ethers, Contract} from 'ethers'
import {NSDXVaultAddress} from '../../constants/index'

const useApproveFarm = (NSDXVaultfContract: Contract) => {
  const handleApprove = useCallback(async () => {
    try {
      const tx = await NSDXVaultfContract.approve(NSDXVaultAddress, ethers.constants.MaxUint256)
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [NSDXVaultfContract])

  return {onApprove: handleApprove}
}

export default useApproveFarm
