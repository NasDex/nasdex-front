/** @format */

import {useCallback} from 'react'
import {harvestFarm} from 'utils/calls/deaufltPoolStake'
import notification from 'utils/notification'
import {useMasterchef} from '../../constants/hooks/useContract'

const useHarvestFarm = (farmPid: string) => {
  const MasterchefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    try {
      const txHash = await harvestFarm(MasterchefContract, farmPid)
      notification({
        type: 'success',
        message: 'Harvest Success',
        description: 'Harvest Success',
      })
      return txHash
    } catch (e) {
      console.log(e)
      notification({
        type: 'error',
        message: 'Harvest Error',
        description: e.message,
      })
    }
  }, [farmPid, MasterchefContract])

  return {onMasterReward: handleHarvest}
}

export default useHarvestFarm
