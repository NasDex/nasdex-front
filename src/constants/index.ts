/** @format */
export enum ChainId {
  MAINNET = 137,
  MUMBAI_TESTNET = 80001,
}

export const BASE_URL = "https://test-api.nasdex.xyz/"

export const NSDXPrice = 0.25
export const NetworkContextName = 'NETWORK'
export const NSDXVaultAddress = '0xF7a2B32B92bfAC72fE1e2C8a3c5D3079e88B7816'
export const MasterChefAddress = '0xFe12AddfCDa0047aE304ADe81cEA6eBEe304a35d'
export const NSDXToken = '0x620c07ab0d26Fc22E346aadC895bc1eD84C6CF78'
export const LPAddress = '0x6CF79D9c5576dfAC54c6170D404D9569d896b0e4'

export const mintAddress = '0x2bFA60Fe6FDd82e732C0f8b7A87Ca6753b0167f0'
export const USDTaddress = '0x519130DA1C46CF79F39A0339016c07c77f938fCB'
export const USDCaddress = '0x2F059f10b9c8F21eF509f0a00B1A4DC21511CdFf'
export const nAssetAddress = '0xc67B287F2F0A0b3589D1C2Fcce4B16C2c8DBDEdc'
export const nETHAssetAddress = '0xAE53Ad289fEf1Ff08d07c06808Fb3888150608b9'
export const nMATICAssetAddress = '0x0C70ac0337088C96C55667974103957166DB63b6'
export const ShortTokenAddress = '0x8BbaC288b26b38A98c4De9884ad4d97dc324B323'
export const LongTokenAddress = '0x6CF79D9c5576dfAC54c6170D404D9569d896b0e4'
export const ETHShortTokenddress = '0xeF25EB0E63e42022E2da28f9c270dB993a0Ac2d2'
export const MATICShortTokenddress = '0x979Ee7097c4270950f89CA412191bf59c1C4C5ca'

// Oracle Contracts
export const SEOracleAddress = '0xEEeEB911f1c30217EfFC662B157f8BAF91f1133b'
export const STAOracleAddress = '0x2349a2522143E80e6014acd608B24146a9c9e4E9'
export const ETHOracleAddress = '0x0715A7794a1dc8e42615F059dD6e406A6594651A'
export const MATICOracleAddress = '0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada'
export const nTSLAOracleAddress = '0xDb12E805d004698FC58F6e4fbdD876268DF2dfFe'
export const aUSTOracleAddress = '0xC6Be21D8533e90Fd136905eBe70c9d9148237f2d'

export const NSDXVault = '0x9185921Da8cD0266257DFa606b6075Ef5be67723'
export const NSDXTestToken = '0x620c07ab0d26Fc22E346aadC895bc1eD84C6CF78'
export const MasterChefTestAddress = '0xFe12AddfCDa0047aE304ADe81cEA6eBEe304a35d'
export const PositionsAddress = '0x9578da0aCfcAD212CCfd707acA3e0E2Ee9bf9EeC'
export const ShortLockAddress = '0xF68352670672db755dbD55a3d9Ff8B47d2c76Eb0'
export const ShortStakingAddress = '0xdD686588B64C29Bef6498f579e892AdAA293a6f3'
export const LongStakingAddress = '0x1aD73968E12BaFB6342A0017c04309b31bC4C193'
export const MultiCallAddress = '0x872808abd468F80c80213f48a5E917b5F5c371f8'
export const AssetAddress = '0x696C515e9E33f4e6c63645fac21701C0277e54d3'
export const AdminAddress = '0x1CAeb6856D561b317b29E7021B65F53f287346f6'

export const SwapFactoryAddress = '0x03A8C741d36a8bF689A24C1F5d59cc122704E85F'
export const SwapRouterAddress = '0xeF1F06F0a9645A143Eaccb543f5bda85A9BD21D9'

// nTSLA
export const nTSLATokenAddress = '0x362dB5C57CbD3CF43491134F79c334bC2a10db86'
export const nTSLALpTokenAddress = '0x211B33e5231907E26ab6FD8CAa3F6eA81936D15e'
export const nTSLAShortTokenAddress = '0x362dB5C57CbD3CF43491134F79c334bC2a10db86'

interface Person {
  name: string
  age?: number
  [propName: string]: any
}

export const nonStablecoinCAsset = [
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
    tokenBDecimal: 18,
  },
  {
    tokenA: USDCaddress,
    tokenB: nTSLATokenAddress,
    lp: nTSLALpTokenAddress,
    tokenADecimal: 6,
    tokenBDecimal: 18,
  },
]

// Move this to backend
export const shortStakes = [
  {
    shortId: 0, // sSE
    rootId: 6,
    shortToken: ShortTokenAddress,
    shortTokenDecimal: 18,
    name: 'sSE',
  },
  {
    shortId: 1, // sTSLA
    rootId: 8,
    shortToken: nTSLAShortTokenAddress,
    shortTokenDecimal: 18,
    name: 'sTSLA',
  },
]

export const longStakes = [
  {
    longId: 0, // nSE
    rootId: 5,
    lpToken: LongTokenAddress,
    lpTokenDecimal: 18,
    name: 'nSE',
  },
  {
    longId: 1, // nTSLA
    rootId: 7,
    lpToken: nTSLALpTokenAddress,
    lpTokenDecimal: 18,
    name: 'nTSLA',
  },
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
