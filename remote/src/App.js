import { NameContextProvider } from '@applications-instead-of-libraries/shared-library'
import React from 'react'
import { CssBaseline, Container, Box, Paper } from '@material-ui/core'

import Navigation from './Navigation'
import Welcome from './Welcome'

const App = () => (
  <div>
    <CssBaseline />

    <Navigation></Navigation>
    <Box mt={12}>
      <Container component="main">
        <NameContextProvider.Provider value="Susan">
          <Paper>
            <Box p={1}>
              <Welcome />
            </Box>
          </Paper>
        </NameContextProvider.Provider>
      </Container>
    </Box>
  </div>
)

export default App
