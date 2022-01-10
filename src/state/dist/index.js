/** @format */

'use strict'
/** @format */
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j]
    return r
  }
exports.__esModule = true
var toolkit_1 = require('@reduxjs/toolkit')
var redux_localstorage_simple_1 = require('redux-localstorage-simple')
var actions_1 = require('./global/actions')
var reducer_1 = require('./mint/reducer')
var reducer_2 = require('./stake/reducer')
var reducer_3 = require('./trade/reducer')
var reducer_4 = require('./manage/reducer')
var reducer_5 = require('./farm/reducer')
var PERSISTED_KEYS = ['mint', 'stake', 'trade', 'manage', 'farm']
var store = toolkit_1.configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    mint: reducer_1['default'],
    stake: reducer_2['default'],
    trade: reducer_3['default'],
    manage: reducer_4['default'],
    farm: reducer_5['default'],
  },
  middleware: __spreadArrays(toolkit_1.getDefaultMiddleware({thunk: true}), [
    redux_localstorage_simple_1.save({states: PERSISTED_KEYS}),
  ]),
  preloadedState: redux_localstorage_simple_1.load({states: PERSISTED_KEYS}),
})
store.dispatch(actions_1['default']())
exports['default'] = store
