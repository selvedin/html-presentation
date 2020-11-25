import { AppBar, Grid, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { BoardContext } from './BoardContext';
import swal from 'sweetalert'
import { AppContext } from 'data/AppContext';
import ColorMenu from './menus/ColorMenu';
import ThicknesMenu from './menus/ThicknesMenu';

const BoardAppBar = () => {
  const { mainContext, isErasing, setIsErasing, setIsBrushColor, setMenuAnchor, setThickAnchor } = useContext(BoardContext)
  const { fullScreen } = useContext(AppContext)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const history = useHistory()

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
          mainContext.current.clearRect(0, 0, mainContext.current.canvas.width, mainContext.current.canvas.height)
        }
      })
  }

  const handleEraser = () => {
    setIsErasing(!isErasing)
  }

  const toggleFullScreen = () => {
    if (isFullScreen) {
      fullScreen.exit()
      setIsFullScreen(false)
    }
    else {
      fullScreen.enter()
      setIsFullScreen(true)
    }

  }

  return (
    <Fragment>
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