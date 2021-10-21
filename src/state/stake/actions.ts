/** @format */

import {createAction} from '@reduxjs/toolkit'

export const setStakeBalance = createAction<{stakeBalance: string}>('app/getStakeBalance')
// eslint-disable-next-line @typescript-eslint/ban-types
export const setPriceList = createAction<{priceList: object}>('app/getPriceList')
