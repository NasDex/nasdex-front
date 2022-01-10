/* eslint-disable @typescript-eslint/no-var-requires */
/** @format */

import {useSelector, useDispatch} from 'react-redux'
import {AppState} from '../index'
export function useCommonState(): AppState['common'] {
  return useSelector<AppState, AppState['common']>(state => state.common)
}

