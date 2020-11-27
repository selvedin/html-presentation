import { Icon, IconButton, Menu, MenuItem } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { COLORS } from 'utils/consts'
import { BoardContext } from '../../../../data/BoardContext'

const ColorMenu = (props) => {
  const { menuAnchor, setMenuAnchor, mainContext, isBrushColor } = useContext(BoardContext)
  const [isOpen, setIsOpen] = useState(Boolean(menuAnchor))

  const handleMenuClose = () => {
    setIsOpen(false)
    setMenuAnchor(null)
  }

  useEffect(() => {
    setIsOpen(Boolean(menuAnchor))
  }, [menuAnchor])

  const changeColor = (color) => {
    if (isBrushColor) {
      mainContext.current.strokeStyle = color
    }
    else {
      mainContext.current.canvas.style.backgroundColor = color
    }
  }
  return (
    <Fragment>
      <Menu
        anchorEl={menuAnchor}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id='menu-board-color-changer'
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          {COLORS.map(color => {
            return (
              <IconButton
                key={uuid()}
                style={{ backgroundColor: color, color: isBrushColor ? 'inherit' : color, margin: '0px 2px' }}
                onClick={() => changeColor(color)}
              >
                <Icon style={{ fontSize: '14px' }}>brush</Icon>
              </IconButton>
            )
          })}
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default ColorMenu
