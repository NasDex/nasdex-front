/** @format */

import {useCallback} from 'react'
import {stakeFarm} from '../../utils/calls/deaufltPoolStake'
import {useMasterchef} from '../../constants/hooks/useContract'
import notification from 'utils/notification'
import { useTranslation } from 'react-i18next'
const useStakeFarms = (pid: string) => {
  const MasterchefContract = useMasterchef()
const { t, i18n } = useTranslation()
  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stakeFarm(MasterchefContract, pid, amount)
        // const receipt = await txHash.wait()
        notification({
          type: 'success',
          message: `${t('StakeSuccess')}`,
          description: `${t('StakeSuccess')}`,
        })
        // return receipt.status
        return txHash
      } catch (e) {
        notification({
          type: 'error',
          message: `${t('StakeError')}`,
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
