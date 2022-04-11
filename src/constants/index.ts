/** @format */
export enum ChainId {
  MAINNET = 137,
  MUMBAI_TESTNET = 80001
}

export const NSDXPrice = 0.25
export const NetworkContextName = 'NETWORK'
export const NSDXVaultAddress = '0xF7a2B32B92bfAC72fE1e2C8a3c5D3079e88B7816' 
export const MasterChefAddress = '0xFe12AddfCDa0047aE304ADe81cEA6eBEe304a35d' 
export const NSDXToken = '0x620c07ab0d26Fc22E346aadC895bc1eD84C6CF78' 
export const LPAddress = '0x9d74037228Aa739904086D4EC3b9FcBF2DaD28e1' 

export const mintAddress = '0x3f4b4c27F22F768F6756f0Ab5AC7D8570A94253b' 
export const USDTaddress = '0x519130DA1C46CF79F39A0339016c07c77f938fCB'
export const USDCaddress = '0x2F059f10b9c8F21eF509f0a00B1A4DC21511CdFf'
export const nAssetAddress = '0xd99dee10fBA100f0c1c5940A956C890a96bB17b4' 
export const nETHAssetAddress = '0xAE53Ad289fEf1Ff08d07c06808Fb3888150608b9' 
export const nMATICAssetAddress = '0x0C70ac0337088C96C55667974103957166DB63b6' 
export const ShortTokenAddress = '0x2ABB64610959D097472d3c61ffA851b28288b72c' 
export const LongTokenAddress = '0x9d74037228Aa739904086D4EC3b9FcBF2DaD28e1' 
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
export const PositionsAddress = '0x23099D88645526e9AD00e27f441247824f2A2703'
export const ShortLockAddress = '0xbEc3621C7336C90FB8BA6a096FDF2beCc5928B06' 
export const ShortStakingAddress = '0x2307b6DD2D29e4D8a48bfE759228A202EF67452F' 
export const LongStakingAddress = '0x620f061cd682013863742D4e8B4EFC992aC9807B' 
export const MultiCallAddress = '0x872808abd468F80c80213f48a5E917b5F5c371f8' 
export const AssetAddress = '0xdb5Bdc9a9f4d5C0b2790F55Ff12f5409c021e990' 
export const AdminAddress = '0x51B6F9dc5a67fCF62c84E2314651100f8Bc5cF43' 

export const SwapFactoryAddress = '0x03A8C741d36a8bF689A24C1F5d59cc122704E85F' 
export const SwapRouterAddress = '0xeF1F06F0a9645A143Eaccb543f5bda85A9BD21D9' 

// nTSLA 
export const nTSLATokenAddress = "0xC0837c7933e8e19F615453e978f76c1C72bc8d16"
export const nTSLALpTokenAddress = "0x66b9A44d9487175177698BCD9812dBdeeA08fb3D"
export const nTSLAShortTokenAddress = "0xC2a6701cC948e01375B6042466439F21CaeAe3ac"


interface Person {
  name: string
  age?: number
  [propName: string]: any
}

export const oracleList = [
  {
    assetKey: 'nSE',
    address: SEOracleAddress,
    oraclePrice: null,
  },
  {
    assetKey: 'aUST',
    address: aUSTOracleAddress,
    oraclePrice: null,
  },
  {
    assetKey: 'nTSLA',
    address: nTSLAOracleAddress,
    oraclePrice: null,
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
  const lpDetail = lpPairDetails.find(l => l.tokenA.toLowerCase() === tokenA.toLowerCase() && l.tokenB.toLowerCase() === tokenB.toLowerCase())
  return lpDetail
}
