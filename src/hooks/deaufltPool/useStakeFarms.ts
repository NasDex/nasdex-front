/** @format */

import {useCallback} from 'react'
import {stakeFarm} from '../../utils/calls/deaufltPoolStake'
import {useMasterchef} from '../../constants/hooks/useContract'
import notification from 'utils/notification'

const useStakeFarms = (pid: string) => {
  const MasterchefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stakeFarm(MasterchefContract, pid, amount)
        // const receipt = await txHash.wait()
        notification({
          type: 'success',
          message: 'Stake Success',
          description: 'Stake Success',
        })
        // return receipt.status
        return txHash
      } catch (e) {
        notification({
          type: 'error',
          message: 'Stake  Error',
          description: e.message,
        })
        console.error(e)
      }
    },
    [MasterchefContract, pid],
  )

  return {onMasterStake: handleStake}
}

export default useStakeFarms
