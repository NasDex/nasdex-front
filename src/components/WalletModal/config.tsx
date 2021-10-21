/** @format */

import {Config, ConnectorNames} from './types'
import MetamaskIcon from '../../img/wallet/icon-MetaMask@2x.png'
import WalletConnectIcon from '../../img/wallet/icon-WalletConnect@2x.png'
import FortmaticIcon from '../../img/wallet/icon-Fortmatic@2x.png'

const connectors: Config[] = [
  {
    title: 'Metamask',
    connectorId: ConnectorNames.Injected,
    icon: MetamaskIcon,
  },
  {
    title: 'WalletConnect',
    connectorId: ConnectorNames.WalletConnect,
    icon: WalletConnectIcon,
  },
]

export default connectors
export const connectorLocalStorageKey = 'connectorId'
