/** @format */

import React from 'react'
import Notification from '../../utils/notification'
interface Props {
  toCopy: string
}

const CopyToClipboard: React.FC<Props> = ({ toCopy, children, ...props }) => {
  type IconType = 'success' | 'info' | 'error' | 'warning'
  const openNotificationWithIcon = (type: IconType) => {
    Notification({
      type,
      message: 'Success',
      description: 'Copy Success',
    })
  }

  function copy(value: string) {
    const aux = document.createElement('input')
    aux.setAttribute('value', value)
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux)
    openNotificationWithIcon('success')
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={
        () => copy(toCopy)
      }
      {...props}>
      {children}
    </div>
  )
}

export default CopyToClipboard
