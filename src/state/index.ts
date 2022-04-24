/** @format */
import {configureStore, createSerializableStateInvariantMiddleware, getDefaultMiddleware, isPlain, Middleware} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import {save, load} from 'redux-localstorage-simple'
import updateVersion from './global/actions'
import mint from './mint/reducer'
import stake from './stake/reducer'
import trade from './trade/reducer'
import manage from './manage/reducer'
import farm from './farm/reducer'
import common from './common/reducer'
import thunk from 'redux-thunk'

const PERSISTED_KEYS: string[] = ['mint', 'stake', 'trade', 'manage', 'farm', 'common']
const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    mint,
    stake,
    trade,
    manage,
    farm,
    common,
  },
  // middleware: [...getDefaultMiddleware({thunk: true}), save({states: PERSISTED_KEYS}), logger, {serializableCheck: false}],
  middleware: [thunk, logger],
  preloadedState: load({states: PERSISTED_KEYS}),
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
