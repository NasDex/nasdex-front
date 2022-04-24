/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */

import { ethers } from 'ethers'
import {useSelector, useDispatch} from 'react-redux'
import {AppState} from '../index'
export function useCommonState(): AppState['common'] {
  return useSelector<AppState, AppState['common']>(state => state.common)
}

export function useProvider(){
  return useSelector<AppState, ethers.providers.Web3Provider>(state => state.common.provider)
}

