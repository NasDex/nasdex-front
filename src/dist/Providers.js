/** @format */

'use strict'
/** @format */
exports.__esModule = true
var react_1 = require('react')
var core_1 = require('@web3-react/core')
var react_redux_1 = require('react-redux')
var constants_1 = require('./constants')
var modalContext_1 = require('./context/modalContext')
var getLibrary_1 = require('./utils/getLibrary')
var state_1 = require('./state')
// import store from './state'
// import {ThemeContextProvider} from './ThemeContext.tsx'
var Web3ProviderNetwork = core_1.createWeb3ReactRoot(constants_1.NetworkContextName)
var Providers = function (_a) {
  var children = _a.children
  return react_1['default'].createElement(
    core_1.Web3ReactProvider,
    {getLibrary: getLibrary_1.getLibrary},
    react_1['default'].createElement(
      Web3ProviderNetwork,
      {getLibrary: getLibrary_1.getLibrary},
      react_1['default'].createElement(
        react_redux_1.Provider,
        {store: state_1['default']},
        react_1['default'].createElement(modalContext_1['default'], null, children),
      ),
    ),
  )
}
exports['default'] = Providers
