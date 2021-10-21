/** @format */

import {useCallback} from 'react'
import {unstakeFarms} from 'utils/calls/stake'
import notification from 'utils/notification'
import {useNSDXVault} from '../../constants/hooks/useContract'

const useUnstakeFarms = (pid: number) => {
  const NSDXVaultContract = useNSDXVault()

  const handleUnstake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await unstakeFarms(NSDXVaultContract, pid, amount)
        notification({
          type: 'success',
          message: 'Unstake Success',
          description: 'Unstake Success',
        })
        return txHash
      } catch (e) {
        notification({
          type: 'error',
          message: 'Unstake Error',
          description: e.message,
        })
        console.log(e)
      }
    },
    [NSDXVaultContract, pid],
  )

  return {onUnstake: handleUnstake}
}

export default useUnstakeFarms
