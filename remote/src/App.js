import {
  LanguageProvider,
  RemoteComponent,
} from '@applications-instead-of-libraries/shared-library'
import React from 'react'
import { CssBaseline, Container, Box, Paper } from '@material-ui/core'

import Navigation from './Navigation'

const App = () => (
  <div>
    <CssBaseline />

    <Navigation></Navigation>
    <Box mt={12}>
      <Container component="main">
        <LanguageProvider value="en-US">
          <Paper>
            <Box p={1}>
              <RemoteComponent
                component="WelcomeFrame"
                delayed={<>Loading...</>}
              />
            </Box>
          </Paper>
        </LanguageProvider>
      </Container>
    </Box>
  </div>
)

export default App
