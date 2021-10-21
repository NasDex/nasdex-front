/** @format */

import {useEffect} from 'react'
// import { connectorLocalStorageKey, ConnectorNames } from 'cdzsdk-v2'
import useAuth from 'hooks/useAuth'

enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
}

const _binanceChainListener = async () =>
  new Promise<void>(resolve =>
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    }),
  )

const useEagerConnect = () => {
  const {login} = useAuth()

  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId') as ConnectorNames

    if (connectorId) {
      // const isConnectorBinanceChain = connectorId === ConnectorNames.Injected
      // const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')

      // Currently BSC extension doesn't always inject in time.
      // We must check to see if it exists, and if not, wait for it before proceeding.
      // if (isConnectorBinanceChain && !isBinanceChainDefined) {
      //   _binanceChainListener().then(() => login(connectorId))

      //   return
      // }

      login(connectorId)
    }
  }, [login])
}

export default useEagerConnect
