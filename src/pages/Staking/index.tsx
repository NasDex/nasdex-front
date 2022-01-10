/** @format */

import React, {useEffect, useState} from 'react'
import '../../style/Staking/staking.less'
import Title from '../../components/Title'
import StakingLeft from '../../components/Staking/StakingLeft/index'
import StakingRight from '../../components/Staking/StakingRight/index'
import {getpriceList} from 'utils'
import {useDispatch} from 'react-redux'
import {setPriceList} from 'state/stake/actions'

export default function Staking() {
  // const dispatch = useDispatch()
  // async function initPrice() {
  //   const price = await getpriceList()
  //   dispatch(setPriceList({priceList: price}))
  // }
  // initPrice()
  return (
    <div className="stake-container">
      <div className="container-center">
        <div className="staking-container-center">
          <Title title="Stake"></Title>
          <div className="container-box">
            <StakingLeft></StakingLeft>
            <StakingRight></StakingRight>
          </div>
        </div>
      </div>
    </div>
  )
}
