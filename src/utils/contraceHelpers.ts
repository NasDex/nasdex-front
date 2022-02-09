/** @format */

import {ethers} from 'ethers'
import nadxVault from '../../src/constants/abis/nadxVault.json'
import masterChef from '../../src/constants/abis/masterChef.json'
import lpContract from '../../src/constants/abis/lpContract.json'
import mintContract from '../../src/constants/abis/Mint.json'
import Erc20Contract from '../../src/constants/abis/erc20.json'
import nadx from '../../src/constants/abis/nadx.json'
import shortLockContract from '../../src/constants/abis/shortLock.json'
import shortStakingContract from '../../src/constants/abis/shortStaking.json'
import positionsContract from '../../src/constants/abis/position.json'
import masterChefTestContract from '../../src/constants/abis/masterChefTest.json'
import nsdxTestContract from '../../src/constants/abis/nsdxTest.json'
import shortStockAContract from '../../src/constants/abis/shortStockA.json'
import SwapRouterContract from '../../src/constants/abis/swapRouter.json'
import MultiCallContract from '../../src/constants/abis/multiCall.json'
import ETHOracleContract from '../../src/constants/abis/ETHOracle.json'
import STAOracleContract from '../../src/constants/abis/STAOracle.json'
import SwapFactoryContract from '../../src/constants/abis/swapFactory.json'
import AssetContract from '../../src/constants/abis/asset.json'
import LongStakingContract from '../../src/constants/abis/LongStaking.json'
import {
  NSDXVaultAddress,
  MasterChefAddress,
  NSDXToken,
  LPAddress,
  mintAddress,
  USDTaddress,
  ShortLockAddress,
  ShortStakingAddress,
  PositionsAddress,
  NSDXTestToken,
  MasterChefTestAddress,
  ShortTokenAddress,
  SwapRouterAddress,
  MultiCallAddress,
  STAOracleAddress,
  ETHOracleAddress,
  SwapFactoryAddress,
  AssetAddress,
  LongStakingAddress,
} from '../constants/index'
import {simpleRpcProvider} from './providers'
import type { Provider } from '@ethersproject/providers'
const getContract = (abi: any, address: string, signer?: ethers.Signer | Provider) => {
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
export const getMintContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(mintContract, mintAddress, signer)
}
export const getErc20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(Erc20Contract, address, signer)
}
export const getShortLockContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(shortLockContract, ShortLockAddress, signer)
}
export const getShortStakingContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(shortStakingContract, ShortStakingAddress, signer)
}
export const getPositionsContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(positionsContract, PositionsAddress, signer)
}
export const getNSDXTestContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nsdxTestContract, NSDXTestToken, signer)
}
export const getMasterChefTestContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(masterChefTestContract, MasterChefTestAddress, signer)
}
export const getShortStockAContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(shortStockAContract, ShortTokenAddress, signer)
}
export const getSwapRouterContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(SwapRouterContract, SwapRouterAddress, signer)
}
export const getSwapFactoryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(SwapFactoryContract, SwapFactoryAddress, signer)
}
export const getMultiCallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallContract, MultiCallAddress, signer)
}
export const getSTAOracleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(STAOracleContract, STAOracleAddress, signer)
}
export const getETHOracleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ETHOracleContract, ETHOracleAddress, signer)
}
export const getLpContractCommon = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lpContract, address, signer)
}
export const getAssetContact = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(AssetContract, AssetAddress, signer)
}
export const getLongStakingContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(LongStakingContract, LongStakingAddress, signer)
}
