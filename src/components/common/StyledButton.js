import { Button, withStyles } from '@material-ui/core'

export const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(135deg, #2980b9 30%, #2c3e50 90%)',
    margin: '10px',
    borderRadius: 3,
    border: 0,
    color: 'white',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(44, 115, 210, .3)',
    fontSize: '1.2em'
  },
  label: {
    textTransform: 'uppercase',
  },
})(Button)