import { LanguageProvider } from '@applications-instead-of-libraries/shared-library'
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
        <LanguageProvider value="en-US">
          <Paper>
            <Box p={1}>
              <Welcome />
            </Box>
          </Paper>
        </LanguageProvider>
      </Container>
    </Box>
  </div>
)

export default App
