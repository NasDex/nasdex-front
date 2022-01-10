/** @format */

import {useCallback} from 'react'
import {stakeFarm} from '../../utils/calls/stake'
import {useNSDXVault} from '../../constants/hooks/useContract'
import {parseUnits} from 'ethers/lib/utils'
import notification from 'utils/notification'

const useStakeFarms = (pid: number) => {
  const NSDXVaultContract = useNSDXVault()
  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stakeFarm(NSDXVaultContract, pid, amount)
        notification({
          type: 'success',
          message: 'Stake Success',
          description: 'Stake Success',
        })
        // const receipt = await txHash.wait()
        // return receipt.status
        return txHash
      } catch (e) {
        notification({
          type: 'error',
          message: 'Stake Error',
          description: e.message,
        })
        console.error(e)
      }
    },
    [NSDXVaultContract, pid],
  )

  return {onStake: handleStake}
}

export default useStakeFarms
