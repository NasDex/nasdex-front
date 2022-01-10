/** @format */

// Set of helper functions to facilitate wallet setup

// import { BASE_BSC_SCAN_URL, BASE_URL } from '../config/index'
// import { nodes } from './getRpcUrl'

/**
 * Prompt the user to add BSC as a network on MetaMask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = window.ethereum
  if (provider) {
    // const chainId = parseInt('137', 10)
    const chainId = parseInt('80001', 10)
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          // {
          //   chainId: `0x${chainId.toString(16)}`,
          //   chainName: 'MAINTIC Mainnet',
          //   nativeCurrency: {
          //     name: 'MATIC',
          //     symbol: 'matic',
          //     decimals: 18,
          //   },
          //   rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
          //   blockExplorerUrls: ['https://explorer.matic.network/'],
          // },
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Mumbai Testnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'matic',
              decimals: 18,
            },
            rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
            blockExplorerUrls: ['https://polygonscan.com/'],
          },
        ],
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in MetaMask:', error)
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number) => {
  const provider = window.ethereum
  let tokenAdded
  if (provider) {
    tokenAdded = await provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: `https://www.cdztest.site/images/coins/${tokenAddress}.png`,
        },
      },
    })
  }

  return tokenAdded
}
