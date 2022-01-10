/** @format */

import {useSelector, useDispatch} from 'react-redux'
import {AppState} from '../index'
export function useTradeState(): AppState['trade'] {
  return useSelector<AppState, AppState['trade']>(state => state.trade)
}
