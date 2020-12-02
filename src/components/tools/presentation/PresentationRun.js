import { Grid, Typography } from '@material-ui/core'
import { AppContext } from 'data/AppContext'
import React, { useEffect, useState, useContext, Fragment } from 'react'
import { useHistory } from 'react-router'
import { openFullscreen, closeFullscreen } from 'utils/utils'

const PresentationRun = (props) => {
  const { presentations } = useContext(AppContext)
  const history = useHistory()
  let isFull = true
  const { id } = props.match.params

  const [presentation, setPresentation] = useState(presentations.find(pr => pr.id === id))

  const background = null != presentation.backgroundColor ? presentation.backgroundColor : 'linear-gradient(135deg, #2980b9 30%, #2c3e50 90%)'
  const color = null != presentation.color ? presentation.color : '#FFF'

  const toggleFull = () => {
    if (isFull) {
      openFullscreen()
    }
    else {
      closeFullscreen()
    }
    isFull = !isFull
  }

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.key === 'c') {
      if (!isFull)
        closeFullscreen()
      history.push(`/presentation/${id}`)
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress)

    if (window.performance) {
      if (performance.navigation.type === 1) {
        //toggleFull()
      } else {
        toggleFull()
      }
    }

    const body = document.getElementsByTagName("BODY")[0]
    body.style.background = background
    body.style.color = color

    body.addEventListener('dblclick', toggleFull)

  }, [])

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >


        <Typography align="center">

          <Typography variant="h1">{presentation.title}</Typography>
          <Typography variant="h3">{presentation.subject}</Typography>
          <Typography variant="h5">{presentation.author}</Typography>

        </Typography>

      </Grid>

    </Fragment>
  )
}

export default PresentationRun
