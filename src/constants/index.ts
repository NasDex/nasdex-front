/** @format */
export enum ChainId {
  MAINNET = 137,
  MUMBAI_TESTNET = 80001
}

export const BASE_URL = "https://beta-api.nasdex.xyz/"

export const NSDXPrice = 0.25
export const NetworkContextName = 'NETWORK'
export const NSDXVaultAddress = '0xF7a2B32B92bfAC72fE1e2C8a3c5D3079e88B7816' // here ***
export const MasterChefAddress = '0x35cA0e02C4c16c94c4cC8B67D13d660b78414f95' 
export const NSDXToken = '0xE8d17b127BA8b9899a160D9a07b69bCa8E08bfc6' 
export const LPAddress = '0x56B8936a96cD5EE5C5837F385a19B4c2999fD74a' // NSDX / USDC

export const mintAddress = '0xB7957FE76c2fEAe66B57CF3191aFD26d99EC5599' 
export const USDTaddress = '0x519130DA1C46CF79F39A0339016c07c77f938fCB' // Testnet address
export const USDCaddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
export const nAssetAddress = '0xd067082D2808C6Bad647FD497D45c5d1d299216C' // nSE
export const nETHAssetAddress = '0xAE53Ad289fEf1Ff08d07c06808Fb3888150608b9' 
export const nMATICAssetAddress = '0x0C70ac0337088C96C55667974103957166DB63b6' 
export const ShortTokenAddress = '0xF7A9ff1c816562628Cf38E7F2421e17a4882d901' 
export const LongTokenAddress = '0x239363FeD0937613A5Ae8b9916754b6b277B553E' 
export const ETHShortTokenddress = '0xeF25EB0E63e42022E2da28f9c270dB993a0Ac2d2' 
export const MATICShortTokenddress = '0x979Ee7097c4270950f89CA412191bf59c1C4C5ca' 

// Oracle Contracts
export const SEOracleAddress = '0xcc73e00db7a6FD589a30BbE2E957086b8d7D3331' 
export const STAOracleAddress = '0x2349a2522143E80e6014acd608B24146a9c9e4E9' 
export const ETHOracleAddress = '0x0715A7794a1dc8e42615F059dD6e406A6594651A' 
export const MATICOracleAddress = '0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada' 
export const nTSLAOracleAddress = '0x567E67f456c7453c583B6eFA6F18452cDee1F5a8' 
export const aUSTOracleAddress = '0x7958b7693bE15a601cFef8e091c69f18d738e4E8' 

export const NSDXVault = '0x9185921Da8cD0266257DFa606b6075Ef5be67723' 
export const NSDXTestToken = '0xE8d17b127BA8b9899a160D9a07b69bCa8E08bfc6'
export const MasterChefTestAddress = '0x35cA0e02C4c16c94c4cC8B67D13d660b78414f95' 
export const PositionsAddress = '0xADaE61C3D7D4853f71f8e0623fE70622C708F266'
export const ShortLockAddress = '0x8EdF0c0f9C56B11A5bE56CB816A2e57c110f44b1' 
export const ShortStakingAddress = '0xB68F3D8E341B88df22a73034DbDE3c888f4bE9DE' 
export const LongStakingAddress = '0xcA502B303c07c60E71a953cF34c6A512EBC61Bc6' 
export const MultiCallAddress = '0xA8e39872452BA48b1F4c7e16b78668199d2C41Dd' 
export const AssetAddress = '0x6788fFdeA052875f7e5F6F0Dc5aa8e5003308049' 
export const AdminAddress = '0x3F71D535a8dFFB933779915a89f8b7B321140344' 

export const SwapFactoryAddress = '0xa07dD2e9fa20C14C45A28978041b4c64e45f7f97' 
export const SwapRouterAddress = '0x270Ec6bE0C9D67370C2B247D5AF1CC0B7dED0d4a' 

// nTSLA 
export const nTSLATokenAddress = "0x20796c1c7738992e598b81062b41f2e0b8a8c382"
export const nTSLALpTokenAddress = "0xc6cb70d5C8d98C9399D4c37E6135dF31551c3A40"
export const nTSLAShortTokenAddress = "0xb6F1739cD40d8933127Ee2F2D58b81caDc74A8e0"
interface Person {
  name: string
  age?: number
  [propName: string]: any
}

export const nonStablecoinCAsset = [
  'aUST'
]

export const restrictedCoins = [
  'aUST'
]

export const oracleList = [
  {
    assetKey: 'nSE',
    address: SEOracleAddress,
    oraclePrice: null,
    decimal: 8
  },
  {
    assetKey: 'aUST',
    address: aUSTOracleAddress,
    oraclePrice: null,
    decimal: 18
  },
  {
    assetKey: 'nTSLA',
    address: nTSLAOracleAddress,
    oraclePrice: null,
    decimal: 8
  },
]

export const lpPairDetails = [
  {
    // SE / USD
    tokenA: USDCaddress,
    tokenB: nAssetAddress,
    lp: LongTokenAddress, 
    tokenADecimal: 6,
    tokenBDecimal: 18
  }, 
  {
    tokenA: nTSLATokenAddress,
    tokenB: USDCaddress,
    lp: nTSLALpTokenAddress, 
    tokenADecimal: 18,
    tokenBDecimal: 6
  }
]

// Move this to backend
export const shortStakes = [
  {
    shortId: 0, // sSE
    rootId: 11,
    shortToken: ShortTokenAddress,
    shortTokenDecimal: 18,
    name: "sSE",

  },
  {
    shortId: 1, // sTSLA
    rootId: 13,
    shortToken: nTSLAShortTokenAddress,
    shortTokenDecimal: 18,
    name: "sTSLA",
  }
]

export const longStakes = [
  {
    longId: 0, // nSE
    rootId: 10,
    lpToken: LongTokenAddress,
    lpTokenDecimal: 18,
    name: "nSE",

  },
  {
    longId: 1, // nTSLA
    rootId: 12,
    lpToken: nTSLALpTokenAddress,
    lpTokenDecimal: 18,
    name: "nTSLA",
  }
]

export const getLpPairDetail = (tokenA: string, tokenB: string) => {
  if(tokenA === undefined || tokenB === undefined) {
    console.log(`Token A / Token B is undefined`)
    return
  }

  if(tokenA.toLowerCase() === tokenB.toLowerCase()) {
    // console.log(`Token A is equals to token B`)
    return
  }

  const lpDetail = lpPairDetails.find(l => 
    ((l.tokenA.toLowerCase() === tokenA.toLowerCase() || l.tokenA.toLowerCase() === tokenB.toLowerCase()) 
    && (l.tokenB.toLowerCase() === tokenA.toLowerCase() || l.tokenB.toLowerCase() === tokenB.toLowerCase()))
  )
  
  return lpDetail
}
export const getLpDetailByAddress = async(lpAddress: string | undefined) => {
  if(lpAddress === undefined) { return null}
  const lpPairDetailVals = Object.values(lpPairDetails)
  const lpDetail = lpPairDetailVals.filter(l => l.lp.toLowerCase() === lpAddress.toLowerCase())
  return lpDetail[0]
}