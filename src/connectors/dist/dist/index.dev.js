/** @format */

'use strict'
/** @format */

var _a, _b, _c

var _d

exports.__esModule = true
exports.connectorsByName =
  exports.walletlink =
  exports.walletconnect =
  exports.injected =
  exports.getNetworkLibrary =
  exports.network =
  exports.NETWORK_CHAIN_ID =
    void 0

var types_1 = require('../components/WalletModal/types')

var providers_1 = require('@ethersproject/providers')

var injected_connector_1 = require('@web3-react/injected-connector')

var walletconnect_connector_1 = require('@web3-react/walletconnect-connector')

var walletlink_connector_1 = require('@web3-react/walletlink-connector')

var NetworkConnector_1 = require('./NetworkConnector')

var NETWORK_URL = process.env.REACT_APP_NETWORK_URL
exports.NETWORK_CHAIN_ID = parseInt((_d = process.env.REACT_APP_CHAIN_ID) !== null && _d !== void 0 ? _d : '1')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error('REACT_APP_NETWORK_URL must be a defined environment variable')
}

exports.network = new NetworkConnector_1.NetworkConnector({
  urls: ((_a = {}), (_a[exports.NETWORK_CHAIN_ID] = NETWORK_URL), _a),
})
var networkLibrary

function getNetworkLibrary() {
  // eslint-disable-next-line no-return-assign
  return (networkLibrary =
    networkLibrary !== null && networkLibrary !== void 0
      ? networkLibrary
      : new providers_1.Web3Provider(exports.network.provider))
}

exports.getNetworkLibrary = getNetworkLibrary
exports.injected = new injected_connector_1.InjectedConnector({
  // supportedChainIds: [137],
  supportedChainIds: [80001],
}) // mainnet only

exports.walletconnect = new walletconnect_connector_1.WalletConnectConnector({
  rpc:
    ((_b = {}), (_b[exports.NETWORK_CHAIN_ID] = NETWORK_URL), (_b['137'] = 'https://polygon-rpc.com/'), _b),
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
}) // mainnet only

exports.walletlink = new walletlink_connector_1.WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Uniswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
})
exports.connectorsByName =
  ((_c = {}),
  (_c[types_1.ConnectorNames.Injected] = exports.injected),
  (_c[types_1.ConnectorNames.WalletConnect] = exports.walletconnect),
  _c)
