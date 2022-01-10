/** @format */

import {Web3Provider} from '@ethersproject/providers'
import {ethers} from 'ethers'

// export default function getLibrary(provider: any): Web3Provider {
//   const library = new Web3Provider(provider)
//   library.pollingInterval = 15000
//   return library
// }
export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  let library: any
  if (provider) {
    library = new ethers.providers.Web3Provider(provider)
    library.pollingInterval = 1500
  }
  return library
}
