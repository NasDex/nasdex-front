/** @format */

import React from 'react'
import Notification from '../../utils/notification'
// import {Typography} from 'antd'

// const {Text} = Typography

interface Props {
  toCopy: string
}

const CopyToClipboard: React.FC<Props> = ({toCopy, children, ...props}) => {
  // const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  type IconType = 'success' | 'info' | 'error' | 'warning'
  const openNotificationWithIcon = (type: IconType) => {
    Notification({
      type,
      message: 'Success',
      description: 'Copy Success',
    })
    // notification[type]({
    //   message: 'Notification Title',
    //   description:
    //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    //   // duration: null,
    // })
  }

  function copy(value: string) {
    const aux = document.createElement('input')
    // aux.setAttribute("value", toCopy);
    aux.setAttribute('value', value)
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux)
    openNotificationWithIcon('success')
    // setIsTooltipDisplayed(true)
    // setTimeout(() => {
    //   setIsTooltipDisplayed(false)
    // }, 1000)
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={
        () => copy(toCopy)
        // {
        // if (navigator.clipboard) {
        //   navigator.clipboard.writeText(toCopy);
        //   setIsTooltipDisplayed(true);
        //   setTimeout(() => {
        //     setIsTooltipDisplayed(false);
        //   }, 1000);
        // }
        // }
      }
      {...props}>
      {/* <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip> */}
      {children}
    </div>
  )
}

export default CopyToClipboard
