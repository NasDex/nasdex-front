/** @format */

import BigNumber from 'bignumber.js'
import {parseUnits} from 'ethers/lib/utils'
import {BIG_TEN} from 'utils/bigNumber'

const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const stakeFarm = async (masterChefContract: any, pid: any, amount: string) => {
  // const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const value = parseUnits(amount, 18).toString()
  console.log(value)
  const tx = await masterChefContract.deposit(pid, value)
  const receipt = await tx.wait()
  return receipt.status
}
export const unstakeFarms = async (masterChefContract: any, pid: any, amount: string) => {
  // const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const value = parseUnits(amount, 18).toString()
  const tx = await masterChefContract.withdraw(pid, value)
  const receipt = await tx.wait()
  return receipt.status
}
export const harvestFarm = async (masterChefContract: any, pid: string) => {
  const amount = parseUnits('0', 18)
  const tx = await masterChefContract.withdraw(pid, amount)
  const receipt = await tx.wait()
  return receipt.status
}
