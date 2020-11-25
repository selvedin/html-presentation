import { Icon, IconButton, Menu, MenuItem } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { THICKS } from 'utils/consts'
import { BoardContext } from '../BoardContext'

const ThicknesMenu = (props) => {
  const { thickAnchor, setThickAnchor, mainContext } = useContext(BoardContext)
  const [isOpen, setIsOpen] = useState(Boolean(thickAnchor))

  const handleMenuClose = () => {
    setIsOpen(false)
    setThickAnchor(null)
  }

  useEffect(() => {
    setIsOpen(Boolean(thickAnchor))
  }, [thickAnchor])

  const changeThicknes = (thick) => {
    mainContext.current.lineWidth = thick
  }
  return (
    <Fragment>
      <Menu
        anchorEl={thickAnchor}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id='menu-board-color-changer'
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          {THICKS.map(thick => {
            return (
              <IconButton
                key={uuid()}
                style={{ margin: '0px 2px' }}
                onClick={() => changeThicknes(thick)}
              >
                <Icon style={{ fontSize: `${thick + 10}px` }}>fiber_manual_record</Icon>
              </IconButton>
            )
          })}
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default ThicknesMenu
