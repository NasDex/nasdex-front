/** @format */

import {useActiveWeb3React} from 'hooks'
import {useMemo} from 'react'
import { simpleRpcProvider } from 'utils/dist/providers'
import {
  getMasterchefContract,
  getNSDXContract,
  getNSDXVaultfContract,
  getLPContract,
  getMintContract,
  getErc20Contract,
  getShortLockContract,
  getShortStakingContract,
  getPositionsContract,
  getMasterChefTestContract,
  getNSDXTestContract,
  getShortStockAContract,
  getSwapRouterContract,
  getMultiCallContract,
  getSTAOracleContract,
  getETHOracleContract,
  getSwapFactoryContract,
  getLpContractCommon,
  getAssetContact,
  getLongStakingContract,
} from '../../utils/contraceHelpers'

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
export const useMintContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getMintContract(library?.getSigner()), [library])
}
export const useErc20Contract = (address: string) => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getErc20Contract(address, library?.getSigner()), [library])
}
export const useShortLockContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getShortLockContract(library?.getSigner()), [library])
}
export const useShortStakingContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getShortStakingContract(library?.getSigner()), [library])
}
export const usePositionsContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getPositionsContract(library?.getSigner()), [library])
}
export const useNSDXTestContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getNSDXTestContract(library?.getSigner()), [library])
}
export const useMasterChefTestContract = () => {
  //const {library} = useActiveWeb3React()
  const customProvider = simpleRpcProvider
  return useMemo(() => getMasterChefTestContract(customProvider), [customProvider])
  // return useMemo(() => getMasterChefTestContract(library?.getSigner()), [library])
}
export const useShortStockAContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getShortStockAContract(library?.getSigner()), [library])
}
export const useSwapRouterContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getSwapRouterContract(library?.getSigner()), [library])
}
export const useSwapFactoryContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getSwapFactoryContract(library?.getSigner()), [library])
}
export const useMultiCallContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getMultiCallContract(library?.getSigner()), [library])
}
export const useSTAOracleContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getSTAOracleContract(library?.getSigner()), [library])
}
export const useETHOracleContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getETHOracleContract(library?.getSigner()), [library])
}
export const useLpContractCommon = (address: string) => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getLpContractCommon(address, library?.getSigner()), [library])
}
export const useAssetContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getAssetContact(library?.getSigner()), [library])
}
export const useLongStakingContract = () => {
  const {library} = useActiveWeb3React()
  return useMemo(() => getLongStakingContract(library?.getSigner()), [library])
}
