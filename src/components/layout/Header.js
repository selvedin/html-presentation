import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

const Header = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">

          </IconButton>
          <Typography variant="h6">
            HTML Prezentacija
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
