/** @format */

import {notification} from 'antd'
import SuccessIcon from '../img/common/success@2x.png'
import ErrorIcon from '../img/common/error@2x.png'
import WarningIcon from '../img/common/waring@2x.png'

type IconType = 'success' | 'info' | 'error' | 'warning'

interface NotificationProps {
  type: IconType
  message: string
  description?: string | React.ReactNode
}

const getIcon = (type: IconType) => {
  switch (type) {
    case 'success':
      return <img className="notification-icon" src={SuccessIcon} />
    case 'error':
      return <img className="notification-icon" src={ErrorIcon} />
    case 'info':
    case 'warning':
    default:
      return <img className="notification-icon" src={WarningIcon} />
  }
}

const Notification = (props: NotificationProps) => {
  const {type, message, description} = props
  notification[type]({
    message,
    description,
    icon: getIcon(type),
    closeIcon: (
      <svg className="icon close-notification-icon" aria-hidden="true">
        <use xlinkHref="#icon-close"></use>
      </svg>
    ),
    duration: 3,
  })
}

export default Notification
