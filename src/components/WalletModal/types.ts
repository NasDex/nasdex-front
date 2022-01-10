/** @format */

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
}

export type Login = (connectorId: ConnectorNames) => void

export interface Config {
  title: string
  connectorId: ConnectorNames
  icon: string
}
