/** @format */

import React, {useCallback, useContext} from 'react'
import {Context} from '../context/modalContext'

type Handler = () => void

const useModal = (modal: React.ReactNode): [Handler, Handler] => {
  const {onPresent, handleCancel} = useContext(Context)
  const onPresentCallback = useCallback(() => {
    onPresent(modal)
  }, [modal, onPresent])

  return [onPresentCallback, handleCancel]
}

export default useModal
