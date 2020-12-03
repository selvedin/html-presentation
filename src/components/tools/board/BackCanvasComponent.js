import { BoardContext } from 'data/BoardContext'
import React, { Fragment, useRef, useContext, useEffect } from 'react'

const BackCanvasComponent = () => {
  const { setBackContext } = useContext(BoardContext)

  const canvasBackRef = useRef(null)
  const contextBackRef = useRef(null)

  useEffect(() => {
    const canvas = canvasBackRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const context = canvas.getContext("2d")
    context.scale(2, 2)
    context.lineCap = "round"
    context.strokeStyle = "white"
    context.lineWidth = 5
    contextBackRef.current = context
    setBackContext(contextBackRef)
  }, [])

  return (
    <Fragment>
      <canvas
        className="canvas backCanvas"
        ref={canvasBackRef}
      />
    </Fragment>
  )
}

export default BackCanvasComponent
