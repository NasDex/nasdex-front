/** @format */

import React, {useState} from 'react'
import {Button, Modal, Space} from 'antd'
import TestModal from '../../components/TestModal'
import useModal from '../../hooks/useModal'
import notification from '../../utils/notification'
import '../../style/Mint/mint.less'

export default function Mint() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [openTest] = useModal(<TestModal></TestModal>)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  type IconType = 'success' | 'info' | 'error' | 'warning'

  const openNotificationWithIcon = (type: IconType) => {
    notification({
      type,
      message: 'message',
      description: 'description',
    })
    // notification[type]({
    //   message: 'Notification Title',
    //   description:
    //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    //   // duration: null,
    // })
  }

  return (
    <div className="mint-container">
      <p>Mint</p>

      <Button type="primary">Primary</Button>

      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>

      <Button type="primary" onClick={openTest}>
        Open test Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <Space>
        <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
        <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
        <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
      </Space>
    </div>
  )
}
