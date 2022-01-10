/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
import './i18n.ts'
import './index.css'
import './style/global.less'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Providers from './Providers'

ReactDOM.render(
  // <React.StrictMode>
  <Providers>
    <App />
  </Providers>,
  // </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
