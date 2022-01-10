/** @format */

import {useCallback, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {updateBlockNumber} from './actions'
import {AppState} from '../index'
import {useActiveWeb3React} from 'hooks'
export function useFarmState(): AppState['farm'] {
  return useSelector<AppState, AppState['farm']>(state => state.farm)
}
