/**
 * /* eslint-disable @typescript-eslint/ban-types
 *
 * @format
 */

/** @format */

import {createReducer, nanoid} from '@reduxjs/toolkit'
import {setPriceList, setStakeBalance} from './actions'

export interface ApplicationState {
  stakeBalance: string
  priceList: any
}

const initialState: ApplicationState = {
  stakeBalance: '',
  priceList: {
    NSDX: 0,
    USDC: 0,
  },
}
export default createReducer(initialState, builder =>
  builder
    .addCase(setStakeBalance, (state, action) => {
      state.stakeBalance = action.payload.stakeBalance
    })
    .addCase(setPriceList, (state, action) => {
      state.priceList = action.payload.priceList
    }),
)
