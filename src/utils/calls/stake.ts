/** @format */

import BigNumber from 'bignumber.js'
import {BIG_TEN} from 'utils/bigNumber'
import {parseUnits} from 'ethers/lib/utils'

const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const stakeFarm = async (masterChefContract: any, pid: any, amount: string) => {
  const value = parseUnits(amount, 18).toString()
  const tx = await masterChefContract.deposit(value)
  const receipt = await tx.wait()
  return receipt.status
}
export const unstakeFarms = async (masterChefContract: any, pid: any, amount: string) => {
  // const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const value = parseUnits(amount, 18).toString()
  const tx = await masterChefContract.withdraw(value)
  const receipt = await tx.wait()
  return receipt.status
}
export const harvestFarm = async (masterChefContract: any, pid: string) => {
  const tx = await masterChefContract.harvest()
  const receipt = await tx.wait()
  return receipt.status
}
