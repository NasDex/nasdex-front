/** @format */
export enum ChainId {
  MAINNET = 137,
  MUMBAI_TESTNET = 80001
}

export const NSDXPrice = 0.25
export const NetworkContextName = 'NETWORK'
export const NSDXVaultAddress = '0xF7a2B32B92bfAC72fE1e2C8a3c5D3079e88B7816' // here ***
export const MasterChefAddress = '0x35cA0e02C4c16c94c4cC8B67D13d660b78414f95' 
export const NSDXToken = '0xE8d17b127BA8b9899a160D9a07b69bCa8E08bfc6' 
export const LPAddress = '0x56B8936a96cD5EE5C5837F385a19B4c2999fD74a' // NSDX / USDC

export const mintAddress = '0xDf6ea9670E3f89555Eec716aADFD3fbf0F8a14FD' 
export const USDTaddress = '0x519130DA1C46CF79F39A0339016c07c77f938fCB' // Testnet address
export const USDCaddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
export const nAssetAddress = '0xc7D14a939eE0265BEAB7456394E50Ccc6C665298' // nSE
export const nETHAssetAddress = '0xAE53Ad289fEf1Ff08d07c06808Fb3888150608b9' 
export const nMATICAssetAddress = '0x0C70ac0337088C96C55667974103957166DB63b6' 
export const ShortTokenAddress = '0xef4c2e11E136e2824d4Ec9bc4b147d8C38d931f5' 
export const LongTokenAddress = '0x5f1BD282C552446887919E810901b55Bc6dA2ac4' 
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
export const PositionsAddress = '0x0Dc84B14964234DCB4465874F9FF4778EBb2998a'
export const ShortLockAddress = '0x1D7E96bf705bCeEF2d78286d74e940bDf1072345' 
export const ShortStakingAddress = '0x12531d4ac0669Fa24621C27D0541895b2eB0343d' 
export const LongStakingAddress = '0x63213eCf311F60c52c6d00C7FE700f2BdCE353Bb' 
export const MultiCallAddress = '0xA8e39872452BA48b1F4c7e16b78668199d2C41Dd' 
export const AssetAddress = '0x6C1BAa725A126e9936A2627b7024c3f8c450E64C' 
export const AdminAddress = '0xC01bd61922702D06fA0EA91D2672AEba4Cd7E6d3' 

export const SwapFactoryAddress = '0xa07dD2e9fa20C14C45A28978041b4c64e45f7f97' 
export const SwapRouterAddress = '0x270Ec6bE0C9D67370C2B247D5AF1CC0B7dED0d4a' 

// nTSLA 
export const nTSLATokenAddress = "0xe532dcE6BEFe42Ca8767DFa2abFCE2b99087168B"
export const nTSLALpTokenAddress = "0x8dEf846Af4c574835D6406ceB442eEE57eE1C424"
export const nTSLAShortTokenAddress = "0x12C590aD53CD55677D15B9E2f7D5866B6E1931bB"
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
    tokenA: USDCaddress,
    tokenB: nTSLATokenAddress,
    lp: nTSLALpTokenAddress, 
    tokenADecimal: 6,
    tokenBDecimal: 18
  }
]

// Move this to backend
export const shortStakes = [
  {
    shortId: 1, // sSE
    rootId: 5,
    shortToken: ShortTokenAddress,
    shortTokenDecimal: 18,
    name: "sSE",

  },
  {
    shortId: 2, // sTSLA
    rootId: 7,
    shortToken: nTSLAShortTokenAddress,
    shortTokenDecimal: 18,
    name: "sTSLA",
  }
]

export const longStakes = [
  {
    longId: 1, // nSE
    rootId: 4,
    lpToken: LongTokenAddress,
    lpTokenDecimal: 18,
    name: "nSE",

  },
  {
    longId: 2, // nTSLA
    rootId: 6,
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