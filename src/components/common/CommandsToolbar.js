
import { AppBar, Grid, Icon, IconButton, Toolbar, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { AppContext } from 'data/AppContext'
import { useHistory } from 'react-router'
import { SAVE_PRESENTATION } from 'utils/presentationConsts'

const CommandsToolbar = props => {
  const history = useHistory()
  const { dispatchPresentation } = useContext(AppContext)
  const { presentation } = props

  const undoData = () => {
    console.log('undo')
  }
  const redoData = () => {
    console.log('redo')
  }
  const runPresentation = () => {
    console.log('running presentation')
  }
  const goHome = () => {
    history.push("/")
  }
  const openBoard = () => {
    history.push("/draw")
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          justify="space-between" // Add it here :)
          container
          spacing={10}
        >
          <Grid item>
            <Typography variant="h6" color="inherit">
              {presentation.title}
            </Typography>
          </Grid>

          <Grid item>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={goHome}
                color="inherit"
                title="Home"
              >
                <Icon>home</Icon>
              </IconButton>
              <IconButton
                aria-label="undo"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={undoData}
                color="inherit"
                title="Undo"
              >
                <Icon>undo</Icon>
              </IconButton>
              <IconButton
                aria-label="redo"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={redoData}
                color="inherit"
                title="Redo"
              >
                <Icon>redo</Icon>
              </IconButton>
              <IconButton
                aria-label="save presentation settings"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => dispatchPresentation({ type: SAVE_PRESENTATION, payload: presentation })}
                color="inherit"
                title="Save"
              >
                <Icon>save</Icon>
              </IconButton>
              <IconButton
                aria-label="drawing board"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={openBoard}
                color="inherit"
                title="Board"
              >
                <Icon>gesture</Icon>
              </IconButton>
              <IconButton
                aria-label="slide show run"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={runPresentation}
                color="inherit"
                title="Run presentation"
              >
                <Icon>slideshow</Icon>
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default CommandsToolbar
