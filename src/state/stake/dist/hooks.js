/** @format */

'use strict'
/** @format */
exports.__esModule = true
exports.useStakeState = void 0
var react_redux_1 = require('react-redux')
function useStakeState() {
  return react_redux_1.useSelector(function (state) {
    return state.stake
  })
}
exports.useStakeState = useStakeState
