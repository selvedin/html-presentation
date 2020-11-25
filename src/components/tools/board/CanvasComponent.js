import React, { Fragment, useRef, useState, useEffect, useContext } from 'react'
import { BoardContext } from './BoardContext'

const CanvasComponent = () => {
  const { setMainContext, isErasing } = useContext(BoardContext)
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, SetIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const context = canvas.getContext("2d")
    context.scale(2, 2)
    context.lineCap = "round"
    context.strokeStyle = "white"
    context.lineWidth = 5
    contextRef.current = context
    setMainContext(contextRef)
  }, [])

  useEffect(() => {
    contextRef.current.globalCompositeOperation = 'source-over';
    contextRef.current.lineWidth = 5
    canvasRef.current.style.cursor = "crosshair"
    if (isErasing) {
      contextRef.current.globalCompositeOperation = 'destination-out';
      contextRef.current.lineWidth = 20
      canvasRef.current.style.cursor = "not-allowed"
    }
  }, [isErasing])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    SetIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    SetIsDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  return (
    <Fragment>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        style={{ border: "1px solid gray", backgroundColor: "#006a4e" }}
      />
    </Fragment>
  )
}

export default CanvasComponent
