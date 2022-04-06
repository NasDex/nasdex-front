/** @format */

import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import useEagerConnect from 'hooks/useEagerConnect'
import { useActiveWeb3React } from 'hooks'
import Menu from 'components/Menu'
import Mint from './pages/Mint'
import Staking from './pages/Staking'
import Farm from './pages/Farm'
import LongShort from './pages/Farm/longShortIndex'
import Profile from './pages/Profile'
import Manage from './pages/Manage'
import Trade from './pages/Trade'
import { useCommonState } from 'state/common/hooks'
import { getCommonAssetInfo } from 'utils/getList'
import { upDateOpenWeb } from 'state/common/actions'
import { useDispatch } from 'react-redux'
import './style/base.less'
import './style/global.less'
import './style/antdesign.less'

export default function App() {
  const dispatch = useDispatch()
  const { account } = useActiveWeb3React()
  const commonState = useCommonState()
  const { assetBaseInfoObj } = commonState
  useEagerConnect()

  useEffect(() => {
    dispatch(upDateOpenWeb({ openWeb: true }))
    getCommonAssetInfo(account)
  }, [account, commonState.openWeb])
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Menu>
          <Switch>
            <Route exact strict path="/" render={() => <Redirect to="/mint" />}></Route>
            <Route exact strict path="/mint" component={Mint}></Route>
            <Route exact strict path="/mint/:assetName/:cAssetName" component={Mint}></Route>
            <Route exact strict path="/staking" component={Staking}></Route>
            <Route exact strict path="/farm" component={Farm}></Route>
            <Route exact strict path="/farming/:poolType" component={LongShort}></Route>
            <Route exact strict path="/farming/:poolType/:cAssetName/:assetName" component={LongShort}></Route>
            <Route exact strict path="/profile" component={Profile}></Route>
            <Route exact strict path="/profile/:pageName" component={Profile}></Route>
            <Route exact strict path="/manage/:positionId" component={Manage}></Route>
            <Route exact strict path="/trade" component={Trade}></Route>
            <Route exact strict path="/trade/:assetName/:cAssetName" component={Trade}></Route>
          </Switch>
        </Menu>
      </BrowserRouter>
    </Suspense>
  )
}
