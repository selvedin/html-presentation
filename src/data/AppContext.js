import React, { useState } from 'react'

export const AppContext = React.createContext()

export const AppProvider = props => {
  const [presents, setPresents] = useState([])

  return (
    <AppContext.Provider value={[presents, setPresents]}>
      {props.children}
    </AppContext.Provider>
  )
}