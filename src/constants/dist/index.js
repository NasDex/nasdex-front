/** @format */

'use strict'
/** @format */
// export enum ChainId {
//   // MAINNET = 137,
//   MAINNET = 80001,
exports.__esModule = true
exports.assetBaseArray =
  exports.coinBaseArray =
  exports.assetsName =
  exports.mintCoinStock =
  exports.mintCoinObject =
  exports.SwapRouterAddress =
  exports.SwapFactoryAddress =
  exports.ShortTokenAddress =
  exports.ShortStakingAddress =
  exports.ShortLockAddress =
  exports.PositionsAddress =
  exports.MasterChefTestAddress =
  exports.NSDXTestToken =
  exports.USDTaddress =
  exports.nAssetAddress =
  exports.mintAddress =
  exports.LPAddress =
  exports.NSDXToken =
  exports.MasterChefAddress =
  exports.NSDXVaultAddress =
  exports.NetworkContextName =
  exports.NSDXPrice =
  exports.ChainId =
    void 0
// }
var ChainId
;(function (ChainId) {
  // MAINNET = 137,
  // BSCTESTNET = 97
  ChainId[(ChainId['MAINNET'] = 80001)] = 'MAINNET'
})((ChainId = exports.ChainId || (exports.ChainId = {})))
exports.NSDXPrice = 0.25
exports.NetworkContextName = 'NETWORK'
exports.NSDXVaultAddress = '0xF7a2B32B92bfAC72fE1e2C8a3c5D3079e88B7816' //自动复投代理合约
exports.MasterChefAddress = '0x35cA0e02C4c16c94c4cC8B67D13d660b78414f95' //主矿池
exports.NSDXToken = '0xe8d17b127ba8b9899a160d9a07b69bca8e08bfc6' //代币
exports.LPAddress = '0x56B8936a96cD5EE5C5837F385a19B4c2999fD74a' //代币
exports.mintAddress = '0x067fB0e92679976A874479A98116d27907945b4c' //代币
exports.nAssetAddress = '0x2B5162B17cE9034685561Ff1248A86bb1eEA385c' //代币 (nSTA)
exports.USDTaddress = '0x519130DA1C46CF79F39A0339016c07c77f938fCB'
exports.NSDXTestToken = '0x0bfA4C9309419E98dB3607856611D470bCaf8B9e' //代币
exports.MasterChefTestAddress = '0x6BF02eEF1Db778529b56405E27b7fF76770ECB83' //测试环境主矿池合约
exports.PositionsAddress = '0x331aF3935D38c3019dE34586fD6F4ed143967FDD' // 查询仓位合约
exports.ShortLockAddress = '0x8e20A08ea0D762C1AFfBF1ACe0D5bcc5F76d7544' // 解锁shortLP
exports.ShortStakingAddress = '0xE7Debb4221E8c07f5519B2269DC70132e4141522' // 质押shortLP
exports.ShortTokenAddress = '0x681e7c23Ddf3F7219cce15c91735C469b7Fe33Ab' // 生成的short token(sSTA)
exports.SwapFactoryAddress = '0xb1bC98Ef6E8150551F92568B864AD26E82ecB623' //swap工厂合约
exports.SwapRouterAddress = '0x14C21207baCC1fC9a7440db427558942C472AF6b' //swap 路由合约
exports.mintCoinObject = {
  USDT: {
    name: 'USDT',
    address: '0x519130DA1C46CF79F39A0339016c07c77f938fCB',
    decimals: 18,
    balance: '',
    allowance: '',
  },
}
exports.mintCoinStock = {
  nSE: {
    name: 'nSE',
    address: '0x2B5162B17cE9034685561Ff1248A86bb1eEA385c',
    decimals: 18,
  },
}
exports.assetsName = {
  '0x2B5162B17cE9034685561Ff1248A86bb1eEA385c': 'nSE',
  '0x519130DA1C46CF79F39A0339016c07c77f938fCB': 'USDT',
}
exports.coinBaseArray = ['USDT']
exports.assetBaseArray = ['nSE']
