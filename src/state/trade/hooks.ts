/** @format */

import {useCallback, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {AppState} from '../index'
import {useActiveWeb3React} from 'hooks'
export function useTradeState(): AppState['trade'] {
  return useSelector<AppState, AppState['trade']>(state => state.trade)
}
