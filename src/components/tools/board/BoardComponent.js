import React, { Fragment, useContext, useEffect } from 'react'
import { BoardProvider } from 'data/BoardContext'
import CanvasComponent from './CanvasComponent'
import BoardAppBar from './BoardAppBar'
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import { AppContext } from 'data/AppContext'

const BoardComponent = () => {
  const { fullscreen, setFullScreen } = useContext(AppContext)
  const handleFullScreen = useFullScreenHandle()

  useEffect(() => {
    setFullScreen(handleFullScreen)
  }, [])

  return (
    <Fragment>
      <BoardProvider>
        <FullScreen handle={handleFullScreen}>
          <BoardAppBar />
          <CanvasComponent />
        </FullScreen>
      </BoardProvider>
    </Fragment>
  )
}

export default BoardComponent
