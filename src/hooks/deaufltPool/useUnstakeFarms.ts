/** @format */

import {useCallback} from 'react'
import {unstakeFarms} from 'utils/calls/deaufltPoolStake'
import {useMasterchef} from '../../constants/hooks/useContract'

const useUnstakeFarms = (pid: number) => {
  const MasterchefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstakeFarms(MasterchefContract, pid, amount)
    },
    [MasterchefContract, pid],
  )

  return {onMasterUnstake: handleUnstake}
}

export default useUnstakeFarms
