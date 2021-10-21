/** @format */

import {ethers} from 'ethers'
import nadxVault from '../../src/constants/abis/nadxVault.json'
import masterChef from '../../src/constants/abis/masterChef.json'
import lpContract from '../../src/constants/abis/lpContract.json'
import nadx from '../../src/constants/abis/nadx.json'
import {NSDXVaultAddress, MasterChefAddress, NSDXToken, LPAddress} from '../constants/index'
import {simpleRpcProvider} from './providers'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}
export const getNSDXContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nadx, NSDXToken, signer)
}
export const getNSDXVaultfContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nadxVault, NSDXVaultAddress, signer)
}
export const getMasterchefContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(masterChef, MasterChefAddress, signer)
}
export const getLPContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lpContract, LPAddress, signer)
}
