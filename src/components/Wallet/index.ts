/** @format */

import {Config, ConnectorNames} from './types'
import MetamaskIcon from '../../img/wallet/icon-MetaMask@2x.png'
import WalletConnectIcon from '../../img/wallet/icon-WalletConnect@2x.png'
import FortmaticIcon from '../../img/wallet/icon-Fortmatic@2x.png'

const connectors: Config[] = [
  {
    title: 'MetaMask',
    icon: MetamaskIcon,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'WalletConnect',
    icon: WalletConnectIcon,
    connectorId: ConnectorNames.WalletConnect,
  },
  {
    title: 'Fortmatic',
    icon: FortmaticIcon,
    connectorId: ConnectorNames.BSC,
  },
]

export default connectors
