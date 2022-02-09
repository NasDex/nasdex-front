/** @format */

import React from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import { NetworkContextName } from './constants'
import { default as ModalProvider } from './context/modalContext'
import { getLibrary } from './utils/getLibrary'
import store from './state'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <ModalProvider>{children}</ModalProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
