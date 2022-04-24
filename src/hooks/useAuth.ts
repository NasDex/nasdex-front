/** @format */

import {useCallback, useEffect} from 'react'
import {useWeb3React, UnsupportedChainIdError} from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import {connectorLocalStorageKey, ConnectorNames} from 'components/WalletModal'
// import useToast from 'hooks/useToast'
import notification from '../utils/notification'
import {connectorsByName} from 'connectors'
import {setupNetwork} from 'utils/wallet'
import { useDispatch } from 'react-redux'
import { loadAccount, loadProvider } from 'state/common/actions'

const useAuth = () => {
  const {activate, deactivate, library, account} = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    if(library !== undefined) {
      const provider = library.provider
      dispatch(loadProvider({provider}))
    } 
  }, [library])

  useEffect(() =>  {
    dispatch(loadAccount({ account }))
  }, [account])

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      // console.log('connectorID####', connectorID)

      window.localStorage.setItem('currentPlatform', connectorID)
      const connector = connectorsByName[connectorID]

      // console.log('connector#####', connector)
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError) {
              notification({
                type: 'error',
                message: 'Provider Error',
                description: 'No provider was found',
              })
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              notification({
                type: 'error',
                message: 'Authorization Error',
                description: 'Please authorize to access your account',
              })
            } else {
              notification({
                type: 'error',
                // message: error.name,
                message: 'ERROR',
                description: error.message,
              }) 
            }
          }
        })
      } else {
        notification({
          type: 'error',
          message: 'Unable to find connector',
          description: 'The connector config is wrong',
        })
      }
    },
    [activate, notification],
  )

  const logout = useCallback(() => {
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
  }, [deactivate])

  return {login, logout}
}

export default useAuth
