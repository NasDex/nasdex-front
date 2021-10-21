/** @format */

import {useActiveWeb3React} from 'hooks'
import {useMemo} from 'react'
import {getMasterchefContract, getNSDXContract, getNSDXVaultfContract, getLPContract} from '../../utils/contraceHelpers'

export const useNSDXVault = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getNSDXVaultfContract(library?.getSigner()), [library])
}
export const useMasterchef = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getMasterchefContract(library?.getSigner()), [library])
}
export const useNSDX = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getNSDXContract(library?.getSigner()), [library])
}
export const useLpContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getLPContract(library?.getSigner()), [library])
}
