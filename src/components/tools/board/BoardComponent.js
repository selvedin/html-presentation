import React, { Fragment } from 'react'
import { BoardProvider } from 'data/BoardContext'
import CanvasComponent from './CanvasComponent'
import BoardAppBar from './BoardAppBar'
import BackCanvasComponent from './BackCanvasComponent'

const BoardComponent = () => {

  return (
    <Fragment>
      <BoardProvider>
        <BoardAppBar />
        <BackCanvasComponent />
        <CanvasComponent />
      </BoardProvider>
    </Fragment>
  )
}

export default BoardComponent
