/** @format */

import {useWeb3React} from '@web3-react/core'
import CopyToClipboard from 'components/WalletModal/CopyToClipboard'
import React from 'react'
import '../../style/title.less'

type TitleProps = {
  title: string
  hasOpen?: boolean
  hasAddress?: boolean
}
const Title = ({title, hasOpen, hasAddress}: TitleProps) => {
  const {account} = useWeb3React()
  return (
    <div className="title">
      {title == 'manage' || title =='farm'?
        <div className='position'>
          {title == 'manage'?
          <span className='manage'>Position</span>:<span className='farm'>Farm</span>
            }
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-left"></use>
          </svg>
          <span>All Assets</span>
      </div>:title
      }
      {/* {hasOpen ? (
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-on"></use>
        </svg>
      ) : null} */}
      {hasAddress && account ? (
        <div className="address">
          <CopyToClipboard toCopy={account}>
            {account}
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#copy"></use>
            </svg>
          </CopyToClipboard>
        </div>
      ) : null}
    </div>
  )
}
export default Title
