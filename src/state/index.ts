/** @format */

import {configureStore, getDefaultMiddleware, Middleware} from '@reduxjs/toolkit'
import {save, load} from 'redux-localstorage-simple'
import updateVersion from './global/actions'
import mint from './mint/reducer'
import stake from './stake/reducer'
import trade from './trade/reducer'

const PERSISTED_KEYS: string[] = ['mint', 'stake','trade']
const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    mint,
    stake,
    trade
  },
  middleware: [...getDefaultMiddleware({thunk: true}), save({states: PERSISTED_KEYS})],
  preloadedState: load({states: PERSISTED_KEYS}),
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
