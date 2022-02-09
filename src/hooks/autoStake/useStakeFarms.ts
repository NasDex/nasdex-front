/** @format */

import {useCallback} from 'react'
import {stakeFarm} from '../../utils/calls/stake'
import {useNSDXVault} from '../../constants/hooks/useContract'
import {parseUnits} from 'ethers/lib/utils'
import notification from 'utils/notification'
import { useTranslation } from 'react-i18next'
const useStakeFarms = (pid: number) => {
  const { t, i18n } = useTranslation()
  const NSDXVaultContract = useNSDXVault()
  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stakeFarm(NSDXVaultContract, pid, amount)
        notification({
          type: 'success',
          message: `${t('StakeSuccess')}`,
          description: `${t('StakeSuccess')}`,
        })
        // const receipt = await txHash.wait()
        // return receipt.status
        return txHash
      } catch (e) {
        notification({
          type: 'error',
          message: `{t('StakeError')}`,
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
