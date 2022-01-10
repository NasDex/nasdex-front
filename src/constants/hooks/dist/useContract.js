/** @format */

'use strict'
/** @format */
exports.__esModule = true
exports.useLpContractCommon =
  exports.useETHOracleContract =
  exports.useSTAOracleContract =
  exports.useMultiCallContract =
  exports.useSwapFactoryContract =
  exports.useSwapRouterContract =
  exports.useShortStockAContract =
  exports.useMasterChefTestContract =
  exports.useNSDXTestContract =
  exports.usePositionsContract =
  exports.useShortStakingContract =
  exports.useShortLockContract =
  exports.useErc20Contract =
  exports.useMintContract =
  exports.useLpContract =
  exports.useNSDX =
  exports.useMasterchef =
  exports.useNSDXVault =
    void 0
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
exports.useMintContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getMintContract(library === null || library === void 0 ? void 0 : library.getSigner())
    },
    [library],
  )
}
exports.useErc20Contract = function (address) {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getErc20Contract(
        address,
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useShortLockContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getShortLockContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useShortStakingContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getShortStakingContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.usePositionsContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getPositionsContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useNSDXTestContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getNSDXTestContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useMasterChefTestContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getMasterChefTestContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useShortStockAContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getShortStockAContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useSwapRouterContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getSwapRouterContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useSwapFactoryContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getSwapFactoryContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useMultiCallContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getMultiCallContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useSTAOracleContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getSTAOracleContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useETHOracleContract = function () {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getETHOracleContract(
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
exports.useLpContractCommon = function (address) {
  var library = hooks_1.useActiveWeb3React().library
  return react_1.useMemo(
    function () {
      return contraceHelpers_1.getLpContractCommon(
        address,
        library === null || library === void 0 ? void 0 : library.getSigner(),
      )
    },
    [library],
  )
}
