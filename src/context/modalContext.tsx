/** @format */

import React, {createContext, useState} from 'react'

type Handler = () => void

interface ModalsContext {
  onPresent: (node: React.ReactNode, key?: string) => void
  handleOk: Handler
  handleCancel: Handler
}

export const Context = createContext<ModalsContext>({
  onPresent: () => null,
  handleOk: () => null,
  handleCancel: () => null,
})

const ModalProvider: React.FC = ({children}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalNode, setModalNode] = useState<React.ReactNode>()

  const handlePresent = (node: React.ReactNode) => {
    setModalNode(node)
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <Context.Provider
      value={{
        onPresent: handlePresent,
        handleOk: handleOk,
        handleCancel: handleCancel,
      }}>
      {isModalVisible &&
        React.isValidElement(modalNode) &&
        React.cloneElement(modalNode, {
          onDismiss: handleCancel,
        })}
      {children}
    </Context.Provider>
  )
}

export default ModalProvider
