import React, { useState } from 'react'

export const AppContext = React.createContext()

export const AppProvider = props => {
  const [presents, setPresents] = useState([])
  const [fullScreen, setFullScreen] = useState(null)

  return (
    <AppContext.Provider value={{ presents, setPresents, fullScreen, setFullScreen }}>
      {props.children}
    </AppContext.Provider>
  )
}