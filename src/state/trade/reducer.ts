/** @format */

import {createReducer} from '@reduxjs/toolkit'
import {
  upDateTradeSetting
} from './actions'

export interface ApplicationState {
  TradeSetting: string
}

const initialState: ApplicationState = {
  TradeSetting: '',
}

export default createReducer(initialState, builder =>
  builder
    .addCase(upDateTradeSetting, (state, action) => {
      state.TradeSetting = action.payload.TradeSetting
    })
)
