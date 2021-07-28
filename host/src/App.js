import {
  LanguageProvider,
  RemoteComponent,
} from '@applications-instead-of-libraries/shared-library'
import React from 'react'
import Navigation from './Navigation'
import { CssBaseline, Container, Box, Paper } from '@material-ui/core'

const App = () => (
  <div>
    <CssBaseline />

    <Navigation></Navigation>
    <Box mt={12}>
      <Container component="main">
        <Paper>
          <Box p={2}>This content is part of the host application</Box>
        </Paper>

        <LanguageProvider value="de-DE">
          <Box p={1}>
            <RemoteComponent
              component="WelcomeFrame"
              delayed={<>Loading...</>}
            />
          </Box>
        </LanguageProvider>
      </Container>
    </Box>
  </div>
)

export default App
