
import React, { Fragment } from 'react'
import { StyledButton } from 'components/common/StyledButton'
import { Icon, Tooltip } from '@material-ui/core'
import { useHistory } from 'react-router-dom'


const LargeButton = (props) => {
  const history = useHistory()
  const { label, isIcon, titleLabel, path } = props

  const handleClick = (event) => {
    history.push(path)
  }

  return (
    <Fragment>
      <Tooltip title={titleLabel} arrow>
        <StyledButton variant="contained" className="largeButton" onClick={(e) => handleClick(e)}>
          {isIcon ? <Icon>{label}</Icon> : label}
        </StyledButton>
      </Tooltip>
    </Fragment>
  )
}

export default LargeButton
