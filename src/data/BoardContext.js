import React, { useState } from 'react'

export const BoardContext = React.createContext()

export const BoardProvider = props => {
  const [mainContext, setMainContext] = useState(null)
  const [backContext, setBackContext] = useState(null)
  const [fullScreen, setFullScreen] = useState(null)
  const [isErasing, setIsErasing] = useState(false)
  const [isBrushColor, setIsBrushColor] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [thickAnchor, setThickAnchor] = useState(null)

  return (
    <BoardContext.Provider
      value={{
        mainContext, setMainContext,
        backContext, setBackContext,
        isErasing, setIsErasing,
        fullScreen, setFullScreen,
        menuAnchor, setMenuAnchor,
        thickAnchor, setThickAnchor,
        isBrushColor, setIsBrushColor
      }}
    >
      {props.children}
    </BoardContext.Provider>
  )
}