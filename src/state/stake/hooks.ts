/** @format */

import {useCallback, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {AppState} from '../index'
import {useActiveWeb3React} from 'hooks'
export function useStakeState(): AppState['stake'] {
  return useSelector<AppState, AppState['stake']>(state => state.stake)
}
