/** @format */

import React, {Suspense} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import useEagerConnect from 'hooks/useEagerConnect'
import Menu from 'components/Menu'
// import Test from './pages/Test'
import Mint from './pages/Mint'
import Staking from './pages/Staking'
import Farm from './pages/Farm'
import LongShort from './pages/Farm/longShortIndex'
import ComingSoon from './pages/ComingSoon'
import Profile from './pages/Profile'
import Manage from './pages/Manage'
import Trade from './pages/Trade'

// import './App.less'
import './style/base.less'
import './style/global.less'
import './style/antdesign.less'

export default function App() {
  useEagerConnect()
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Menu>
          <Switch>
            <Route exact strict path="/" render={() => <Redirect to="/staking" />}></Route>
            <Route exact strict path="/mint" component={Mint}></Route>
            <Route exact strict path="/staking" component={Staking}></Route>
            <Route exact strict path="/farm" component={Farm}></Route>
            <Route exact strict path="/farming/:poolType" component={LongShort}></Route>
            {/* <Route exact strict path="/farm" component={ComingSoon}></Route> */}
            <Route exact strict path="/profile" component={Profile}></Route>
            <Route exact strict path="/manage" component={Manage}></Route>
            <Route exact strict path="/trade" component={Trade}></Route>
          </Switch>
        </Menu>
      </BrowserRouter>
    </Suspense>
  )
}
