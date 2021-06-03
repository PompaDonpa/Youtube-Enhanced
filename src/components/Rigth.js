import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: ({ dark }) => (dark ? '#282936' : '#444555'), //"#4d4f68"
    color: ({ dracula }) => (dracula ? '#ffffff' : '#a1efe4'),
    display: 'flex'
  }
}))

function Rigth () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1>hey</h1>
    </div>
  )
}

export default Rigth
