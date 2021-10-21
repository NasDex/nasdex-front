/** @format */

import {createAction} from '@reduxjs/toolkit'

export const upDateTradeSetting = createAction<{TradeSetting: string}>('app/upDateTradeSetting')
