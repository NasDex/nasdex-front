/** @format */

export interface State {
  pools: PoolsState
}

export interface SerializedPool {
  poolId: string
  symbol: string
  stakingTokenBalance: string
  stakedBalance: string
}

export interface PoolsState {
  data: SerializedPool[]
}
