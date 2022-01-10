/** @format */

import {useCallback} from 'react'
import {harvestFarm} from 'utils/calls/stake'
import {useNSDXVault} from '../../constants/hooks/useContract'

const useHarvestFarm = (farmPid: string) => {
  const NSDXVaultContract = useNSDXVault()

  const handleHarvest = useCallback(async () => {
    try {
      const txHash = await harvestFarm(NSDXVaultContract, farmPid)
      const receipt = await txHash.wait()
      return receipt.status
    } catch (e) {
      console.error(e)
    }
  }, [farmPid, NSDXVaultContract])

  return {onReward: handleHarvest}
}

export default useHarvestFarm
