/** @format */

'use strict'
/** @format */
exports.__esModule = true
exports.useLpContract = exports.useNSDX = exports.useMasterchef = exports.useNSDXVault = void 0
var hooks_1 = require('hooks')
var react_1 = require('react')
var contraceHelpers_1 = require('../../utils/contraceHelpers')
exports.useNSDXVault = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getNSDXVaultfContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useMasterchef = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getMasterchefContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useNSDX = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getNSDXContract(library === null || library === void 0 ? void 0 : library.getSigner())
    },
    [library],
  )
}
exports.useLpContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getLPContract(library === null || library === void 0 ? void 0 : library.getSigner())
    },
    [library],
  )
}
