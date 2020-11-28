import React, { useState, useReducer } from 'react'
import { presentationReducer } from './reducers/presentationReducer'
import { getData } from 'utils/utils'

export const AppContext = React.createContext()

export const AppProvider = props => {
  const [presentations, dispatchPresentation] = useReducer(presentationReducer, getData('presentations'))
  const [fullScreen, setFullScreen] = useState(null)

  return (
    <AppContext.Provider value={{ presentations, dispatchPresentation, fullScreen, setFullScreen }}>
      {props.children}
    </AppContext.Provider>
  )
}