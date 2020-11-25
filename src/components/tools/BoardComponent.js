import { AppBar, Grid, Icon, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState, useRef } from 'react'
import uuid from 'react-uuid'
import { useHistory } from 'react-router'
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import swal from 'sweetalert'
const colors = ['red', 'darkred', 'lightblue', 'blue', 'darkblue', 'lightgreen', 'green', 'darkgreen', 'orange', 'cyan', 'magenta', 'yellow', 'black', 'white']

const BoardComponent = () => {
  const handleFullScreen = useFullScreenHandle()
  const history = useHistory()
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, SetIsDrawing] = useState(false)
  const [isErasing, SetIsErasing] = useState(false)
  const [isForeMenu, SetIsForeMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [fullScreen, SetFullScreen] = useState(false)

  const isMenuOpen = Boolean(anchorEl)

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

  const clearBoard = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover drawing!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
      })
  }

  const changeForeColor = (color) => {
    contextRef.current.strokeStyle = color
  }


  const changeBackColor = (color) => {
    canvasRef.current.style.backgroundColor = color
  }

  const toggleFullScreen = () => {
    if (fullScreen) {
      handleFullScreen.exit()
      SetFullScreen(false)
    }
    else {
      handleFullScreen.enter()
      SetFullScreen(true)
    }

  }
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        {colors.map(color => {
          return (
            <IconButton
              key={uuid()}
              style={{ backgroundColor: color, color: isForeMenu ? 'inherit' : color, margin: '0px 2px' }}
              onClick={() => isForeMenu ? changeForeColor(color) : changeBackColor(color)}
            >
              <Icon style={{ fontSize: '14px' }}>brush</Icon>
            </IconButton>
          )
        })}
      </MenuItem>
    </Menu>
  )

  return (
    <FullScreen handle={handleFullScreen}>
      <div style={{ width: '100%', height: '100%' }}>
        <Grid
          container
          direction="row"
        >
          <AppBar position="static">
            <Toolbar>
              <Grid
                justify="space-between" // Add it here :)
                container
                spacing={10}
              >
                <Grid item>
                  <Typography variant="h6" color="inherit">
                    Board
                </Typography>
                </Grid>

                <Grid item>
                  <div className="toolbarDiv">
                    <IconButton
                      color="inherit"
                      aria-label="borad color"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={(e) => { SetIsForeMenu(false); handleMenuOpen(e) }}
                      title="Board color"
                    >
                      <Icon style={{ fontSize: '20px' }}>tv</Icon>
                    </IconButton>
                    <IconButton
                      color="inherit"
                      aria-label="borad color"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={(e) => { SetIsForeMenu(true); handleMenuOpen(e) }}
                      title="Board color"
                    >
                      <Icon style={{ fontSize: '20px' }}>brush</Icon>
                    </IconButton>
                    {renderMenu}

                    <IconButton
                      color="inherit"
                      aria-label="full screen"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => toggleFullScreen()}
                      title="Full Screen"
                    >
                      <Icon style={{ fontSize: '20px' }}>aspect_ration</Icon>
                    </IconButton>
                    <IconButton
                      color={isErasing ? "primary" : "inherit"}
                      aria-label="clear board"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      style={{ backgroundColor: isErasing ? "white" : "transparent" }}
                      onClick={() => SetIsErasing(!isErasing)}
                      title="Eraser"
                    >
                      <Icon>cleaning_services</Icon>
                    </IconButton>
                    <IconButton
                      color="inherit"
                      aria-label="clear board"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={clearBoard}
                      title="Clean Board"
                    >
                      <Icon>delete_outline</Icon>
                    </IconButton>

                    <IconButton
                      color="inherit"
                      aria-label="go back"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={() => history.goBack()}
                      title="Go Back"
                    >
                      <Icon>close</Icon>
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
            style={{ border: "1px solid gray", backgroundColor: "#006a4e" }}
          />
        </Grid>
      </div>
    </FullScreen>
  )
}

export default BoardComponent
