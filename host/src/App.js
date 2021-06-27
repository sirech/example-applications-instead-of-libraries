import {
  LanguageProvider,
  LazyModule,
} from '@applications-instead-of-libraries/shared-library'
import React from 'react'
import Navigation from './Navigation'
import { CssBaseline, Container, Box, Paper } from '@material-ui/core'

const Welcome = React.lazy(() => import('remote/Welcome'))

const App = () => (
  <div>
    <CssBaseline />

    <Navigation></Navigation>
    <Box mt={12}>
      <Container component="main">
        <LanguageProvider value="de-DE">
          <Paper>
            <Box p={1}>
              <LazyModule delayed={<>Loading...</>}>
                <Welcome />
              </LazyModule>
            </Box>
          </Paper>
        </LanguageProvider>
      </Container>
    </Box>
  </div>
)

export default App
