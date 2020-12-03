import { AppBar, Grid, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { BoardContext } from 'data/BoardContext';
import swal from 'sweetalert'
import ColorMenu from './menus/ColorMenu';
import ThicknesMenu from './menus/ThicknesMenu';
import { calculateImageSize, openFullscreen, closeFullscreen } from 'utils/utils'

const BoardAppBar = () => {
  const { mainContext, backContext, isErasing, setIsErasing, setIsBrushColor, setMenuAnchor, setThickAnchor } = useContext(BoardContext)
  const history = useHistory()
  const [isFullScreen, setIsFullScreen] = useState(false)

  const clearBoard = (dontAsk = true, canvasId = 0) => {
    if (dontAsk) {
      swal({
        title: "Da li ste sigurni?",
        text: "Podatci će bit nepovratno izbrisani!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            clearingBoard(canvasId)
          }
        })
    }
    else {
      clearingBoard(canvasId)
    }

  }

  const clearingBoard = (canvasId = 0) => {
    if (canvasId == 0)
      mainContext.current.clearRect(0, 0, mainContext.current.canvas.width, mainContext.current.canvas.height)
    else if (canvasId == 1)
      backContext.current.clearRect(0, 0, backContext.current.canvas.width, backContext.current.canvas.height)
    else {
      mainContext.current.clearRect(0, 0, mainContext.current.canvas.width, mainContext.current.canvas.height)
      backContext.current.clearRect(0, 0, backContext.current.canvas.width, backContext.current.canvas.height)
    }
  }



  const handleEraser = () => {
    setIsErasing(!isErasing)
  }

  const toggleFullScreen = () => {
    if (isFullScreen) {
      closeFullscreen()
      setIsFullScreen(false)
    }
    else {
      openFullscreen()
      setIsFullScreen(true)
    }

  }

  const loadImage = (e) => {
    console.log('loading image')
    let file = {}
    if (e.currentTarget.files.length) {
      file = e.currentTarget.files[0]
      var reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onloadend = function (e) {
        var backImage = new Image()
        backImage.src = reader.result
        backImage.onload = function () {
          const dimensions = calculateImageSize(backImage.width, backImage.height, window.innerWidth, window.innerHeight)
          clearBoard(false, 1)
          console.log(backContext.current)
          backContext.current.drawImage(backImage, ...dimensions)
        }
      }
    }
  }

  return (
    <Fragment>
      <AppBar position="fixed">
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

              <IconButton
                variant="contained"
                component="label"
                color="inherit"
                aria-label="load image"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                title="Load Image"
              >
                <Icon style={{ fontSize: '20px' }}>image</Icon>
                <input
                  type="file"
                  onChange={loadImage}
                  hidden
                />
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="borad color"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => { setIsBrushColor(false); setMenuAnchor(e.currentTarget); }}
                title="Board color"
              >
                <Icon style={{ fontSize: '20px' }}>tv</Icon>
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="borad color"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => { setIsBrushColor(true); setMenuAnchor(e.currentTarget); }}
                title="Board color"
              >
                <Icon style={{ fontSize: '20px' }}>brush</Icon>
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="borad color"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => setThickAnchor(e.currentTarget)}
                title="Board color"
              >
                <Icon style={{ fontSize: '20px' }}>fiber_manual_record</Icon>
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="full screen"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleFullScreen}
                title="Full Screen"
              >
                <Icon style={{ fontSize: '20px' }}>aspect_ration</Icon>
              </IconButton>
              <IconButton
                color={"inherit"}
                aria-label="clear board"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                style={{ backgroundColor: isErasing ? "red" : "transparent" }}
                onClick={handleEraser}
                title="Eraser"
              >
                <Icon>cleaning_services</Icon>
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="clear board"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => clearBoard(true, 2)}
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

              <ColorMenu />
              <ThicknesMenu />

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default BoardAppBar
