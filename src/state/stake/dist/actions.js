/** @format */

'use strict'
/** @format */
exports.__esModule = true
exports.setPriceList = exports.setStakeBalance = void 0
var toolkit_1 = require('@reduxjs/toolkit')
exports.setStakeBalance = toolkit_1.createAction('app/getStakeBalance')
// eslint-disable-next-line @typescript-eslint/ban-types
exports.setPriceList = toolkit_1.createAction('app/getPriceList')
