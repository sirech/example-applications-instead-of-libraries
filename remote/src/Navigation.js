import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Navigation = () => (
  <AppBar color="secondary">
    <Toolbar>
      <Typography variant="h6">Remote Application</Typography>
    </Toolbar>
  </AppBar>
)

export default Navigation
