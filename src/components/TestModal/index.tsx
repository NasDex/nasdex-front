/** @format */

import React from 'react'
import {Modal} from 'antd'

const defaultOnDismiss = () => null

type TestModalProps = {
  onDismiss?: () => void
}

const TestModal = ({onDismiss = defaultOnDismiss}: TestModalProps) => {
  return (
    <Modal title="Basic Modal" visible={true} onOk={onDismiss} onCancel={onDismiss}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default TestModal
